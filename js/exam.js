/* =========================================================================
   Exam engine — timer, navigation, flagging, review screen, submit
   ------------------------------------------------------------------------- */

const ExamState = {
  config: null,
  student: null,
  questions: [],   // selected subset for this attempt
  answers: [],     // index of selected option per question, or null
  flagged: [],     // boolean per question
  struck: [],      // per-question struck-out option indices (real-exam strikethrough)
  highlights: [],  // per-question array of {start, end} char offsets in the stem
  scratchpad: '', // exam-wide notes pad
  qTimes: [],      // ms spent per question (accumulated)
  qEnteredAt: 0,   // wall-clock ms when current question was entered
  tabSwitches: 0,  // visibilitychange "hidden" count
  warnedAt: {},    // dict of "30","15","5","1" → true once that warning has fired
  startedAt: null,
  endsAt: null,
  currentIdx: 0,
  reviewing: false,
  submitted: false,
  timerHandle: null
};

/* --- In-progress attempt persistence ---------------------------------------
   Saves the live ExamState to localStorage after every meaningful change so
   an accidental browser refresh (or crash) doesn't destroy the student's
   work. On exam-page load, if a saved attempt exists for THIS exam + THIS
   student and the timer hasn't expired, the student is offered the option
   to resume. Otherwise the saved attempt is discarded and a fresh one is
   started.

   Key shape: `inprogress_<examId>_<studentNameSlug>`
*/
function inProgressKey(examId, student) {
  const slug = (student?.name || 'anon').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  return 'inprogress_' + examId + '_' + slug;
}

function saveInProgress() {
  if (!ExamState.config || !ExamState.startedAt || ExamState.submitted) return;
  try {
    const snapshot = {
      version: 1,
      examId: ExamState.config.id,
      questions: ExamState.questions,      // captured at start so a refresh draws the SAME questions
      answers: ExamState.answers,
      flagged: ExamState.flagged,
      struck: ExamState.struck,
      highlights: ExamState.highlights,
      scratchpad: ExamState.scratchpad,
      qTimes: ExamState.qTimes,
      tabSwitches: ExamState.tabSwitches,
      warnedAt: ExamState.warnedAt,
      startedAt: ExamState.startedAt,
      endsAt: ExamState.endsAt,
      currentIdx: ExamState.currentIdx,
      studentName: ExamState.student?.name || '',
      savedAt: Date.now()
    };
    localStorage.setItem(inProgressKey(ExamState.config.id, ExamState.student), JSON.stringify(snapshot));
  } catch (e) { /* quota or serialization error — non-fatal */ }
}

function loadInProgress(examId, student) {
  try {
    const raw = localStorage.getItem(inProgressKey(examId, student));
    if (!raw) return null;
    const snap = JSON.parse(raw);
    if (!snap || snap.examId !== examId) return null;
    return snap;
  } catch (e) { return null; }
}

function clearInProgress() {
  if (!ExamState.config) return;
  try {
    localStorage.removeItem(inProgressKey(ExamState.config.id, ExamState.student));
  } catch (e) { /* nothing */ }
}

/* --- Utility --- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* --- Question selection
   Real CompTIA exams ALWAYS include multi-response, drag-and-drop, and
   (where applicable) PBQs. Plain random sampling from a single-answer-
   dominant pool will often drop those special types. To keep the format
   honest we:
     1. Reserve a slot for every special-type question available (up to a
        small per-type cap so they don't crowd out single-answer MC).
     2. Fill the remaining slots with single-answer questions sampled
        domain-proportionally per the exam blueprint.
     3. Shuffle the final order.
*/
function selectQuestions(pool, config) {
  // If the exam config restricts allowed types (e.g., Tech+ excludes PBQs),
  // filter the pool BEFORE anything else so the question-count math stays
  // correct and no excluded type slips into the draw.
  if (config.allowedTypes && config.allowedTypes.length) {
    const allow = new Set(config.allowedTypes);
    pool = pool.filter(q => allow.has(q.type || 'single'));
  }

  const target = Math.min(config.questionCount, pool.length);

  // Caps mirror the real exam — A+ / N+ typically include 2-3 PBQs and a
  // handful of drag-and-drops; Tech+ omits PBQs entirely. Multi-response is
  // sprinkled throughout. Caps are upper bounds; pool may have fewer.
  const TYPE_CAPS = { 'multi': 5, 'dnd-match': 3, 'pbq': 2 };
  const specials = [];
  Object.keys(TYPE_CAPS).forEach(t => {
    const available = pool.filter(q => (q.type || 'single') === t);
    specials.push(...shuffle(available).slice(0, Math.min(TYPE_CAPS[t], available.length)));
  });
  const specialUids = new Set(specials.map(q => q._uid));
  const singlePool  = pool.filter(q => (q.type || 'single') === 'single' && !specialUids.has(q._uid));

  const slotsForSingle = Math.max(0, target - specials.length);

  let picked = specials.slice();
  if (!config.domains || !config.domains.length) {
    picked = picked.concat(shuffle(singlePool).slice(0, slotsForSingle));
  } else {
    const byDomain = {};
    singlePool.forEach(q => {
      const d = q.domain || 'UNTAGGED';
      (byDomain[d] = byDomain[d] || []).push(q);
    });
    const domainPicks = [];
    config.domains.forEach(d => {
      const want = Math.round((d.weight / 100) * slotsForSingle);
      const have = byDomain[d.id] || [];
      domainPicks.push(...shuffle(have).slice(0, want));
    });
    if (domainPicks.length < slotsForSingle) {
      const usedIds = new Set(domainPicks.map(q => q._uid));
      const leftovers = shuffle(singlePool.filter(q => !usedIds.has(q._uid)));
      domainPicks.push(...leftovers.slice(0, slotsForSingle - domainPicks.length));
    }
    picked = picked.concat(domainPicks.slice(0, slotsForSingle));
  }
  return shuffle(picked.slice(0, target));
}

/* --- Boot: prepare the splash overlay; the actual exam only starts after
   the student acknowledges the conduct policy and clicks Begin Exam.
   If a saved in-progress attempt exists for this exam + student, the splash
   shows a "Resume in-progress attempt" option instead of "Begin Exam".     */
