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
  "supabase/migrations/0015_orders_v42_statuses.sql",
  "supabase/migrations/0017_order_fulfillment_checklist.sql"
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
  "AdminOrderFulfillmentChecklist",
  "fulfillmentChecklist",
  "emptyAdminOrderFulfillmentChecklist",
  "getAdminOrderFulfillmentChecklistByOrderId",
  "updateAdminOrderFulfillmentChecklist",
  "order_fulfillment_checklist",
  "payment_confirmed",
  "pdf_sent",
  "zip_sent",
  "order_closed",
  "internal_note",
  "privateFiles",
  "hasPdfEmailAddon",
  "getAdminOrderPrivateFilesByProjectKey",
  "adminOrderProjectFileLookupKey"
]) {
  if (!repo.includes(marker)) fail(`orders admin repository missing marker: ${marker}`);
}

const fulfillmentMigration = read("supabase/migrations/0017_order_fulfillment_checklist.sql");
for (const marker of [
  "create table if not exists public.order_fulfillment_checklist",
  "order_id uuid primary key references public.orders(id) on delete cascade",
  "payment_confirmed boolean not null default false",
  "pdf_sent boolean not null default false",
  "zip_sent boolean not null default false",
  "order_closed boolean not null default false",
  "internal_note text",
  "updated_at timestamptz not null",
  "order_fulfillment_checklist_updated_at_idx"
]) {
  if (!fulfillmentMigration.includes(marker)) fail(`fulfillment migration missing marker: ${marker}`);
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
  "updateOrderFulfillmentChecklistAction",
  "ADMIN_ORDER_STATUS_LABELS",
  "data-admin-order-customer-panel",
  "data-admin-order-items",
  "data-admin-order-private-files",
  "data-admin-order-pdf-email-addon",
  "data-admin-order-send-instructions",
  "data-admin-order-fulfillment-v43",
  "data-admin-order-fulfillment-persistent-v45",
  "data-admin-order-fulfillment-form",
  "data-admin-order-fulfillment-save",
  "data-admin-order-fulfillment-checklist",
  "data-admin-fulfillment-payment-confirmed",
  "name=\"paymentConfirmed\"",
  "data-admin-fulfillment-pdf-sent",
  "name=\"pdfSent\"",
  "data-admin-fulfillment-zip-sent",
  "name=\"zipSent\"",
  "data-admin-fulfillment-order-closed",
  "name=\"orderClosed\"",
  "data-admin-order-internal-note",
  "name=\"internalNote\"",
  "data-admin-order-admin-note-persistent",
  "data-admin-order-fulfillment-saved",
  "notFound"
]) {
  if (!detailPage.includes(marker)) fail(`admin order detail page missing marker: ${marker}`);
}

if (detailPage.includes("data-admin-order-admin-note-placeholder")) {
  fail("admin order detail page still contains placeholder-only admin note marker.");
}

const actions = read("app/admin/zamowienia/actions.ts");
for (const marker of [
  "getAdminSession",
  "updateOrderStatusAction",
  "updateAdminOrderStatus",
  "updateOrderFulfillmentChecklistAction",
  "updateAdminOrderFulfillmentChecklist",
  "order_fulfillment_checklist_update",
  "paymentConfirmed",
  "pdfSent",
  "zipSent",
  "orderClosed",
  "internalNote",
  "returnTo",
  "revalidatePath",
  "redirect"
]) {
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
  "STAGE46 ADMIN ORDER FULFILLMENT CHECKLIST PERSISTENCE START",
  ".admin-order-fulfillment-form",
  ".admin-order-internal-note",
  "accent-color"
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
for (const forbidden of [
  "createSignedUrl",
  "createSignedUrls",
  "sendEmail(",
  "send_email",
  "stripeClient",
  "stripe.checkout",
  "StripeCheckout",
  "payuClient",
  "PayuClient",
  "createPayment",
  "automaticPayment",
  "autoPayment"
]) {
  if (forbiddenAutoDeliverySources.includes(forbidden)) {
    fail(`Etap 15B must not add automatic delivery/payment marker: ${forbidden}`);
  }
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:admin-orders-v42"] !== "node scripts/check-admin-orders-v42.cjs") {
  fail("package.json missing verify:admin-orders-v42 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:admin-orders-v42")) {
  fail("main verify script missing verify:admin-orders-v42.");
}

console.log("OK: admin orders V42/V45 persistent fulfillment checklist guard passed.");
