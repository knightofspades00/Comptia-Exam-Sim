/* =========================================================================
   CompTIA Exam Portal — configuration
   ------------------------------------------------------------------------- */

/**
 * Set this to the Web App URL you get after deploying apps-script/Code.gs.
 * Leave as null until you've deployed; the sim still works (scores stay local
 * only) and the results page will say "score not submitted to teacher".
 *
 * Example: 'https://script.google.com/macros/s/AKfycby.../exec'
 */
window.SCORE_SUBMISSION_URL = 'https://script.google.com/macros/s/AKfycbyX38-yXm4lXfuQFODXGl3F8laREzszKue1XpLJzi467zEdhD75_O5uSiH2aT38vHg/exec';

/**
 * Exam metadata. The values for length / time / pass threshold mirror the
 * official CompTIA exam blueprints (FC0-U71, 220-1101, 220-1102, N10-009).
 * If CompTIA changes the blueprint, update here.
 *
 *  id              — used in URLs and file names; matches js/questions/<id>.js
 *  code            — official CompTIA exam code
 *  name            — short display name
 *  fullName        — long display name
 *  questionCount   — number of questions to draw from the pool for one attempt
 *  timeMinutes     — countdown timer length
 *  passScaled      — CompTIA scaled passing score (out of 900)
 *  domains         — array of objects for breakdown on results page
 *                    { id, name, weight }   weight is the % of questions to draw
 *                    Weights should sum to 100. If a domain pool is short,
 *                    questions are drawn proportionally and the count may shrink.
 *  styleClass      — CSS class used by .exam-card.<styleClass>
 */