window.addEventListener('DOMContentLoaded', () => {
  const examId = getQueryParam('exam');
  ExamState.config = window.EXAMS[examId];
  ExamState.student = window.SessionStore.get();

  if (!ExamState.config) {
    document.body.innerHTML = '<div style="padding:40px;text-align:center"><h2>Unknown exam.</h2><p><a href="index.html">Go back</a></p></div>';
    return;
  }
  if (!window.SessionStore.isValid(ExamState.student)) {
    window.location.href = 'index.html';
    return;
  }
  const pool = (window.QUESTION_POOLS && window.QUESTION_POOLS[examId]) || [];
  if (!pool.length) {
    document.body.innerHTML = '<div style="padding:40px;text-align:center"><h2>No questions loaded for this exam.</h2><p><a href="index.html">Back</a></p></div>';
    return;
  }
  pool.forEach((q, i) => { if (q._uid === undefined) q._uid = examId + '-' + i; });

  // Check for an in-progress attempt for this exam + student.
  const inProgress = loadInProgress(examId, ExamState.student);
  const now = Date.now();
  const hasResumable = inProgress
    && Array.isArray(inProgress.questions)
    && inProgress.questions.length
    && inProgress.endsAt
    && inProgress.endsAt > now;
  const hasExpired = inProgress
    && Array.isArray(inProgress.questions)
    && inProgress.questions.length
    && inProgress.endsAt
    && inProgress.endsAt <= now;

  if (hasExpired) {
    // Timer ran out while the student was away — auto-submit the saved progress
    // so the score is still recorded.
    restoreInProgress(inProgress);
    document.getElementById('splash-overlay').classList.add('hidden');
    document.body.classList.add('theme-test-center');
    submitExam(true);
    return;
  }

  if (hasResumable) {
    // Stash the snapshot so "Resume" picks it up; meanwhile prep a fresh
    // attempt in case the student picks "Start fresh".
    window._pendingResume = inProgress;
  }

  ExamState.questions  = selectQuestions(pool, ExamState.config);
  ExamState.answers    = ExamState.questions.map(() => null);
  ExamState.flagged    = ExamState.questions.map(() => false);
  ExamState.struck     = ExamState.questions.map(() => []);
  ExamState.highlights = ExamState.questions.map(() => []);
  ExamState.qTimes     = ExamState.questions.map(() => 0);
  ExamState.scratchpad = '';
  ExamState.currentIdx = 0;

  // Populate splash with exam-specific values
  document.getElementById('splash-exam-name').textContent = ExamState.config.fullName;
  document.getElementById('splash-questions').textContent =
    ExamState.questions.length + ' questions';
  document.getElementById('splash-time').textContent =
    ExamState.config.timeMinutes + ' minutes';
  document.getElementById('splash-pass').textContent =
    'pass at ' + ExamState.config.passScaled + ' / 900';

  // If we have a resumable attempt, offer it.
  if (hasResumable) {
    showResumeOption(inProgress);
  }

  // Agreement checkbox + Begin button gate
  const agreeBox  = document.getElementById('splash-agree');
  const beginBtn  = document.getElementById('begin-exam-btn');
  agreeBox.addEventListener('change', () => { beginBtn.disabled = !agreeBox.checked; });
  beginBtn.addEventListener('click', () => startExam());

  // Warn if the student tries to close the tab mid-exam
  window.addEventListener('beforeunload', (e) => {
    if (ExamState.startedAt && !ExamState.submitted) {
      saveInProgress();   // last-ditch save before the browser tears down
      e.preventDefault();
      e.returnValue = '';
    }
  });

  // Track tab visibility — counted only after exam begins
  document.addEventListener('visibilitychange', () => {
    if (!ExamState.startedAt || ExamState.submitted) return;
    if (document.hidden) {
      ExamState.tabSwitches++;
      const indicator = document.getElementById('tab-switch-indicator');
      const count = document.getElementById('tab-switch-count');
      if (indicator && count) {
        indicator.style.display = '';
        count.textContent = ExamState.tabSwitches;
      }
      saveInProgress();
    }
  });

  // Wire 2-step submit modal buttons (set up once; flow handled in confirmSubmit)
  document.getElementById('submit-cancel').addEventListener('click', closeSubmitModal);
});

function showResumeOption(snap) {
  // Insert a banner above the agreement checkbox offering to resume.
  const splashCard = document.querySelector('.splash-card');
  if (!splashCard) return;
  const banner = document.createElement('div');
  banner.id = 'resume-banner';
  banner.style.cssText =
    'background: rgba(241, 196, 15, 0.1); border: 1px solid var(--accent-yellow); ' +
    'border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;';
  const elapsed = Math.round((snap.savedAt - snap.startedAt) / 60000);
  const remaining = Math.max(0, Math.round((snap.endsAt - Date.now()) / 60000));
  const answered = (snap.answers || []).filter(a => a !== null).length;
  banner.innerHTML =
    '<div style="font-weight: 700; color: var(--accent-yellow); margin-bottom: 6px; letter-spacing: 1px; font-size: 0.78rem; text-transform: uppercase;">⚠ In-Progress Attempt Found</div>' +
    '<div style="margin-bottom: 12px; color: var(--text);">You started this exam ' + elapsed + ' minute(s) ago. ' +
      answered + ' of ' + snap.questions.length + ' questions answered. ' +
      remaining + ' minute(s) remaining on the timer.</div>' +
    '<div style="display: flex; gap: 8px; flex-wrap: wrap;">' +
      '<button class="btn btn-primary" id="resume-btn">▶ Resume attempt</button>' +
      '<button class="btn btn-ghost" id="discard-btn">Discard and start fresh</button>' +
    '</div>';
  splashCard.insertBefore(banner, splashCard.firstChild.nextSibling);

  document.getElementById('resume-btn').addEventListener('click', () => {
    restoreInProgress(snap);
    startExam(true);  // skip clearing existing state since we just restored
  });
  document.getElementById('discard-btn').addEventListener('click', () => {
    clearInProgress();
    banner.remove();
  });
}

function restoreInProgress(snap) {
  // Restore everything from the snapshot. The original endsAt is preserved
  // so the timer continues counting down from where it was.
  ExamState.questions  = snap.questions;
  ExamState.answers    = snap.answers  || ExamState.questions.map(() => null);
  ExamState.flagged    = snap.flagged  || ExamState.questions.map(() => false);
  ExamState.struck     = snap.struck   || ExamState.questions.map(() => []);
  ExamState.highlights = snap.highlights || ExamState.questions.map(() => []);
  ExamState.scratchpad = snap.scratchpad || '';
  ExamState.qTimes     = snap.qTimes   || ExamState.questions.map(() => 0);
  ExamState.tabSwitches = snap.tabSwitches || 0;
  ExamState.warnedAt   = snap.warnedAt || {};
  ExamState.startedAt  = snap.startedAt;
  ExamState.endsAt     = snap.endsAt;
  ExamState.currentIdx = snap.currentIdx || 0;
}

