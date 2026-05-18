const fs = require('fs');
const path = require('path');

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
let ok = true;

function fail(message) {
  ok = false;
  console.error(`[Stage41A] FAIL: ${message}`);
}
function pass(message) {
  console.log(`[Stage41A] OK: ${message}`);
}
function requireFile(file) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`missing file ${file}`);
    return '';
  }
  return read(file);
}
function requireMarker(file, marker) {
  const content = requireFile(file);
  if (!content.includes(marker)) fail(`${file} missing marker: ${marker}`);
  else pass(`${file} contains ${marker}`);
  return content;
}

const emailSource = requireMarker('lib/email/email-outbox.ts', 'EMAIL_OUTBOX_FAKE_PROVIDER_CONTRACT');
[
  'payment_confirmation',
  'project_files_access',
  'idempotency_key',
  'order_id + payment_id + email_type',
  'payment_not_paid_no_email_outbox',
  'fake_noop',
  'queued',
  'skipped',
  'queuePostPaymentEmailOutboxForPaidOrder'
].forEach((marker) => {
  if (!emailSource.includes(marker)) fail(`lib/email/email-outbox.ts missing marker: ${marker}`);
});

if (/postmark|sendgrid|smtp|nodemailer|mailgun/i.test(emailSource)) {
  fail('lib/email/email-outbox.ts contains unsupported real email provider marker');
} else if (/resend/i.test(emailSource) && !emailSource.includes('ETAP42B_RESEND_RUNTIME_INTEGRATION')) {
  fail('lib/email/email-outbox.ts contains Resend marker without Stage42B contract');
} else {
  pass('email outbox source has only approved provider markers');
}

const stripeSource = requireMarker('lib/payments/stripe-payments.ts', 'queuePostPaymentEmailOutboxForPaidOrder');
if (!/const fulfillment\s*=\s*await ensurePostPaymentFulfillmentAccessForOrder/.test(stripeSource)) {
  fail('stripe-payments.ts does not capture fulfillment result before queueing emails');
} else {
  pass('stripe-payments.ts captures fulfillment result before email outbox');
}
if (!/status === "paid"[\s\S]*queuePostPaymentEmailOutboxForPaidOrder/.test(stripeSource)) {
  fail('stripe-payments.ts does not queue email outbox only inside paid branch');
} else {
  pass('stripe-payments.ts queues outbox in paid branch');
}

const sql = requireMarker('supabase/manual/2026-05-18_etap41a_email_outbox_fake_provider.sql', 'create table if not exists public.email_outbox');
[
  "'payment_confirmation'",
  "'project_files_access'",
  "'queued'",
  "'sent'",
  "'failed'",
  "'retry_pending'",
  "'skipped'",
  'idempotency_key text not null unique',
  'fake-provider only'
].forEach((marker) => {
  if (!sql.includes(marker)) fail(`SQL missing marker: ${marker}`);
});

const pkgRaw = requireFile('package.json');
if (pkgRaw.charCodeAt(0) === 0xfeff) fail('package.json has UTF-8 BOM');
const pkg = JSON.parse(pkgRaw);
if (pkg.scripts?.['verify:email-outbox-v41a'] !== 'node scripts/check-email-outbox-v41a.cjs') {
  fail('package.json missing verify:email-outbox-v41a');
} else {
  pass('package.json has verify:email-outbox-v41a');
}

if (!ok) process.exit(1);
console.log('[Stage41A] PASS: email outbox fake-provider guard passed.');
