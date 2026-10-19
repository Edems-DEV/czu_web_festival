/**
 * Aurora 2026 Festival - Tier 1: Feature Coverage Test Suite
 * Covers:
 * - 60 events, 60 unique artists, 3 stages, 3 days
 * - Referential integrity (performerId, venueId) & 1:1 cardinality
 * - Stage exclusivity: non-overlapping time slots per stage and day
 * - WCAG 2.0 AA contrast tokens in web/css/style.css (primary >= 7:1 AAA, all text >= 4.5:1 AA)
 * - Presence and structural validity of Schema.org JSON-LD across all 7 HTML pages
 * - Offline file:/// zero-CORS compliance, local assets, no external CDNs
 * - Semantic HTML5 structure across all pages
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadDataJson,
  loadFestivalDataJs,
  loadHtml,
  extractJsonLd,
  parseCssVariables,
  calculateContrastRatio,
  HTML_FILES
} = require('./test_helpers');

test('Tier 1: Feature Coverage', async (t) => {
  const canonicalData = loadDataJson();
  const jsData = loadFestivalDataJs();

  await t.test('1.1 Database Dimensions & Structural Invariants', async (t) => {
    await t.test('data.json contains exactly 3 stages / venues', () => {
      assert.equal(canonicalData.venues.length, 3, 'Expected exactly 3 venues');
      const venueIds = canonicalData.venues.map(v => v.id).sort();
      assert.deepEqual(venueIds, ['v1', 'v2', 'v3'], 'Venues must have IDs v1, v2, v3');
      for (const v of canonicalData.venues) {
        assert.ok(v.name && v.name.length > 0, `Venue ${v.id} missing name`);
        assert.ok(v.capacity && v.capacity > 0, `Venue ${v.id} missing valid capacity`);
      }
    });

    await t.test('data.json contains exactly 60 unique performers', () => {
      assert.equal(canonicalData.performers.length, 60, 'Expected exactly 60 performers');
      const ids = canonicalData.performers.map(p => p.id);
      const uniqueIds = new Set(ids);
      assert.equal(uniqueIds.size, 60, 'All 60 performer IDs must be unique');
      const names = canonicalData.performers.map(p => p.name.trim().toLowerCase());
      const uniqueNames = new Set(names);
      assert.equal(uniqueNames.size, 60, 'All 60 performer names must be unique');
      for (const p of canonicalData.performers) {
        assert.ok(p.genre && p.genre.length > 0, `Performer ${p.id} missing genre`);
        assert.ok(p.country && p.country.length > 0, `Performer ${p.id} missing country`);
      }
    });

    await t.test('data.json contains exactly 60 events across exactly 3 festival days', () => {
      assert.equal(canonicalData.events.length, 60, 'Expected exactly 60 events');
      const expectedDays = ['2026-08-20', '2026-08-21', '2026-08-22'];
      const eventDays = new Set(canonicalData.events.map(e => e.day));
      assert.deepEqual([...eventDays].sort(), expectedDays, 'Events must span exactly the 3 festival days');

      for (const e of canonicalData.events) {
        assert.ok(expectedDays.includes(e.day), `Event ${e.id} day ${e.day} not in festival range`);
        assert.ok(/^\d{2}:\d{2}$/.test(e.startTime), `Event ${e.id} has invalid startTime: ${e.startTime}`);
        assert.ok(e.durationMin > 0 && e.durationMin <= 240, `Event ${e.id} has invalid durationMin: ${e.durationMin}`);
        assert.ok(['concert', 'talk', 'workshop'].includes(e.type), `Event ${e.id} has invalid type: ${e.type}`);
      }
    });

    await t.test('web/js/data.js window.FESTIVAL_DATA mirrors data.json identically', () => {
      assert.ok(jsData, 'window.FESTIVAL_DATA must exist in web/js/data.js');
      assert.equal(jsData.venues.length, canonicalData.venues.length, 'Venue counts must match');
      assert.equal(jsData.performers.length, canonicalData.performers.length, 'Performer counts must match');
      assert.equal(jsData.events.length, canonicalData.events.length, 'Event counts must match');
      assert.deepEqual(jsData.events.map(e => e.id), canonicalData.events.map(e => e.id), 'Event IDs must be identical');
    });
  });

  await t.test('1.2 Referential Integrity & Cardinality', async (t) => {
    const venueMap = new Map(canonicalData.venues.map(v => [v.id, v]));
    const performerMap = new Map(canonicalData.performers.map(p => [p.id, p]));

    await t.test('every event references an existing performerId and venueId', () => {
      for (const e of canonicalData.events) {
        assert.ok(venueMap.has(e.venueId), `Event ${e.id} references non-existent venueId: ${e.venueId}`);
        assert.ok(performerMap.has(e.performerId), `Event ${e.id} references non-existent performerId: ${e.performerId}`);
      }
    });

    await t.test('exact 1:1 cardinality between performers and events', () => {
      const performerUsage = new Map();
      for (const e of canonicalData.events) {
        performerUsage.set(e.performerId, (performerUsage.get(e.performerId) || 0) + 1);
      }
      for (const p of canonicalData.performers) {
        assert.equal(performerUsage.get(p.id), 1, `Performer ${p.id} (${p.name}) must be assigned to exactly 1 event`);
      }
    });
  });

  await t.test('1.3 Stage Exclusivity (Non-overlapping time slots per stage)', async (t) => {
    const stageGroups = {};
    for (const e of canonicalData.events) {
      const key = `${e.day}_${e.venueId}`;
      if (!stageGroups[key]) stageGroups[key] = [];
      const startMs = new Date(`${e.day}T${e.startTime}`).getTime();
      const endMs = startMs + (e.durationMin * 60 * 1000);
      stageGroups[key].push({ id: e.id, title: e.title, startMs, endMs, startTime: e.startTime, durationMin: e.durationMin });
    }

    const stageConflicts = [];
    for (const [key, evList] of Object.entries(stageGroups)) {
      evList.sort((a, b) => a.startMs - b.startMs);
      for (let i = 0; i < evList.length - 1; i++) {
        const cur = evList[i];
        const nxt = evList[i + 1];
        if (cur.endMs > nxt.startMs) {
          stageConflicts.push({
            stageKey: key,
            eventA: cur.id,
            timeA: `${cur.startTime} (+${cur.durationMin}m)`,
            eventB: nxt.id,
            timeB: nxt.startTime,
            overlapMin: Math.round((cur.endMs - nxt.startMs) / 60000)
          });
        }
      }
    }

    assert.equal(
      stageConflicts.length,
      0,
      `Expected zero stage time collisions, found ${stageConflicts.length}: ${JSON.stringify(stageConflicts)}`
    );
  });

  await t.test('1.4 WCAG 2.0 AA Contrast Ratios in web/css/style.css', async (t) => {
    const cssVars = parseCssVariables();
    const bgMain = cssVars['--bg-main'];
    const bgSurface = cssVars['--bg-surface'];
    const bgSurfaceElevated = cssVars['--bg-surface-elevated'];

    assert.ok(bgMain, 'Expected --bg-main token');
    assert.ok(bgSurface, 'Expected --bg-surface token');
    assert.ok(bgSurfaceElevated, 'Expected --bg-surface-elevated token');

    const primaryText = cssVars['--text-primary'];
    const secondaryText = cssVars['--text-secondary'];
    const mutedText = cssVars['--text-muted'];

    assert.ok(primaryText, 'Expected --text-primary token');
    assert.ok(secondaryText, 'Expected --text-secondary token');
    assert.ok(mutedText, 'Expected --text-muted token');

    // WCAG AAA for primary text: >= 7.0:1
    const primaryVsMain = calculateContrastRatio(primaryText, bgMain);
    const primaryVsSurface = calculateContrastRatio(primaryText, bgSurface);
    const primaryVsElevated = calculateContrastRatio(primaryText, bgSurfaceElevated);
    assert.ok(primaryVsMain >= 7.0, `--text-primary on --bg-main must be >= 7:1 (was ${primaryVsMain.toFixed(2)})`);
    assert.ok(primaryVsSurface >= 7.0, `--text-primary on --bg-surface must be >= 7:1 (was ${primaryVsSurface.toFixed(2)})`);
    assert.ok(primaryVsElevated >= 7.0, `--text-primary on --bg-surface-elevated must be >= 7:1 (was ${primaryVsElevated.toFixed(2)})`);

    // WCAG AA for secondary text: >= 4.5:1
    const secondaryVsMain = calculateContrastRatio(secondaryText, bgMain);
    const secondaryVsElevated = calculateContrastRatio(secondaryText, bgSurfaceElevated);
    assert.ok(secondaryVsMain >= 4.5, `--text-secondary on --bg-main must be >= 4.5:1 (was ${secondaryVsMain.toFixed(2)})`);
    assert.ok(secondaryVsElevated >= 4.5, `--text-secondary on --bg-surface-elevated must be >= 4.5:1 (was ${secondaryVsElevated.toFixed(2)})`);

    // WCAG AA for muted text: >= 4.5:1 (requires upgrade from #64748b to #94a3b8)
    const mutedVsMain = calculateContrastRatio(mutedText, bgMain);
    const mutedVsElevated = calculateContrastRatio(mutedText, bgSurfaceElevated);
    assert.ok(mutedVsMain >= 4.5, `--text-muted on --bg-main must be >= 4.5:1 (was ${mutedVsMain.toFixed(2)})`);
    assert.ok(mutedVsElevated >= 4.5, `--text-muted on --bg-surface-elevated must be >= 4.5:1 (was ${mutedVsElevated.toFixed(2)})`);

    // Accents
    for (const token of ['--accent-cyan', '--accent-amber', '--accent-emerald', '--accent-purple']) {
      const color = cssVars[token];
      if (color) {
        const ratio = calculateContrastRatio(color, bgMain);
        assert.ok(ratio >= 4.5, `${token} on --bg-main must be >= 4.5:1 (was ${ratio.toFixed(2)})`);
      }
    }
  });

  await t.test('1.5 Schema.org JSON-LD Presence and Structural Validity', async (t) => {
    for (const fileName of HTML_FILES) {
      await t.test(`web/${fileName} contains valid Schema.org JSON-LD`, () => {
        const html = loadHtml(fileName);
        const ldBlocks = extractJsonLd(html);
        assert.ok(ldBlocks.length >= 1, `web/${fileName} must contain at least one <script type="application/ld+json"> block`);

        for (const block of ldBlocks) {
          assert.equal(block.__parseError, undefined, `web/${fileName} JSON-LD failed to parse: ${block.__parseError}`);
          assert.ok(
            block['@context'] === 'https://schema.org' || block['@context'] === 'http://schema.org',
            `web/${fileName} JSON-LD @context must be schema.org`
          );
          assert.ok(block['@type'], `web/${fileName} JSON-LD must contain @type`);
        }
      });
    }
  });

  await t.test('1.6 Offline file:/// Zero-CORS & Self-Contained Integrity', async (t) => {
    for (const fileName of HTML_FILES) {
      await t.test(`web/${fileName} contains no external CDN references or remote dependencies`, () => {
        const html = loadHtml(fileName);
        const forbiddenPatterns = [
          /https?:\/\/cdn\./i,
          /https?:\/\/fonts\.googleapis\.com/i,
          /https?:\/\/fonts\.gstatic\.com/i,
          /https?:\/\/cdnjs\.cloudflare\.com/i,
          /https?:\/\/unpkg\.com/i,
          /https?:\/\/stackpath\.bootstrapcdn\.com/i,
          /https?:\/\/use\.fontawesome\.com/i
        ];

        for (const pattern of forbiddenPatterns) {
          assert.ok(!pattern.test(html), `web/${fileName} must not reference external CDN (${pattern})`);
        }
      });
    }

    await t.test('web/css/style.css contains prefers-reduced-motion media query', () => {
      const fs = require('fs');
      const css = fs.readFileSync(require('path').join(__dirname, '..', 'web', 'css', 'style.css'), 'utf8');
      assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'), 'CSS must support prefers-reduced-motion for accessibility');
    });
  });

  await t.test('1.7 Semantic HTML5 & Breadcrumbs Across All 7 Pages', async (t) => {
    for (const fileName of HTML_FILES) {
      await t.test(`web/${fileName} contains required semantic elements`, () => {
        const html = loadHtml(fileName);
        assert.ok(html.includes('<header'), `web/${fileName} missing <header>`);
        assert.ok(html.includes('class="breadcrumbs"'), `web/${fileName} missing class="breadcrumbs"`);
        assert.ok(html.includes('<main'), `web/${fileName} missing <main>`);
        assert.ok(html.includes('<footer'), `web/${fileName} missing <footer>`);
      });
    }
  });
});
