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
  "lib/admin/projects-admin.ts",
  "docs/implementation/STAGE18_ADMIN_PROJECT_MANAGEMENT.md"
];

const missing = requiredFiles.filter((file) => !exists(file));

if (missing.length) {
  console.error("FAIL: Missing V18 admin project management files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const listPage = read("app/admin/projekty/page.tsx");
const usesTableDirectly = listPage.includes("AdminProjectsTable");
const usesClientList = listPage.includes("AdminProjectsListClient");

if (!usesTableDirectly && !usesClientList) {
  console.error("FAIL: admin projects page does not render AdminProjectsTable directly or through AdminProjectsListClient.");
  process.exit(1);
}

if (usesClientList) {
  if (!exists("components/admin/AdminProjectsListClient.tsx")) {
    console.error("FAIL: admin projects page uses AdminProjectsListClient but component file is missing.");
    process.exit(1);
  }

  const listClient = read("components/admin/AdminProjectsListClient.tsx");
  for (const needle of [
    '"use client"',
    "useState",
    "useMemo",
    "AdminProjectsTable",
    "filteredProjects",
    "data-admin-project-search",
    "data-admin-project-status-filter"
  ]) {
    if (!listClient.includes(needle)) {
      console.error(`FAIL: AdminProjectsListClient missing V20 list/table wiring: ${needle}`);
      process.exit(1);
    }
  }
}

const table = read("components/admin/AdminProjectsTable.tsx");
for (const needle of [
  "updateProjectStatusAction",
  "AdminProjectDeleteForm",
  "AdminSubmitButton",
  "`/admin/projekty/${project.id}/edytuj`",
  "project.status === \"active\"",
  "`/projekty/${project.slug}`"
]) {
  if (!table.includes(needle)) {
    console.error(`FAIL: AdminProjectsTable missing active project management wiring: ${needle}`);
    process.exit(1);
  }
}

if (table.includes("Edycja później")) {
  console.error("FAIL: AdminProjectsTable still contains dead edit label.");
  process.exit(1);
}

const actions = read("app/admin/projekty/actions.ts");
for (const needle of [
  '"use server"',
  "export async function updateProjectStatusAction",
  "export async function deleteProjectAction",
  "export async function updateProjectBasicsAction"
]) {
  if (!actions.includes(needle)) {
    console.error(`FAIL: admin project actions missing ${needle}`);
    process.exit(1);
  }
}

for (const forbidden of [
  "export const ",
  "export let ",
  "export var ",
  "export {"
]) {
  if (actions.includes(forbidden)) {
    console.error(`FAIL: use server admin action file contains forbidden runtime export: ${forbidden}`);
    process.exit(1);
  }
}

const repo = read("lib/admin/projects-admin.ts");
for (const needle of ["getAdminProjectById", "AdminProjectEditItem", "relatedSlugs"]) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: projects-admin repository missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: admin project management V18 guard passed with V20 list-client compatibility.");