function startExam(isResume) {
  // Hide splash, switch theme, request fullscreen, start timing.
  // When resuming, startedAt / endsAt are already set from the snapshot.
  document.getElementById('splash-overlay').classList.add('hidden');
  document.body.classList.add('theme-test-center');
  if (!isResume) {
    ExamState.startedAt = Date.now();
    ExamState.endsAt    = ExamState.startedAt + ExamState.config.timeMinutes * 60 * 1000;
  }
  ExamState.qEnteredAt = Date.now();

  // Attempt fullscreen — silent if the browser refuses or the user dismisses.
  try {
    const r = document.documentElement.requestFullscreen?.();
    if (r && r.catch) r.catch(() => {});
  } catch (e) { /* nothing */ }

  startTimer();
  renderBar();
  renderNavigator();
  renderQuestion();
  saveInProgress();
}

/* --- Render header bar --- */
function renderBar() {
  document.getElementById('exam-name').textContent = ExamState.config.fullName;
  document.getElementById('student-info').textContent =
    ExamState.student.name +
    (ExamState.student.classPeriod ? ' — ' + ExamState.student.classPeriod : '');
}

/* --- Timer --- */
function startTimer() {
  tickTimer();
  ExamState.timerHandle = setInterval(tickTimer, 1000);
}
function tickTimer() {
  const remainingMs = ExamState.endsAt - Date.now();
  const remaining = Math.max(0, Math.floor(remainingMs / 1000));
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const el = document.getElementById('exam-timer');
  if (el) {
    el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    el.classList.toggle('warn', remaining <= 300 && remaining > 60);
    el.classList.toggle('danger', remaining <= 60);
  }
  // Time-warning toasts at 30 / 15 / 5 / 1 minute remaining
  maybeShowTimeWarning(remaining);
  if (remaining === 0) {
    clearInterval(ExamState.timerHandle);
    submitExam(true);
  }
}

function maybeShowTimeWarning(remainingSec) {
  // Check each threshold; fire once per threshold per exam.
  const thresholds = [
    { key: '30', sec: 30 * 60, label: '30 minutes remaining', cls: '' },
    { key: '15', sec: 15 * 60, label: '15 minutes remaining', cls: '' },
    { key: '5',  sec:  5 * 60, label:  '5 minutes remaining', cls: 'danger' },
    { key: '1',  sec:  1 * 60, label:  '1 minute remaining',  cls: 'danger' }
  ];
  for (const t of thresholds) {
    if (!ExamState.warnedAt[t.key] && remainingSec <= t.sec && remainingSec > t.sec - 2) {
      ExamState.warnedAt[t.key] = true;
      showToast(t.label, t.cls);
      return;
    }
  }
}

function showToast(msg, extraClass) {
  const toast = document.getElementById('time-toast');
  if (!toast) return;
  toast.textContent = '⏱ ' + msg;
  toast.className = 'time-toast show ' + (extraClass || '');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.className = 'time-toast ' + (extraClass || '');
  }, 5000);
}

/* --- Helpers shared across question types ---------------------------------
   Each question has a `type` field:
       'single'    (default) — one correct option,           answer: <int>
       'multi'               — N correct options,            answer: [<int>, ...]
       'dnd-match'           — drag items into buckets,      answer: { itemId: bucketId }
       'pbq'                 — multi-step scenario,          answer: [ <step answers> ]
   The "answer" stored in ExamState.answers[idx] mirrors the correct-answer
   shape exactly; null means unanswered.
*/

function questionType(q) { return q.type || 'single'; }

function emptyAnswerFor(q) {
  switch (questionType(q)) {
    case 'multi':     return [];
    case 'dnd-match': return {};
    case 'pbq':       return q.steps.map(s => emptyAnswerFor({ type: s.kind, steps: s.steps, ...s }));
    default:          return null;
  }
}

function isAnswered(q, a) {
  if (a === null || a === undefined) return false;
  switch (questionType(q)) {
    case 'multi':     return Array.isArray(a) && a.length > 0;
    case 'dnd-match': return a && Object.keys(a).length > 0;
    case 'pbq':       return Array.isArray(a) && a.some((sa, i) => isAnswered({ type: q.steps[i].kind, ...q.steps[i] }, sa));
    default:          return a !== null;
  }
}

function gradeQuestion(q, a) {
  // returns { earned: number 0..1, max: number 1, isFullyCorrect: bool }
  switch (questionType(q)) {
    case 'multi': {
      if (!Array.isArray(a)) return { earned: 0, max: 1, isFullyCorrect: false };
      const want = (q.answer || []).slice().sort().join(',');
      const got  = a.slice().sort().join(',');
      return { earned: want === got ? 1 : 0, max: 1, isFullyCorrect: want === got };
    }
    case 'dnd-match': {
      const want = q.correct || {};
      const keys = Object.keys(want);
      let right = 0;
      keys.forEach(k => { if (a && a[k] === want[k]) right++; });
      // PBQs (and D&D items) traditionally award partial credit on the real exam.
      // We keep that here so a near-perfect placement isn't punished as totally wrong.
      const earned = keys.length === 0 ? 0 : right / keys.length;
      return { earned, max: 1, isFullyCorrect: earned === 1 };
    }
    case 'pbq': {
      if (!Array.isArray(a)) return { earned: 0, max: 1, isFullyCorrect: false };
      let total = 0;
      q.steps.forEach((s, i) => {
        const stepQ = { ...s, type: s.kind };
        const sub = gradeQuestion(stepQ, a[i]);
        total += sub.earned;
      });
      const earned = q.steps.length ? total / q.steps.length : 0;
      return { earned, max: 1, isFullyCorrect: earned === 1 };
    }
    default: {
      const correct = a === q.answer;
      return { earned: correct ? 1 : 0, max: 1, isFullyCorrect: correct };
    }
  }
}

