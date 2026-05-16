const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function requireFile(file) {
  if (!exists(file)) fail(`missing required V1 runtime flow file: ${file}`);
  return read(file);
}

function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${file} missing marker: ${marker}`);
  }
  return source;
}

const publicRepo = requireMarkers("lib/project-repository.ts", [
  '.from("projects")',
  '.eq("status", "active")',
  "getPublicProjects",
  "getPublicProjectBySlug",
  "project_variants",
  "project_addons",
  "project_media"
]);

if (!/export async function getPublicProjectBySlug[\s\S]*?const projects = await getPublicProjects\(\);[\s\S]*?projects\.find\(\(item\) => item\.slug === slug\)/.test(publicRepo)) {
  fail("public project detail must resolve through getPublicProjects() so non-active projects cannot leak");
}

requireMarkers("app/projekty/page.tsx", ["getPublicProjects", "ProjectCard"]);
requireMarkers("app/projekty/[slug]/page.tsx", ["getPublicProjectBySlug", "notFound()", "ProjectDetailPage"]);
requireMarkers("components/project/ProjectDetailPage.tsx", [
  "ProjectGallery",
  "ProjectStats",
  "ProjectTabs",
  "ProjectPurchaseBox",
  "project.code"
]);

const purchase = requireMarkers("components/project/ProjectPurchaseBox.tsx", [
  "data-project-purchase-box",
  "project.shortCode",
  "project.priceGross",
  "project.variants",
  "project.addons",
  "send_pdf_email",
  "data-project-pdf-email-addon",
  "addCartItem",
  "projectCode: project.code",
  "projectSlug: project.slug",
  "basePriceGross: project.priceGross",
  "variantPriceGross: selectedVariantPrice",
  "selectedAddons",
  "availableAddons",
  "window.location.assign(\"/koszyk\")"
]);

if (purchase.includes("Bezpieczne platnosci online") || purchase.includes("Bezpieczne płatności online")) {
  fail("public purchase card must not advertise online payments in V1 runtime flow");
}

const cart = requireMarkers("components/cart/CartClient.tsx", [
  "data-cart-v38",
  "data-cart-item-code",
  "data-cart-item-slug",
  "data-cart-item-variant",
  "data-cart-item-total",
  "cartItemTotal(item)",
  "cartTotal(cart)",
  "removeCartItem",
  "updateCartItemAddons",
  "Przejdz do zamowienia",
  "Edytuj dodatki",
  "Usun pozycje"
]);

const checkout = requireMarkers("components/order/CheckoutForm.tsx", [
  "data-checkout-form-v38",
  "customerName",
  "customerEmail",
  "customerPhone",
  "termsConsent",
  "contactConsent",
  "cartJson",
  "clearCart()",
  "data-order-success-v38",
  "cartTotal(cart)",
  "PDF na e-mail",
  "Na tym etapie nie pobieramy płatności online."
]);

requireMarkers("app/zamowienie/actions.ts", [
  "submitOrderAction",
  "customerName",
  "customerEmail",
  "customerPhone",
  "termsConsent",
  "contactConsent",
  "Podaj poprawny e-mail.",
  "Zaznacz wymagane zgody.",
  "Koszyk jest pusty.",
  "createOrder"
]);

requireMarkers("lib/order/create-order.ts", [
  '.from("orders")',
  '.from("order_items")',
  '.from("order_item_addons")',
  'status: "new"',
  "total_gross",
  "project_code",
  "project_slug",
  "base_price_gross",
  "variant_price_gross",
  "delivery_action"
]);

requireMarkers("app/admin/projekty/nowy/actions.ts", [
  "getProjectPublicationReadiness",
  "getProjectPublicationErrorMessage",
  'if (status === "active")',
  'status = str(formData, "status") || "draft"'
]);

requireMarkers("app/admin/projekty/actions.ts", [
  "getProjectPublicationReadiness",
  "getProjectPublicationErrorMessage",
  'if (status === "active")',
  "writeAdminAuditLog"
]);

requireMarkers("app/admin/zamowienia/page.tsx", [
  'data-admin-orders-list="true"',
  'data-admin-order-card="true"',
  'data-admin-order-detail-link="true"',
  "totalGross",
  "customerEmail",
  "customerPhone"
]);

requireMarkers("app/admin/zamowienia/[id]/page.tsx", [
  'data-admin-order-detail-v44="true"',
  'data-admin-order-items="true"',
  'data-admin-order-private-files="true"',
  'data-admin-order-pdf-email-addon',
  'data-admin-order-payment-instruction="true"',
  'name="paymentConfirmed"',
  'name="pdfSent"',
  'name="zipSent"',
  'name="orderClosed"',
  "updateOrderFulfillmentChecklistAction",
  "OrderStatusForm",
  "money(order.totalGross)"
]);

requireMarkers("app/admin/zamowienia/actions.ts", [
  "updateOrderStatusAction",
  "updateOrderFulfillmentChecklistAction",
  "writeAdminAuditLog",
  "paymentConfirmed",
  "pdfSent",
  "zipSent",
  "orderClosed",
  "paymentInstruction"
]);

requireMarkers("lib/admin/orders-admin.ts", [
  "getAdminOrderById",
  "order_items",
  "order_item_addons",
  "privateFiles",
  "payment_instruction",
  "payment_confirmed",
  "pdf_sent",
  "zip_sent",
  "order_closed"
]);

requireMarkers("app/admin/audit/page.tsx", [
  "getAdminAuditLogEntries",
  "data-admin-audit-log",
  "admin_audit_log"
]);

console.log("OK: V1 runtime flow markers V49 guard passed. Manual Damian runtime test is still required.");
