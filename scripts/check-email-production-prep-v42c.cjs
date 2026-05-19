const fs = require('fs');
const path = require('path');

const root = process.cwd();
let failed = false;

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error('[Stage42C] FAIL missing file:', rel);
    failed = true;
    return '';
  }
  let text = fs.readFileSync(full, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) {
    console.error('[Stage42C] FAIL UTF-8 BOM:', rel);
    failed = true;
    text = text.slice(1);
  }
  return text;
}
function ok(condition, message) {
  if (condition) console.log('[Stage42C] OK:', message);
  else { console.error('[Stage42C] FAIL:', message); failed = true; }
}

const email = read('lib/email/email-outbox.ts');
const paymentDraftMatch = email.match(/function buildPaymentConfirmationDraft[\s\S]*?\n}\n\nasync function upsertOutboxEmail/);
const paymentDraft = paymentDraftMatch ? paymentDraftMatch[0] : '';
ok(Boolean(paymentDraft), 'payment confirmation draft block found');
ok(!/fake-provider|Realna wysyłka e-mail zostanie podłączona|kolejnym etapie/i.test(paymentDraft), 'payment confirmation copy is production-facing');
ok(paymentDraft.includes('bezpiecznym linkiem do panelu pobrania'), 'payment confirmation mentions secure download panel link');
ok(email.includes('EMAIL_OUTBOX_RESEND_PROVIDER_CONTRACT'), 'Resend contract remains in email outbox');
ok(email.includes('payment_not_paid_no_email_outbox'), 'paid-only outbox guard remains');
ok(email.includes('secure_download_panel_link_no_attachments'), 'no attachments delivery model remains');

const provider = read('lib/email/transactional-email-provider.ts');
ok(provider.includes('sendsAttachments: false'), 'provider contract forbids attachments');
ok(provider.includes('Idempotency-Key'), 'provider uses Resend idempotency key');
ok(provider.includes('EMAIL_PROVIDER') && provider.includes('RESEND_API_KEY') && provider.includes('EMAIL_FROM'), 'provider reads required env');

const sql = read('supabase/manual/2026-05-19_etap42c_email_outbox_admin_view.sql');
ok(sql.includes('create or replace view public.email_outbox_admin_view'), 'admin SQL view exists');
ok(sql.includes("metadata ->> 'providerMessageId'"), 'SQL view exposes providerMessageId from metadata');
ok(sql.includes("metadata ->> 'accessUrl'"), 'SQL view exposes accessUrl from metadata');

const docs = read('docs/email/2026-05-19_etap42c_production_email_templates_pre_domain.md');
ok(docs.includes('REALNY TEST PO PODPIĘCIU DOMENY'), 'docs record deferred real test');
ok(docs.includes('nie ustawiamy EMAIL_PROVIDER=resend'), 'docs block real provider before domain');
ok(docs.includes('Pliki projektu, rzuty i ZIP-y nie idą jako załączniki'), 'docs record no attachments');
ok(docs.includes('webhook-confirmed statusie płatności paid'), 'docs record paid-only sending');

const checklist = read('docs/email/2026-05-19_resend_domain_later_checklist.md');
ok(checklist.includes('mail.dudekhomeprojekty.pl'), 'domain checklist records recommended subdomain');
ok(checklist.includes('Open tracking off') && checklist.includes('Click tracking off'), 'domain checklist records tracking off');

const pkg = JSON.parse(read('package.json'));
ok(pkg.scripts && pkg.scripts['verify:email-production-prep-v42c'] === 'node scripts/check-email-production-prep-v42c.cjs', 'package.json has verify:email-production-prep-v42c');

if (failed) process.exit(1);
console.log('[Stage42C] PASS: pre-domain email production prep guard passed.');
