# Tech+ Final — Day-of Runbook

This is the checklist for running the CompTIA Tech+ final using the Exam Portal. Read it the night before.

## What students will experience

1. Open the portal URL on their browser.
2. Sign in with their **full name** + **class period**. No password — this is the identifier on the gradebook sheet.
3. Click the **Tech+** card. Then a confidentiality screen appears.
4. Agree to the conduct policy and click **Begin Exam**.
5. Timer starts: **60 minutes** for **75 questions**.
6. Mix of question types matches real Tech+:
   - Single-answer multiple choice
   - Multi-response ("Select TWO")
   - Drag-and-drop matching
   - **No PBQs** (real Tech+ has none — locked in config)
7. At the end (or when time runs out), the score is shown immediately and submitted to the Google Sheet.

## What the student CAN do during the exam

- Jump to any question via the Question Navigator
- Flag any question for review
- **Right-click an answer to cross it out** (Pearson VUE-style strikethrough)
- Go back and change answers any time before submitting
- Refresh the page accidentally — their progress is restored automatically (state persistence)

## What happens if something goes wrong

| Problem | What happens | What you do |
|---|---|---|
| Student accidentally refreshes browser | Portal detects the in-progress attempt and offers "Resume". Timer continues from where it left off. | Nothing — student clicks Resume. |
| Student closes the tab | Same as above on re-open (within 60-min window). | Reopen, resume. |
| Timer hits 0 while away from screen | Portal auto-submits with whatever they've answered. | Score is recorded as-is. |
| Student leaves the exam tab (alt-tab to another window) | A counter on the header tracks how many times. Shown in their results. | You'll see "Tab Switches" column in the gradebook sheet. |
| Apps Script / Sheet submission fails | Student still sees their score on the results page. Local copy is in their browser's localStorage. | Have them screenshot the result. You can still grade from the screenshot. |
| Student can't sign in | Make sure they typed their name and class period before clicking Start. | Have them refresh and re-enter. |

## Pre-exam teacher checklist (do this once, before students arrive)

- [ ] Confirm portal URL works on a school computer: `https://knightofspades00.github.io/Comptia-Exam-Sim/`
- [ ] Open `js/config.js` and confirm `SCORE_SUBMISSION_URL` is set to your Apps Script Web App URL
- [ ] Take a Tech+ attempt yourself end-to-end. Sit through 5–10 questions, submit early, verify your score landed in the gradebook sheet under "Attempts"
- [ ] Confirm the gradebook sheet shows the new columns: Tab Switches, Avg sec/question. If not, redeploy Apps Script: Apps Script editor → Deploy → Manage deployments → pencil → New version → Deploy
- [ ] If using shared school computers, brief students to sign in fresh and sign out when done

## During exam — what to watch

- The students' attempts will appear in the Google Sheet as they submit. Watch the **Pass/Fail** column and **Scaled Score**.
- The **Tab Switches** column shows how many times they switched away from the exam tab — useful as an integrity signal in a classroom setting where students might multi-window.
- The **Avg sec/question** column shows pacing. Anything under ~15s/question may indicate guessing; anything way over 60s may indicate research.

## After the exam

- All scores are in the Google Sheet, sortable by class period.
- For students who want to review what they got wrong: the results page in their browser shows wrong-answer review with the correct answer and explanation. This is per-student / per-browser and not persisted.
- If you want to re-grade or audit, the sheet has the raw counts and the per-domain breakdown as JSON in the last column.

## Format reference — what students see

| Spec | Real Tech+ | Portal |
|---|---|---|
| Question count | 75 (max) | **75** |
| Time | 60 min | **60 min** |
| Pass score | 650/900 (scaled) | **650/900** |
| Multi-response | yes | yes |
| Drag-and-drop | yes | yes |
| PBQs | no | **no** (locked in config) |
| Strikethrough | yes | yes |
| Mark for review | yes | yes |
| Item review screen | yes | yes |
| Domain breakdown after | yes | yes |
| Resume after refresh | n/a (proctored) | yes |
