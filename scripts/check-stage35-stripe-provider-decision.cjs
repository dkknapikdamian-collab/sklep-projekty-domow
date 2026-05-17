const fs = require('fs');
const path = require('path');
const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function requireIncludes(file, needles) {
  if (!fs.existsSync(path.join(root, file))) fail('missing file: ' + file);
  const content = read(file);
  for (const needle of needles) if (!content.includes(needle)) fail(file + ' missing marker: ' + needle);
  return content;
}
requireIncludes('docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md', [
  '35A - Decyzja Damiana: Stripe jako provider V1.1',
  'STRIPE WYBRANY',
  'Damian potwierdził wybór Stripe',
  'Etapu 35B'
]);
requireIncludes('_project/04_DECISIONS.md', [
  'Stripe jako provider płatności V1.1',
  'Status: DECYZJA DAMIANA',
  'Stripe'
]);
requireIncludes('_project/07_NEXT_STEPS.md', [
  '35B',
  'Stripe test-mode foundation',
  'Nie wdrażać live payment'
]);
requireIncludes('_project/runs/2026-05-17_1435_etap35a_stripe_provider_decision.md', [
  'Provider płatności dla V1.1: Stripe',
  'verify:stage35-stripe-provider-decision'
]);
const pkg = JSON.parse(read('package.json'));
if (!pkg.scripts || pkg.scripts['verify:stage35-stripe-provider-decision'] !== 'node scripts/check-stage35-stripe-provider-decision.cjs') fail('package.json missing verify:stage35-stripe-provider-decision script');
if (!String(pkg.scripts.verify || '').includes('verify:stage35-stripe-provider-decision')) fail('main verify script missing stage35 stripe provider decision guard');
console.log('OK: Etap 35A Stripe provider decision guard passed.');
