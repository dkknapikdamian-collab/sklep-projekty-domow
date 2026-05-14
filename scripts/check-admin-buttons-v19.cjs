const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

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
  "redirect(\"/admin/projekty?status=updated\")",
  "redirect(\"/admin/projekty?deleted=1\")"
]) {
  if (!actions.includes(needle)) {
    console.error(`FAIL: admin project actions missing ${needle}`);
    process.exit(1);
  }
}

if (!/redirect\(\s*`\/admin\/projekty\/\$\{projectId\}\/edytuj\?saved=1`\s*\)/.test(actions)) {
  console.error("FAIL: admin project actions saved redirect does not point back to edit page with saved=1.");
  process.exit(1);
}

for (const forbidden of ["export const ", "export let ", "export var ", "export {"]) {
  if (actions.includes(forbidden)) {
    console.error(`FAIL: use server admin action file contains forbidden runtime export: ${forbidden}`);
    process.exit(1);
  }
}

const table = read("components/admin/AdminProjectsTable.tsx");
for (const needle of [
  "updateProjectStatusAction",
  "AdminSubmitButton",
  "AdminProjectDeleteForm",
  "`/admin/projekty/${project.id}/edytuj`",
  "`/projekty/${project.slug}`",
  "project.status === \"active\""
]) {
  if (!table.includes(needle)) {
    console.error(`FAIL: AdminProjectsTable missing working control: ${needle}`);
    process.exit(1);
  }
}

const deleteForm = read("components/admin/AdminProjectDeleteForm.tsx");
for (const needle of [
  '"use client"',
  "deleteProjectAction",
  "window.confirm",
  "type=\"submit\"",
  "disabled={pending}",
  "Usuwanie..."
]) {
  if (!deleteForm.includes(needle)) {
    console.error(`FAIL: AdminProjectDeleteForm missing ${needle}`);
    process.exit(1);
  }
}

const submitButton = read("components/admin/AdminSubmitButton.tsx");
for (const needle of [
  '"use client"',
  "useFormStatus",
  "type=\"submit\"",
  "disabled={pending}",
  "aria-busy={pending}"
]) {
  if (!submitButton.includes(needle)) {
    console.error(`FAIL: AdminSubmitButton missing ${needle}`);
    process.exit(1);
  }
}

const editPage = read("app/admin/projekty/[id]/edytuj/page.tsx");
for (const needle of [
  "updateProjectBasicsAction",
  "AdminSubmitButton",
  "AdminProjectDeleteForm",
  "Zapisz dane",
  "Zapisywanie danych...",
  "href=\"/admin/projekty?cancelled=1\"",
  "saved",
  "admin-form-success"
]) {
  if (!editPage.includes(needle)) {
    console.error(`FAIL: edit project page missing button/feedback wiring: ${needle}`);
    process.exit(1);
  }
}

const listPage = read("app/admin/projekty/page.tsx");
for (const needle of [
  "status) === \"updated\"",
  "deleted) === \"1\"",
  "cancelled) === \"1\"",
  "role=\"status\"",
  "AdminProjectsListClient"
]) {
  if (!listPage.includes(needle)) {
    console.error(`FAIL: admin list page missing feedback/wiring: ${needle}`);
    process.exit(1);
  }
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
      console.error(`FAIL: ${file} has button without explicit type: ${button}`);
      process.exit(1);
    }
  }
}

console.log("OK: admin buttons V19 guard passed.");
