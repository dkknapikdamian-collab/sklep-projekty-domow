const fs = require('fs');
const path = require('path');

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, 'utf8');
}

function ensureImport(file, importLine) {
  const current = read(file);
  if (current.includes(importLine)) return;
  write(file, `${importLine}\n${current}`);
  console.log(`PATCHED: ${file} import ${importLine}`);
}

function ensurePackageScripts() {
  const file = 'package.json';
  const json = JSON.parse(read(file));
  json.scripts = json.scripts || {};
  json.scripts['verify:public-service-role-read-v27'] = 'node scripts/check-public-service-role-read-v27.cjs';
  json.scripts['verify:admin-ui-debug-v28'] = 'node scripts/check-admin-ui-debug-v28.cjs';

  const verify = String(json.scripts.verify || '');
  const first = [
    'npm run verify:admin-ui-debug-v28',
    'npm run verify:public-service-role-read-v27'
  ];
  const parts = verify
    .split('&&')
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => !first.includes(item));
  json.scripts.verify = [...first, ...parts].join(' && ');

  write(file, JSON.stringify(json, null, 2) + '\n');
  console.log('PATCHED: package.json V29C verify scripts');
}

ensureImport('app/globals.css', '@import "./admin-ui-debug-v28.css";');
ensureImport('app/globals.css', '@import "./admin-debug-route-v29.css";');
ensurePackageScripts();
console.log('OK: V29C finalizer patch applied.');
