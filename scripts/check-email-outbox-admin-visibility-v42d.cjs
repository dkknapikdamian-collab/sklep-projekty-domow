const fs = require('fs');
const path = require('path');

const root = process.cwd();
let failed = false;
function read(rel){
  const p = path.join(root, rel);
  if(!fs.existsSync(p)){ console.error('[Stage42D] FAIL missing file:', rel); failed = true; return ''; }
  let text = fs.readFileSync(p, 'utf8');
  if(text.charCodeAt(0) === 0xfeff){ console.error('[Stage42D] FAIL UTF-8 BOM:', rel); failed = true; text = text.slice(1); }
  return text;
}
function ok(condition, message){
  if(condition) console.log('[Stage42D] OK:', message);
  else { console.error('[Stage42D] FAIL:', message); failed = true; }
}

const page = read('app/admin/zamowienia/[id]/page.tsx');
const helper = read('lib/admin/order-fulfillment-readiness.ts');
const pkg = JSON.parse(read('package.json') || '{}');
const docs = read('docs/email/2026-05-19_etap42d_admin_email_outbox_visibility.md');
const product = read('docs/product/2026-05-19_project_store_production_must_haves.md');

ok(page.includes('data-admin-email-outbox-summary-v42d'), 'admin detail has compact email summary');
ok(page.includes('data-admin-email-outbox-latest-v42d'), 'admin detail has detailed latest outbox list');
ok(page.includes('data-admin-email-outbox-provider-id-v42d'), 'admin detail exposes provider message id');
ok(page.includes('data-admin-email-outbox-last-error-v42d'), 'admin detail exposes last error');
ok(page.includes('data-admin-email-outbox-retry-after-v42d'), 'admin detail exposes retry_after');
ok(page.includes('data-admin-manual-email-fallback-collapsed-v42d'), 'manual copy fallback is collapsed');
ok(page.includes('emailStatusLabel') && page.includes('emailStatusTone'), 'admin detail maps raw statuses to operator labels');
ok(helper.includes('providerMessageId: string') && helper.includes('resendEmailId: string'), 'runtime email type contains provider ids');
ok(helper.includes('lastError: string') && helper.includes('retryAfter: string') && helper.includes('attemptCount: number'), 'runtime email type contains error/retry fields');
ok(helper.includes('metadataString(metadata, "providerMessageId")'), 'runtime maps providerMessageId from metadata');
ok(helper.includes('failed_at, retry_after, last_error, attempt_count, metadata'), 'runtime selects failure/retry fields from email_outbox');
ok(docs.includes('42D') && docs.includes('provider_message_id') && docs.includes('last_error'), 'stage docs record admin outbox visibility');
ok(product.includes('P0') && product.includes('Regulamin') && product.includes('SEO'), 'production must-haves doc exists');
ok(pkg.scripts && pkg.scripts['verify:email-outbox-admin-visibility-v42d'] === 'node scripts/check-email-outbox-admin-visibility-v42d.cjs', 'package.json has verify script');

if(failed) process.exit(1);
console.log('[Stage42D] PASS: admin email outbox visibility guard passed.');
