/* =========================================================================
   Results page — render score, domain breakdown, wrong-answer review,
   and submit to teacher's Google Sheet (Apps Script Web App).
   ------------------------------------------------------------------------- */

window.addEventListener('DOMContentLoaded', () => {
  const raw = sessionStorage.getItem('latest_attempt');
  if (!raw) {
    document.body.innerHTML = '<div style="padding:40px;text-align:center"><h2>No completed attempt found.</h2><p><a href="index.html">Back to start</a></p></div>';
    return;
  }
  const attempt = JSON.parse(raw);
  const examConfig = window.EXAMS[attempt.examId];

  renderHero(attempt);
  renderDomainBreakdown(attempt, examConfig);
  renderWrongList(attempt);
  submitToTeacher(attempt);
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHero(a) {
  document.getElementById('verdict-badge').textContent = a.passed ? 'Passed' : 'Did Not Pass';
  document.getElementById('verdict-badge').classList.add(a.passed ? 'pass' : 'fail');
  const scaledEl = document.getElementById('scaled-score');
  scaledEl.textContent = a.scaledScore;
  scaledEl.classList.add(a.passed ? 'pass' : 'fail');
  document.getElementById('exam-name').textContent = a.examName;
  document.getElementById('raw-score').textContent =
    'Raw: ' + a.rawCorrect + ' / ' + a.rawTotal + '  (' + a.rawPct + '%)';
  document.getElementById('pass-threshold').textContent =
    'Pass threshold: ' + a.passThreshold + ' (CompTIA scaled)';
  const mins = Math.floor(a.elapsedSec / 60);
  const secs = a.elapsedSec % 60;
  const elapsedTxt = 'Time used: ' + mins + 'm ' + secs + 's' +
    (a.autoSubmitted ? ' (auto-submitted at timeout)' : '');
  const paceTxt = a.avgQuestionSec
    ? ' · avg ' + a.avgQuestionSec + 's per question' +
      (a.avgFlaggedSec ? ' · avg ' + a.avgFlaggedSec + 's on flagged items' : '') +
      (a.slowestSec ? ' · longest q' + a.slowestQNum + ': ' + a.slowestSec + 's' : '')
    : '';
  document.getElementById('elapsed').textContent = elapsedTxt + paceTxt;
  document.getElementById('student-line').textContent =
    a.studentName + (a.classPeriod ? ' — ' + a.classPeriod : '');

  // Tab-switch warning, if any happened
  const ts = a.tabSwitches || 0;
  if (ts > 0) {
    const status = document.getElementById('submit-status');
    if (status) {
      const note = document.createElement('div');
      note.className = 'submit-status';
      note.style.background = 'rgba(239, 68, 68, 0.12)';
      note.style.color = 'var(--warning)';
      note.style.marginTop = '8px';
      note.textContent = '⚠ Tab left ' + ts + (ts === 1 ? ' time' : ' times') + ' during the exam.';
      status.parentNode.appendChild(note);
    }
  }
}

function renderDomainBreakdown(a, examConfig) {
  const container = document.getElementById('domain-breakdown');
  container.innerHTML = '<h2>Domain Breakdown</h2>';
  const domains = (examConfig && examConfig.domains) ? examConfig.domains : [];

  domains.forEach(d => {
    const stats = a.perDomain[d.id] || { correct: 0, total: 0 };
    const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
    const cls = pct >= 80 ? 'good' : pct >= 60 ? 'mid' : 'bad';
    const row = document.createElement('div');
    row.className = 'domain-row';
    row.innerHTML =
      '<div class="domain-label"><strong>' + d.id + '</strong> · ' + escapeHtml(d.name) + '</div>' +
      '<div class="domain-pct ' + cls + '">' + pct + '%</div>' +
      '<div class="domain-bar"><div style="width:' + pct + '%"></div></div>' +
      '<div style="grid-column:1/-1;font-size:0.78rem;color:var(--text-muted)">' +
      stats.correct + ' / ' + stats.total + ' correct</div>';
    container.appendChild(row);
  });
}

function letterFor(n) {
  return (n === null || n === undefined) ? 'No answer' : String.fromCharCode(65 + n);
}

function formatSingleAnswer(w) {
  const userTxt = (w.userAnswer === null || w.userAnswer === undefined)
    ? '(left blank)'
    : letterFor(w.userAnswer) + '. ' + w.opts[w.userAnswer];
  return {
    user: '✗ Your answer: ' + userTxt,
    correct: '✓ Correct answer: ' + letterFor(w.answer) + '. ' + w.opts[w.answer]
  };
}

function formatMultiAnswer(w) {
  const sel = Array.isArray(w.userAnswer) ? w.userAnswer.slice().sort() : [];
  const cor = Array.isArray(w.answer) ? w.answer.slice().sort() : [];
  const userTxt = sel.length
    ? sel.map(i => letterFor(i) + '. ' + w.opts[i]).join(' / ')
    : '(left blank)';
  const correctTxt = cor.map(i => letterFor(i) + '. ' + w.opts[i]).join(' / ');
  return {
    user: '✗ Your selections: ' + userTxt,
    correct: '✓ Correct selections: ' + correctTxt
  };
}

function formatDndAnswer(w) {
  const placed = w.userAnswer || {};
  const correct = w.correct || {};
  const itemLabel = id => (w.items.find(it => it.id === id) || {}).label || id;
  const bucketLabel = id => (w.buckets.find(b => b.id === id) || {}).label || id;
  const userLines = w.items.map(it => {
    const bucketId = placed[it.id];
    if (!bucketId) return '  · ' + itemLabel(it.id) + ' → (not placed)';
    const mark = bucketId === correct[it.id] ? '✓' : '✗';
    return '  ' + mark + ' ' + itemLabel(it.id) + ' → ' + bucketLabel(bucketId);
  }).join('\n');
  const correctLines = Object.keys(correct).map(
    id => '  ' + itemLabel(id) + ' → ' + bucketLabel(correct[id])
  ).join('\n');
  return {
    user: '<pre style="margin:6px 0 0;font-family:Consolas,monospace;font-size:0.85rem;color:inherit;white-space:pre-wrap">Your placements:\n' + escapeHtml(userLines) + '</pre>',
    correct: '<pre style="margin:6px 0 0;font-family:Consolas,monospace;font-size:0.85rem;color:inherit;white-space:pre-wrap">Correct placements:\n' + escapeHtml(correctLines) + '</pre>',
    isHtml: true
  };
}

function formatPbqAnswer(w) {
  const userAns = Array.isArray(w.userAnswer) ? w.userAnswer : [];
  const html = w.steps.map((step, i) => {
    const subW = {
      type: step.kind,
      q: step.text || '',
      opts: step.opts,
      items: step.items,
      buckets: step.buckets,
      userAnswer: userAns[i],
      answer: step.answer,
      correct: step.correct
    };
    let lines;
    if (step.kind === 'multi')     lines = formatMultiAnswer(subW);
    else if (step.kind === 'dnd-match') lines = formatDndAnswer(subW);
    else lines = formatSingleAnswer(subW);
    return '<div style="margin-top:10px;padding-top:8px;border-top:1px dashed var(--border)">' +
      '<div style="font-size:0.78rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent-purple);margin-bottom:4px">Step ' + (i + 1) + (step.text ? ' — ' + escapeHtml(step.text) : '') + '</div>' +
      '<div class="wline user">' + (lines.isHtml ? lines.user : escapeHtml(lines.user)) + '</div>' +
      '<div class="wline correct">' + (lines.isHtml ? lines.correct : escapeHtml(lines.correct)) + '</div>' +
      '</div>';
  }).join('');
  return { user: html, correct: '', isHtml: true, suppressCorrect: true };
}

function renderWrongList(a) {
  const wrap = document.getElementById('wrong-list');
  if (!a.wrongList.length) {
    wrap.innerHTML =
      '<div class="card" style="text-align:center"><h2 style="color:var(--accent-green)">Perfect Score!</h2><p style="color:var(--text-muted);margin-top:8px">No questions to review.</p></div>';
    return;
  }
  wrap.innerHTML = '<h2 style="margin-bottom:14px">Review the ' + a.wrongList.length + ' you missed</h2>';
  a.wrongList.forEach((w, i) => {
    let lines;
    switch (w.type) {
      case 'multi':     lines = formatMultiAnswer(w); break;
      case 'dnd-match': lines = formatDndAnswer(w); break;
      case 'pbq':       lines = formatPbqAnswer(w); break;
      default:          lines = formatSingleAnswer(w); break;
    }
    const item = document.createElement('div');
    item.className = 'wrong-item';
    const partial = (w.partialEarned !== undefined && w.partialEarned > 0 && w.partialEarned < 1)
      ? '<span style="font-size:0.75rem;color:var(--accent-yellow);margin-left:8px">Partial credit: ' + Math.round(w.partialEarned * 100) + '%</span>'
      : '';
    item.innerHTML =
      '<div class="wq">' + (i + 1) + '. ' + escapeHtml(w.q) + partial + '</div>' +
      '<div class="wline user">' + (lines.isHtml ? lines.user : escapeHtml(lines.user)) + '</div>' +
      (lines.suppressCorrect ? '' : '<div class="wline correct">' + (lines.isHtml ? lines.correct : escapeHtml(lines.correct)) + '</div>') +
      (w.exp ? '<div class="wexp">' + escapeHtml(w.exp) + '</div>' : '');
    wrap.appendChild(item);
  });
}

function submitToTeacher(a) {
  const status = document.getElementById('submit-status');
  if (!window.SCORE_SUBMISSION_URL) {
    status.className = 'submit-status';
    status.textContent = 'Score saved locally only — teacher submission not configured.';
    return;
  }
  status.className = 'submit-status sending';
  status.textContent = 'Submitting score to teacher…';

  // Strip the wrongList before sending to keep the payload small and
  // because the teacher's sheet only needs the score summary.
  const payload = {
    submittedAt:    new Date().toISOString(),
    examId:         a.examId,
    examCode:       a.examCode,
    examName:       a.examName,
    studentName:    a.studentName,
    classPeriod:    a.classPeriod,
    rawCorrect:     a.rawCorrect,
    rawTotal:       a.rawTotal,
    rawPct:         a.rawPct,
    scaledScore:    a.scaledScore,
    passThreshold:  a.passThreshold,
    passed:         a.passed,
    elapsedSec:     a.elapsedSec,
    autoSubmitted:  a.autoSubmitted,
    tabSwitches:    a.tabSwitches || 0,
    avgQuestionSec: a.avgQuestionSec || 0,
    perDomain:      a.perDomain
  };

  // Apps Script Web Apps don't return CORS headers by default. Sending the
  // body as text/plain avoids a CORS preflight, so the POST goes through.
  // We parse JSON server-side from e.postData.contents.
  fetch(window.SCORE_SUBMISSION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
    redirect: 'follow'
  })
  .then(resp => resp.text().catch(() => ''))
  .then(text => {
    let ok = true;
    try {
      const parsed = JSON.parse(text);
      ok = parsed.result === 'ok' || parsed.status === 'ok';
    } catch (e) { /* non-JSON response — assume Apps Script ran */ }
    if (ok) {
      status.className = 'submit-status success';
      status.textContent = '✓ Score submitted to teacher.';
    } else {
      status.className = 'submit-status error';
      status.textContent = 'Submission rejected by server. Screenshot your score and submit to your teacher.';
    }
  })
  .catch(err => {
    status.className = 'submit-status error';
    status.textContent = 'Could not reach teacher score sheet. Screenshot your score and submit manually.';
    // log for the student / teacher to see in dev tools
    console.error('Score submission error:', err);
  });
}
