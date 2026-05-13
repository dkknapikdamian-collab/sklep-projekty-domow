const fs = require("fs");
const path = require("path");
const root = process.cwd();
const requiredFiles = [
  "components/admin/FeaturePicker.tsx",
  "components/admin/admin-feature-options.ts",
  "components/admin/SelectWithCustom.tsx",
  "components/admin/AdminProjectCreateForm.tsx",
  "docs/implementation/STAGE15_ADMIN_SELECTS_FEATURES.md",
  "docs/project-rules/ADMIN_FIELD_OPTIONS_POLICY.md"
];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) { console.error("FAIL: Missing V15 admin select/feature files:"); for (const file of missing) console.error("- " + file); process.exit(1); }
const select = fs.readFileSync(path.join(root, "components/admin/SelectWithCustom.tsx"), "utf8");
for (const needle of ["localStorage", "admin-select-custom-options", "removeCustomOption", "Dodaj"]) { if (!select.includes(needle)) { console.error(`FAIL: SelectWithCustom missing ${needle}`); process.exit(1); } }
const featurePicker = fs.readFileSync(path.join(root, "components/admin/FeaturePicker.tsx"), "utf8");
for (const needle of ["featureGroups", "CUSTOM_FEATURES_KEY", "selected.join", "Dodaj ręcznie"]) { if (!featurePicker.includes(needle)) { console.error(`FAIL: FeaturePicker missing ${needle}`); process.exit(1); } }
const css = fs.readFileSync(path.join(root, "app/admin-real-v15.css"), "utf8");
for (const needle of ["background-color: #11181d", "option:checked", "selected-feature-chips"]) { if (!css.includes(needle)) { console.error(`FAIL: V15 CSS missing ${needle}`); process.exit(1); } }
const form = fs.readFileSync(path.join(root, "components/admin/AdminProjectCreateForm.tsx"), "utf8");
if (!form.includes("<FeaturePicker />")) { console.error("FAIL: AdminProjectCreateForm does not use FeaturePicker."); process.exit(1); }
console.log("OK: admin select UX and feature picker guard passed.");
