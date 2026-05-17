const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

const docPath = "docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md";
if (!exists(docPath)) fail("missing payment architecture doc");
const doc = read(docPath);

for (const needle of [
  "Stripe Checkout",
  "Provider",
  "orders.status",
  "order_payments.status",
  "Payment Session",
  "Payment Intent",
  "Webhook",
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "Idempotencja",
  "Security",
  "Pliki po płatności",
  "order_fulfillment_access",
  "Nie ufać success page",
  "BEZ LIVE PAYMENT"
]) {
  if (!doc.includes(needle)) fail("payment architecture doc missing marker: " + needle);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:stage35-payment-architecture"] !== "node scripts/check-stage35-payment-architecture.cjs") {
  fail("package.json missing verify:stage35-payment-architecture script");
}
if (!String(pkg.scripts.verify || "").includes("verify:stage35-payment-architecture")) {
  fail("main verify script does not include verify:stage35-payment-architecture");
}

console.log("OK: Etap 35 payment architecture guard passed.");