/* --- Render current question --- */
function renderQuestion() {
  const idx = ExamState.currentIdx;
  const q = ExamState.questions[idx];
  const total = ExamState.questions.length;

  document.getElementById('q-num').textContent = 'Question ' + (idx + 1) + ' of ' + total;
  // Real CompTIA exams do NOT label questions with their domain during the
  // attempt — the student only sees the domain breakdown on the results
  // page. Hide the tag here for exam-realism. (Domains are still tracked
  // internally for scoring and the post-exam breakdown.)
  document.getElementById('q-domain').style.display = 'none';

  // Render the question stem with any user-saved highlights re-applied.
  const stemEl = document.getElementById('q-text');
  stemEl.innerHTML = applyHighlightsToText(q.q, ExamState.highlights[idx] || []);
  // Wire click-to-clear on existing highlights and listen for new selections.
  stemEl.querySelectorAll('mark.user-hl').forEach(m => {
    m.addEventListener('click', e => {
      e.stopPropagation();
      removeHighlightById(parseInt(m.dataset.hid, 10));
    });
  });

  // Exhibit — optional image/diagram attached to the question.
  // `q.image` can be either an inline SVG string or an image URL.
  const exhibit = document.getElementById('exhibit-container');
  if (exhibit) {
    if (q.image) {
      exhibit.style.display = '';
      exhibit.innerHTML = '<div class="exhibit-label">Exhibit</div>' +
        (q.image.trim().startsWith('<svg') ? q.image
         : '<img src="' + escapeHtml(q.image) + '" alt="Exhibit">');
    } else {
      exhibit.style.display = 'none';
      exhibit.innerHTML = '';
    }
  }

  const flagBtn = document.getElementById('flag-btn');
  flagBtn.textContent = ExamState.flagged[idx] ? '⚑ Flagged' : '⚑ Flag for review';
  flagBtn.classList.toggle('flagged', ExamState.flagged[idx]);

  // Real CompTIA exams don't label question type either — students recognize
  // multi-response from "(Select TWO)" wording, D&D from the drag UI, and
  // PBQs from the multi-step layout. Hide the type tag so the format reads
  // closer to the live exam.
  const typeTag = document.getElementById('q-type-tag');
  if (typeTag) typeTag.style.display = 'none';

  const opts = document.getElementById('option-list');
  opts.innerHTML = '';

  switch (questionType(q)) {
    case 'multi':     renderMulti(q, opts, ExamState.answers[idx]); break;
    case 'dnd-match': renderDndMatch(q, opts, ExamState.answers[idx]); break;
    case 'pbq':       renderPbq(q, opts, ExamState.answers[idx]); break;
    default:          renderSingle(q, opts, ExamState.answers[idx]); break;
  }

  document.getElementById('prev-btn').disabled = (idx === 0);
  document.getElementById('next-btn').textContent = (idx === total - 1) ? 'Review answers →' : 'Next →';
}

function typeLabel(q) {
  switch (questionType(q)) {
    case 'multi':     return 'Multi-Response';
    case 'dnd-match': return 'Drag & Drop';
    case 'pbq':       return 'Performance-Based';
    default:          return '';
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* --- Default setter: writes the answer to ExamState and re-renders --- */
function defaultSetAnswer(val) {
  ExamState.answers[ExamState.currentIdx] = val;
  renderQuestion();
  renderNavigator();
  saveInProgress();
}

/* --- Renderer: single-answer multiple-choice (default) ---
   Strikethrough (right-click) is only wired at the top level — sub-steps of
   a PBQ pass a custom setAnswer; we skip strike there to keep state simple.*/
function renderSingle(q, container, answer, setAnswer) {
  const setter = setAnswer || defaultSetAnswer;
  const isTopLevel = !setAnswer;
  const struckSet = isTopLevel ? strikeSet() : new Set();
  q.opts.forEach((text, i) => {
    const btn = document.createElement('button');
    const isStruck = struckSet.has(i);
    btn.className = 'option-btn'
      + (answer === i ? ' selected' : '')
      + (isStruck ? ' struck' : '');
    btn.innerHTML = '<span class="opt-letter">' + String.fromCharCode(65 + i) + '.</span> <span>' + escapeHtml(text) + '</span>'
      + (isTopLevel ? '<span class="opt-strike-btn" title="' + (isStruck ? 'Un-strike (right-click also works)' : 'Cross out this option (right-click also works)') + '"></span>' : '');
    btn.onclick = (ev) => {
      // Click on the visible strike button toggles strike, NOT select
      if (ev.target.classList.contains('opt-strike-btn')) {
        ev.preventDefault(); ev.stopPropagation();
        if (isTopLevel) toggleStrike(i);
        return;
      }
      setter(i);
      maybeReadingTimeWarn(i, setter);
    };
    if (isTopLevel) {
      btn.addEventListener('contextmenu', (ev) => { ev.preventDefault(); toggleStrike(i); });
    }
    container.appendChild(btn);
  });
}

/* --- Strikethrough state helpers ---
   ExamState.struck[currentIdx] holds an array of struck option indices for
   the current question. For PBQ sub-steps the strikethrough is only meant
   for the top-level single-choice render, so PBQ steps don't use it.       */
function strikeSet() {
  const arr = ExamState.struck[ExamState.currentIdx];
  return new Set(Array.isArray(arr) ? arr : []);
}
function toggleStrike(i) {
  const cur = ExamState.struck[ExamState.currentIdx] || [];
  const at = cur.indexOf(i);
  if (at >= 0) cur.splice(at, 1);
  else cur.push(i);
  ExamState.struck[ExamState.currentIdx] = cur;
  renderQuestion();
  saveInProgress();
}

/* --- Renderer: multi-response (Select TWO, etc.) --- */
function renderMulti(q, container, answer, setAnswer) {
  const setter = setAnswer || defaultSetAnswer;
  const sel = Array.isArray(answer) ? answer.slice() : [];
  const need = q.selectCount || (Array.isArray(q.answer) ? q.answer.length : 2);
  const hint = document.createElement('div');
  hint.className = 'multi-hint';
  hint.textContent = 'Select ' + spelledNumber(need) + (sel.length ? ' — ' + sel.length + ' of ' + need + ' chosen' : '');
  container.appendChild(hint);

  const isTopLevel = !setAnswer;
  const struckSet = isTopLevel ? strikeSet() : new Set();
  q.opts.forEach((text, i) => {
    const isOn = sel.includes(i);
    const atCap = sel.length >= need && !isOn;
    const isStruck = struckSet.has(i);
    const btn = document.createElement('button');
    btn.className = 'option-btn multi'
      + (isOn ? ' selected' : '')
      + (atCap ? ' at-cap' : '')
      + (isStruck ? ' struck' : '');
    btn.innerHTML =
      '<span class="opt-check">' + (isOn ? '☑' : '☐') + '</span>' +
      '<span class="opt-letter">' + String.fromCharCode(65 + i) + '.</span> ' +
      '<span>' + escapeHtml(text) + '</span>'
      + (isTopLevel ? '<span class="opt-strike-btn" title="' + (isStruck ? 'Un-strike' : 'Cross out this option') + '"></span>' : '');
    btn.onclick = (ev) => {
      if (ev.target.classList.contains('opt-strike-btn')) {
        ev.preventDefault(); ev.stopPropagation();
        if (isTopLevel) toggleStrike(i);
        return;
      }
      const cur = sel.slice();
      const at = cur.indexOf(i);
      if (at >= 0) cur.splice(at, 1);
      else if (cur.length < need) cur.push(i);
      setter(cur.sort((x,y)=>x-y));
    };
    if (isTopLevel) {
      btn.addEventListener('contextmenu', (ev) => { ev.preventDefault(); toggleStrike(i); });
    }
    container.appendChild(btn);
  });
}

function spelledNumber(n) {
  return ({1:'ONE',2:'TWO',3:'THREE',4:'FOUR',5:'FIVE'})[n] || String(n);
}

/* --- Renderer: drag-and-drop matching --- */
function renderDndMatch(q, container, answer, setAnswer) {
  const setter = setAnswer || defaultSetAnswer;
  const placed = answer && typeof answer === 'object' ? { ...answer } : {};

  container.classList.add('dnd-container');
  const board = document.createElement('div');
  board.className = 'dnd-board';

  // pool of unplaced items
  const placedIds = new Set(Object.keys(placed));
  const poolItems = q.items.filter(it => !placedIds.has(it.id));

  const pool = document.createElement('div');
  pool.className = 'dnd-pool';
  pool.innerHTML = '<div class="dnd-pool-label">Drag from here</div>';
  poolItems.forEach(it => pool.appendChild(makeDndChip(it.id, it.label)));
  board.appendChild(pool);

  // buckets
  const bucketGrid = document.createElement('div');
  bucketGrid.className = 'dnd-bucket-grid';
  q.buckets.forEach(b => {
    const bucket = document.createElement('div');
    bucket.className = 'dnd-bucket';
    bucket.dataset.bucketId = b.id;
    bucket.innerHTML = '<div class="dnd-bucket-label">' + escapeHtml(b.label) + '</div>';
    const dropped = Object.keys(placed).filter(itemId => placed[itemId] === b.id);
    dropped.forEach(itemId => {
      const itemDef = q.items.find(it => it.id === itemId);
      if (itemDef) bucket.appendChild(makeDndChip(itemDef.id, itemDef.label));
    });
    bucketGrid.appendChild(bucket);
  });
  board.appendChild(bucketGrid);
  container.appendChild(board);

  wireDnd(q, container, placed, setter);
}

function makeDndChip(id, label) {
  const chip = document.createElement('div');
  chip.className = 'dnd-chip';
  chip.draggable = true;
  chip.dataset.itemId = id;
  chip.textContent = label;
  return chip;
}

function wireDnd(q, container, currentPlaced, setter) {
  let dragged = null;
  container.querySelectorAll('.dnd-chip').forEach(chip => {
    chip.addEventListener('dragstart', e => {
      dragged = chip;
      chip.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    chip.addEventListener('dragend', () => {
      if (dragged) dragged.classList.remove('dragging');
      dragged = null;
    });
  });
  const targets = container.querySelectorAll('.dnd-bucket, .dnd-pool');
  targets.forEach(target => {
    target.addEventListener('dragover', e => { e.preventDefault(); target.classList.add('over'); });
    target.addEventListener('dragleave', () => target.classList.remove('over'));
    target.addEventListener('drop', e => {
      e.preventDefault();
      target.classList.remove('over');
      if (!dragged) return;
      const itemId = dragged.dataset.itemId;
      const ans = { ...currentPlaced };
      if (target.classList.contains('dnd-bucket')) ans[itemId] = target.dataset.bucketId;
      else delete ans[itemId];
      setter(ans);
    });
  });

  // accessibility fallback: clicking a pool chip places it in the first empty bucket
  container.querySelectorAll('.dnd-pool .dnd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const ans = { ...currentPlaced };
      const usedBuckets = new Set(Object.values(ans));
      const target = q.buckets.find(b => !usedBuckets.has(b.id)) || q.buckets[0];
      ans[chip.dataset.itemId] = target.id;
      setter(ans);
    });
  });
  // clicking a chip already in a bucket sends it back to the pool
  container.querySelectorAll('.dnd-bucket .dnd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const ans = { ...currentPlaced };
      delete ans[chip.dataset.itemId];
      setter(ans);
    });
  });
}

