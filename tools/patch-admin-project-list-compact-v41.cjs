const fs = require('fs');
const path = require('path');

const cssPath = path.join(process.cwd(), 'app', 'admin-v8.css');
const packagePath = path.join(process.cwd(), 'package.json');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}

function upsertBlock(source, start, end, block) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return `${source.slice(0, startIndex)}${block}${source.slice(endIndex + end.length)}`;
  }
  const trimmed = source.replace(/\s*$/, '');
  return `${trimmed}\n\n${block}\n`;
}

const start = '/* STAGE41 ADMIN PROJECT LIST COMPACT START */';
const end = '/* STAGE41 ADMIN PROJECT LIST COMPACT END */';
const cssBlock = `${start}
.admin-table-card {
  overflow-x: auto;
  overflow-y: hidden;
}

.admin-projects-table {
  min-width: 1380px;
  table-layout: fixed;
  font-size: 12px;
}

.admin-projects-table th,
.admin-projects-table td {
  padding: 8px 9px;
  line-height: 1.18;
  white-space: nowrap;
  vertical-align: middle;
}

.admin-projects-table tbody tr {
  height: 52px;
}

.admin-projects-table th {
  font-size: 10px;
  letter-spacing: .055em;
}

.admin-projects-table td {
  font-size: 12px;
}

.admin-projects-table th:nth-child(1),
.admin-projects-table td:nth-child(1) { width: 82px; }
.admin-projects-table th:nth-child(2),
.admin-projects-table td:nth-child(2) { width: 170px; }
.admin-projects-table th:nth-child(3),
.admin-projects-table td:nth-child(3) { width: 118px; }
.admin-projects-table th:nth-child(4),
.admin-projects-table td:nth-child(4) { width: 78px; }
.admin-projects-table th:nth-child(5),
.admin-projects-table td:nth-child(5) { width: 62px; }
.admin-projects-table th:nth-child(6),
.admin-projects-table td:nth-child(6) { width: 62px; }
.admin-projects-table th:nth-child(7),
.admin-projects-table td:nth-child(7) { width: 58px; }
.admin-projects-table th:nth-child(8),
.admin-projects-table td:nth-child(8) { width: 96px; }
.admin-projects-table th:nth-child(9),
.admin-projects-table td:nth-child(9) { width: 150px; }
.admin-projects-table th:nth-child(10),
.admin-projects-table td:nth-child(10) { width: 172px; }
.admin-projects-table th:nth-child(11),
.admin-projects-table td:nth-child(11) { width: 106px; }
.admin-projects-table th:nth-child(12),
.admin-projects-table td:nth-child(12) { width: 255px; }

.admin-projects-table td > strong,
.admin-projects-table td > a,
.admin-projects-table td > span,
.admin-projects-table .admin-project-name,
.admin-projects-table .admin-project-name + small,
.admin-projects-table .admin-project-ready,
.admin-projects-table .admin-project-missing {
  overflow: hidden;
  text-overflow: ellipsis;
}

.admin-projects-table td > strong {
  display: inline-block;
  max-width: 100%;
  font-size: 12px;
}

.admin-projects-table .admin-project-name {
  display: inline-block;
  max-width: 82px;
  font-size: 12px;
  line-height: 1.1;
  vertical-align: middle;
}

.admin-projects-table .admin-project-name + small {
  display: inline-block;
  max-width: 66px;
  margin-left: 6px;
  color: rgba(217, 222, 225, .66);
  font-size: 10px;
  line-height: 1.1;
  vertical-align: middle;
}

.admin-projects-table .admin-project-badges {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  overflow: hidden;
  vertical-align: middle;
}

.admin-projects-table .admin-project-badge {
  min-height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 9px;
  line-height: 18px;
}

.admin-projects-table .admin-project-ready,
.admin-projects-table .admin-project-missing {
  display: inline-block;
  max-width: 100%;
  font-size: 12px;
  line-height: 1.15;
}

.admin-projects-table .admin-project-ready {
  font-weight: 900;
}

.admin-projects-table td:nth-child(10) a,
.admin-projects-table td:nth-child(11) {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.admin-projects-table .admin-row-actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  overflow: hidden;
}

.admin-projects-table .admin-row-actions a,
.admin-projects-table .admin-row-actions button {
  min-height: 28px;
  padding: 0 7px;
  font-size: 10px;
  line-height: 1;
}

.admin-projects-table .admin-inline-form {
  display: inline-flex;
  margin: 0;
}

@media (max-width: 980px) {
  .admin-projects-table {
    min-width: 1260px;
  }
}
${end}`;

let css = read(cssPath);
css = upsertBlock(css, start, end, cssBlock);
write(cssPath, css);
console.log('PATCHED: app/admin-v8.css compact admin projects table styles.');

const pkg = JSON.parse(read(packagePath));
pkg.scripts = pkg.scripts || {};
pkg.scripts['verify:admin-project-list-compact-v41'] = 'node scripts/check-admin-project-list-compact-v41.cjs';

const verifyToken = 'npm run verify:admin-project-list-compact-v41';
const currentVerify = String(pkg.scripts.verify || '');
if (!currentVerify.includes(verifyToken)) {
  pkg.scripts.verify = `${verifyToken} && ${currentVerify}`;
}

write(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log('PATCHED: package.json verify:admin-project-list-compact-v41.');
console.log('OK: V41 admin project list compact patch applied.');
