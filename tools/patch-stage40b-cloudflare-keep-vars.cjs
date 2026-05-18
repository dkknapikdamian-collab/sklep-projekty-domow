const fs = require('fs');
const path = require('path');

function readJsonc(p) {
  const raw = fs.readFileSync(p, 'utf8');
  const stripped = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
  return { raw, data: JSON.parse(stripped) };
}

function writeJson(p, data) {
  const ordered = {};
  const firstKeys = [
    '$schema',
    'name',
    'main',
    'compatibility_date',
    'compatibility_flags',
    'keep_vars',
    'assets',
    'observability'
  ];
  for (const k of firstKeys) if (Object.prototype.hasOwnProperty.call(data, k)) ordered[k] = data[k];
  for (const [k, v] of Object.entries(data)) if (!Object.prototype.hasOwnProperty.call(ordered, k)) ordered[k] = v;
  fs.writeFileSync(p, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
}

const root = process.cwd();
const wranglerPath = path.join(root, 'wrangler.jsonc');
if (!fs.existsSync(wranglerPath)) {
  throw new Error('Missing wrangler.jsonc. Run this from the app repo root.');
}
const { data } = readJsonc(wranglerPath);
data.keep_vars = true;
writeJson(wranglerPath, data);
console.log('[Stage40B-FIX] wrangler.jsonc patched: keep_vars=true');
