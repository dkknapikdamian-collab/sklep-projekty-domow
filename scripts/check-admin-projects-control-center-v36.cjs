const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "app/admin/projekty/page.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "components/admin/AdminProjectsListClient.tsx",
  "lib/admin/projects-admin.ts",
  "lib/admin/project-publication-readiness.ts",
  "scripts/check-admin-projects-control-center-v36.cjs"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V36 control center files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const adminRepo = read("lib/admin/projects-admin.ts");
for (const needle of ["project_media", "project_rooms", "canPublish", "publicationMissing"]) {
  if (!adminRepo.includes(needle)) {
    console.error(`FAIL: admin repository missing control-center data source: ${needle}`);
    process.exit(1);
  }
}

const table = read("components/admin/AdminProjectsTable.tsx");
for (const needle of [
  "Gotowy",
  "Niekompletny",
  "Brak zdjec",
  "Brak pomieszczen",
  "Draft",
  "Publiczny",
  "Podglad publiczny",
  "Ustaw draft",
  "Ustaw active",
  "Braki:",
  "disabled",
  "AdminProjectDeleteForm",
  "updateProjectStatusAction",
  "/projekty/"
]) {
  if (!table.includes(needle)) {
    console.error(`FAIL: admin table missing V36 control center marker: ${needle}`);
    process.exit(1);
  }
}

const client = read("components/admin/AdminProjectsListClient.tsx");
for (const needle of [
  'value: "all"',
  'value: "active"',
  'value: "draft"',
  'value: "incomplete"',
  'value: "no-media"',
  'value: "no-rooms"'
]) {
  if (!client.includes(needle)) {
    console.error(`FAIL: list client missing V36 filter option: ${needle}`);
    process.exit(1);
  }
}

if (table.includes("href=\"#\"") || table.includes("onClick={() => {}}")) {
  console.error("FAIL: table contains dead action buttons.");
  process.exit(1);
}

console.log("OK: admin projects control center V36 guard passed.");
