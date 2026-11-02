// Optional authoring check; uses only Node.js built-ins.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const source = JSON.parse(fs.readFileSync(path.join(root, '../data.json'), 'utf8'));
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'), context);
assert.deepEqual(JSON.parse(JSON.stringify(context.window.FESTIVAL_DATA)), source, 'Data mirror differs from source');
for (const key of ['venues', 'performers', 'events']) {
  assert.equal(new Set(source[key].map(item => item.id)).size, source[key].length, 'Duplicate IDs: ' + key);
}
assert.equal(source.performers.length, 60);
assert.equal(source.events.length, 60);
assert.equal(source.venues.length, 3);
assert.equal(new Set(source.events.map(e => e.day)).size, 3);
for (const event of source.events) {
  assert.ok(source.performers.some(p => p.id === event.performerId), 'Unknown performer: ' + event.id);
  assert.ok(source.venues.some(v => v.id === event.venueId), 'Unknown venue: ' + event.id);
  assert.ok(event.durationMin > 0, 'Invalid duration: ' + event.id);
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
new vm.Script(app, { filename: 'app.js' });
for (const match of (html + app).matchAll(/(?:src|href)="((?:assets|css|js)\/[^"?]+)"/g)) {
  assert.ok(fs.existsSync(path.join(root, match[1])), 'Missing local asset: ' + match[1]);
}
assert.ok(!/\bfetch\s*\(|\bXMLHttpRequest\b|type="module"/.test(html + app), 'Unexpected server-dependent loading');
assert.ok(!/(?:src|href)="https?:\/\//.test(html + app), 'Unexpected external runtime asset');
console.log('PASS: data parity, 60 performers, 60 events, 3 days, 3 venues, unique IDs, valid relations, JS syntax, local assets, no runtime network dependencies.');