/* --- Renderer: PBQ (multi-step) ---
   Each PBQ step delegates to the corresponding type renderer with a custom
   setter that updates the right slot of the composite answer array.
*/
function renderPbq(q, container, answer) {
  container.classList.add('pbq-container');
  const ans = Array.isArray(answer)
    ? answer.slice()
    : q.steps.map(s => {
        if (s.kind === 'multi')     return [];
        if (s.kind === 'dnd-match') return {};
        return null;
      });

  q.steps.forEach((step, stepIdx) => {
    const stepWrap = document.createElement('div');
    stepWrap.className = 'pbq-step';
    stepWrap.innerHTML =
      '<div class="pbq-step-head"><span class="pbq-step-num">Step ' + (stepIdx + 1) + '</span>' +
      '<span class="pbq-step-tag">' + (step.kind === 'dnd-match' ? 'Drag & Drop' : step.kind === 'multi' ? 'Multi-Response' : 'Multiple Choice') + '</span></div>' +
      '<div class="pbq-step-text">' + escapeHtml(step.text || '') + '</div>';
    const inner = document.createElement('div');
    inner.className = 'pbq-step-body';
    stepWrap.appendChild(inner);
    container.appendChild(stepWrap);

    const stepQ = { ...step, type: step.kind };
    const setStep = (newVal) => {
      ans[stepIdx] = newVal;
      ExamState.answers[ExamState.currentIdx] = ans.slice();
      renderQuestion();
      renderNavigator();
    };
    switch (step.kind) {
      case 'multi':     renderMulti(stepQ, inner, ans[stepIdx], setStep); break;
      case 'dnd-match': renderDndMatch(stepQ, inner, ans[stepIdx], setStep); break;
      default:          renderSingle(stepQ, inner, ans[stepIdx], setStep); break;
    }
  });
}

/* --- Navigation --- */
function gotoQuestion(idx) {
  if (idx < 0 || idx >= ExamState.questions.length) return;
  // Charge the time spent on the question we're leaving to that question's
  // per-question total, then reset the entry timestamp.
  if (ExamState.qEnteredAt) {
    const spent = Date.now() - ExamState.qEnteredAt;
    if (spent > 0) ExamState.qTimes[ExamState.currentIdx] += spent;
  }
  ExamState.currentIdx = idx;
  ExamState.qEnteredAt = Date.now();
  renderQuestion();
  renderNavigator();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveInProgress();
}
window.gotoQuestion = gotoQuestion;

