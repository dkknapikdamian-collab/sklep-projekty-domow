const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components", "admin", "FeaturePicker.tsx");

if (!fs.existsSync(file)) {
  console.error("FAIL: Missing components/admin/FeaturePicker.tsx");
  process.exit(1);
}

const source = fs.readFileSync(file, "utf8");

if (source.includes('selected.join("\n")')) {
  console.error("FAIL: FeaturePicker contains a literal newline inside selected.join string.");
  process.exit(1);
}

for (const needle of [
  'selected.join("\\n")',
  "featureGroups.map",
  "CUSTOM_FEATURES_KEY",
  "Dodaj ręcznie",
  "selected-feature-chips"
]) {
  if (!source.includes(needle)) {
    console.error(`FAIL: FeaturePicker missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: FeaturePicker V15B source is valid.");
