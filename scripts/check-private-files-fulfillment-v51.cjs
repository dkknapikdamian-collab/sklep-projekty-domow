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
  if (!exists(file)) fail(`missing private files fulfillment file: ${file}`);
  return read(file);
}

function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${file} missing marker: ${marker}`);
  }
  return source;
}

const orderFiles = requireMarkers("lib/admin/order-files.ts", [
  "ADMIN_ORDER_PRIVATE_FILE_LABELS",
  "ADMIN_ORDER_PRIVATE_FILE_FULFILLMENT_KINDS",
  "AdminOrderPrivateFileFulfillmentStatus",
  "ADMIN_ORDER_PRIVATE_FILE_FULFILLMENT_STATUS_LABELS",
  "buildAdminOrderPrivateFileFulfillmentItems",
  "documentation",
  "full_package",
  "pdf_email_package",
  "brak pliku",
  "plik dostępny",
  "do wysłania ręcznie",
  "wysłane ręcznie",
  "Pobierz ręcznie w Supabase Storage",
  "Nie wysyłaj publicznego linku klientowi",
  "Brakuje pliku",
  "getAdminOrderPrivateFilesByProjectKey",
  "project_files"
]);

const orderDetail = requireMarkers("app/admin/zamowienia/[id]/page.tsx", [
  "OrderPrivateFilesFulfillmentPanel",
  "buildAdminOrderPrivateFileFulfillmentItems",
  'data-admin-order-private-files-fulfillment-v51="true"',
  'data-admin-order-private-files-fulfillment-list="true"',
  'data-admin-order-private-files-project="true"',
  'data-admin-private-file-project-code="true"',
  "Pliki do realizacji",
  "Nie generuje publicznych linków",
  "Supabase Storage",
  'data-admin-private-file-missing-warning="true"',
  'data-admin-private-file-checklist="true"',
  "data-admin-private-file-kind",
  "data-admin-private-file-status",
  'data-admin-private-file-source="true"',
  'data-admin-private-file-manual-instruction="true"',
  'data-admin-private-file-warning="true"',
  "paymentConfirmed",
  "pdfSent",
  "zipSent",
  "OrderFulfillmentPanel"
]);

const ordersAdmin = requireMarkers("lib/admin/orders-admin.ts", [
  "getAdminOrderPrivateFilesByProjectKey",
  "privateFiles",
  "hasPdfEmailAddon",
  "fulfillmentChecklist",
  "paymentConfirmed",
  "pdfSent",
  "zipSent"
]);

const actions = requireMarkers("app/admin/zamowienia/actions.ts", [
  "updateOrderFulfillmentChecklistAction",
  "paymentConfirmed",
  "pdfSent",
  "zipSent",
  "orderClosed",
  "paymentInstruction",
  "writeAdminAuditLog"
]);

const v42Guard = requireMarkers("scripts/check-admin-orders-v42.cjs", [
  "data-admin-order-private-files",
  "privateFiles",
  "payment_instruction",
  "project_files"
]);

const manualEmailGuard = requireMarkers("scripts/check-manual-email-drafts-v47.cjs", [
  "data-admin-manual-email-drafts-v47",
  "paymentInstruction"
]);

for (const forbidden of [
  "createSignedUrl",
  "createSignedUrls",
  "signedUrl",
  "publicUrl",
  "sendEmail(",
  "send_email"
]) {
  if (orderFiles.includes(forbidden) || orderDetail.includes(forbidden) || ordersAdmin.includes(forbidden) || actions.includes(forbidden)) {
    fail(`private files fulfillment must not create public/signed client delivery or automatic email: ${forbidden}`);
  }
}

const packageJson = JSON.parse(requireFile("package.json"));
if (packageJson.scripts?.["verify:private-files-fulfillment-v51"] !== "node scripts/check-private-files-fulfillment-v51.cjs") {
  fail("package.json missing verify:private-files-fulfillment-v51 script.");
}

if (!String(packageJson.scripts?.verify || "").includes("verify:private-files-fulfillment-v51")) {
  fail("main verify script missing verify:private-files-fulfillment-v51.");
}

console.log("OK: private files fulfillment V51 guard passed.");
