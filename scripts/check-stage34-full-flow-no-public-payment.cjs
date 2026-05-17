const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireFile(file) {
  if (!exists(file)) fail("missing file: " + file);
  return read(file);
}

function requireIncludes(file, needles) {
  const content = requireFile(file);
  for (const needle of needles) {
    if (!content.includes(needle)) {
      fail(file + " missing marker: " + needle);
    }
  }
  return content;
}

function requireNotIncludes(file, needles) {
  const content = requireFile(file);
  for (const needle of needles) {
    if (content.includes(needle)) {
      fail(file + " contains forbidden marker: " + needle);
    }
  }
  return content;
}

requireIncludes("app/projekty/page.tsx", [
  "getPublicProjects",
  "filterPublicProjects",
  "ProjectCard",
  "Katalog pokazuje wyłącznie projekty dodane w adminie i oznaczone jako aktywne",
  "data-public-catalog-results"
]);

requireIncludes("lib/project-repository.ts", [
  ".eq(\"status\", \"active\")",
  "getPublicProjects",
  "getPublicProjectBySlug",
  "getRelatedPublicProjects",
  "isDemoOrSampleProject",
  "DEMO_SAMPLE_PUBLIC_BLOCKLIST"
]);

requireIncludes("app/projekty/[slug]/page.tsx", [
  "getPublicProjectBySlug",
  "ProjectDetailPage",
  "notFound()"
]);

requireIncludes("components/project/ProjectDetailPage.tsx", [
  "ProjectPurchaseBox",
  "ProjectGallery",
  "ProjectStats",
  "ProjectTabs"
]);

requireIncludes("components/project/ProjectPurchaseBox.tsx", [
  "data-project-purchase-box=\"true\"",
  "data-project-cart-cta=\"true\"",
  "addCartItem",
  "window.location.assign(\"/koszyk\")",
  "project.priceGross",
  "selectedAddons",
  "availableAddons",
  "Projekt podstawowy"
]);

requireIncludes("app/koszyk/page.tsx", [
  "CartClient",
  "Sprawdz wariant, dodatki i sume brutto przed wyslaniem zamowienia testowego"
]);

requireIncludes("components/cart/CartClient.tsx", [
  "data-cart-v38=\"true\"",
  "readCart",
  "removeCartItem",
  "updateCartItemAddons",
  "cartTotal",
  "href=\"/zamowienie\"",
  "Przejdz do zamowienia"
]);

requireIncludes("app/zamowienie/page.tsx", [
  "data-checkout-v43-page-copy=\"true\"",
  "data-checkout-non-public-v31=\"true\"",
  "data-order-without-payment-v31=\"true\"",
  "data-payment-later-v31=\"true\"",
  "Techniczny test zamówienia",
  "bez płatności",
  "Checkout pozostaje niewidoczny"
]);

requireIncludes("components/order/CheckoutForm.tsx", [
  "submitOrderAction",
  "readCart",
  "clearCart",
  "data-checkout-form-v38=\"true\"",
  "data-checkout-non-public-v31=\"true\"",
  "data-order-without-payment-v31=\"true\"",
  "data-order-success-v38=\"true\"",
  "name=\"cartJson\"",
  "Zapisz zamówienie testowe",
  "Zamówienie jest zapisem technicznym bez płatności"
]);

requireIncludes("app/zamowienie/actions.ts", [
  "submitOrderAction",
  "parseCart",
  "createOrder",
  "termsConsent",
  "contactConsent",
  "cart.items.length === 0"
]);

requireIncludes("lib/order/create-order.ts", [
  "validateCartAgainstDb",
  ".from(\"orders\")",
  "status: \"new\"",
  "total_gross: totalGross",
  ".from(\"order_items\")",
  ".from(\"order_item_addons\")",
  "orderTotal(validatedCart)"
]);

requireIncludes("lib/order/validate-cart-against-db.ts", [
  "CART_PRICE_CHANGED_MESSAGE",
  "assertSamePrice",
  "loadProjectForCartItem",
  "loadActiveAddonsForProject",
  "loadActiveVariantsForProject",
  "project.status !== \"active\"",
  "assertSamePrice(item.basePriceGross, project.price_gross)",
  "assertSamePrice(item.variantPriceGross, variant.price_gross)",
  "assertSamePrice(selectedAddon.priceGross, addon.price_gross)"
]);

requireIncludes("app/admin/zamowienia/page.tsx", [
  "getAdminOrders",
  "data-admin-orders-v42=\"true\"",
  "data-admin-order-detail-link=\"true\"",
  "Obsłuż zamówienie"
]);

requireIncludes("app/admin/zamowienia/[id]/page.tsx", [
  "getAdminOrderById",
  "data-admin-order-detail-v44=\"true\"",
  "data-admin-order-status-form=\"true\"",
  "data-admin-order-fulfillment-form=\"true\"",
  "data-admin-order-items=\"true\"",
  "data-admin-order-private-files-fulfillment-v51=\"true\"",
  "ManualEmailDraftsPanel"
]);

requireIncludes("app/admin/projekty/nowy/actions.ts", [
  "writeAdminAuditLog",
  "action: \"project_create\"",
  "entityType: \"project\"",
  "source: \"createProjectAction\""
]);

requireIncludes("app/admin/projekty/actions.ts", [
  "writeAdminAuditLog",
  "action: \"project_status_update\"",
  "action: \"project_update\"",
  "action: \"project_media_delete\"",
  "action: \"project_private_file_delete\"",
  "source: \"updateProjectStatusAction\"",
  "source: \"updateProjectAction\""
]);

requireIncludes("app/admin/zamowienia/actions.ts", [
  "writeAdminAuditLog",
  "action: \"order_status_update\"",
  "action: \"order_fulfillment_checklist_update\"",
  "source: \"updateOrderStatusAction\"",
  "source: \"updateOrderFulfillmentChecklistAction\"",
  "checklistBefore"
]);

requireIncludes("lib/admin/audit-log.ts", [
  "order_status_update",
  "order_fulfillment_checklist_update",
  "project_create",
  "project_update",
  "project_status_update",
  "getAdminAuditLogEntries"
]);

requireNotIncludes("app/zamowienie/page.tsx", [
  "Numer konta",
  "Przelew tradycyjny",
  "Opłać teraz",
  "Zapłać teraz"
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:stage34-full-flow-no-public-payment"] !== "node scripts/check-stage34-full-flow-no-public-payment.cjs") {
  fail("package.json missing verify:stage34-full-flow-no-public-payment script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:stage34-full-flow-no-public-payment")) {
  fail("main verify script does not include verify:stage34-full-flow-no-public-payment.");
}

console.log("OK: Etap 34 full store flow without public payment static guard passed.");
