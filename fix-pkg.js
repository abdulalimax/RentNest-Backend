const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['build'] = 'npx tsc';
pkg.scripts['start'] = 'node dist/server.js';
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
console.log("? package.json updated with build and start scripts!");
