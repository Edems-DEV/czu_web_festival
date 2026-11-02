// Optional authoring tool. Node.js is NOT required to open the prototype.
const fs = require('node:fs');
const path = require('node:path');
const source = path.join(__dirname, '../../data.json');
const target = path.join(__dirname, '../js/data.js');
const data = JSON.parse(fs.readFileSync(source, 'utf8'));
fs.writeFileSync(target, '// Generated from ../data.json; regenerate with tools/sync-data.cjs.\nwindow.FESTIVAL_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Updated prototype2/js/data.js from checkpoint data.json.');
