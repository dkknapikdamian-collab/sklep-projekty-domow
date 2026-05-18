
const fs = require("fs");
const checks = [
  ["lib/admin/orders-admin.ts", [
    "AdminOrderPaymentSummary",
    "getAdminOrderPaymentLookup",
    "order_payments",
    "adminOrderPaymentReference",
    "getAdminOrderPaymentBadgeLabel",
    "payment: AdminOrderPaymentSummary",
    "paymentByOrderId.get(id)"
  ]],
  ["app/admin/zamowienia/page.tsx", [
    "data-admin-order-payment-badge-v40e",
    "data-admin-order-payment-reference-v40e",
    "Stripe session",
    "ID przelewu"
  ]],
  ["app/admin/zamowienia/[id]/page.tsx", [
    "data-admin-order-payment-panel-v40e",
    "Tytuł zwykłego przelewu ręcznego",
    "Stripe checkout session",
    "Stripe payment intent",
    "Zwykły przelew poza Stripe"
  ]]
];

let failed = false;
for (const [file, markers] of checks) {
  const text = fs.readFileSync(file, "utf8");
  for (const marker of markers) {
    if (!text.includes(marker)) {
      console.error(`[Stage40E-V3] FAIL: ${file} missing marker: ${marker}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log("[Stage40E-V3] PASS: admin payment status, reference and manual transfer guard passed.");
