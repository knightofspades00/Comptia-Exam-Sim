/* =========================================================================
 * Google Apps Script Web App — receives scored attempts from the
 * CompTIA Exam Portal and appends a row to a Google Sheet.
 *
 * SETUP (do this once):
 *
 *   1. Create a new Google Sheet. Name the first tab "Attempts".
 *   2. In the Sheet, choose Extensions → Apps Script.
 *   3. Replace the contents of Code.gs with this file.
 *   4. (Optional) Run setupHeaders() once from the Apps Script editor to
 *      pre-write the header row. Authorize when prompted.
 *   5. Click Deploy → New deployment → type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *      Click Deploy. Copy the resulting Web App URL.
 *   6. Open js/config.js in the Comptia-Exam-Sim repo and set
 *        window.SCORE_SUBMISSION_URL = '<the URL from step 5>';
 *      Commit and push. Done.
 *
 * The portal POSTs application/text bodies (Content-Type: text/plain) to
 * avoid CORS preflight. We parse JSON out of e.postData.contents.
 * =========================================================================
 */

const SHEET_NAME = 'Attempts';

const HEADERS = [
  'Submitted At', 'Exam Code', 'Exam Name', 'Student Name', 'Class Period',
  'Raw Correct', 'Raw Total', 'Raw %', 'Scaled Score', 'Pass Threshold',
  'Pass/Fail', 'Elapsed (sec)', 'Auto-Submitted',
  'Tab Switches', 'Avg sec/question',
  'Domain Breakdown JSON'
];

function setupHeaders() {
  const sheet = getOrCreateSheet_();
  sheet.clear();
  sheet.appendRow(HEADERS);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const body = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    if (!body) return jsonOut_({ result: 'error', message: 'empty body' });
    const data = JSON.parse(body);

    const sheet = getOrCreateSheet_();
    // Make sure the header row exists.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.examCode || '',
      data.examName || '',
      data.studentName || '',
      data.classPeriod || '',
      data.rawCorrect ?? '',
      data.rawTotal ?? '',
      data.rawPct ?? '',
      data.scaledScore ?? '',
      data.passThreshold ?? '',
      data.passed ? 'PASS' : 'FAIL',
      data.elapsedSec ?? '',
      data.autoSubmitted ? 'YES' : 'NO',
      data.tabSwitches ?? 0,
      data.avgQuestionSec ?? 0,
      JSON.stringify(data.perDomain || {})
    ]);

    return jsonOut_({ result: 'ok' });
  } catch (err) {
    return jsonOut_({ result: 'error', message: String(err) });
  }
}

function doGet() {
  // Useful for sanity-checking the deployment in a browser tab.
  return jsonOut_({ result: 'ok', message: 'CompTIA Exam Portal score endpoint is live.' });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
