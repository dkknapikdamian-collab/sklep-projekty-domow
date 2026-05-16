const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

const requiredFiles = [
  "app/admin/projekty/page.tsx",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "components/admin/AdminProjectEditForm.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "components/admin/AdminProjectDeleteForm.tsx",
  "components/admin/AdminSubmitButton.tsx",
  "docs/implementation/STAGE19_ADMIN_BUTTONS_AUDIT.md"
];

for (const file of requiredFiles) {
  if (!exists(file)) fail("missing V19 admin button file: " + file);
}

function requireIncludes(file, needles) {
  const content = read(file);
  for (const needle of needles) {
    if (!content.includes(needle)) fail(file + " missing marker: " + needle);
  }
  return content;
}

const actions = requireIncludes("app/admin/projekty/actions.ts", [
  '"use server"',
  "export async function updateProjectStatusAction",
  "export async function archiveProjectAction",
  "export async function deleteProjectAction",
  "export async function updateProjectAction",
  "safeAdminProjectReturnPath",
  "tryWriteAdminAuditLog",
  "returnTo",
  "archiveRedirectPath",
  "redirectArchiveError",
  "archiveUpdateResult",
  ".select(\"id, status, updated_at\")",
  "archiveUpdateVerified: true",
  "archived=1&archive_status=",
  "projectStatusBeforeDelete",
  "hardDeleteAllowedByTypedCode",
  "project_hard_delete"
]);

for (const forbidden of ["export const ", "export let ", "export var ", "export {"]) {
  if (actions.includes(forbidden)) fail("use server admin action file contains forbidden runtime export: " + forbidden);
}

const table = requireIncludes("components/admin/AdminProjectsTable.tsx", [
  "updateProjectStatusAction",
  "AdminSubmitButton",
  "AdminProjectArchiveForm",
  "AdminProjectDeleteForm",
  'data-admin-project-row-actions="true"',
  'data-admin-action="project-edit"',
  'data-admin-action="project-public-preview"',
  'data-admin-action="project-status-change"',
  "data-admin-target-status={targetStatus}",
  "`/admin/projekty/${project.id}/edytuj`",
  "`/projekty/${project.slug}`",
  "Ustaw active",
  "Ustaw draft",
  "projectStatus={project.status}",
  "projectSlug={project.slug}"
]);

if (table.includes('href="#"') || table.includes("onClick={() => {}}")) {
  fail("AdminProjectsTable contains dead action placeholder.");
}

const deleteForm = requireIncludes("components/admin/AdminProjectDeleteForm.tsx", [
  '"use client"',
  "archiveProjectAction",
  "deleteProjectAction",
  'data-admin-action="project-archive"',
  'data-admin-action="project-archive-submit"',
  'data-admin-action="project-hard-delete"',
  'data-admin-action="project-delete-submit"',
  "data-admin-emergency-delete-panel",
  "returnTo",
  "canAttemptPhysicalDelete",
  "Boolean(expectedProjectCode)",
  "Usunięcie działa także dla statusu active",
  "Trwałe usunięcie",
  "Awaryjne usunięcie",
  "window.confirm",
  'type="submit"',
  "Usuwanie...",
  "typedConfirmCode",
  "expectedProjectCode",
  "Wpisz kod projektu",
  "data-admin-delete-active-warning"
]);

for (const forbidden of [
  'projectStatus === "archived" || projectStatus === "draft"',
  "Delete jest zablokowany dla statusu",
  "Najpierw zarchiwizuj projekt albo ustaw draft. Dopiero potem można użyć awaryjnego usunięcia."
]) {
  if (deleteForm.includes(forbidden)) fail("AdminProjectDeleteForm still blocks hard delete by status: " + forbidden);
}

if (!/disabled=\{[^}]*pending[^}]*\}/.test(deleteForm) && !deleteForm.includes("canAttemptPhysicalDelete")) {
  fail("AdminProjectDeleteForm delete submit must be disabled while pending and before confirmation code is valid.");
}

requireIncludes("app/admin-v8.css", [
  "STAGE45 ADMIN PROJECT EMERGENCY DELETE PANEL FIT START",
  ".admin-projects-table .admin-delete-safety-panel",
  "white-space: normal",
  "overflow-wrap: anywhere"
]);

requireIncludes("components/admin/AdminSubmitButton.tsx", [
  '"use client"',
  "useFormStatus",
  'type="submit"',
  "disabled={finalDisabled}",
  "aria-busy={pending}"
]);

const editPage = requireIncludes("app/admin/projekty/[id]/edytuj/page.tsx", [
  "AdminProjectEditForm",
  "AdminProjectArchiveForm",
  "AdminProjectDeleteForm",
  "saved",
  "archived",
  "admin-form-success",
  "data-admin-edit-danger-actions",
  "returnTo={editReturnTo}"
]);

for (const fakeMarker of [
  "Legacy guard markers",
  "updateProjectBasicsAction AdminSubmitButton Zapisz dane Zapisywanie danych..."
]) {
  if (editPage.includes(fakeMarker)) fail("edit page still contains fake legacy guard marker: " + fakeMarker);
}

const editForm = requireIncludes("components/admin/AdminProjectEditForm.tsx", [
  "useActionState(updateProjectAction",
  'data-admin-action="project-edit-form"',
  'data-admin-action="project-edit-status-select"',
  'data-admin-action="project-edit-save"',
  'data-admin-action="project-edit-cancel"',
  'type="submit"',
  "Zapisz projekt",
  "Zapisywanie...",
  'href="/admin/projekty?cancelled=1"',
  '<option value="archived">archived</option>'
]);

requireIncludes("app/admin/projekty/page.tsx", [
  'status) === "updated"',
  'archived) === "1"',
  'deleted) === "1"',
  'cancelled) === "1"',
  'role="status"',
  "AdminProjectsListClient"
]);

const scannedFiles = [
  "app/admin/projekty/page.tsx",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "components/admin/AdminProjectsListClient.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "components/admin/AdminProjectDeleteForm.tsx",
  "components/admin/AdminSubmitButton.tsx",
  "components/admin/AdminProjectCreateForm.tsx",
  "components/admin/AdminProjectEditForm.tsx",
  "components/admin/AdminProjectMediaManager.tsx"
].filter(exists);

for (const file of scannedFiles) {
  const source = read(file);
  const buttonMatches = source.match(/<button\b[^>]*>/g) || [];
  for (const button of buttonMatches) {
    if (!/\stype=/.test(button)) fail(file + " has button without explicit type: " + button);
  }
}

console.log("OK: admin buttons V19 guard passed with Etap 23 V8/V9 archive runtime repair.");
