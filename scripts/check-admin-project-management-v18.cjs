const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "app/admin/projekty/page.tsx",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "lib/admin/projects-admin.ts",
  "docs/implementation/STAGE18_ADMIN_PROJECT_MANAGEMENT.md"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("FAIL: Missing V18 admin project management files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const listPage = fs.readFileSync(path.join(root, "app/admin/projekty/page.tsx"), "utf8");
if (!listPage.includes("AdminProjectsTable")) {
  console.error("FAIL: admin projects page does not use AdminProjectsTable.");
  process.exit(1);
}

const table = fs.readFileSync(path.join(root, "components/admin/AdminProjectsTable.tsx"), "utf8");
for (const needle of [
  "updateProjectStatusAction",
  "deleteProjectAction",
  "`/admin/projekty/${project.id}/edytuj`",
  "window.confirm"
]) {
  if (!table.includes(needle)) {
    console.error(`FAIL: AdminProjectsTable missing ${needle}`);
    process.exit(1);
  }
}

if (table.includes("Edycja później")) {
  console.error("FAIL: AdminProjectsTable still contains dead edit label.");
  process.exit(1);
}

const actions = fs.readFileSync(path.join(root, "app/admin/projekty/actions.ts"), "utf8");
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

const repo = fs.readFileSync(path.join(root, "lib/admin/projects-admin.ts"), "utf8");
for (const needle of ["getAdminProjectById", "AdminProjectEditItem", "relatedSlugs"]) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: projects-admin repository missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: admin project management V18 guard passed.");
