const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

for (const file of [
  "components/admin/AdminProjectDeleteForm.tsx",
  "app/admin-v8.css",
  "package.json"
]) {
  if (!exists(file)) fail("missing file: " + file);
}

const form = read("components/admin/AdminProjectDeleteForm.tsx");
for (const needle of [
  "function ArchiveProjectSubmitButton()",
  'disabled={pending}',
  'data-admin-action-feedback-button="true"',
  'data-pending={pending ? "true" : "false"}',
  'data-admin-action="project-archive-state"',
  'data-admin-archive-state="already-archived"',
  'role="status"',
  'aria-disabled="true"',
  '<ArchiveProjectSubmitButton />',
  'returnTo'
]) {
  if (!form.includes(needle)) fail("AdminProjectDeleteForm missing marker: " + needle);
}

for (const forbidden of [
  'disabled={pending || isArchived}',
  'isArchived ? "Zarchiwizowany"',
  'Delete jest zablokowany dla statusu',
  'Najpierw zarchiwizuj projekt albo ustaw draft. Dopiero potem można użyć awaryjnego usunięcia.'
]) {
  if (form.includes(forbidden)) fail("stale admin action layer still present: " + forbidden);
}

const css = read("app/admin-v8.css");
for (const needle of [
  "STAGE24 ADMIN ACTION BUTTON FEEDBACK START",
  ".admin-row-actions a:hover",
  ".admin-row-actions button:hover:not(:disabled)",
  ".admin-row-actions button:active:not(:disabled)",
  ":focus-visible",
  '[aria-busy="true"]',
  '[data-pending="true"]',
  ".admin-archive-state",
  "cursor: not-allowed",
  "transform: translateY(1px) scale(.985)",
  "STAGE24 ADMIN ACTION BUTTON FEEDBACK END"
]) {
  if (!css.includes(needle)) fail("admin action feedback css missing marker: " + needle);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts["verify:admin-action-feedback-v24"] !== "node scripts/check-admin-action-feedback-v24.cjs") {
  fail("package.json missing verify:admin-action-feedback-v24 script");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-action-feedback-v24")) {
  fail("main verify script does not include verify:admin-action-feedback-v24");
}

console.log("OK: admin action feedback V24 guard passed.");
