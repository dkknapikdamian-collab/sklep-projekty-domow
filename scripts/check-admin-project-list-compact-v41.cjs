const fs = require('fs');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = read('app/admin/projekty/page.tsx');
const table = read('components/admin/AdminProjectsTable.tsx');
const css = read('app/admin-v8.css');
const pkg = JSON.parse(read('package.json'));

for (const marker of [
  'admin-shell admin-projects-shell',
  'admin-projects-table-card',
  'admin-projects-table-wrap',
  'data-admin-projects-table-scroll="true"',
  'admin-project-identity',
  'title={project.canPublish ? "Gotowy do publikacji" : `Braki: ${missingText}`}',
  'title={publicHref}'
]) {
  const source = marker.includes('admin-shell') ? page : table;
  if (!source.includes(marker)) fail(`admin projects layout source missing marker: ${marker}`);
}

for (const marker of [
  'STAGE41 ADMIN PROJECT LIST COMPACT START',
  'ETAP10 ADMIN PROJECTS FULL WIDTH LAYOUT',
  '.admin-shell.admin-projects-shell',
  'max-width: none',
  '.admin-projects-table-card',
  'overflow-x: auto',
  'min-width: 1600px',
  'table-layout: fixed',
  'white-space: nowrap',
  'text-overflow: ellipsis',
  '.admin-projects-table .admin-project-identity',
  '.admin-projects-table .admin-project-badges',
  'flex-wrap: nowrap',
  '.admin-projects-table .admin-row-actions',
  '.admin-projects-table .admin-delete-safety'
]) {
  if (!css.includes(marker)) fail(`admin compact table css missing marker: ${marker}`);
}

const stage41Start = css.indexOf('/* STAGE41 ADMIN PROJECT LIST COMPACT START */');
const stage41End = css.indexOf('/* STAGE41 ADMIN PROJECT LIST COMPACT END */');
if (stage41Start < 0 || stage41End < 0 || stage41End <= stage41Start) {
  fail('cannot locate Stage41 admin project list compact css block.');
}

const stage41Block = css.slice(stage41Start, stage41End);
for (const forbidden of [
  'table-layout: auto',
  '.admin-table-card {\n  overflow: visible;',
  'white-space: normal;'
]) {
  if (stage41Block.includes(forbidden)) {
    fail(`Stage41 admin projects layout reintroduced forbidden wrapping/visible overflow marker: ${forbidden}`);
  }
}

if (!pkg.scripts || pkg.scripts['verify:admin-project-list-compact-v41'] !== 'node scripts/check-admin-project-list-compact-v41.cjs') {
  fail('package.json missing verify:admin-project-list-compact-v41 script.');
}

if (!String(pkg.scripts.verify || '').includes('verify:admin-project-list-compact-v41')) {
  fail('main verify script does not include verify:admin-project-list-compact-v41.');
}

console.log('OK: V41/Etap10 admin project list responsive full-width layout guard passed.');
