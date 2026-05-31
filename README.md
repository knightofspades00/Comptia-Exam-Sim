# CompTIA Exam Portal

Full-length, timed practice exams for CompTIA **Tech+**, **A+ Core 1**, **A+ Core 2**, and **Network+**. Hosted as a static GitHub Pages site. Companion to the [CompTIA Study Library](https://knightofspades00.github.io/Comptia-Study-Library/).

## What it does

- Student signs in with name + class period (no password — stored in browser).
- Picks an exam. Question count, time limit, and pass threshold match the real CompTIA exam:

| Exam            | Code      | Q  | Time   | Pass (scaled) |
|-----------------|-----------|----|--------|----------------|
| Tech+           | FC0-U71   | 75 | 60 min | 650 / 900      |
| A+ Core 1       | 220-1101  | 90 | 90 min | 675 / 900      |
| A+ Core 2       | 220-1102  | 90 | 90 min | 700 / 900      |
| Network+        | N10-009   | 90 | 90 min | 720 / 900      |

- Real-exam-like UX: countdown timer, question navigator, flag-for-review, end-of-exam review screen, auto-submit at timeout.
- On submit, the student sees a scaled score (100–900), pass/fail vs. threshold, per-domain breakdown, and a review of every missed question.
- If you've connected a Google Sheet (see below), the score is also POSTed to that sheet — so you see every attempt across every class period in one place.
- Recent attempts are kept in the browser's `localStorage` for the student to review later.

## Project layout

```
index.html             landing page — login + exam picker
exam.html              exam runner (timer + navigation + review)
results.html           scaled score + domain breakdown + wrong-answer review
css/style.css          all styles (matches study library visual language)
js/config.js           exam metadata + scaled-score conversion
                       *** set SCORE_SUBMISSION_URL here after Apps Script setup ***
js/auth.js             session + attempt-history helpers (localStorage)
js/exam.js             exam engine
js/results.js          results page + score submission
js/questions/          per-exam question banks (auto-generated)
apps-script/Code.gs    Google Apps Script Web App source
_extract_questions.py  regenerates question banks from the study library
```

## Setting up score submission to your Google Sheet

This step is optional. Skip it and the portal still works — students just won't have their score submitted automatically. They'll see "Score saved locally only" and you can have them screenshot the result like in the existing Study Library flow.

1. Create a new Google Sheet. Name the first tab `Attempts`.
2. In the Sheet, click **Extensions → Apps Script**. A new tab opens.
3. Delete the placeholder code. Paste the contents of [`apps-script/Code.gs`](apps-script/Code.gs).
4. (Optional) From the Apps Script editor, choose the `setupHeaders` function in the dropdown and click **Run**. Authorize when prompted. This pre-writes the header row.
5. Click **Deploy → New deployment**. Choose type **Web app**.
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
   - Click **Deploy**.
6. Copy the **Web app URL** that Apps Script gives you. It looks like
   `https://script.google.com/macros/s/AKfycby.../exec`.
7. Open [`js/config.js`](js/config.js). At the top, change:

   ```js
   window.SCORE_SUBMISSION_URL = null;
   ```

   to your URL:

   ```js
   window.SCORE_SUBMISSION_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

8. Commit and push. Submissions from any student start landing in your sheet.

**Re-deploying after edits:** if you edit `Code.gs`, you must redeploy. In Apps Script, choose **Deploy → Manage deployments → (pencil icon) → Version: New version → Deploy**. The URL stays the same, so you don't need to update `config.js`.

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g., `Comptia-Exam-Sim`).
2. From this directory, push the contents:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-user>/Comptia-Exam-Sim.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**. Under **Source**, choose `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
4. Wait ~30 seconds. Your sim is live at `https://<your-user>.github.io/Comptia-Exam-Sim/`.

## Local testing

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
# Python
py -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000.

## Regenerating question banks

The question banks in `js/questions/` are auto-generated from the [Comptia-Study-Library](https://github.com/knightofspades00/Comptia-Study-Library) by `_extract_questions.py`. To refresh after the study library is updated:

```bash
py _extract_questions.py
```

This expects the study library to live at `../Comptia-Study-Library/` (i.e., as a sibling folder).

## Question types supported

The portal supports the four formats found on the real CompTIA exams:

| Type           | Where authored                          | How it scores                                                |
|----------------|------------------------------------------|--------------------------------------------------------------|
| Single-answer  | `js/questions/<exam>.js` (auto-generated) | One correct option. 1 point.                                 |
| Multi-response | `js/questions/_supplements.js`            | "Select TWO/THREE…" with checkboxes. All-or-nothing per item.|
| Drag-and-drop  | `js/questions/_supplements.js`            | Match items into buckets. **Partial credit** per item placed.|
| PBQ            | `js/questions/_supplements.js`            | Multi-step scenario combining the above. Step scores averaged.|

Every attempt is guaranteed to include at least 1 PBQ (where available), 1–2 drag-and-drop items, and 2–4 multi-response questions — so students always see the full format mix, even if random sampling would otherwise drop them.

### Authoring more questions of each type

Edit `js/questions/_supplements.js` directly. It is **not** touched by `_extract_questions.py`. The data shape for each type:

```js
// Multi-response
{ type: 'multi', selectCount: 2, domain: 'D6',
  q: 'Which TWO ...?',
  opts: ['A', 'B', 'C', 'D', 'E'],
  answer: [0, 2],          // indices of the correct options, sorted
  exp: '...' }

// Drag-and-drop matching
{ type: 'dnd-match', domain: 'D2',
  q: 'Match each port to its protocol.',
  items:   [{ id: 'http', label: 'HTTP' }, ...],
  buckets: [{ id: 'p80',  label: 'Port 80' }, ...],
  correct: { http: 'p80', ... },
  exp: '...' }

// PBQ (multi-step). steps[] can mix kind: 'single' | 'multi' | 'dnd-match'.
{ type: 'pbq', domain: 'D5',
  q: 'PBQ — Scenario intro...',
  steps: [
    { kind: 'single', text: 'Step 1: ...',  opts: [...], answer: 1 },
    { kind: 'multi',  text: 'Step 2: ...',  opts: [...], answer: [0, 2], selectCount: 2 },
    { kind: 'dnd-match', text: 'Step 3: ...', items: [...], buckets: [...], correct: {...} }
  ],
  exp: '...' }
```

## Known limitations / next work

- **A+ Core 1 question pool is shorter than full exam length.** The source library has more Core 2 (OS/security) content than Core 1 (hardware/networking), so Core 1 currently draws ~76 of a 90-question target. The landing card shows "(pool below full 90)" in yellow so the student knows. To close the gap, author more Core 1 questions in the source library and re-run `py _extract_questions.py`.
- **Core 1/Core 2 classifier is keyword-based.** Each A+ question is auto-tagged Core 1 or Core 2 by keyword matching (see `CORE1_KEYWORDS` / `CORE2_KEYWORDS` in `_extract_questions.py`). Most match correctly; ambiguous questions default to Core 2. Manually tagging questions in the source library would improve accuracy.
- **Domain classification is also heuristic.** Domain tags (`D1`–`D6`) are assigned by keyword matching. Review the generated `js/questions/*.js` files to spot-check.
- **Single-attempt-per-session.** Students can refresh and start a new attempt at any time. There's no "you've already taken this today" lockout.
- **No teacher dashboard.** Your teacher view is the Google Sheet itself. Sortable / filterable / chartable from there. If you want an in-browser dashboard later, that's a Firestore-based extension.

## Author

Built for IT/CompTIA cert prep classes by [knightofspades00](https://github.com/knightofspades00).
