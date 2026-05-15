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

for (const file of [
  "app/admin/zamowienia/page.tsx",
  "app/admin/zamowienia/[id]/page.tsx",
  "app/admin/zamowienia/actions.ts",
  "lib/admin/orders-admin.ts",
  "lib/admin/order-files.ts",
  "supabase/migrations/0015_orders_v42_statuses.sql"
]) {
  if (!exists(file)) fail(`missing admin orders file: ${file}`);
}

const repo = read("lib/admin/orders-admin.ts");
for (const marker of [
  "ADMIN_ORDER_STATUSES",
  '"new"',
  '"contacted"',
  '"paid_manual"',
  '"sent"',
  '"cancelled"',
  '.from("orders")',
  "order_items",
  "order_item_addons",
  "updateAdminOrderStatus",
  "getAdminOrderById",
  "privateFiles",
  "hasPdfEmailAddon",
  "getAdminOrderPrivateFilesByProjectKey",
  "adminOrderProjectFileLookupKey"
]) {
  if (!repo.includes(marker)) fail(`orders admin repository missing marker: ${marker}`);
}

const orderFiles = read("lib/admin/order-files.ts");
for (const marker of [
  "ADMIN_ORDER_PRIVATE_FILE_LABELS",
  "project_files",
  "project-private-files",
  "pdf_email_package",
  "full_package",
  "documentation",
  "isPdfEmailAddon",
  "getAdminOrderPrivateFilesByProjectKey",
  "adminOrderProjectFileLookupKey"
]) {
  if (!orderFiles.includes(marker)) fail(`order private files helper missing marker: ${marker}`);
}

const listPage = read("app/admin/zamowienia/page.tsx");
for (const marker of [
  'data-admin-orders-v42="true"',
  'data-admin-orders-list-only-v44="true"',
  'data-admin-orders-list="true"',
  'data-admin-order-card="true"',
  'data-admin-order-detail-link="true"',
  "customerEmail",
  "customerPhone",
  "totalGross",
  "ADMIN_ORDER_STATUS_LABELS",
  "`/admin/zamowienia/${order.id}`"
]) {
  if (!listPage.includes(marker)) fail(`admin orders list page missing marker: ${marker}`);
}

for (const forbidden of [
  "OrderDetails",
  "OrderFulfillmentPanel",
  'data-admin-order-details="true"',
  'data-admin-order-fulfillment-v43="true"'
]) {
  if (listPage.includes(forbidden)) fail(`admin orders list page still contains detail-only marker: ${forbidden}`);
}

const detailPage = read("app/admin/zamowienia/[id]/page.tsx");
for (const marker of [
  'data-admin-order-detail-v44="true"',
  "getAdminOrderById",
  "OrderStatusForm",
  "updateOrderStatusAction",
  "ADMIN_ORDER_STATUS_LABELS",
  "data-admin-order-customer-panel",
  "data-admin-order-items",
  "data-admin-order-private-files",
  "data-admin-order-pdf-email-addon",
  "data-admin-order-send-instructions",
  "data-admin-order-fulfillment-v43",
  "data-admin-order-fulfillment-checklist",
  "data-admin-fulfillment-payment-confirmed",
  "data-admin-fulfillment-pdf-sent",
  "data-admin-fulfillment-zip-sent",
  "data-admin-fulfillment-order-closed",
  "data-admin-order-admin-note-placeholder",
  "notFound"
]) {
  if (!detailPage.includes(marker)) fail(`admin order detail page missing marker: ${marker}`);
}

const actions = read("app/admin/zamowienia/actions.ts");
for (const marker of ["getAdminSession", "updateOrderStatusAction", "updateAdminOrderStatus", "revalidatePath", "redirect"]) {
  if (!actions.includes(marker)) fail(`admin order action missing marker: ${marker}`);
}

const mediaManager = read("components/admin/AdminProjectMediaManager.tsx");
for (const marker of [
  "data-admin-private-file-fulfillment-source",
  "data-admin-private-file-type",
  "data-admin-private-file-bucket",
  "data-admin-private-file-manual-fulfillment"
]) {
  if (!mediaManager.includes(marker)) fail(`private file media manager missing marker: ${marker}`);
}

const header = read("components/admin/AdminHeader.tsx");
if (!header.includes('href="/admin/zamowienia"')) fail("AdminHeader missing /admin/zamowienia nav link.");

const dashboard = read("app/admin/page.tsx");
if (!dashboard.includes('href="/admin/zamowienia"')) fail("admin dashboard missing orders card.");

const css = read("app/admin-v8.css");
for (const marker of [
  "STAGE44 ADMIN ORDER DETAIL START",
  ".admin-order-detail-hero",
  ".admin-order-detail-layout",
  ".admin-order-detail-panel",
  ".admin-order-list-actions",
  "data-admin-order-detail-v44"
]) {
  if (!css.includes(marker) && !detailPage.includes(marker) && !listPage.includes(marker)) {
    fail(`admin order detail style/source marker missing: ${marker}`);
  }
}

const migration = read("supabase/migrations/0015_orders_v42_statuses.sql");
for (const marker of ["drop constraint if exists orders_status_check", "'contacted'", "'paid_manual'", "'sent'"]) {
  if (!migration.includes(marker)) fail(`V42 order status migration missing marker: ${marker}`);
}

const forbiddenAutoDeliverySources = [repo, orderFiles, listPage, detailPage].join("\n");
for (const forbidden of ["createSignedUrl", "createSignedUrls", "sendEmail(", "send_email", "stripe", "payu", "PayU"]) {
  if (forbiddenAutoDeliverySources.includes(forbidden)) {
    fail(`Etap 14 must not add automatic delivery/payment marker: ${forbidden}`);
  }
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:admin-orders-v42"] !== "node scripts/check-admin-orders-v42.cjs") {
  fail("package.json missing verify:admin-orders-v42 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:admin-orders-v42")) {
  fail("main verify script missing verify:admin-orders-v42.");
}

console.log("OK: admin orders V42/V44 detail page guard passed.");
