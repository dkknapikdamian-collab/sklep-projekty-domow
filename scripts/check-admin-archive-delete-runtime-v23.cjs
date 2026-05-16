const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
function fail(message) { console.error("FAIL: " + message); process.exit(1); }
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
  "const returnTo = str(formData, \"returnTo\")",
  "safeAdminProjectReturnPath(returnTo)",
  "redirectArchiveError",
  "archiveUpdateResult",
  ".select(\"id, status, updated_at\")",
  "archiveUpdateVerified: true",
  "archive_error=1",
  "archived=1&archive_status=",
  "revalidatePath(\"/admin/projekty/\" + projectId + \"/edytuj\")",
  "tryWriteAdminAuditLog"
]);
if (actions.includes("redirect(\"/admin/projekty?archived=1\")")) fail("archive action still has old static redirect.");
if (!/update\(\{ status: \"archived\"/.test(actions)) fail("archive action missing explicit archived status update.");
if (!/if \(archivedStatus !== \"archived\"\)/.test(actions)) fail("archive action does not verify resulting archived status.");

const editPage = must("app/admin/projekty/[id]/edytuj/page.tsx", [
  "AdminProjectArchiveForm",
  "returnTo={editReturnTo}",
  "data-admin-edit-danger-actions=\"true\"",
  "data-admin-edit-archive-success=\"true\"",
  "data-admin-edit-archive-error=\"true\"",
  "archiveErrorReason",
  "decodeQueryValue"
]);

must("components/admin/AdminProjectDeleteForm.tsx", [
  "data-admin-action=\"project-archive\"",
  "data-admin-action=\"project-archive-submit\"",
  "name=\"returnTo\"",
  "returnTo || \"\""
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-archive-delete-runtime-v23"] !== "node scripts/check-admin-archive-delete-runtime-v23.cjs") {
  fail("package.json missing verify:admin-archive-delete-runtime-v23 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-archive-delete-runtime-v23")) {
  fail("main verify script does not include verify:admin-archive-delete-runtime-v23.");
}
console.log("OK: admin archive/delete runtime V23 guard passed.");
// V9_COMPAT_BUTTONS_GUARD: V19 accepts verified archive redirect instead of old one-line template redirect.
