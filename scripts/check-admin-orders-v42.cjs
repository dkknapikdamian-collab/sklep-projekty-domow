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
  "app/admin/zamowienia/actions.ts",
  "lib/admin/orders-admin.ts",
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
  "updateAdminOrderStatus"
]) {
  if (!repo.includes(marker)) fail(`orders admin repository missing marker: ${marker}`);
}

const page = read("app/admin/zamowienia/page.tsx");
for (const marker of [
  'data-admin-orders-v42="true"',
  'data-admin-orders-list="true"',
  'data-admin-order-card="true"',
  'data-admin-order-details="true"',
  'data-admin-order-items="true"',
  "customerEmail",
  "customerPhone",
  "totalGross",
  "OrderStatusForm",
  "ADMIN_ORDER_STATUS_LABELS"
]) {
  if (!page.includes(marker)) fail(`admin orders page missing marker: ${marker}`);
}

const actions = read("app/admin/zamowienia/actions.ts");
for (const marker of ["getAdminSession", "updateOrderStatusAction", "updateAdminOrderStatus", "revalidatePath", "redirect"]) {
  if (!actions.includes(marker)) fail(`admin order action missing marker: ${marker}`);
}

const header = read("components/admin/AdminHeader.tsx");
if (!header.includes('href="/admin/zamowienia"')) fail("AdminHeader missing /admin/zamowienia nav link.");

const dashboard = read("app/admin/page.tsx");
if (!dashboard.includes('href="/admin/zamowienia"')) fail("admin dashboard missing orders card.");

const migration = read("supabase/migrations/0015_orders_v42_statuses.sql");
for (const marker of ["drop constraint if exists orders_status_check", "'contacted'", "'paid_manual'", "'sent'"]) {
  if (!migration.includes(marker)) fail(`V42 order status migration missing marker: ${marker}`);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:admin-orders-v42"] !== "node scripts/check-admin-orders-v42.cjs") {
  fail("package.json missing verify:admin-orders-v42 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:admin-orders-v42")) {
  fail("main verify script missing verify:admin-orders-v42.");
}

console.log("OK: admin orders V42 guard passed.");
