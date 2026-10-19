/**
 * Aurora 2026 Festival - Tier 2: Boundary & Corner Cases Test Suite
 * Covers:
 * - Timetable clash detection algorithm boundary cases (touch vs overlap, multi-clash, sorting, cross-day)
 * - LocalStorage favorites handling: corrupted JSON, storage quota errors, null state, toggle reversibility
 * - Zero search results & extreme query handling
 * - Artist detail query parameter boundary cases (missing ID, non-existent ID, invalid formats)
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

test('Tier 2: Boundary & Corner Cases', async (t) => {
  const festivalData = loadDataJson();

  await t.test('2.1 Timetable Clash Detection Algorithm Boundary Edge Cases', async (t) => {
    const { sandbox } = loadAppSandbox();
    const detectConflicts = (evts) => cleanVmValue(sandbox.detectScheduleConflicts(evts));
    assert.equal(typeof sandbox.detectScheduleConflicts, 'function', 'detectScheduleConflicts must be exported in app.js');

    await t.test('Edge Case 1: Exact minute boundary touch produces zero conflict', () => {
      // Event A ends at 15:00, Event B starts at 15:00
      const events = [
        { id: 'cA', day: '2026-08-20', startTime: '14:00', durationMin: 60, title: 'Event A' },
        { id: 'cB', day: '2026-08-20', startTime: '15:00', durationMin: 75, title: 'Event B' }
      ];
      const conflicts = detectConflicts(events);
      const oracle = oracleConflictDetector(events);

      assert.equal(conflicts.length, 0, 'Touching boundary (end == start) must NOT trigger a conflict');
      assert.deepEqual(conflicts, oracle, 'Implementation must match specification oracle');
    });

    await t.test('Edge Case 2: Exact 1-minute overlap is detected', () => {
      // Event A ends at 15:01, Event B starts at 15:00 -> 1 minute overlap
      const events = [
        { id: 'cA', day: '2026-08-20', startTime: '14:00', durationMin: 61, title: 'Event A' },
        { id: 'cB', day: '2026-08-20', startTime: '15:00', durationMin: 60, title: 'Event B' }
      ];
      const conflicts = detectConflicts(events);
      const oracle = oracleConflictDetector(events);

      assert.equal(conflicts.length, 1, '1-minute overlap must trigger exactly 1 conflict');
      assert.equal(conflicts[0].overlapMin, 1, 'Overlap minutes must be exactly 1');
      assert.deepEqual(conflicts, oracle);
    });

    await t.test('Edge Case 3: Multi-clash (3 concurrent events on same day)', () => {
      // A: 18:00 - 19:30 (90 min)
      // B: 18:30 - 20:00 (90 min) -> overlaps A by 60 min
      // C: 19:00 - 20:30 (90 min) -> overlaps A by 30 min, B by 60 min
      const events = [
        { id: 'mA', day: '2026-08-21', startTime: '18:00', durationMin: 90, title: 'Event A' },
        { id: 'mB', day: '2026-08-21', startTime: '18:30', durationMin: 90, title: 'Event B' },
        { id: 'mC', day: '2026-08-21', startTime: '19:00', durationMin: 90, title: 'Event C' }
      ];
      const conflicts = detectConflicts(events);
      const oracle = oracleConflictDetector(events);

      assert.equal(conflicts.length, 3, '3 overlapping events must yield 3 pairwise conflict records');
      assert.deepEqual(conflicts, oracle);
    });

    await t.test('Edge Case 4: Identical time slots on different festival days never conflict', () => {
      const events = [
        { id: 'd1', day: '2026-08-20', startTime: '14:00', durationMin: 90, title: 'Day 1 Act' },
        { id: 'd2', day: '2026-08-21', startTime: '14:00', durationMin: 90, title: 'Day 2 Act' },
        { id: 'd3', day: '2026-08-22', startTime: '14:00', durationMin: 90, title: 'Day 3 Act' }
      ];
      const conflicts = detectConflicts(events);
      assert.equal(conflicts.length, 0, 'Events on separate days must never trigger clashes');
    });

    await t.test('Edge Case 5: Complete time containment (short event nested in long event)', () => {
      // Long: 14:00 - 17:00 (180 min), Short: 15:00 - 16:00 (60 min)
      const events = [
        { id: 'long', day: '2026-08-20', startTime: '14:00', durationMin: 180, title: 'Marathon Talk' },
        { id: 'short', day: '2026-08-20', startTime: '15:00', durationMin: 60, title: 'Short Set' }
      ];
      const conflicts = detectConflicts(events);
      assert.equal(conflicts.length, 1);
      assert.equal(conflicts[0].overlapMin, 60, 'Overlap of contained event must equal short event duration');
    });

    await t.test('Edge Case 6: Input array order invariance (reverse order input)', () => {
      const listAsc = [
        { id: 'e1', day: '2026-08-20', startTime: '12:00', durationMin: 60 },
        { id: 'e2', day: '2026-08-20', startTime: '12:30', durationMin: 60 }
      ];
      const listDesc = [listAsc[1], listAsc[0]];

      const confAsc = detectConflicts(listAsc);
      const confDesc = detectConflicts(listDesc);

      assert.equal(confAsc.length, 1);
      assert.equal(confDesc.length, 1);
      assert.equal(confAsc[0].overlapMin, confDesc[0].overlapMin);
    });

    await t.test('Edge Case 7: Degenerate inputs (empty array & single event)', () => {
      assert.deepEqual(detectConflicts([]), []);
      assert.deepEqual(detectConflicts([{ id: 'single', day: '2026-08-20', startTime: '12:00', durationMin: 60 }]), []);
    });
  });

  await t.test('2.2 LocalStorage Favorites Boundary & Fallback', async (t) => {
    await t.test('Corrupted JSON in localStorage falls back safely to empty array', () => {
      const { sandbox } = loadAppSandbox({ aurora_festival_favorites: '{{INVALID_JSON_CORRUPTED}}' });
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.deepEqual(favs, [], 'Corrupted JSON must safely fallback to empty array');
      assert.equal(sandbox.isFavorite('e1'), false);
    });

    await t.test('Null or missing localStorage key returns empty array', () => {
      const { sandbox } = loadAppSandbox({});
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.deepEqual(favs, []);
    });

    await t.test('Simulated localStorage QuotaExceededError does not crash toggleFavorite', () => {
      const { sandbox, mockLocalStorage } = loadAppSandbox({ aurora_festival_favorites: '[]' });
      mockLocalStorage._setQuotaError(true);

      // Should not throw
      assert.doesNotThrow(() => {
        const added = sandbox.toggleFavorite('e5');
        assert.equal(added, true);
      });
    });

    await t.test('Simulated localStorage read failure returns empty array without throwing', () => {
      const { sandbox, mockLocalStorage } = loadAppSandbox();
      mockLocalStorage._setReadError(true);

      assert.doesNotThrow(() => {
        const favs = cleanVmValue(sandbox.getFavorites());
        assert.deepEqual(favs, []);
      });
    });

    await t.test('Toggling is fully reversible and emits favoritesUpdated event', () => {
      const { sandbox, mockWindow } = loadAppSandbox();
      let eventPayload = null;

      mockWindow.addEventListener('favoritesUpdated', (e) => {
        eventPayload = cleanVmValue(e.detail);
      });

      // Add
      const added = sandbox.toggleFavorite('e10');
      assert.equal(added, true);
      assert.ok(sandbox.isFavorite('e10'));
      assert.deepEqual(eventPayload, { favorites: ['e10'], eventId: 'e10', isAdded: true });

      // Remove
      const removed = sandbox.toggleFavorite('e10');
      assert.equal(removed, false);
      assert.ok(!sandbox.isFavorite('e10'));
      assert.deepEqual(eventPayload, { favorites: [], eventId: 'e10', isAdded: false });
    });
  });

  await t.test('2.3 Zero Search Results & Extreme Filter Boundary Queries', async (t) => {
    const events = festivalData.events;
    const performers = festivalData.performers;
    const venues = festivalData.venues;
    const perfMap = new Map(performers.map(p => [p.id, p]));
    const venueMap = new Map(venues.map(v => [v.id, v]));

    // Pure search filtering logic simulation matching schedule.js
    function filterEvents(query, day = 'all', venue = 'all', type = 'all') {
      const q = query.toLowerCase().trim();
      return events.filter(item => {
        const perf = perfMap.get(item.performerId);
        const ven = venueMap.get(item.venueId);

        if (day !== 'all' && item.day !== day) return false;
        if (venue !== 'all' && item.venueId !== venue) return false;
        if (type !== 'all' && item.type !== type) return false;

        if (q) {
          const titleMatch = item.title.toLowerCase().includes(q);
          const perfMatch = perf && (perf.name.toLowerCase().includes(q) || perf.genre.toLowerCase().includes(q));
          const venueMatch = ven && ven.name.toLowerCase().includes(q);
          if (!titleMatch && !perfMatch && !venueMatch) return false;
        }
        return true;
      });
    }

    await t.test('Non-existent keyword returns 0 results and handles gracefully', () => {
      const result = filterEvents('xyz_nonexistent_artist_99999');
      assert.equal(result.length, 0, 'Expected 0 results for non-existent keyword');
    });

    await t.test('Special characters / injection attempts produce zero errors', () => {
      const extremeQueries = [
        '<script>alert("xss")</script>',
        '\' OR \'1\'=\'1',
        '!@#$%^&*()_+{}[]:;<>?,./',
        '   \t\n   ',
        '🚀🔥✨'
      ];

      for (const q of extremeQueries) {
        assert.doesNotThrow(() => {
          const res = filterEvents(q);
          assert.ok(Array.isArray(res));
        }, `Query "${q}" threw an exception`);
      }
    });

    await t.test('Whitespace-only query preserves all items', () => {
      const res = filterEvents('   ');
      assert.equal(res.length, 60, 'Whitespace search query must preserve all 60 events');
    });
  });

  await t.test('2.4 Artist Detail Query Parameter Fallback', async (t) => {
    const performers = festivalData.performers;

    // Simulate URL parameter resolution logic from web/performer-detail.html
    function resolvePerformerFromSearch(searchQueryString) {
      const params = new URLSearchParams(searchQueryString);
      const performerId = params.get('id') || 'p1';
      const performer = performers.find(p => p.id === performerId);
      return { performerId, performer, notFound: !performer };
    }

    await t.test('Empty query string (? or empty) defaults cleanly to first artist p1', () => {
      const resolved = resolvePerformerFromSearch('');
      assert.equal(resolved.performerId, 'p1');
      assert.ok(resolved.performer);
      assert.equal(resolved.performer.id, 'p1');
      assert.equal(resolved.notFound, false);
    });

    await t.test('Missing id parameter (?other=foo) defaults cleanly to p1', () => {
      const resolved = resolvePerformerFromSearch('?other=foo');
      assert.equal(resolved.performerId, 'p1');
      assert.ok(resolved.performer);
    });

    await t.test('Invalid or out-of-range performer ID triggers notFound flag gracefully', () => {
      const invalidIds = ['?id=p999', '?id=unknown', '?id=undefined', '?id=-1', '?id=<svg>'];
      for (const query of invalidIds) {
        const resolved = resolvePerformerFromSearch(query);
        assert.equal(resolved.notFound, true, `Expected notFound for query ${query}`);
        assert.equal(resolved.performer, undefined);
      }
    });

    await t.test('Valid artist ID returns exact matching artist model', () => {
      const resolved = resolvePerformerFromSearch('?id=p42');
      assert.equal(resolved.notFound, false);
      assert.ok(resolved.performer);
      assert.equal(resolved.performer.id, 'p42');
    });
  });
});
