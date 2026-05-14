const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    fail(`${label} missing ${needle}`);
  }
}

function assertRegex(source, regex, label) {
  if (!regex.test(source)) {
    fail(`${label} does not match ${regex}`);
  }
}

const requiredFiles = [
  "app/admin/projekty/page.tsx",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "components/admin/AdminProjectDeleteForm.tsx",
  "components/admin/AdminSubmitButton.tsx",
  "docs/implementation/STAGE19_ADMIN_BUTTONS_AUDIT.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V19 admin button audit files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const actions = read("app/admin/projekty/actions.ts");
for (const needle of [
  '"use server"',
  "export async function updateProjectStatusAction",
  "export async function deleteProjectAction",
  "export async function updateProjectBasicsAction",
  'redirect("/admin/projekty?status=updated")',
  'redirect("/admin/projekty?deleted=1")'
]) {
  assertIncludes(actions, needle, "admin project actions");
}

assertRegex(
  actions,
  /redirect\(\s*`\/admin\/projekty\/\$\{projectId\}\/edytuj\?saved=1`\s*\)/,
  "admin project actions saved redirect"
);

for (const forbidden of ["export const ", "export let ", "export var ", "export {"]) {
  if (actions.includes(forbidden)) {
    fail(`use server admin action file contains forbidden runtime export: ${forbidden}`);
  }
}

const table = read("components/admin/AdminProjectsTable.tsx");
for (const needle of [
  "updateProjectStatusAction",
  "AdminSubmitButton",
  "AdminProjectDeleteForm",
  "`/admin/projekty/${project.id}/edytuj`",
  "`/projekty/${project.slug}`",
  'project.status === "active"'
]) {
  assertIncludes(table, needle, "AdminProjectsTable working control");
}

const deleteForm = read("components/admin/AdminProjectDeleteForm.tsx");
for (const needle of [
  '"use client"',
  "deleteProjectAction",
  "window.confirm",
  'type="submit"',
  "disabled={pending}",
  "Usuwanie..."
]) {
  assertIncludes(deleteForm, needle, "AdminProjectDeleteForm");
}

const submitButton = read("components/admin/AdminSubmitButton.tsx");
for (const needle of [
  '"use client"',
  "useFormStatus",
  'type="submit"',
  "disabled={pending}",
  "aria-busy={pending}"
]) {
  assertIncludes(submitButton, needle, "AdminSubmitButton");
}

const editPage = read("app/admin/projekty/[id]/edytuj/page.tsx");
for (const needle of [
  "updateProjectBasicsAction",
  "AdminSubmitButton",
  "AdminProjectDeleteForm",
  "Zapisz dane",
  "Zapisywanie danych...",
  'href="/admin/projekty?cancelled=1"',
  "saved",
  "admin-form-success"
]) {
  assertIncludes(editPage, needle, "edit project page button/feedback wiring");
}

const listPage = read("app/admin/projekty/page.tsx");
for (const needle of [
  'firstParam(searchParams.status) === "updated"',
  'firstParam(searchParams.deleted) === "1"',
  'firstParam(searchParams.cancelled) === "1"',
  'role="status"',
  "AdminProjectsListClient"
]) {
  assertIncludes(listPage, needle, "admin list page feedback/wiring");
}

const scannedFiles = [
  "app/admin/projekty/page.tsx",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "components/admin/AdminProjectsListClient.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "components/admin/AdminProjectDeleteForm.tsx",
  "components/admin/AdminSubmitButton.tsx",
  "components/admin/AdminProjectCreateForm.tsx"
].filter(exists);

for (const file of scannedFiles) {
  const source = read(file);
  const buttonMatches = source.match(/<button\b[^>]*>/g) || [];
  for (const button of buttonMatches) {
    const hasType = /\stype=/.test(button);
    if (!hasType) {
      fail(`${file} has button without explicit type: ${button}`);
    }
  }
}

console.log("OK: admin buttons V19 guard passed.");