function nextQuestion() {
  if (ExamState.currentIdx === ExamState.questions.length - 1) {
    enterReviewScreen();
  } else {
    gotoQuestion(ExamState.currentIdx + 1);
  }
}
function prevQuestion() {
  gotoQuestion(ExamState.currentIdx - 1);
}
function toggleFlag() {
  ExamState.flagged[ExamState.currentIdx] = !ExamState.flagged[ExamState.currentIdx];
  renderQuestion();
  renderNavigator();
  saveInProgress();
}
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.toggleFlag = toggleFlag;

/* --- Navigator panel --- */
function renderNavigator() {
  const grid = document.getElementById('q-grid');
  grid.innerHTML = '';
  ExamState.questions.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.textContent = i + 1;
    const answered = isAnswered(q, ExamState.answers[i]);
    const flagged = ExamState.flagged[i];
    if (answered) btn.classList.add('answered');
    if (flagged) btn.classList.add('flagged');
    if (i === ExamState.currentIdx) btn.classList.add('current');
    btn.onclick = () => gotoQuestion(i);
    grid.appendChild(btn);
  });
  let answeredCount = 0;
  ExamState.questions.forEach((q, i) => { if (isAnswered(q, ExamState.answers[i])) answeredCount++; });
  const flaggedCount  = ExamState.flagged.filter(Boolean).length;
  document.getElementById('nav-summary').textContent =
    answeredCount + ' answered · ' + flaggedCount + ' flagged · ' +
    (ExamState.questions.length - answeredCount) + ' unanswered';
}

/* --- Review screen --- */
function enterReviewScreen() {
  ExamState.reviewing = true;
  document.getElementById('exam-runner').style.display = 'none';
  document.getElementById('review-screen').style.display = 'block';

  let answered = 0;
  ExamState.questions.forEach((q, i) => { if (isAnswered(q, ExamState.answers[i])) answered++; });
  const flagged  = ExamState.flagged.filter(Boolean).length;
  const blank    = ExamState.questions.length - answered;

  document.getElementById('rev-answered').textContent = answered;
  document.getElementById('rev-flagged').textContent  = flagged;
  document.getElementById('rev-blank').textContent    = blank;

  const blankTile = document.getElementById('rev-blank-tile');
  blankTile.classList.toggle('bad',  blank > 0);
  blankTile.classList.toggle('warn', blank === 0);

  const flagTile = document.getElementById('rev-flag-tile');
  flagTile.classList.toggle('warn', flagged > 0);

  window.scrollTo({ top: 0 });
}
function returnToExam() {
  ExamState.reviewing = false;
  document.getElementById('exam-runner').style.display = '';
  document.getElementById('review-screen').style.display = 'none';
  renderQuestion();
  renderNavigator();
}
function reviewGoto(filter) {
  let target = 0;
  if (filter === 'first-blank') {
    target = ExamState.questions.findIndex((q, i) => !isAnswered(q, ExamState.answers[i]));
  } else if (filter === 'first-flagged') {
    target = ExamState.flagged.findIndex(Boolean);
  }
  if (target < 0) target = 0;
  ExamState.currentIdx = target;
  returnToExam();
}
window.returnToExam = returnToExam;
window.reviewGoto   = reviewGoto;

/* =========================================================================
   Text highlighting on the question stem (click-drag to select, then click
   the floating "Highlight" button). Highlights are stored as character
   ranges relative to the original question text so they survive a re-render.
   ========================================================================= */

let _hidCounter = 0;
function applyHighlightsToText(text, marks) {
  if (!marks || !marks.length) return escapeHtml(text);
  // sort by start position, drop overlaps (last wins by simple merge)
  const sorted = marks.slice().sort((a,b)=>a.start - b.start);
  // merge overlapping ranges
  const merged = [];
  sorted.forEach(r => {
    if (merged.length && r.start <= merged[merged.length-1].end) {
      merged[merged.length-1].end = Math.max(merged[merged.length-1].end, r.end);
    } else merged.push({...r});
  });
  let out = '', cursor = 0;
  merged.forEach((r, i) => {
    out += escapeHtml(text.slice(cursor, r.start));
    out += '<mark class="user-hl" data-hid="' + (r.id ?? i) + '">' + escapeHtml(text.slice(r.start, r.end)) + '</mark>';
    cursor = r.end;
  });
  out += escapeHtml(text.slice(cursor));
  return out;
}

function removeHighlightById(hid) {
  const idx = ExamState.currentIdx;
  ExamState.highlights[idx] = (ExamState.highlights[idx] || []).filter(h => h.id !== hid);
  renderQuestion();
  saveInProgress();
}

let _selectionRange = null;
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) { hideHighlightPopover(); return; }
  const range = sel.getRangeAt(0);
  const stemEl = document.getElementById('q-text');
  if (!stemEl || !stemEl.contains(range.startContainer) || !stemEl.contains(range.endContainer)) {
    hideHighlightPopover();
    return;
  }
  // Compute char offsets within the original (un-marked) question text by
  // walking text nodes inside the stem.
  const fullText = ExamState.questions[ExamState.currentIdx]?.q || '';
  const offsets = textRangeToOffsets(stemEl, range, fullText);
  if (!offsets) { hideHighlightPopover(); return; }
  _selectionRange = offsets;
  showHighlightPopover(range);
});

function textRangeToOffsets(rootEl, range, fullText) {
  // Walk text nodes in rootEl, tracking how much un-highlighted text we have
  // consumed. Mark elements just contain their own text which IS part of
  // the original question, so we treat all text nodes uniformly.
  function getCharIndex(targetNode, offset) {
    let chars = 0;
    function walk(node) {
      if (node === targetNode) {
        if (node.nodeType === Node.TEXT_NODE) chars += offset;
        return true;   // found
      }
      if (node.nodeType === Node.TEXT_NODE) {
        chars += node.textContent.length;
        return false;
      }
      for (const c of node.childNodes) if (walk(c)) return true;
      return false;
    }
    return walk(rootEl) ? chars : null;
  }
  const startOff = getCharIndex(range.startContainer, range.startOffset);
  const endOff   = getCharIndex(range.endContainer, range.endOffset);
  if (startOff === null || endOff === null) return null;
  const s = Math.min(startOff, endOff), e = Math.max(startOff, endOff);
  if (e - s < 1 || e > fullText.length) return null;
  return { start: s, end: e };
}

