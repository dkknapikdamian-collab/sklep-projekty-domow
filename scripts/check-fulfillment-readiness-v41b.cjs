const fs = require('fs');
const path = require('path');

const root = process.cwd();
let failed = false;

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`[Stage41B] FAIL: missing ${rel}`);
    failed = true;
    return '';
  }
  const text = fs.readFileSync(full, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) {
    console.error(`[Stage41B] FAIL: ${rel} has UTF-8 BOM`);
    failed = true;
  }
  return text.replace(/^\ufeff/, '');
}

function ok(condition, message) {
  if (condition) console.log(`[Stage41B] OK: ${message}`);
  else {
    console.error(`[Stage41B] FAIL: ${message}`);
    failed = true;
  }
}

const helper = read('lib/admin/order-fulfillment-readiness.ts');
const page = read('app/admin/zamowienia/[id]/page.tsx');
const actions = read('app/admin/zamowienia/actions.ts');
const pkgRaw = read('package.json');

ok(helper.includes('ADMIN_ORDER_FULFILLMENT_READINESS_CONTRACT'), 'helper contract exists');
ok(helper.includes('getAdminOrderFulfillmentReadiness'), 'helper computes readiness');
ok(helper.includes('getAdminOrderPostPaymentRuntime'), 'helper loads runtime rows');
ok(helper.includes('retryPostPaymentFulfillmentForOrder'), 'helper exposes retry function');
ok(helper.includes('order_fulfillment_access'), 'helper reads order_fulfillment_access');
ok(helper.includes('email_outbox'), 'helper reads email_outbox');
ok(helper.includes('queuePostPaymentEmailOutboxForPaidOrder'), 'retry queues fake-provider email outbox');
ok(helper.includes('ensurePostPaymentFulfillmentAccessForOrder'), 'retry regenerates fulfillment access');
ok(helper.includes('manual_review_required') || helper.includes('missingRequiredCount'), 'helper exposes manual review/missing state');

ok(actions.includes('retryOrderPostPaymentFulfillmentAction'), 'server action exists');
ok(actions.includes('retryPostPaymentFulfillmentForOrder'), 'server action calls retry helper');
ok(actions.includes('order_post_payment_fulfillment_retry'), 'server action writes audit log');
ok(actions.includes('fulfillmentRetry='), 'server action redirects with retry status');

ok(page.includes('data-admin-order-post-payment-readiness-v41b'), 'admin detail has readiness panel marker');
ok(page.includes('data-admin-order-fulfillment-retry-form-v41b'), 'admin detail has retry form marker');
ok(page.includes('data-admin-fulfillment-missing-files-v41b'), 'admin detail shows missing file marker');
ok(page.includes('data-admin-email-outbox-latest-v41b'), 'admin detail shows latest email outbox marker');
ok(page.includes('Europe/Warsaw'), 'admin date formatting uses Europe/Warsaw');
ok(page.includes('getAdminOrderPostPaymentRuntime(order.id)'), 'admin detail loads runtime state');
ok(page.includes('<OrderPostPaymentAutomationPanel order={order} runtime={postPaymentRuntime} />'), 'admin detail renders readiness panel');

try {
  const pkg = JSON.parse(pkgRaw);
  ok(pkg.scripts && pkg.scripts['verify:fulfillment-readiness-v41b'] === 'node scripts/check-fulfillment-readiness-v41b.cjs', 'package.json has verify:fulfillment-readiness-v41b');
} catch (error) {
  console.error(`[Stage41B] FAIL: package.json parse failed: ${error.message}`);
  failed = true;
}

if (failed) process.exit(1);
console.log('[Stage41B] PASS: fulfillment readiness/retry guard passed.');
