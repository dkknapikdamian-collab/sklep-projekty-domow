const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function compactLower(value) {
  return compact(value).toLocaleLowerCase("pl-PL");
}

function hasCompact(source, marker) {
  return compact(source).includes(compact(marker));
}

function hasCompactLower(source, marker) {
  return compactLower(source).includes(compactLower(marker));
}

for (const file of [
  "components/order/CheckoutForm.tsx",
  "app/zamowienie/page.tsx",
  "app/admin/zamowienia/[id]/page.tsx",
  "app/admin/zamowienia/actions.ts",
  "lib/admin/orders-admin.ts",
  "lib/admin/order-email-drafts.ts",
  "supabase/migrations/0018_order_manual_payment_instruction.sql",
  "app/admin-v8.css",
  "package.json"
]) {
  if (!exists(file)) fail(`missing manual payment file: ${file}`);
}

const checkoutForm = read("components/order/CheckoutForm.tsx");
for (const marker of [
  "data-manual-payment-checkout-v48",
  "data-manual-payment-summary-v48",
  "Płatność odbywa się ręcznie po kontakcie z obsługą",
  "Dane do przelewu",
  "nie pobieramy płatności online",
  "automatycznej płatności"
]) {
  const ok = ["nie pobieramy płatności online", "automatycznej płatności"].includes(marker)
    ? hasCompactLower(checkoutForm, marker)
    : hasCompact(checkoutForm, marker);
  if (!ok) fail(`checkout form missing manual payment marker: ${marker}`);
}

const checkoutPage = read("app/zamowienie/page.tsx");
for (const marker of [
  "data-manual-payment-page-v48",
  "Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji",
  "instrukcję płatności przelewem",
  "bez Stripe",
  "PayU",
  "automatycznej płatności online"
]) {
  const ok = ["instrukcję płatności przelewem", "automatycznej płatności online"].includes(marker)
    ? hasCompactLower(checkoutPage, marker)
    : hasCompact(checkoutPage, marker);
  if (!ok) fail(`checkout page missing manual payment marker: ${marker}`);
}

const ordersAdmin = read("lib/admin/orders-admin.ts");
for (const marker of [
  "paymentInstruction",
  "payment_instruction",
  "UpdateAdminOrderFulfillmentChecklistInput",
  "AdminOrderFulfillmentChecklist",
  "updateAdminOrderFulfillmentChecklist",
  '"paid_manual"',
  "Opłacone ręcznie"
]) {
  if (!ordersAdmin.includes(marker)) fail(`orders admin missing manual payment marker: ${marker}`);
}

const actions = read("app/admin/zamowienia/actions.ts");
for (const marker of [
  'str(formData, "paymentInstruction")',
  "paymentInstruction",
  "hasPaymentInstruction",
  "order_fulfillment_checklist_update"
]) {
  if (!actions.includes(marker)) fail(`admin order actions missing manual payment marker: ${marker}`);
}

const detail = read("app/admin/zamowienia/[id]/page.tsx");
for (const marker of [
  "data-admin-order-payment-instruction",
  "name=\"paymentInstruction\"",
  "Instrukcja przelewu",
  "Płatność ręczna",
  "Opłacone ręcznie",
  "Dane do przelewu są używane w roboczym e-mailu",
  "Robocze e-maile do klienta"
]) {
  if (!detail.includes(marker)) fail(`order detail missing manual payment marker: ${marker}`);
}

const drafts = read("lib/admin/order-email-drafts.ts");
for (const marker of [
  "buildManualPaymentInstruction",
  "paymentInstruction",
  "Dane do płatności przelewem",
  "Numer rachunku",
  "Tytuł przelewu",
  "Płatność jest realizowana ręcznie",
  "Ten draft zawiera ręczną instrukcję przelewu"
]) {
  if (!drafts.includes(marker)) fail(`email drafts missing manual payment marker: ${marker}`);
}

const migration = read("supabase/migrations/0018_order_manual_payment_instruction.sql");
for (const marker of [
  "alter table public.order_fulfillment_checklist",
  "add column if not exists payment_instruction text"
]) {
  if (!migration.includes(marker)) fail(`manual payment migration missing marker: ${marker}`);
}

const css = read("app/admin-v8.css");
for (const marker of [
  "STAGE48 MANUAL PAYMENT INSTRUCTIONS START",
  ".admin-order-payment-instruction",
  ".admin-order-manual-payment-note"
]) {
  if (!css.includes(marker)) fail(`manual payment css missing marker: ${marker}`);
}

const forbiddenSources = [checkoutForm, checkoutPage, detail, drafts, actions, ordersAdmin].join("\n");
for (const forbidden of [
  "stripeClient",
  "stripe.checkout",
  "StripeCheckout",
  "payuClient",
  "PayuClient",
  "createPayment",
  "automaticPayment",
  "autoPayment",
  "Resend(",
  "new Resend",
  "Mailgun(",
  "nodemailer",
  "SMTP_HOST"
]) {
  if (forbiddenSources.includes(forbidden)) {
    fail(`Etap 17 must not add payment/mail provider marker: ${forbidden}`);
  }
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:manual-payment-v48"] !== "node scripts/check-manual-payment-v48.cjs") {
  fail("package.json missing verify:manual-payment-v48 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:manual-payment-v48")) {
  fail("main verify script missing verify:manual-payment-v48.");
}

console.log("OK: manual payment V48 guard passed.");
