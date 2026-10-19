/**
 * Aurora 2026 Festival - Test Helpers & Independent Oracle Utilities
 * Pure Node.js zero-dependency test utilities for Tiers 1-4.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_JSON_PATH = path.join(ROOT_DIR, 'data.json');
const WEB_DIR = path.join(ROOT_DIR, 'web');
const STYLE_CSS_PATH = path.join(WEB_DIR, 'css', 'style.css');
const DATA_JS_PATH = path.join(WEB_DIR, 'js', 'data.js');
const APP_JS_PATH = path.join(WEB_DIR, 'js', 'app.js');
const SCHEDULE_JS_PATH = path.join(WEB_DIR, 'js', 'schedule.js');

const HTML_FILES = [
  'index.html',
  'program.html',
  'performers.html',
  'performer-detail.html',
  'venues.html',
  'practical-info.html',
  'search.html'
];

/**
 * Load and parse canonical data.json
 */
function loadDataJson() {
  const raw = fs.readFileSync(DATA_JSON_PATH, 'utf8');
  return JSON.parse(raw);
}

/**
 * Load web/js/data.js in sandboxed VM to extract window.FESTIVAL_DATA
 */
function loadFestivalDataJs() {
  const code = fs.readFileSync(DATA_JS_PATH, 'utf8');
  const sandbox = {
    window: {},
    console: { warn: () => {}, error: () => {}, log: () => {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return cleanVmValue(sandbox.window.FESTIVAL_DATA);
}

/**
 * Read HTML content of a given page in web/
 */
function loadHtml(fileName) {
  return fs.readFileSync(path.join(WEB_DIR, fileName), 'utf8');
}

/**
 * Extract all JSON-LD script blocks from an HTML string
 */
function extractJsonLd(html) {
  const regex = /<script\b[^>]*?\btype=["']application\/ld\+json["'][^>]*?>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      blocks.push(parsed);
    } catch (err) {
      blocks.push({ __parseError: err.message, raw: match[1] });
    }
  }
  return blocks;
}

/**
 * Parse CSS custom properties from web/css/style.css
 */
function parseCssVariables() {
  const css = fs.readFileSync(STYLE_CSS_PATH, 'utf8');
  const vars = {};
  const regex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars[`--${match[1].trim()}`] = match[2].trim();
  }
  return vars;
}

/**
 * Convert 3-hex or 6-hex color code to RGB array [r, g, b]
 */
function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const intVal = parseInt(clean, 16);
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

/**
 * WCAG 2.0 relative luminance calculation
 */
function relativeLuminance([r, g, b]) {
  const srgb = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * WCAG 2.0 contrast ratio between two hex colors
 */
function calculateContrastRatio(hex1, hex2) {
  const lum1 = relativeLuminance(hexToRgb(hex1));
  const lum2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Specification Reference Oracle for schedule conflict calculation:
 * For any array of events, returns pairwise overlapping intervals on the same day.
 */
function oracleConflictDetector(eventList) {
  const conflicts = [];
  const list = [...eventList];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i];
      const b = list[j];
      if (a.day !== b.day) continue;

      const aStart = new Date(`${a.day}T${a.startTime}`).getTime();
      const aEnd = aStart + (a.durationMin * 60 * 1000);
      const bStart = new Date(`${b.day}T${b.startTime}`).getTime();
      const bEnd = bStart + (b.durationMin * 60 * 1000);

      const overlapStart = Math.max(aStart, bStart);
      const overlapEnd = Math.min(aEnd, bEnd);

      if (overlapStart < overlapEnd) {
        conflicts.push({
          eventA: a,
          eventB: b,
          overlapMin: Math.round((overlapEnd - overlapStart) / 60000)
        });
      }
    }
  }
  return conflicts;
}

/**
 * Instantiate isolated browser-like sandbox for web/js/app.js
 */
function loadAppSandbox(initialLocalStorage = {}) {
  const store = { ...initialLocalStorage };
  let storageErrorOnSet = false;
  let storageErrorOnGet = false;

  const mockLocalStorage = {
    getItem: (key) => {
      if (storageErrorOnGet) throw new Error('Simulated localStorage read failure');
      return key in store ? store[key] : null;
    },
    setItem: (key, val) => {
      if (storageErrorOnSet) throw new Error('QuotaExceededError: simulated storage full');
      store[key] = String(val);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      for (const k in store) delete store[k];
    },
    _setQuotaError: (flag) => { storageErrorOnSet = flag; },
    _setReadError: (flag) => { storageErrorOnGet = flag; },
    _getRawStore: () => store
  };

  const listeners = {};
  const mockWindow = {
    location: {
      pathname: '/program.html',
      search: '',
      href: 'http://localhost/program.html'
    },
    addEventListener: (evt, cb) => {
      if (!listeners[evt]) listeners[evt] = [];
      listeners[evt].push(cb);
    },
    dispatchEvent: (event) => {
      if (listeners[event.type]) {
        listeners[event.type].forEach(cb => cb(event));
      }
      return true;
    }
  };

  const docListeners = {};
  const mockDocument = {
    addEventListener: (evt, cb) => {
      if (!docListeners[evt]) docListeners[evt] = [];
      docListeners[evt].push(cb);
    },
    querySelectorAll: (selector) => [],
    getElementById: (id) => null
  };

  const sandbox = {
    window: mockWindow,
    document: mockDocument,
    localStorage: mockLocalStorage,
    CustomEvent: class CustomEvent {
      constructor(type, params = {}) {
        this.type = type;
        this.detail = params.detail || null;
      }
    },
    console: {
      log: () => {},
      warn: () => {},
      error: () => {}
    },
    Date: Date,
    Math: Math,
    JSON: JSON
  };

  vm.createContext(sandbox);
  const appCode = fs.readFileSync(APP_JS_PATH, 'utf8');
  vm.runInContext(appCode, sandbox);

  return { sandbox, mockLocalStorage, mockWindow, mockDocument };
}

function cleanVmValue(val) {
  if (val === undefined) return undefined;
  return JSON.parse(JSON.stringify(val));
}

module.exports = {
  ROOT_DIR,
  DATA_JSON_PATH,
  WEB_DIR,
  STYLE_CSS_PATH,
  DATA_JS_PATH,
  APP_JS_PATH,
  SCHEDULE_JS_PATH,
  HTML_FILES,
  loadDataJson,
  loadFestivalDataJs,
  loadHtml,
  extractJsonLd,
  parseCssVariables,
  hexToRgb,
  relativeLuminance,
  calculateContrastRatio,
  oracleConflictDetector,
  loadAppSandbox,
  cleanVmValue
};
