const fs = require('fs');
const path = require('path');

const root = process.cwd();
const wranglerPath = path.join(root, 'wrangler.jsonc');
const pkgPath = path.join(root, 'package.json');

function fail(message) {
  console.error(`[Stage40B-FIX] FAIL: ${message}`);
  process.exitCode = 1;
}
function ok(message) {
  console.log(`[Stage40B-FIX] OK: ${message}`);
}
function readJsonc(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const stripped = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
  return { raw, json: JSON.parse(stripped) };
}

if (!fs.existsSync(wranglerPath)) fail('wrangler.jsonc missing');
if (!fs.existsSync(pkgPath)) fail('package.json missing');
if (process.exitCode) process.exit(1);

const { raw, json } = readJsonc(wranglerPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (json.keep_vars !== true) fail('wrangler.jsonc must include root keep_vars=true so dashboard runtime vars survive deploys');
else ok('wrangler keep_vars=true present');

const forbiddenLiteralPatterns = [
  /sk_(test|live)_[A-Za-z0-9]/,
  /pk_(test|live)_[A-Za-z0-9]/,
  /whsec_[A-Za-z0-9]/,
  /service_role/i,
  /SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*['\"][^'\"]+['\"]/,
];
for (const pattern of forbiddenLiteralPatterns) {
  if (pattern.test(raw)) fail(`wrangler.jsonc appears to contain secret-like value matching ${pattern}`);
}
if (!process.exitCode) ok('wrangler config does not contain obvious Stripe/Supabase secret values');

const scripts = pkg.scripts || {};
if (scripts['verify:cloudflare-env-persistence-v40b'] !== 'node scripts/check-cloudflare-env-persistence-v40b.cjs') {
  fail('package.json missing verify:cloudflare-env-persistence-v40b');
} else ok('package script present');

if (process.exitCode) process.exit(process.exitCode);
console.log('[Stage40B-FIX] PASS: Cloudflare env persistence guard passed.');
