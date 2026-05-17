const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
function fail(message) { console.error("FAIL: " + message); process.exit(1); }
function requireFile(file) { if (!exists(file)) fail("missing file: " + file); return read(file); }
function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${file} missing marker: ${marker}`);
  }
  return source;
}

const stripe = requireMarkers("lib/payments/stripe-payments.ts", [
  "STRIPE_REAL_PAYMENTS_CONTRACT",
  "ETAP39A_STRIPE_REAL_PAYMENTS",
  "createStripeCheckoutForOrder",
  "handleStripeWebhook",
  "verifyStripeWebhookSignature",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "https://api.stripe.com/v1/checkout/sessions",
  "automatic_payment_methods[enabled]",
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
  "webhookIsSourceOfTruth: true",
  "paidStatusRequiredForFulfillment: true",
  "successPageIsNotSourceOfTruth: true",
  "ensurePostPaymentFulfillmentAccessForOrder",
  "order_payments",
  "payment_events",
  "order_fulfillment_checklist",
  "payment_confirmed: true"
]);

requireMarkers("app/api/payments/stripe/webhook/route.ts", [
  "runtime = \"nodejs\"",
  "request.text()",
  "stripe-signature",
  "handleStripeWebhook",
  "NextResponse.json"
]);

requireMarkers("app/zamowienie/actions.ts", [
  "createStripeCheckoutForOrder",
  "checkoutUrl?: string",
  "stripe_checkout_created",
  "STRIPE_PROVIDER_NOT_CONFIGURED",
  "Nie wysyłamy plików bez statusu paid"
]);

requireMarkers("components/order/CheckoutForm.tsx", [
  "data-checkout-stripe-v39a",
  "window.location.assign(state.checkoutUrl)",
  "Przejdź do płatności",
  "webhooku",
  "statusu paid",
  "PDF na e-mail"
]);

requireMarkers("app/zamowienie/status/page.tsx", [
  "data-stripe-return-page-v39a",
  "data-success-page-is-not-source-of-truth-v39a",
  "webhook",
  "statusie paid"
]);

requireMarkers(".env.example", [
  "STRIPE_SECRET_KEY=",
  "STRIPE_WEBHOOK_SECRET=",
  "STRIPE_PAYMENT_CURRENCY=pln"
]);

requireMarkers("docs/payments/ETAP39A_STRIPE_REAL_PAYMENTS.md", [
  "Etap 39A",
  "Stripe",
  "webhook",
  "paid",
  "idempotencja",
  "fake mail"
]);

const pkg = JSON.parse(requireFile("package.json"));
if (pkg.scripts?.["verify:stripe-real-payments-v39a"] !== "node scripts/check-stripe-real-payments-v39a.cjs") {
  fail("package.json missing verify:stripe-real-payments-v39a script");
}
if (!String(pkg.scripts?.verify || "").includes("verify:stripe-real-payments-v39a")) {
  fail("main verify script missing verify:stripe-real-payments-v39a");
}

for (const forbidden of ["sendEmail(", "send_email(", "resend.emails.send", "nodemailer", "publicUrl", "getPublicUrl", "google_drive", "driveFileId"]) {
  if (stripe.includes(forbidden)) fail("Etap 39A must not send real email or expose public storage/Google Drive: " + forbidden);
}

console.log("OK: Etap 39A Stripe real payments foundation guard passed.");
