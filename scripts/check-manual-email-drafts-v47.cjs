const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

for (const file of [
  "lib/admin/order-email-drafts.ts",
  "lib/admin/orders-admin.ts",
  "app/admin/zamowienia/[id]/page.tsx",
  "app/admin-v8.css",
  "package.json"
]) {
  if (!exists(file)) fail(`missing manual email drafts file: ${file}`);
}

const drafts = read("lib/admin/order-email-drafts.ts");
for (const marker of [
  "buildManualOrderEmailDrafts",
  "ManualOrderEmailDraft",
  "order_confirmation",
  "payment_confirmed",
  "files_delivery",
  "E-mail: potwierdzenie zamówienia",
  "E-mail: płatność potwierdzona",
  "E-mail: wysyłka plików",
  "Potwierdzenie zamówienia",
  "Płatność potwierdzona",
  "Pliki do zamówienia",
  "itemsSummary",
  "privateFilesSummary",
  "hasPdfEmailAddon"
]) {
  if (!drafts.includes(marker)) fail(`order email drafts helper missing marker: ${marker}`);
}

const detail = read("app/admin/zamowienia/[id]/page.tsx");
for (const marker of [
  "buildManualOrderEmailDrafts",
  "ManualOrderEmailDraft",
  "ManualEmailDraftsPanel",
  "ManualEmailDraftCard",
  'data-admin-manual-email-drafts-v47="true"',
  "data-admin-manual-email-draft={draft.key}",
  'data-admin-manual-email-subject="true"',
  'data-admin-manual-email-body="true"',
  "readOnly",
  "System niczego nie wysyła",
  "Skopiuj temat i treść",
  "Robocze e-maile do klienta",
  "E-mail: potwierdzenie zamówienia",
  "E-mail: płatność potwierdzona",
  "E-mail: wysyłka plików"
]) {
  if (!detail.includes(marker) && !drafts.includes(marker)) fail(`order detail page missing manual email draft marker: ${marker}`);
}

const css = read("app/admin-v8.css");
for (const marker of [
  "STAGE47 MANUAL ORDER EMAIL DRAFTS START",
  ".admin-manual-email-drafts",
  ".admin-manual-email-draft",
  ".admin-manual-email-draft textarea",
  "white-space: pre-wrap"
]) {
  if (!css.includes(marker)) fail(`manual email drafts css missing marker: ${marker}`);
}

const forbiddenSources = [drafts, detail].join("\n");
for (const forbidden of [
  "SMTP",
  "smtp",
  "Resend",
  "Mailgun",
  "sendEmail(",
  "send_email",
  "createSignedUrl",
  "createSignedUrls"
]) {
  if (forbiddenSources.includes(forbidden)) {
    fail(`manual email drafts must not add automatic mailing/delivery marker: ${forbidden}`);
  }
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:manual-email-drafts-v47"] !== "node scripts/check-manual-email-drafts-v47.cjs") {
  fail("package.json missing verify:manual-email-drafts-v47 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:manual-email-drafts-v47")) {
  fail("main verify script missing verify:manual-email-drafts-v47.");
}

console.log("OK: manual email drafts V47 guard passed.");
