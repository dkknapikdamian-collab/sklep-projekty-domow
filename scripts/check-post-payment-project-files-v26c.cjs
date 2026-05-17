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

const helper = requireMarkers("lib/fulfillment/post-payment-fulfillment.ts", [
  "POST_PAYMENT_PROJECT_FILES_CONTRACT",
  "ETAP26C_POST_PAYMENT_PROJECT_FILES",
  "storageProvider: \"supabase_storage\"",
  "requiresPaidPayment: true",
  "usesActiveProjectFilesOnly: true",
  "respectsPdfEmailAddon: true",
  "includesFloorPlans: true",
  "buildAdminOrderPrivateFileFulfillmentItems(item.privateFiles, item.hasPdfEmailAddon",
  "payment_not_paid",
  "order_download_events",
  "access_token_generated",
  "access_panel_view",
  "signed_file_url_issued",
  "createSignedUrl"
]);

const orderFiles = requireMarkers("lib/admin/order-files.ts", [
  "ADMIN_ORDER_PRIVATE_FILE_FULFILLMENT_KINDS",
  "floor_plans",
  "Rzuty pomieszczeń PDF",
  "if (!isProjectFileActive(row)) continue",
  "kind !== \"pdf_email_package\" || hasPdfEmailAddon"
]);

requireMarkers("lib/admin/project-files-model.ts", [
  "PROJECT_FILE_STORAGE_BUCKET = \"project-private-files\"",
  "floor_plans",
  "autoSendAfterPayment"
]);

requireMarkers("docs/payments/ETAP26C_POST_PAYMENT_PROJECT_FILES.md", [
  "Etap 26C",
  "Supabase Storage",
  "paid",
  "floor_plans",
  "PDF na e-mail",
  "order_download_events"
]);

const pkg = JSON.parse(requireFile("package.json"));
if (pkg.scripts?.["verify:post-payment-project-files-v26c"] !== "node scripts/check-post-payment-project-files-v26c.cjs") {
  fail("package.json missing verify:post-payment-project-files-v26c script");
}
if (!String(pkg.scripts?.verify || "").includes("verify:post-payment-project-files-v26c")) {
  fail("main verify script missing verify:post-payment-project-files-v26c");
}

for (const forbidden of ["google_drive", "driveFileId", "storage_file_id", "getPublicUrl", "publicUrl", "sendEmail(", "send_email(", "nodemailer", "resend.emails.send"]) {
  if (helper.includes(forbidden)) fail("Etap 26C fulfillment must not use public links, Google Drive, or real email send yet: " + forbidden);
}

if (!orderFiles.includes("active") || !orderFiles.includes("autoSendAfterPayment") || !orderFiles.includes("requiredForPublication")) {
  fail("order-files must keep project file flags visible for fulfillment contract");
}

console.log("OK: Etap 26C post-payment project files guard passed.");
