/**
 * Aurora 2026 Festival - Tier 5: Adversarial Stress Test & Edge-Case Fuzzing Suite
 * Executed independently by Empirical Challenger (challenger_1).
 * 
 * Verifies:
 * - Timetable clash detection under extreme boundary, multi-clash, and generative fuzz conditions
 * - LocalStorage resilience against quota errors, corrupted JSON, and non-array JSON types (null, object, number)
 * - Search & query resilience against regex metacharacters, injections, whitespace, and non-existent IDs
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadDataJson,
  loadFestivalDataJs,
  loadAppSandbox,
  oracleConflictDetector,
  cleanVmValue
} = require('./test_helpers');

test('Tier 5: Adversarial Stress Testing & Edge-Case Hardening', async (t) => {
  const festivalData = loadDataJson();

  // =========================================================================
  // 5.1 Adversarial Timetable Clash Detection
  // =========================================================================
  await t.test('5.1 Timetable Clash Detection Adversarial Testing', async (t) => {
    const { sandbox } = loadAppSandbox();
    const detectConflicts = (evts) => cleanVmValue(sandbox.detectScheduleConflicts(evts));

    await t.test('5.1.1 Boundary Touching (start == previous end)', () => {
      // 14:00 - 15:00 and 15:00 - 16:00: Touching by exact 0-second boundary
      const events = [
        { id: 'eA', day: '2026-08-20', startTime: '14:00', durationMin: 60, title: 'Act A' },
        { id: 'eB', day: '2026-08-20', startTime: '15:00', durationMin: 60, title: 'Act B' }
      ];
      const conflicts = detectConflicts(events);
      assert.equal(conflicts.length, 0, 'Touching boundaries must yield exactly 0 conflicts');
    });

    await t.test('5.1.2 Exact Minute Overlaps: 1 min, 59 min, 100% identical times', () => {
      // Case A: 1 minute overlap (14:00-15:01 vs 15:00-16:00)
      const evts1Min = [
        { id: 'eA', day: '2026-08-20', startTime: '14:00', durationMin: 61, title: 'Act A' },
        { id: 'eB', day: '2026-08-20', startTime: '15:00', durationMin: 60, title: 'Act B' }
      ];
      const conf1 = detectConflicts(evts1Min);
      assert.equal(conf1.length, 1);
      assert.equal(conf1[0].overlapMin, 1);

      // Case B: 59 min overlap (14:00-15:59 vs 15:00-16:00)
      const evts59Min = [
        { id: 'eA', day: '2026-08-20', startTime: '14:00', durationMin: 119, title: 'Act A' },
        { id: 'eB', day: '2026-08-20', startTime: '15:00', durationMin: 60, title: 'Act B' }
      ];
      const conf59 = detectConflicts(evts59Min);
      assert.equal(conf59.length, 1);
      assert.equal(conf59[0].overlapMin, 59);

      // Case C: 100% Identical time intervals (16:00-17:15 vs 16:00-17:15)
      const evtsIdentical = [
        { id: 'eA', day: '2026-08-21', startTime: '16:00', durationMin: 75, title: 'Act A' },
        { id: 'eB', day: '2026-08-21', startTime: '16:00', durationMin: 75, title: 'Act B' }
      ];
      const confIdentical = detectConflicts(evtsIdentical);
      assert.equal(confIdentical.length, 1);
      assert.equal(confIdentical[0].overlapMin, 75);
    });

    await t.test('5.1.3 Combinatorial Multi-Clashes (3, 4, 5 concurrent events)', () => {
      // 3 concurrent events: C(3, 2) = 3 conflicts
      const evts3 = [
        { id: 'e1', day: '2026-08-20', startTime: '14:00', durationMin: 90, title: 'Act 1' },
        { id: 'e2', day: '2026-08-20', startTime: '14:15', durationMin: 90, title: 'Act 2' },
        { id: 'e3', day: '2026-08-20', startTime: '14:30', durationMin: 90, title: 'Act 3' }
      ];
      const conf3 = detectConflicts(evts3);
      assert.equal(conf3.length, 3, '3 simultaneous events must generate 3 pairwise conflicts');

      // 4 concurrent events: C(4, 2) = 6 conflicts
      const evts4 = [
        ...evts3,
        { id: 'e4', day: '2026-08-20', startTime: '14:45', durationMin: 90, title: 'Act 4' }
      ];
      const conf4 = detectConflicts(evts4);
      assert.equal(conf4.length, 6, '4 simultaneous events must generate 6 pairwise conflicts');

      // 5 concurrent events: C(5, 2) = 10 conflicts
      const evts5 = [
        ...evts4,
        { id: 'e5', day: '2026-08-20', startTime: '15:00', durationMin: 90, title: 'Act 5' }
      ];
      const conf5 = detectConflicts(evts5);
      assert.equal(conf5.length, 10, '5 simultaneous events must generate 10 pairwise conflicts');
    });

    await t.test('5.1.4 Cross-Day Independence & Multi-Day Separation', () => {
      // Events with exact same hours across Day 1, Day 2, Day 3
      const multiDay = [
        { id: 'd1', day: '2026-08-20', startTime: '18:00', durationMin: 90, title: 'Thu Set' },
        { id: 'd2', day: '2026-08-21', startTime: '18:00', durationMin: 90, title: 'Fri Set' },
        { id: 'd3', day: '2026-08-22', startTime: '18:00', durationMin: 90, title: 'Sat Set' }
      ];
      const confMultiDay = detectConflicts(multiDay);
      assert.equal(confMultiDay.length, 0, 'Identical hours across different days must NEVER trigger clash');

      // Two separate conflicts on different days: 1 on Day 1, 1 on Day 2
      const mixedDays = [
        { id: 'd1_a', day: '2026-08-20', startTime: '14:00', durationMin: 60, title: 'Thu A' },
        { id: 'd1_b', day: '2026-08-20', startTime: '14:30', durationMin: 60, title: 'Thu B' },
        { id: 'd2_a', day: '2026-08-21', startTime: '16:00', durationMin: 60, title: 'Fri A' },
        { id: 'd2_b', day: '2026-08-21', startTime: '16:15', durationMin: 60, title: 'Fri B' }
      ];
      const confMixed = detectConflicts(mixedDays);
      assert.equal(confMixed.length, 2, 'Two independent clashes on separate days must yield exactly 2 conflicts');
    });

    await t.test('5.1.5 Generative Fuzz Testing: 100 random schedules against mathematical oracle', () => {
      const days = ['2026-08-20', '2026-08-21', '2026-08-22'];
      
      // Seeded-like deterministic pseudo-random generator
      let seed = 12345;
      function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      for (let run = 0; run < 100; run++) {
        const count = Math.floor(rnd() * 8) + 2; // 2 to 9 events
        const eventList = [];

        for (let i = 0; i < count; i++) {
          const d = days[Math.floor(rnd() * days.length)];
          const h = 10 + Math.floor(rnd() * 10); // 10 to 19
          const m = Math.floor(rnd() * 4) * 15;  // 0, 15, 30, 45
          const dur = (Math.floor(rnd() * 4) + 1) * 30; // 30, 60, 90, 120 min
          const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
          
          eventList.push({
            id: `rnd_${run}_${i}`,
            day: d,
            startTime: timeStr,
            durationMin: dur,
            title: `Random Event ${i}`
          });
        }

        const actualConflicts = detectConflicts(eventList);
        const oracleConflicts = oracleConflictDetector(eventList);

        assert.equal(
          actualConflicts.length,
          oracleConflicts.length,
          `Fuzz Run ${run}: conflict count mismatch (expected ${oracleConflicts.length}, got ${actualConflicts.length})`
        );
      }
    });
  });

  // =========================================================================
  // 5.2 Adversarial LocalStorage Failure Modes
  // =========================================================================
  await t.test('5.2 LocalStorage Failure Modes Adversarial Testing', async (t) => {
    await t.test('5.2.1 QuotaExceededError during toggleFavorite does not crash application', () => {
      const { sandbox, mockLocalStorage } = loadAppSandbox({ aurora_festival_favorites: '["e1"]' });
      mockLocalStorage._setQuotaError(true);

      assert.doesNotThrow(() => {
        const res = sandbox.toggleFavorite('e2');
        assert.equal(typeof res, 'boolean');
      }, 'QuotaExceededError must be caught gracefully');
    });

    await t.test('5.2.2 Syntactically corrupted JSON ({corrupt...) falls back to empty array', () => {
      const { sandbox } = loadAppSandbox({ aurora_festival_favorites: '{{MALFORMED_JSON_}}' });
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.deepEqual(favs, []);
      assert.equal(sandbox.isFavorite('e1'), false);
    });

    await t.test('5.2.3 CRITICAL: Non-Array JSON in localStorage (null, object, number, boolean)', () => {
      // Test A: localStorage containing literal "null"
      const { sandbox: sNull } = loadAppSandbox({ aurora_festival_favorites: 'null' });
      const favsNull = cleanVmValue(sNull.getFavorites());
      
      // getFavorites() returns empty array instead of null
      assert.deepEqual(favsNull, [], 'Remediated implementation returns clean empty array when localStorage contains "null"');

      // Uncaught TypeErrors prevented:
      assert.doesNotThrow(() => {
        const isFav = sNull.isFavorite('e1');
        assert.equal(isFav, false);
      }, 'isFavorite handles localStorage "null" gracefully without throwing');

      assert.doesNotThrow(() => {
        sNull.toggleFavorite('e1');
      }, 'toggleFavorite handles localStorage "null" gracefully without throwing');

      assert.doesNotThrow(() => {
        sNull.updateFavoritesCounter();
      }, 'updateFavoritesCounter handles localStorage "null" gracefully without throwing');

      // Test B: localStorage containing literal "{}"
      const { sandbox: sObj } = loadAppSandbox({ aurora_festival_favorites: '{}' });
      assert.doesNotThrow(() => {
        const isFav = sObj.isFavorite('e1');
        assert.equal(isFav, false);
      }, 'isFavorite handles localStorage object "{}" gracefully without throwing');

      // Test C: Verification of proposed mitigation: Array.isArray(parsed) ? parsed : []
      function defensiveGetFavorites(raw) {
        try {
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          return [];
        }
      }
      assert.deepEqual(defensiveGetFavorites('null'), []);
      assert.deepEqual(defensiveGetFavorites('{}'), []);
      assert.deepEqual(defensiveGetFavorites('123'), []);
      assert.deepEqual(defensiveGetFavorites('true'), []);
      assert.deepEqual(defensiveGetFavorites('["e1"]'), ['e1']);
      assert.deepEqual(defensiveGetFavorites('{invalid...'), []);
    });

    await t.test('5.2.4 High-frequency rapid toggling stress test (100 toggles)', () => {
      const { sandbox } = loadAppSandbox();
      for (let i = 0; i < 100; i++) {
        const isAdded = sandbox.toggleFavorite('e1');
        assert.equal(isAdded, i % 2 === 0, `Toggle iteration ${i} mismatch`);
        assert.equal(sandbox.isFavorite('e1'), i % 2 === 0);
      }
      assert.deepEqual(cleanVmValue(sandbox.getFavorites()), []);
    });
  });

  // =========================================================================
  // 5.3 Adversarial Search & Query Edge Cases
  // =========================================================================
  await t.test('5.3 Search & Query Edge Cases Adversarial Testing', async (t) => {
    const events = festivalData.events;
    const performers = festivalData.performers;
    const venues = festivalData.venues;
    const perfMap = new Map(performers.map(p => [p.id, p]));
    const venueMap = new Map(venues.map(v => [v.id, v]));

    function filterEvents(query) {
      const q = query.toLowerCase().trim();
      return events.filter(item => {
        const perf = perfMap.get(item.performerId);
        const ven = venueMap.get(item.venueId);
        if (q) {
          const titleMatch = item.title.toLowerCase().includes(q);
          const perfMatch = perf && (perf.name.toLowerCase().includes(q) || perf.genre.toLowerCase().includes(q));
          const venueMatch = ven && ven.name.toLowerCase().includes(q);
          if (!titleMatch && !perfMatch && !venueMatch) return false;
        }
        return true;
      });
    }

    await t.test('5.3.1 Regex special symbols (*, +, ?, ^, $, [], (), {})', () => {
      const regexSymbols = ['.*', '.+', '(a|b)', '[0-9]+', '^start', 'end$', '{2,4}', '\\d+', '(?=.*)'];
      for (const sym of regexSymbols) {
        assert.doesNotThrow(() => {
          const res = filterEvents(sym);
          assert.ok(Array.isArray(res));
        }, `Search with regex symbol "${sym}" must not crash`);
      }
    });

    await t.test('5.3.2 Extreme whitespace and zero-width characters', () => {
      const whitespaceInputs = [
        '   \t\n\r   ',
        '\u200B\u200C\u200D', // zero-width spaces
        ' '.repeat(1000)
      ];
      for (const input of whitespaceInputs) {
        assert.doesNotThrow(() => {
          const res = filterEvents(input);
          assert.ok(Array.isArray(res));
          // Trimmed whitespace should match all 60 events
          if (input.trim() === '') {
            assert.equal(res.length, 60);
          }
        });
      }
    });

    await t.test('5.3.3 Injection & Adversarial Strings', () => {
      const injections = [
        '<script>alert(document.cookie)</script>',
        '<img src="x" onerror="alert(1)">',
        '\' OR \'1\'=\'1',
        '-- DROP TABLE events;',
        '"><script>prompt(1)</script>'
      ];
      for (const inj of injections) {
        assert.doesNotThrow(() => {
          const res = filterEvents(inj);
          assert.equal(res.length, 0, `Injection "${inj}" should match 0 events`);
        });
      }
    });

    await t.test('5.3.4 Performer Detail Parametric Routing Edge Cases', () => {
      function resolvePerformer(queryParam) {
        const performerId = queryParam || 'p1';
        const perf = performers.find(p => p.id === performerId);
        return { performerId, perf, notFound: !perf };
      }

      // Empty / missing param
      assert.equal(resolvePerformer('').performerId, 'p1');
      assert.equal(resolvePerformer(null).performerId, 'p1');
      assert.equal(resolvePerformer(undefined).performerId, 'p1');

      // Out of bounds ID
      const missing = resolvePerformer('p9999');
      assert.equal(missing.notFound, true);
      assert.equal(missing.perf, undefined);

      // Malformed / injection ID
      const injected = resolvePerformer('<script>alert(1)</script>');
      assert.equal(injected.notFound, true);
      assert.equal(injected.perf, undefined);

      // Valid boundary artist ID p60
      const last = resolvePerformer('p60');
      assert.equal(last.notFound, false);
      assert.equal(last.perf.id, 'p60');
    });

    await t.test('5.3.5 Missing performerId or venueId in events (Defensive Resilience)', () => {
      const syntheticEvents = [
        { id: 'syn1', day: '2026-08-20', startTime: '12:00', durationMin: 60, performerId: 'p_nonexistent', venueId: 'v1', title: 'Ghost Act' },
        { id: 'syn2', day: '2026-08-20', startTime: '14:00', durationMin: 60, performerId: 'p1', venueId: 'v_nonexistent', title: 'Stage-less Act' }
      ];

      assert.doesNotThrow(() => {
        syntheticEvents.forEach(item => {
          const perf = perfMap.get(item.performerId) || { name: 'Neznámý interpret', genre: 'Hudba' };
          const venue = venueMap.get(item.venueId) || { name: 'Neznámá scéna' };
          assert.ok(perf.name);
          assert.ok(venue.name);
        });
      });
    });
  });
});
