const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "components/admin/AdminProjectEditForm.tsx",
  "components/admin/AdminProjectMediaManager.tsx",
  "components/admin/AdminProjectRoomsEditor.tsx",
  "components/admin/AdminProjectVariantsEditor.tsx",
  "components/admin/AdminProjectAddonsEditor.tsx",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "app/admin/projekty/actions.ts",
  "lib/admin/projects-admin.ts",
  "docs/implementation/STAGE21_ADMIN_EDIT_PARITY.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V21 files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const editPage = read("app/admin/projekty/[id]/edytuj/page.tsx");
if (!editPage.includes("AdminProjectEditForm")) {
  console.error("FAIL: Edit page does not use AdminProjectEditForm.");
  process.exit(1);
}

const actions = read("app/admin/projekty/actions.ts");
for (const needle of [
  "export async function updateProjectAction",
  "roomsJson",
  "variantsJson",
  "addonsJson",
  "project_rooms",
  "project_variants",
  "project_addons"
]) {
  if (!actions.includes(needle)) {
    console.error(`FAIL: actions.ts missing V21 parity element: ${needle}`);
    process.exit(1);
  }
}

const repo = read("lib/admin/projects-admin.ts");
for (const needle of ["rooms:", "variants:", "addons:", "media:", "privateFiles:", "project_rooms", "project_variants", "project_addons", "project_media", "project_files"]) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: projects-admin.ts missing V21 fetch mapping: ${needle}`);
    process.exit(1);
  }
}

const editForm = read("components/admin/AdminProjectEditForm.tsx");
for (const needle of ["useActionState", "roomsJson", "variantsJson", "addonsJson", "FeaturePicker initialSelected", "AdminProjectMediaManager"]) {
  if (!editForm.includes(needle)) {
    console.error(`FAIL: AdminProjectEditForm missing expected wiring: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: V21 admin edit parity guard passed.");

