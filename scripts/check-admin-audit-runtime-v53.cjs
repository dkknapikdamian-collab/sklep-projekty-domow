const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function mustExist(file) {
  if (!exists(file)) fail("missing file: " + file);
  return read(file);
}

function mustInclude(file, needles) {
  const content = mustExist(file);
  const lower = content.toLowerCase();
  for (const needle of needles) {
    if (!lower.includes(String(needle).toLowerCase())) {
      fail(file + " missing marker: " + needle);
    }
  }
  return content;
}

const pkg = JSON.parse(mustExist("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-audit-runtime-v53"] !== "node scripts/check-admin-audit-runtime-v53.cjs") {
  fail("package.json missing verify:admin-audit-runtime-v53");
}
if (!pkg.scripts || pkg.scripts["audit:admin-runtime-v54"] !== "node scripts/check-admin-audit-runtime-v54.cjs") {
  fail("package.json missing audit:admin-runtime-v54");
}

const sql = mustInclude("supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql", [
  "public.admin_audit_log",
  "project_create",
  "project_status_update",
  "project_archive",
  "project_hard_delete",
  "project_media_delete",
  "project_media_type_update",
  "project_private_file_delete",
  "order_status_update",
  "order_fulfillment_checklist_update",
  "V8"
]);

for (const pattern of [/\bfrom\s+audit_window\b/i, /\bjoin\s+audit_window\b/i, /\bwith\s+audit_window\b/i]) {
  if (pattern.test(sql)) {
    fail("SQL contains forbidden helper relation reference: " + pattern);
  }
}

mustInclude("_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md", [
  "częściowo",
  "pass",
  "fail",
  "media projektu",
  "pliki prywatne",
  "zamówienia",
  "checklisty"
]);

mustInclude("_project/18_SQL_LEDGER.md", [
  "SQL_LEDGER_RULE",
  "READ_ONLY_VERIFICATION",
  "4 PASS",
  "4 FAIL",
  "NIEZAMKNIĘTY"
]);

mustInclude("_project/runs/2026-05-17_1200_etap33_v8_record_partial_runtime_no_brittle_guard.md", [
  "Etap 33 V8",
  "4 PASS",
  "4 FAIL",
  "NIEZAMKNIĘTY",
  "TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO"
]);

console.log("OK: Etap 33 V8 targeted guard passed. Partial runtime state is recorded.");
