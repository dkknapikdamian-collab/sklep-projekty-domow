const fs = require("fs");
const path = require("path");

const root = process.cwd();
const stripBom = (text) => String(text || "").replace(/^\uFEFF/, "");
const read = (file) => stripBom(fs.readFileSync(path.join(root, file), "utf8"));
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function must(file, needles) {
  if (!exists(file)) fail("missing file: " + file);
  const content = read(file);
  for (const needle of needles) {
    if (!content.includes(needle)) fail(file + " missing marker: " + needle);
  }
  return content;
}

const actions = must("app/admin/projekty/actions.ts", [
  "export async function archiveProjectAction",
  "safeAdminProjectReturnPath(returnTo)",
  "redirectArchiveError",
  "archiveUpdateResult",
  ".select(\"id, status, updated_at\")",
  "if (archivedStatus !== \"archived\")",
  "archiveUpdateVerified: true",
  "action: \"project_archive\"",
  "export async function deleteProjectAction",
  "deleteConfirmCode",
  "confirmation_code_mismatch",
  "project_hard_delete_blocked",
  "project_hard_delete",
  "hardDeleteAllowedByTypedCode",
  "statusBeforeDelete"
]);

if (actions.includes("throw new Error(\"Nie mozna usunac aktywnego projektu")) {
  fail("hard delete still contains old active-project hard block.");
}
if (!/const expectedCode = String\(project\.code \|\| ""\)\.trim\(\)\.toUpperCase\(\)/.test(actions)) {
  fail("deleteProjectAction does not normalize expected project code before hard delete.");
}
if (!/confirmationCode !== expectedCode/.test(actions)) {
  fail("deleteProjectAction does not block wrong project code.");
}
if (!/await tryWriteAdminAuditLog\(\{[\s\S]*action: "project_hard_delete_blocked"/.test(actions)) {
  fail("deleteProjectAction does not audit blocked hard delete attempt.");
}
if (!/await tryWriteAdminAuditLog\(\{[\s\S]*action: "project_hard_delete"/.test(actions)) {
  fail("deleteProjectAction does not audit successful hard delete.");
}

must("components/admin/AdminProjectDeleteForm.tsx", [
  "data-admin-action=\"project-archive\"",
  "data-admin-action=\"project-archive-submit\"",
  "name=\"returnTo\"",
  "deleteConfirmCode",
  "data-admin-delete-active-warning"
]);

must("app/admin/projekty/[id]/edytuj/page.tsx", [
  "AdminProjectArchiveForm",
  "returnTo={editReturnTo}",
  "data-admin-edit-danger-actions=\"true\"",
  "data-admin-edit-archive-success=\"true\"",
  "data-admin-edit-archive-error=\"true\""
]);

const requiredDocs = [
  "_project/03_CURRENT_STAGE.md",
  "_project/05_MANUAL_TESTS.md",
  "_project/06_GUARDS_AND_TESTS.md",
  "_project/07_NEXT_STEPS.md",
  "_project/12_IMPLEMENTATION_LEDGER.md",
  "_project/14_TEST_HISTORY.md",
  "_project/17_ETAP23Z_ARCHIVE_HARD_DELETE_RUNTIME_ACCEPTANCE.md"
];

for (const doc of requiredDocs) {
  must(doc, ["ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16"]);
}

let pkg;
try {
  pkg = JSON.parse(read("package.json"));
} catch (error) {
  fail("package.json is not valid JSON after BOM-safe read: " + error.message);
}

if (!pkg.scripts || pkg.scripts["verify:admin-archive-delete-runtime-v23z"] !== "node scripts/check-admin-archive-delete-runtime-v23z.cjs") {
  fail("package.json missing verify:admin-archive-delete-runtime-v23z script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-archive-delete-runtime-v23z")) {
  fail("main verify script does not include verify:admin-archive-delete-runtime-v23z.");
}

console.log("OK: Etap 23Z archive/delete runtime acceptance guard passed.");
console.log("NOTE: This guard is static/documentation coverage. Manual runtime status remains TEST RECZNY DO WYKONANIA until Damian confirms it.");
