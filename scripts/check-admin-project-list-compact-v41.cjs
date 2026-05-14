const fs = require('fs');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const css = read('app/admin-v8.css');
const pkg = JSON.parse(read('package.json'));

for (const marker of [
  'STAGE41 ADMIN PROJECT LIST COMPACT START',
  '.admin-projects-table',
  'min-width: 1380px',
  'table-layout: fixed',
  'white-space: nowrap',
  'text-overflow: ellipsis',
  '.admin-projects-table .admin-project-badges',
  'flex-wrap: nowrap',
  '.admin-projects-table .admin-row-actions',
  'overflow-x: auto'
]) {
  if (!css.includes(marker)) fail(`admin compact table css missing marker: ${marker}`);
}

if (!pkg.scripts || pkg.scripts['verify:admin-project-list-compact-v41'] !== 'node scripts/check-admin-project-list-compact-v41.cjs') {
  fail('package.json missing verify:admin-project-list-compact-v41 script.');
}

if (!String(pkg.scripts.verify || '').includes('verify:admin-project-list-compact-v41')) {
  fail('main verify script does not include verify:admin-project-list-compact-v41.');
}

console.log('OK: V41 admin project list compact guard passed.');
