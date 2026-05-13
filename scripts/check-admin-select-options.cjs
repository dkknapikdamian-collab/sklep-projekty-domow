const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "components/admin/SelectWithCustom.tsx",
  "components/admin/admin-project-options.ts",
  "components/admin/AdminProjectCreateForm.tsx",
  "docs/project-rules/ADMIN_FIELD_OPTIONS_POLICY.md",
  "docs/implementation/STAGE14_ADMIN_SELECT_OPTIONS.md"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("FAIL: Missing admin select option files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const form = fs.readFileSync(path.join(root, "components/admin/AdminProjectCreateForm.tsx"), "utf8");

for (const needle of [
  "SelectWithCustom",
  "badgePrimary",
  "badgeSecondary",
  "projectTypeOptions",
  "garageOptions",
  "roofOptions",
  "technologyOptions",
  "styleOptions",
  "roomFloorOptions",
  "Docelowo: automatyczny dobór po parametrach"
]) {
  if (!form.includes(needle)) {
    console.error(`FAIL: AdminProjectCreateForm missing ${needle}`);
    process.exit(1);
  }
}

const select = fs.readFileSync(path.join(root, "components/admin/SelectWithCustom.tsx"), "utf8");

for (const needle of ["Dodaj ręcznie", "type=\"hidden\"", "__custom__"]) {
  if (!select.includes(needle)) {
    console.error(`FAIL: SelectWithCustom missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: admin select options guard passed.");
