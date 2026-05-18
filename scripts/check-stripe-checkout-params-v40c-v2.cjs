const fs = require('fs');
const path = require('path');
const repo = process.cwd();
const targets = [
  path.join(repo, 'lib', 'payments', 'stripe-payments.ts'),
  path.join(repo, 'app', 'api', 'payments', 'stripe'),
];
let bad = [];
function walk(p) {
  if (!fs.existsSync(p)) return;
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const name of fs.readdirSync(p)) walk(path.join(p, name));
    return;
  }
  if (!/\.(ts|tsx|js|jsx)$/.test(p)) return;
  const t = fs.readFileSync(p, 'utf8');
  if (t.includes('automatic_payment_methods')) bad.push(path.relative(repo, p));
}
for (const t of targets) walk(t);
if (bad.length) {
  console.error('[Stage40C-V2] FAIL: unsupported automatic_payment_methods remains in runtime Stripe source:');
  for (const f of bad) console.error(' - ' + f);
  process.exit(1);
}
console.log('[Stage40C-V2] PASS: Stripe Checkout runtime source has no automatic_payment_methods parameter.');