window.EXAMS = {
  techplus: {
    id: 'techplus',
    code: 'FC0-U71',
    name: 'Tech+',
    fullName: 'CompTIA Tech+ (FC0-U71)',
    // Stay faithful to the official Tech+ exam content volume (75
    // questions) but extend the wall-clock to fit the school's 2-hour
    // class block. The minTimeMinutes guard prevents students from
    // submitting before 45 minutes have elapsed — no rush-and-leave.
    // Real Tech+ at Pearson VUE is 75 q / 60 min; this is the same
    // 75 items with breathing room and a no-early-exit floor.
    questionCount: 75,
    timeMinutes: 120,
    minTimeMinutes: 45,
    passScaled: 650,
    // Real Tech+ format: MC + multi-response + drag-and-drop. No PBQs.
    allowedTypes: ['single', 'multi', 'dnd-match'],
    styleClass: 'techplus',
    domains: [
      { id: 'D1',  name: 'IT Concepts & Terminology',              weight: 12 },
      { id: 'D2',  name: 'Infrastructure',                         weight: 22 },
      { id: 'D3',  name: 'Applications & Software',                weight: 17 },
      { id: 'D4',  name: 'Software Development Concepts',          weight: 12 },
      { id: 'D5',  name: 'Data & Database Fundamentals',           weight: 11 },
      { id: 'D6',  name: 'Security',                               weight: 26 }
    ]
  },
  aplus1: {
    id: 'aplus1',
    code: '220-1101',
    name: 'A+ Core 1',
    fullName: 'CompTIA A+ Core 1 (220-1101)',
    questionCount: 90,
    timeMinutes: 90,
    passScaled: 675,
    styleClass: 'aplus1',
    domains: [
      { id: 'D1', name: 'Mobile Devices',           weight: 15 },
      { id: 'D2', name: 'Networking',               weight: 20 },
      { id: 'D3', name: 'Hardware',                 weight: 25 },
      { id: 'D4', name: 'Virtualization & Cloud',   weight: 11 },
      { id: 'D5', name: 'Hardware & Network Troubleshooting', weight: 29 }
    ]
  },
  aplus2: {
    id: 'aplus2',
    code: '220-1102',
    name: 'A+ Core 2',
    fullName: 'CompTIA A+ Core 2 (220-1102)',
    questionCount: 90,
    timeMinutes: 90,
    passScaled: 700,
    styleClass: 'aplus2',
    domains: [
      { id: 'D1', name: 'Operating Systems',                weight: 31 },
      { id: 'D2', name: 'Security',                         weight: 25 },
      { id: 'D3', name: 'Software Troubleshooting',         weight: 22 },
      { id: 'D4', name: 'Operational Procedures',           weight: 22 }
    ]
  },
  netplus: {
    id: 'netplus',
    code: 'N10-009',
    name: 'Network+',
    fullName: 'CompTIA Network+ (N10-009)',
    questionCount: 90,
    timeMinutes: 90,
    passScaled: 720,
    styleClass: 'netplus',
    domains: [
      { id: 'D1', name: 'Networking Concepts',           weight: 23 },
      { id: 'D2', name: 'Network Implementation',        weight: 20 },
      { id: 'D3', name: 'Network Operations',            weight: 19 },
      { id: 'D4', name: 'Network Security',              weight: 14 },
      { id: 'D5', name: 'Network Troubleshooting',       weight: 24 }
    ]
  },
  secplus: {
    id: 'secplus',
    code: 'SY0-701',
    name: 'Security+',
    fullName: 'CompTIA Security+ (SY0-701)',
    questionCount: 90,
    timeMinutes: 90,
    passScaled: 750,
    styleClass: 'secplus',
    domains: [
      { id: 'D1', name: 'General Security Concepts',                     weight: 12 },
      { id: 'D2', name: 'Threats, Vulnerabilities, and Mitigations',     weight: 22 },
      { id: 'D3', name: 'Security Architecture',                         weight: 18 },
      { id: 'D4', name: 'Security Operations',                           weight: 28 },
      { id: 'D5', name: 'Security Program Management and Oversight',     weight: 20 }
    ]
  },
  arcgis: {
    id: 'arcgis',
    code: 'EAPF',
    name: 'ArcGIS Pro Foundation',
    fullName: 'Esri ArcGIS Pro Foundation (EAPF)',
    // Real EAPF: 75 questions, 90 minutes, ~80% to pass (per third-party
    // practice sources; Esri does not publish a numeric pass score in
    // the public EIG). Mapped to the portal's 100-900 scaled-score band
    // with the pass threshold anchored at 720 (= 80% of 900).
    questionCount: 75,
    timeMinutes: 90,
    passScaled: 720,
    // Multiple-choice only on the EAPF — no PBQs, no D&D in the official
    // exam. We allow multi-response if authored, since CompTIA-style
    // "Select TWO" items are still a legitimate study aid.
    allowedTypes: ['single', 'multi'],
    styleClass: 'arcgis',
    // Even split — Esri does not publish official per-domain weighting
    // in the public materials. The 6 domains track the study hub's
    // organization and the in-pool question distribution.
    domains: [
      { id: 'D1', name: 'Geographic Data Models',           weight: 17 },
      { id: 'D2', name: 'Coordinate Systems & Projections', weight: 17 },
      { id: 'D3', name: 'Cartography & Symbology',          weight: 17 },
      { id: 'D4', name: 'Spatial Analysis & Geoprocessing', weight: 17 },
      { id: 'D5', name: 'ArcGIS Online & Web GIS',          weight: 16 },
      { id: 'D6', name: 'Geodatabases, Metadata & Sharing', weight: 16 }
    ]
  }
};

/* ------------------------------------------------------------------------- */
/* Scaled-score conversion                                                   */
/* CompTIA does NOT publish the official scaling curve. This is the standard */
/* approximation used by every reputable practice-exam tool: map raw % to    */
/* the CompTIA reporting range of 100-900, with the pass threshold anchored  */
/* at the actual passing scaled score.                                       */
/* ------------------------------------------------------------------------- */

window.calculateScaledScore = function(rawCorrect, totalQuestions, examConfig) {
  if (totalQuestions === 0) return 100;
  const rawPct = rawCorrect / totalQuestions;
  const passPct = examConfig.passScaled / 900;
  let scaled;
  if (rawPct >= passPct) {
    // linear from (passPct, passScaled) to (1.0, 900)
    const range = 900 - examConfig.passScaled;
    scaled = examConfig.passScaled + ((rawPct - passPct) / (1 - passPct)) * range;
  } else {
    // linear from (0, 100) to (passPct, passScaled)
    const range = examConfig.passScaled - 100;
    scaled = 100 + (rawPct / passPct) * range;
  }
  return Math.round(scaled);
};
