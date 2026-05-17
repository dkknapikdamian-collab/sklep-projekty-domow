const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const exists = (file) => fs.existsSync(path.join(root, file));
const normalize = (value) => String(value || "").toLowerCase();

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireFile(file, needles, options = {}) {
  if (!exists(file)) fail("missing Etap 33 runtime audit asset: " + file);
  const raw = read(file);
  const content = options.caseInsensitive ? normalize(raw) : raw;
  for (const needle of needles) {
    const expected = options.caseInsensitive ? normalize(needle) : needle;
    if (!content.includes(expected)) fail(file + " missing marker: " + needle);
  }
  return raw;
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-audit-runtime-v53"] !== "node scripts/check-admin-audit-runtime-v53.cjs") {
  fail("package.json missing verify:admin-audit-runtime-v53 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-audit-runtime-v53")) {
  fail("main verify script does not include verify:admin-audit-runtime-v53.");
}
if (pkg.scripts["audit:admin-runtime-v54"] !== "node scripts/check-admin-audit-runtime-v54.cjs") {
  fail("package.json missing audit:admin-runtime-v54 script.");
}

requireFile("scripts/check-admin-audit-runtime-v54.cjs", [
  "loadEnvFile",
  ".env.local",
  "admin_audit_log",
  "project_create",
  "project_status_update",
  "project_archive",
  "project_hard_delete",
  "project_media_delete",
  "project_media_type_update",
  "project_private_file_delete",
  "order_status_update",
  "order_fulfillment_checklist_update",
  "ADMIN_AUDIT_RUNTIME_SINCE_HOURS"
]);

requireFile("supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql", [
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
  "PASS",
  "FAIL"
]);

requireFile("_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md", [
  "dodanie projektu",
  "publikacja",
  "archiwizacja",
  "usunięcie",
  "media",
  "pliki prywatne",
  "zamówienia",
  "checklisty",
  "/admin/audit",
  "admin_audit_log"
], { caseInsensitive: true });

requireFile("_project/18_SQL_LEDGER.md", [
  "SQL_LEDGER_RULE",
  "2026-05-17_etap33_admin_audit_runtime_verification.sql",
  "supabase/manual",
  "Obsidian",
  "READ_ONLY_VERIFICATION"
]);

requireFile("AGENTS.md", [
  "SQL_LEDGER_RULE_2026_05_17",
  "_project/18_SQL_LEDGER.md",
  "12_SQL_LEDGER - Sklep projekty domow.md",
  "Każdy SQL"
]);

requireFile("_project/runs/2026-05-17_0930_etap33_v2_sql_ledger_env_fix.md", [
  "Etap 33 V2",
  "FAKTY Z KODU / PLIKOW",
  "SQL LEDGER",
  "TESTY RĘCZNE",
  "BRAKI I RYZYKA",
  "WPŁYW NA OBSIDIANA",
  "GIT / ZIP STATUS"
]);

console.log("OK: Etap 33 V2 admin audit runtime guard passed. Runtime Supabase proof still requires manual clicks and npm run audit:admin-runtime-v54 or SQL Editor.");
