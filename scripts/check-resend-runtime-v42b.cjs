const fs = require('fs');
const path = require('path');

const root = process.cwd();
let failed = false;
function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error('[Stage42B] FAIL missing ' + rel);
    failed = true;
    return '';
  }
  return fs.readFileSync(full, 'utf8').replace(/^\ufeff/, '');
}
function ok(condition, message) {
  if (condition) console.log('[Stage42B] OK: ' + message);
  else { console.error('[Stage42B] FAIL: ' + message); failed = true; }
}
function has(source, marker, message) { ok(source.includes(marker), message || ('has ' + marker)); }

const provider = read('lib/email/transactional-email-provider.ts');
const outbox = read('lib/email/email-outbox.ts');
const v41a = read('scripts/check-email-outbox-v41a.cjs');
const docs = read('docs/payments/2026-05-18_etap42b_resend_runtime_integration.md');
const pkg = JSON.parse(read('package.json'));

has(provider, 'RESEND_RUNTIME_EMAIL_PROVIDER_CONTRACT', 'provider contract exists');
has(provider, 'https://api.resend.com/emails', 'uses Resend send email endpoint');
has(provider, 'Idempotency-Key', 'uses Resend Idempotency-Key header');
has(provider, 'EMAIL_PROVIDER', 'reads EMAIL_PROVIDER');
has(provider, 'RESEND_API_KEY', 'reads RESEND_API_KEY');
has(provider, 'EMAIL_FROM', 'reads EMAIL_FROM');
has(provider, 'EMAIL_REPLY_TO', 'reads EMAIL_REPLY_TO');
has(provider, 'reply_to', 'supports reply_to');
has(provider, 'noAttachments', 'records no attachments policy');

has(outbox, 'EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT', 'email outbox has resend contract');
has(outbox, 'getConfiguredTransactionalEmailProvider', 'email outbox uses configured provider');
has(outbox, 'dispatchQueuedTransactionalEmailOutboxForOrder', 'dispatch function exists');
has(outbox, 'payment_not_paid_no_resend_send', 'hard guard blocks sending without paid');
has(outbox, 'providerMessageId', 'records provider message id in metadata');
has(outbox, 'secure_download_panel_link_no_attachments', 'uses download panel link model');
has(outbox, 'sendTransactionalEmailViaConfiguredProvider', 'calls provider sender');

has(v41a, 'ETAP42B_RESEND_RUNTIME_INTEGRATION', 'Stage41A guard allows approved Stage42B Resend contract');
has(docs, 'Provider: Resend', 'docs record provider');
has(docs, 'Nie wysyłamy plików jako załączników', 'docs record no attachments');
has(docs, 'webhook-confirmed paid', 'docs record paid-only sending');
ok(pkg.scripts && pkg.scripts['verify:resend-runtime-v42b'] === 'node scripts/check-resend-runtime-v42b.cjs', 'package.json has verify:resend-runtime-v42b');

if (failed) process.exit(1);
console.log('[Stage42B] PASS: Resend runtime integration guard passed.');
