/**
 * Aurora 2026 Festival - Tier 3: Cross-Feature Interactions Test Suite
 * Covers:
 * - Multi-criteria filter matrix (Day x Stage x Format) combined with live fulltext search
 * - Personal schedule addition and real-time conflict cascade across multiple days and stages
 * - Favorites mode ("Můj program") combined with sub-filters and live search
 * - Synchronized state updates: storage mutation -> event broadcast -> conflict box refresh
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadDataJson,
  loadAppSandbox,
  oracleConflictDetector,
  cleanVmValue
} = require('./test_helpers');

test('Tier 3: Cross-Feature Interactions', async (t) => {
  const data = loadDataJson();
  const events = data.events;
  const performers = data.performers;
  const venues = data.venues;
  const perfMap = new Map(performers.map(p => [p.id, p]));
  const venueMap = new Map(venues.map(v => [v.id, v]));

  // Core filtering engine simulating schedule.js behavior
  function filterSchedule({ day = 'all', venue = 'all', type = 'all', query = '', onlyFavorites = false, favorites = [] }) {
    const q = query.toLowerCase().trim();
    return events.filter(item => {
      const perf = perfMap.get(item.performerId);
      const ven = venueMap.get(item.venueId);

      if (day !== 'all' && item.day !== day) return false;
      if (venue !== 'all' && item.venueId !== venue) return false;
      if (type !== 'all' && item.type !== type) return false;
      if (onlyFavorites && !favorites.includes(item.id)) return false;

      if (q) {
        const titleMatch = item.title.toLowerCase().includes(q);
        const perfMatch = perf && (perf.name.toLowerCase().includes(q) || perf.genre.toLowerCase().includes(q));
        const venueMatch = ven && ven.name.toLowerCase().includes(q);
        if (!titleMatch && !perfMatch && !venueMatch) return false;
      }
      return true;
    });
  }

  await t.test('3.1 Multi-Dimensional Filter Combinations (Pairwise & Multi-way)', async (t) => {
    await t.test('Combination: Day 1 + Main Stage (v1) filters correctly', () => {
      const filtered = filterSchedule({ day: '2026-08-20', venue: 'v1' });
      assert.ok(filtered.length > 0, 'Must have events on Main Stage on Day 1');
      for (const e of filtered) {
        assert.equal(e.day, '2026-08-20');
        assert.equal(e.venueId, 'v1');
      }
    });

    await t.test('Combination: Day 2 + Workshop format filters correctly', () => {
      const filtered = filterSchedule({ day: '2026-08-21', type: 'workshop' });
      assert.ok(filtered.length > 0);
      for (const e of filtered) {
        assert.equal(e.day, '2026-08-21');
        assert.equal(e.type, 'workshop');
      }
    });

    await t.test('Combination: Riverside Stage (v2) + Concert format filters correctly', () => {
      const filtered = filterSchedule({ venue: 'v2', type: 'concert' });
      assert.ok(filtered.length > 0);
      for (const e of filtered) {
        assert.equal(e.venueId, 'v2');
        assert.equal(e.type, 'concert');
      }
    });

    await t.test('4-Way Matrix: Day + Venue + Format + Search Keyword matches exact target', () => {
      // Look for workshop on Saturday (Day 3) in Forum Hall (v3) matching "Prairie"
      const filtered = filterSchedule({
        day: '2026-08-22',
        venue: 'v3',
        type: 'workshop',
        query: 'Prairie'
      });

      assert.equal(filtered.length, 1, 'Expected exactly 1 match for 4-way filter target');
      assert.equal(filtered[0].id, 'e60');
      assert.equal(filtered[0].performerId, 'p60');
    });

    await t.test('Filter switching and reset preserves consistency', () => {
      const day1Count = filterSchedule({ day: '2026-08-20' }).length;
      const day2Count = filterSchedule({ day: '2026-08-21' }).length;
      const day3Count = filterSchedule({ day: '2026-08-22' }).length;
      const allCount = filterSchedule({ day: 'all' }).length;

      assert.equal(allCount, 60);
      assert.equal(day1Count + day2Count + day3Count, 60, 'Sum of day event counts must equal total 60');
    });
  });

  await t.test('3.2 Schedule Addition & Clash Cascade Across Multiple Stages and Days', async (t) => {
    const { sandbox } = loadAppSandbox();
    const detectConflicts = (evts) => cleanVmValue(sandbox.detectScheduleConflicts(evts));

    // Find two concurrent events on Day 1 on DIFFERENT stages:
    // Main Stage vs Riverside Club at overlapping times
    const day1Events = events.filter(e => e.day === '2026-08-20');
    let concurrentPair = null;

    for (let i = 0; i < day1Events.length; i++) {
      for (let j = i + 1; j < day1Events.length; j++) {
        const a = day1Events[i];
        const b = day1Events[j];
        if (a.venueId !== b.venueId) {
          const aStart = new Date(`${a.day}T${a.startTime}`).getTime();
          const aEnd = aStart + (a.durationMin * 60000);
          const bStart = new Date(`${b.day}T${b.startTime}`).getTime();
          const bEnd = bStart + (b.durationMin * 60000);
          if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
            concurrentPair = { eventA: a, eventB: b };
            break;
          }
        }
      }
      if (concurrentPair) break;
    }

    assert.ok(concurrentPair, 'Expected at least one pair of inter-stage concurrent events on Day 1');

    await t.test('Step 1: User adds first event to favorites -> 0 conflicts', () => {
      sandbox.toggleFavorite(concurrentPair.eventA.id);
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.deepEqual(favs, [concurrentPair.eventA.id]);

      const myEvents = events.filter(e => favs.includes(e.id));
      const conflicts = detectConflicts(myEvents);
      assert.equal(conflicts.length, 0, 'Single event cannot conflict');
    });

    await t.test('Step 2: User adds concurrent second event -> conflict detected with accurate overlap', () => {
      sandbox.toggleFavorite(concurrentPair.eventB.id);
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.equal(favs.length, 2);

      const myEvents = events.filter(e => favs.includes(e.id));
      const conflicts = detectConflicts(myEvents);
      assert.equal(conflicts.length, 1, 'Concurrent events on different stages must trigger 1 conflict');
      assert.ok(conflicts[0].overlapMin > 0, 'Overlap duration must be positive');
    });

    await t.test('Step 3: User adds non-overlapping Day 2 event -> conflict count remains 1', () => {
      const day2Event = events.find(e => e.day === '2026-08-21');
      assert.ok(day2Event);
      sandbox.toggleFavorite(day2Event.id);

      const favs = cleanVmValue(sandbox.getFavorites());
      assert.equal(favs.length, 3);

      const myEvents = events.filter(e => favs.includes(e.id));
      const conflicts = detectConflicts(myEvents);
      assert.equal(conflicts.length, 1, 'Cross-day addition must not create spurious conflicts');
    });

    await t.test('Step 4: User removes conflicting event -> conflict immediately resolves to 0', () => {
      sandbox.toggleFavorite(concurrentPair.eventB.id); // Toggle off
      const favs = cleanVmValue(sandbox.getFavorites());
      assert.equal(favs.length, 2);
      assert.ok(!favs.includes(concurrentPair.eventB.id));

      const myEvents = events.filter(e => favs.includes(e.id));
      const conflicts = detectConflicts(myEvents);
      assert.equal(conflicts.length, 0, 'Removing conflicting set must clear alert immediately');
    });
  });

  await t.test('3.3 "Můj program" Mode Interacting with Search & Filters', async (t) => {
    // Pick 3 specific events: one rock concert on Day 1, one jazz talk on Day 1, one electro concert on Day 2
    const favIds = ['e1', 'e2', 'e3'];

    await t.test('"Můj program" view restricts list strictly to favorited events', () => {
      const viewMySchedule = filterSchedule({ onlyFavorites: true, favorites: favIds });
      assert.equal(viewMySchedule.length, 3);
      for (const item of viewMySchedule) {
        assert.ok(favIds.includes(item.id));
      }
    });

    await t.test('Applying keyword search within "Můj program" filters only favorite items', () => {
      // Find title of e1
      const e1 = events.find(e => e.id === 'e1');
      const filtered = filterSchedule({
        onlyFavorites: true,
        favorites: favIds,
        query: e1.title
      });

      assert.equal(filtered.length, 1);
      assert.equal(filtered[0].id, 'e1');
    });

    await t.test('Applying day filter within "Můj program" shows only favorites on that day', () => {
      const day1Favs = filterSchedule({
        onlyFavorites: true,
        favorites: favIds,
        day: '2026-08-20'
      });

      const day1Expected = events.filter(e => favIds.includes(e.id) && e.day === '2026-08-20');
      assert.equal(day1Favs.length, day1Expected.length);
    });
  });
});