function showHighlightPopover(range) {
  const pop = document.getElementById('highlight-popover');
  if (!pop) return;
  const rect = range.getBoundingClientRect();
  pop.style.display = 'block';
  pop.style.position = 'fixed';
  pop.style.top = Math.max(8, rect.top - 36) + 'px';
  pop.style.left = (rect.left + rect.width / 2 - 50) + 'px';
}
function hideHighlightPopover() {
  const pop = document.getElementById('highlight-popover');
  if (pop) pop.style.display = 'none';
  _selectionRange = null;
}
function applyHighlight() {
  if (!_selectionRange) { hideHighlightPopover(); return; }
  const idx = ExamState.currentIdx;
  if (!ExamState.highlights[idx]) ExamState.highlights[idx] = [];
  ExamState.highlights[idx].push({ id: ++_hidCounter, start: _selectionRange.start, end: _selectionRange.end });
  hideHighlightPopover();
  window.getSelection()?.removeAllRanges();
  renderQuestion();
  saveInProgress();
}
window.applyHighlight = applyHighlight;

/* =========================================================================
   Scratchpad — exam-wide notes pad
   ========================================================================= */

let _scratchpadOpen = false;
let _scratchpadSaveTimer = null;

function toggleScratchpad() {
  const panel = document.getElementById('scratchpad-panel');
  if (!panel) return;
  _scratchpadOpen = !_scratchpadOpen;
  panel.style.display = _scratchpadOpen ? 'flex' : 'none';
  if (_scratchpadOpen) {
    const ta = document.getElementById('scratchpad-text');
    ta.value = ExamState.scratchpad || '';
    ta.focus();
    if (!ta._wired) {
      ta._wired = true;
      ta.addEventListener('input', () => {
        ExamState.scratchpad = ta.value;
        const status = document.getElementById('scratchpad-status');
        if (status) status.textContent = 'Saving…';
        clearTimeout(_scratchpadSaveTimer);
        _scratchpadSaveTimer = setTimeout(() => {
          saveInProgress();
          if (status) status.textContent = 'Saved · ' + ta.value.length + ' chars';
        }, 250);
      });
    }
    const status = document.getElementById('scratchpad-status');
    if (status) status.textContent = (ta.value.length ? ('Saved · ' + ta.value.length + ' chars') : 'Start typing — notes save automatically.');
  }
}
window.toggleScratchpad = toggleScratchpad;

function clearScratchpad() {
  if (!confirm('Erase all scratchpad notes?')) return;
  ExamState.scratchpad = '';
  const ta = document.getElementById('scratchpad-text');
  if (ta) ta.value = '';
  saveInProgress();
}
window.clearScratchpad = clearScratchpad;

/* =========================================================================
   Reading-time warning — fires if the student picks an answer in under 8s
   on a question they haven't flagged. Helps catch careless mis-reads.
   ========================================================================= */

const READING_MIN_MS = 8000;
const _readingWarned = new Set();   // questions we've already warned on, per session

function maybeReadingTimeWarn(picked, setter) {
  const idx = ExamState.currentIdx;
  if (_readingWarned.has(idx)) return;
  if (ExamState.flagged[idx]) return;
  const elapsed = Date.now() - ExamState.qEnteredAt;
  if (elapsed >= READING_MIN_MS) return;
  _readingWarned.add(idx);
  showReadingWarn(picked, setter);
}

function showReadingWarn(picked, setter) {
  const modal = document.getElementById('reading-warn-modal');
  if (!modal) return;
  modal.classList.add('show');
  const close = () => modal.classList.remove('show');
  const wire = (id, action) => {
    const old = document.getElementById(id);
    const fresh = old.cloneNode(true);
    old.parentNode.replaceChild(fresh, old);
    fresh.addEventListener('click', () => { close(); action(); });
  };
  wire('reading-warn-confirm', () => { /* keep answer */ });
  wire('reading-warn-flag', () => {
    ExamState.flagged[ExamState.currentIdx] = true;
    renderQuestion(); renderNavigator(); saveInProgress();
  });
  wire('reading-warn-reread', () => {
    // Roll back: clear the just-picked answer so the student has to re-confirm.
    ExamState.answers[ExamState.currentIdx] = null;
    renderQuestion(); renderNavigator(); saveInProgress();
  });
}

/* =========================================================================
   Keyboard shortcuts during the exam
   ========================================================================= */

document.addEventListener('keydown', (e) => {
  // Don't trigger while typing into the scratchpad or any other input
  const target = e.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
  if (!ExamState.startedAt || ExamState.submitted) return;

  // Esc closes any open modal/panel
  if (e.key === 'Escape') {
    if (_scratchpadOpen) { toggleScratchpad(); return; }
    const sm = document.getElementById('submit-modal'); if (sm && sm.classList.contains('show')) { sm.classList.remove('show'); return; }
    const rw = document.getElementById('reading-warn-modal'); if (rw && rw.classList.contains('show')) { rw.classList.remove('show'); return; }
    return;
  }

  // Numeric keys 1-5 select option A-E for the current question (top-level only;
  // doesn't work inside PBQ steps since they have their own setters).
  const q = ExamState.questions[ExamState.currentIdx];
  if (q && /^[1-5]$/.test(e.key)) {
    const i = parseInt(e.key, 10) - 1;
    if (q.opts && i < q.opts.length) {
      if (q.type === 'multi') {
        const cur = Array.isArray(ExamState.answers[ExamState.currentIdx]) ? ExamState.answers[ExamState.currentIdx].slice() : [];
        const need = q.selectCount || (Array.isArray(q.answer) ? q.answer.length : 2);
        const at = cur.indexOf(i);
        if (at >= 0) cur.splice(at, 1);
        else if (cur.length < need) cur.push(i);
        defaultSetAnswer(cur.sort((x,y)=>x-y));
      } else if (!q.type || q.type === 'single') {
        defaultSetAnswer(i);
        maybeReadingTimeWarn(i, defaultSetAnswer);
      }
      e.preventDefault();
      return;
    }
  }

  const key = e.key.toLowerCase();
  if (key === 'f') { toggleFlag(); e.preventDefault(); }
  else if (key === 's') {
    // Cycle: open strike on the currently selected option (if any), else option 1
    const cur = ExamState.answers[ExamState.currentIdx];
    const i = (typeof cur === 'number') ? cur : 0;
    toggleStrike(i);
    e.preventDefault();
  }
  else if (key === 'n') { nextQuestion(); e.preventDefault(); }
  else if (key === 'p') { prevQuestion(); e.preventDefault(); }
  else if (key === 'r') {
    if (!ExamState.reviewing) enterReviewScreen();
    e.preventDefault();
  }
});

/* --- Submission ---
   Two-step modal flow. Step 1 shows the current attempt summary (answered /
   flagged / unanswered) and asks for confirmation. Step 2 is a final "Are
   you sure?" that requires another click to actually submit. Mirrors how
   real Pearson VUE never single-clicks to end a session.                   */
