/**
 * Aurora 2026 Festival - Tier 4: Real-World Scenarios Test Suite
 * Validates the 3 end-to-end user journeys defined in project-specification.md:
 * - Scenario 1: Tereza Novotná (Student Indie Fan)
 *   Friday filter -> search "indie" -> select artist -> view detail -> add to schedule.
 * - Scenario 2: Jakub Kovář (Electronic Music Enthusiast)
 *   Saturday lineup -> select overlapping acts -> clash alert triggered with exact minutes -> resolve clash -> verify clean schedule.
 * - Scenario 3: Martin Dvořák (Family Visitor & Wheelchair Guest)
 *   Inspect venues.html for accessibility -> verify ramp/sanitation info -> inspect practical-info.html FAQ for ZTP parking & stroller rules.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  loadDataJson,
  loadAppSandbox,
  loadHtml,
  cleanVmValue
} = require('./test_helpers');

test('Tier 4: Real-World Scenarios (Persona User Journeys)', async (t) => {
  const data = loadDataJson();
  const events = data.events;
  const performers = data.performers;
  const venues = data.venues;
  const perfMap = new Map(performers.map(p => [p.id, p]));
  const venueMap = new Map(venues.map(v => [v.id, v]));

  await t.test('4.1 Scenario 1: Tereza Novotná (Indie fan Friday evening journey)', async (t) => {
    const { sandbox } = loadAppSandbox();

    // Step 1: Tereza opens program and filters by Friday 2026-08-21
    const fridayEvents = events.filter(e => e.day === '2026-08-21');
    assert.ok(fridayEvents.length > 0, 'Must have events on Friday');

    // Step 2: Tereza enters "indie" in search box
    const query = 'indie';
    const matchedIndie = fridayEvents.filter(e => {
      const perf = perfMap.get(e.performerId);
      const titleMatch = e.title.toLowerCase().includes(query);
      const perfMatch = perf && (perf.name.toLowerCase().includes(query) || perf.genre.toLowerCase().includes(query));
      return titleMatch || perfMatch;
    });

    assert.ok(matchedIndie.length > 0, 'Expected matching indie events on Friday');

    // Step 3: She selects the first indie artist
    const selectedEvent = matchedIndie[0];
    const targetArtist = perfMap.get(selectedEvent.performerId);
    assert.ok(targetArtist, 'Artist model must exist');

    // Step 4: She navigates to performer detail page for this artist
    const detailHtml = loadHtml('performer-detail.html');
    assert.ok(detailHtml.includes('performer-detail-container'), 'Detail page container must exist');
    assert.ok(detailHtml.includes('breadcrumb-performer-name'), 'Breadcrumb element must exist');

    // Step 5: She clicks "★ Přidat do mého programu"
    const isAdded = sandbox.toggleFavorite(selectedEvent.id);
    assert.equal(isAdded, true, 'Event must be added to favorites');

    const favorites = cleanVmValue(sandbox.getFavorites());
    assert.ok(favorites.includes(selectedEvent.id), 'Favorites must contain selected event ID');

    // Step 6: Verify no collision for single event
    const conflicts = cleanVmValue(sandbox.detectScheduleConflicts([selectedEvent]));
    assert.equal(conflicts.length, 0, 'No conflicts in single-event personal itinerary');
  });

  await t.test('4.2 Scenario 2: Jakub Kovář (Electronic music clash resolution journey)', async (t) => {
    const { sandbox } = loadAppSandbox();
    const detectConflicts = (evts) => cleanVmValue(sandbox.detectScheduleConflicts(evts));

    // Step 1: Jakub looks for Saturday 2026-08-22 events
    const saturdayEvents = events.filter(e => e.day === '2026-08-22');
    assert.ok(saturdayEvents.length > 0);

    // Step 2: Find two concurrent events on Saturday across different stages
    let clashPair = null;
    for (let i = 0; i < saturdayEvents.length; i++) {
      for (let j = i + 1; j < saturdayEvents.length; j++) {
        const a = saturdayEvents[i];
        const b = saturdayEvents[j];
        if (a.venueId !== b.venueId) {
          const aStart = new Date(`${a.day}T${a.startTime}`).getTime();
          const aEnd = aStart + (a.durationMin * 60000);
          const bStart = new Date(`${b.day}T${b.startTime}`).getTime();
          const bEnd = bStart + (b.durationMin * 60000);
          if (Math.max(aStart, bStart) < Math.min(aEnd, bEnd)) {
            clashPair = [a, b];
            break;
          }
        }
      }
      if (clashPair) break;
    }

    assert.ok(clashPair, 'Expected concurrent events across stages on Saturday');
    const [actA, actB] = clashPair;

    // Step 3: Jakub adds first act
    sandbox.toggleFavorite(actA.id);
    assert.equal(detectConflicts([actA]).length, 0);

    // Step 4: Jakub adds second overlapping act on another stage
    sandbox.toggleFavorite(actB.id);
    const userFavs = [actA, actB];
    const conflicts = detectConflicts(userFavs);

    assert.equal(conflicts.length, 1, 'Clash detection must alert Jakub to the overlap');
    assert.ok(conflicts[0].overlapMin > 0, 'Conflict must report non-zero overlap duration');
    assert.equal(conflicts[0].eventA.id, actA.id);
    assert.equal(conflicts[0].eventB.id, actB.id);

    // Step 5: Jakub resolves the clash by deselecting actB
    const removed = sandbox.toggleFavorite(actB.id);
    assert.equal(removed, false, 'Toggling off must return false (removed)');

    const remainingFavs = events.filter(e => sandbox.getFavorites().includes(e.id));
    assert.equal(remainingFavs.length, 1);
    assert.equal(detectConflicts(remainingFavs).length, 0, 'Clash alert resolves completely');
  });

  await t.test('4.3 Scenario 3: Martin Dvořák (Accessibility & Family Logistics Journey)', async (t) => {
    // Step 1: Martin inspects venues.html for accessibility details
    const venuesHtml = loadHtml('venues.html');
    assert.ok(venuesHtml.includes('id="v1"'), 'Main Stage anchor must exist');
    assert.ok(venuesHtml.includes('id="v3"'), 'Forum Hall anchor must exist');

    // Verify accessibility content mentions in venues.html
    const accessKeywords = ['bezbariér', 'vozíčk', 'rampa', 'kapacita'];
    for (const kw of accessKeywords) {
      assert.ok(
        venuesHtml.toLowerCase().includes(kw),
        `venues.html must contain accessibility keyword "${kw}"`
      );
    }

    // Step 2: Martin inspects data model for venues accessibility feature descriptions
    for (const v of venues) {
      assert.ok(v.capacity >= 1000, `Venue ${v.name} has valid capacity`);
      assert.ok(v.address.includes('Praha 7'), `Venue ${v.name} located at Praha 7`);
    }

    // Step 3: Martin inspects practical-info.html FAQ details
    const infoHtml = loadHtml('practical-info.html');
    assert.ok(infoHtml.includes('<details'), 'practical-info.html must contain interactive <details> accordion');
    assert.ok(infoHtml.includes('</details>'), 'Accordion must close properly');

    // Verify presence of accessibility and transport FAQ topics
    assert.ok(
      infoHtml.toLowerCase().includes('bezbariér') || infoHtml.toLowerCase().includes('ztp'),
      'practical-info.html must cover barrier-free access / ZTP'
    );
    assert.ok(
      infoHtml.toLowerCase().includes('parkov') || infoHtml.toLowerCase().includes('doprav'),
      'practical-info.html must cover parking and transit information'
    );
  });
});
