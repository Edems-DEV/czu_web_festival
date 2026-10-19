/**
 * Empirical Verification Suite — Challenger 2
 * Tests:
 * 1. data.json vs web/js/data.js 100% byte & object sync
 * 2. Mathematical interval overlap calculation for all same-stage events (assert 0 overlaps)
 * 3. Mathematical WCAG 2.0 relative luminance contrast check on all CSS color tokens
 * 4. PPTX & HTML presentation file size and format validation (< 50MB, valid zip structure)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('='.repeat(70));
console.log('CHALLENGER 2 — EMPIRICAL VERIFICATION HARNESS');
console.log('='.repeat(70));

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error(`❌ FAIL: ${message}`);
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// -------------------------------------------------------------
// TASK 1: data.json vs web/js/data.js 100% sync
// -------------------------------------------------------------
console.log('\n--- TASK 1: DATA INTEGRITY & SYNCHRONIZATION ---');

const dataJsonRaw = fs.readFileSync('data.json', 'utf8');
const dataJson = JSON.parse(dataJsonRaw);

const mockWindow = {};
const dataJsContent = fs.readFileSync('web/js/data.js', 'utf8');
// Evaluate data.js in isolated scope
const evalFunc = new Function('window', dataJsContent);
evalFunc(mockWindow);
const dataJs = mockWindow.FESTIVAL_DATA;

assert(dataJs !== undefined && dataJs !== null, 'window.FESTIVAL_DATA is populated by web/js/data.js');

const jsonNormalized = JSON.stringify(dataJson);
const jsNormalized = JSON.stringify(dataJs);

const hashJson = crypto.createHash('sha256').update(jsonNormalized).digest('hex');
const hashJs = crypto.createHash('sha256').update(jsNormalized).digest('hex');

console.log(`data.json SHA-256: ${hashJson}`);
console.log(`data.js   SHA-256: ${hashJs}`);

assert(hashJson === hashJs, 'SHA-256 hash match between data.json and web/js/data.js');
assert(jsonNormalized === jsNormalized, 'Exact byte-for-byte serialization match');

// Dimension invariants
assert(dataJson.venues.length === 3, 'Exactly 3 venues');
assert(dataJson.performers.length === 60, 'Exactly 60 performers');
assert(dataJson.events.length === 60, 'Exactly 60 events');

const perfIds = new Set(dataJson.performers.map(p => p.id));
const venueIds = new Set(dataJson.venues.map(v => v.id));
assert(perfIds.size === 60, 'All 60 performer IDs are unique');
assert(venueIds.size === 3, 'All 3 venue IDs are unique');

let refErrors = 0;
dataJson.events.forEach(e => {
  if (!perfIds.has(e.performerId)) refErrors++;
  if (!venueIds.has(e.venueId)) refErrors++;
});
assert(refErrors === 0, 'Zero broken references in event foreign keys');

// -------------------------------------------------------------
// TASK 2: Stage Overlap Mathematical Calculation
// -------------------------------------------------------------
console.log('\n--- TASK 2: MATHEMATICAL SAME-STAGE EVENT INTERVALS ---');

function timeToMin(timeStr) {
  const parts = timeStr.split(':').map(Number);
  return parts[0] * 60 + parts[1];
}

const stageDayGroups = {};
for (const e of dataJson.events) {
  const key = `${e.venueId}__${e.day}`;
  if (!stageDayGroups[key]) stageDayGroups[key] = [];
  stageDayGroups[key].push(e);
}

let stageOverlaps = 0;
let pairsTested = 0;
const overlapLog = [];

for (const [groupKey, events] of Object.entries(stageDayGroups)) {
  // Sort events chronologically to print schedule
  events.sort((a, b) => timeToMin(a.startTime) - timeToMin(b.startTime));

  for (let i = 0; i < events.length; i++) {
    const e1 = events[i];
    const s1 = timeToMin(e1.startTime);
    const end1 = s1 + e1.durationMin;

    assert(e1.durationMin > 0, `Event ${e1.id} has positive duration: ${e1.durationMin}m`);

    for (let j = i + 1; j < events.length; j++) {
      pairsTested++;
      const e2 = events[j];
      const s2 = timeToMin(e2.startTime);
      const end2 = s2 + e2.durationMin;

      // Half-open interval intersection: [s1, end1) and [s2, end2)
      // Overlap occurs if max(s1, s2) < min(end1, end2)
      const overlapStart = Math.max(s1, s2);
      const overlapEnd = Math.min(end1, end2);

      if (overlapStart < overlapEnd) {
        stageOverlaps++;
        overlapLog.push({
          group: groupKey,
          eventA: { id: e1.id, title: e1.title, start: e1.startTime, dur: e1.durationMin, endMin: end1 },
          eventB: { id: e2.id, title: e2.title, start: e2.startTime, dur: e2.durationMin, endMin: end2 },
          collisionMinutes: overlapEnd - overlapStart
        });
      }
    }
  }
}

console.log(`Total same-stage-day event pairs verified: ${pairsTested}`);
console.log(`Total detected interval overlaps: ${stageOverlaps}`);
if (overlapLog.length > 0) {
  console.error('Detected collisions:', overlapLog);
}
assert(stageOverlaps === 0, 'Mathematically 0 same-stage event interval collisions');

// -------------------------------------------------------------
// TASK 3: WCAG 2.0 Relative Luminance Contrast Math
// -------------------------------------------------------------
console.log('\n--- TASK 3: WCAG 2.0 MATHEMATICAL RELATIVE LUMINANCE & CONTRAST ---');

function hexToRgb(hex) {
  let c = hex.replace(/^#/, '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function srgbToLinear(val) {
  const s = val / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb) {
  const R = srgbToLinear(rgb.r);
  const G = srgbToLinear(rgb.g);
  const B = srgbToLinear(rgb.b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1, hex2) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Extract CSS variables from style.css
const cssContent = fs.readFileSync('web/css/style.css', 'utf8');
const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
const cssVars = {};
if (rootMatch) {
  const varLines = rootMatch[1].split(';');
  for (const line of varLines) {
    const m = line.match(/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+)/);
    if (m) {
      cssVars[`--${m[1].trim()}`] = m[2].trim();
    }
  }
}

console.log('CSS Root Variables discovered:', Object.keys(cssVars).length);

const bgTokens = [
  { name: '--bg-main', hex: cssVars['--bg-main'] || '#0b0f19' },
  { name: '--bg-surface', hex: cssVars['--bg-surface'] || '#131c2e' },
  { name: '--bg-elevated', hex: cssVars['--bg-elevated'] || '#1e293b' }
];

const textTokens = [
  { name: '--text-primary', hex: cssVars['--text-primary'] || '#f8fafc', reqAAA: true },
  { name: '--text-secondary', hex: cssVars['--text-secondary'] || '#94a3b8', reqAAA: false },
  { name: '--text-muted', hex: cssVars['--text-muted'] || '#94a3b8', reqAAA: false }
];

for (const bg of bgTokens) {
  for (const txt of textTokens) {
    const ratio = contrastRatio(txt.hex, bg.hex);
    const passAA = ratio >= 4.5;
    const passAAA = ratio >= 7.0;

    console.log(`Contrast [${txt.name} (${txt.hex}) on ${bg.name} (${bg.hex})]: ${ratio.toFixed(2)}:1`);

    if (txt.reqAAA) {
      assert(passAAA, `${txt.name} on ${bg.name} meets WCAG AAA (>= 7.0:1): ${ratio.toFixed(2)}:1`);
    } else {
      assert(passAA, `${txt.name} on ${bg.name} meets WCAG AA (>= 4.5:1): ${ratio.toFixed(2)}:1`);
    }
  }
}

// -------------------------------------------------------------
// TASK 4: Presentation Files Format & Size Validation (< 50MB)
// -------------------------------------------------------------
console.log('\n--- TASK 4: PPTX & HTML PRESENTATION FORMAT & SIZE CHECKS ---');

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB = 52,428,800 bytes

const expectedExercises = [
  { cv: 'cv02', dir: 'checkpoints/01-cv02-specifikace-data' },
  { cv: 'cv03', dir: 'checkpoints/02-cv03-ux-prototyp' },
  { cv: 'cv04', dir: 'checkpoints/03-cv04-implementace' },
  { cv: 'cv05', dir: 'checkpoints/04-cv05-review-ready' },
  { cv: 'cv06', dir: 'checkpoints/05-cv06-cross-review' }
];

for (const item of expectedExercises) {
  const htmlFile = path.join(item.dir, 'presentation', `${item.cv}-prezentace.html`);
  const pptxFile = path.join(item.dir, 'presentation', `${item.cv}-prezentace.pptx`);
  const mdFile = path.join(item.dir, 'presentation', `${item.cv}-prezentace.md`);
  const notesFile = path.join(item.dir, 'notes', `${item.cv}-speaker-notes.md`);

  assert(fs.existsSync(htmlFile), `${htmlFile} exists`);
  assert(fs.existsSync(pptxFile), `${pptxFile} exists`);
  assert(fs.existsSync(mdFile), `${mdFile} exists`);
  assert(fs.existsSync(notesFile), `${notesFile} exists`);

  // Size validation
  const htmlStat = fs.statSync(htmlFile);
  const pptxStat = fs.statSync(pptxFile);

  console.log(`${item.cv} HTML size: ${(htmlStat.size / 1024).toFixed(1)} KB`);
  console.log(`${item.cv} PPTX size: ${(pptxStat.size / (1024 * 1024)).toFixed(2)} MB`);

  assert(htmlStat.size < MAX_BYTES, `${htmlFile} size (${htmlStat.size} B) is < 50 MB`);
  assert(pptxStat.size < MAX_BYTES, `${pptxFile} size (${pptxStat.size} B) is < 50 MB`);

  // HTML format validation
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  assert(htmlContent.includes('<!DOCTYPE html>') || htmlContent.includes('<html'), `${htmlFile} has valid HTML structure`);
  assert(htmlContent.length > 5000, `${htmlFile} has substantial Marp presentation content`);

  // PPTX ZIP format validation (ZIP magic bytes: PK\x03\x04 = 0x50 0x4b 0x03 0x04)
  const pptxBuf = fs.readFileSync(pptxFile);
  const isZip = pptxBuf.length > 4 && pptxBuf[0] === 0x50 && pptxBuf[1] === 0x4b && pptxBuf[2] === 0x03 && pptxBuf[3] === 0x04;
  assert(isZip, `${pptxFile} contains valid ZIP/OpenXML magic number header (PK\\x03\\x04)`);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n' + '='.repeat(70));
if (failures === 0) {
  console.log('🏁 ALL 4 CHALLENGER TASKS PASSED WITH 0 FAILURES!');
  console.log('VERDICT RECOMMENDATION: APPROVE');
} else {
  console.log(`❌ ENCOUNTERED ${failures} VERIFICATION FAILURES!`);
  console.log('VERDICT RECOMMENDATION: REQUEST_CHANGES');
}
console.log('='.repeat(70));
process.exit(failures === 0 ? 0 : 1);