function confirmSubmit() {
  let answered = 0, flagged = 0;
  ExamState.questions.forEach((q, i) => {
    if (isAnswered(q, ExamState.answers[i])) answered++;
    if (ExamState.flagged[i]) flagged++;
  });
  const blank = ExamState.questions.length - answered;
  showSubmitModalStep1(answered, flagged, blank);
}
window.confirmSubmit = confirmSubmit;

function showSubmitModalStep1(answered, flagged, blank) {
  const modal = document.getElementById('submit-modal');
  document.getElementById('submit-modal-title').textContent = 'Submit Exam?';
  const blankCls = blank > 0 ? 'bad' : '';
  const flagCls  = flagged > 0 ? 'warn' : '';
  document.getElementById('submit-modal-body').innerHTML =
    '<div class="modal-summary">' +
      '<div class="lbl">Answered</div><div class="val">' + answered + ' / ' + ExamState.questions.length + '</div>' +
      '<div class="lbl">Flagged for review</div><div class="val ' + flagCls + '">' + flagged + '</div>' +
      '<div class="lbl">Unanswered (count as wrong)</div><div class="val ' + blankCls + '">' + blank + '</div>' +
    '</div>' +
    '<p>Once you submit, you cannot change answers. Click <strong>Continue</strong> to proceed to the final confirmation.</p>';
  const cont = document.getElementById('submit-continue');
  cont.textContent = 'Continue →';
  // Re-bind continue to step 2 (clone to remove any previous listeners)
  const fresh = cont.cloneNode(true);
  cont.parentNode.replaceChild(fresh, cont);
  fresh.addEventListener('click', showSubmitModalStep2);
  modal.classList.add('show');
}

function showSubmitModalStep2() {
  document.getElementById('submit-modal-title').textContent = 'Final confirmation';
  document.getElementById('submit-modal-body').innerHTML =
    '<p style="margin-bottom:12px"><strong style="color:var(--warning)">This is your last chance to go back.</strong></p>' +
    '<p>Are you absolutely sure you want to submit this exam now?</p>';
  const cont = document.getElementById('submit-continue');
  cont.textContent = 'Yes, submit my exam';
  const fresh = cont.cloneNode(true);
  cont.parentNode.replaceChild(fresh, cont);
  fresh.addEventListener('click', () => {
    closeSubmitModal();
    submitExam(false);
  });
}

function closeSubmitModal() {
  const modal = document.getElementById('submit-modal');
  modal.classList.remove('show');
}

function submitExam(autoFromTimer) {
  if (ExamState.submitted) return;
  ExamState.submitted = true;
  clearInterval(ExamState.timerHandle);

  // Charge final time spent on the question the student was on when submit fired.
  if (ExamState.qEnteredAt) {
    ExamState.qTimes[ExamState.currentIdx] += Date.now() - ExamState.qEnteredAt;
  }

  // Exit fullscreen — no-op if we never entered.
  try {
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  } catch (e) { /* nothing */ }

  // tally. correct accumulates earned credit per question (0..1 each).
  // Final raw score = round(totalEarned). Domain stats also use fractional.
  let earnedTotal = 0;
  const perDomain = {};
  const wrongList = [];
  ExamState.questions.forEach((q, i) => {
    const dom = q.domain || 'UNTAGGED';
    perDomain[dom] = perDomain[dom] || { correct: 0, total: 0 };
    perDomain[dom].total++;
    const userAns = ExamState.answers[i];
    const grade = gradeQuestion(q, userAns);
    earnedTotal += grade.earned;
    perDomain[dom].correct += grade.earned;
    if (!grade.isFullyCorrect) {
      wrongList.push({
        type: questionType(q),
        q: q.q,
        opts: q.opts,
        items: q.items,
        buckets: q.buckets,
        steps: q.steps,
        userAnswer: userAns,
        answer: q.type === 'pbq' ? q.steps.map(s => s.kind === 'dnd-match' ? s.correct : s.answer) : q.answer,
        correct: q.correct,
        exp: q.exp || '',
        domain: dom,
        partialEarned: grade.earned
      });
    }
  });
  const correct = Math.round(earnedTotal);
  // round domain counts at the end so totals stay coherent
  Object.values(perDomain).forEach(d => { d.correct = Math.round(d.correct); });

  const totalQ  = ExamState.questions.length;
  const scaled  = window.calculateScaledScore(correct, totalQ, ExamState.config);
  const passed  = scaled >= ExamState.config.passScaled;
  const elapsedSec = Math.round((Date.now() - ExamState.startedAt) / 1000);

  // Per-question time stats — average, slowest, time on flagged items.
  const perQuestionSec = ExamState.qTimes.map(ms => Math.round(ms / 1000));
  const avgQuestionSec = totalQ
    ? Math.round(perQuestionSec.reduce((a, b) => a + b, 0) / totalQ)
    : 0;
  const flaggedTimes = perQuestionSec.filter((_, i) => ExamState.flagged[i]);
  const avgFlaggedSec = flaggedTimes.length
    ? Math.round(flaggedTimes.reduce((a, b) => a + b, 0) / flaggedTimes.length)
    : 0;
  const slowestIdx = perQuestionSec.indexOf(Math.max(...perQuestionSec));
  const slowestSec = perQuestionSec[slowestIdx] || 0;

  const attempt = {
    examId: ExamState.config.id,
    examCode: ExamState.config.code,
    examName: ExamState.config.fullName,
    studentName: ExamState.student.name,
    classPeriod: ExamState.student.classPeriod || '',
    rawCorrect: correct,
    rawTotal: totalQ,
    rawPct: Math.round((correct / totalQ) * 1000) / 10,
    scaledScore: scaled,
    passThreshold: ExamState.config.passScaled,
    passed: passed,
    elapsedSec: elapsedSec,
    autoSubmitted: !!autoFromTimer,
    tabSwitches: ExamState.tabSwitches,
    avgQuestionSec: avgQuestionSec,
    avgFlaggedSec: avgFlaggedSec,
    slowestSec: slowestSec,
    slowestQNum: slowestIdx + 1,
    perDomain: perDomain,
    wrongList: wrongList,
    completedAt: new Date().toISOString()
  };

  // stash result for results.html
  sessionStorage.setItem('latest_attempt', JSON.stringify(attempt));
  // attempt is done — wipe the in-progress save so a refresh on results
  // doesn't re-offer a resume.
  clearInProgress();
  window.AttemptsStore.add({
    examId: attempt.examId,
    examName: attempt.examName,
    scaledScore: attempt.scaledScore,
    passThreshold: attempt.passThreshold,
    passed: attempt.passed,
    rawCorrect: attempt.rawCorrect,
    rawTotal: attempt.rawTotal,
    completedAt: attempt.completedAt
  });

  window.location.href = 'results.html';
}
