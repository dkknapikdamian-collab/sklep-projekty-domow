const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "docs/project-rules/README.md",
  "docs/project-rules/PROJECT_CODE_POLICY.md",
  "docs/project-rules/DECISION_LOG.md",
  "docs/architecture/ADR_0002_PROJECT_CODE_GENERATION.md",
  "supabase/migrations/0012_project_code_generation.sql",
  "app/admin/projekty/nowy/actions.ts",
  "components/admin/AdminProjectCreateForm.tsx"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("FAIL: Missing project code policy files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const migration = fs.readFileSync(path.join(root, "supabase/migrations/0012_project_code_generation.sql"), "utf8");

for (const needle of ["project_code_counters", "next_project_code", "DP-YYYY-NNNN"]) {
  if (!migration.includes(needle)) {
    console.error(`FAIL: migration missing ${needle}`);
    process.exit(1);
  }
}

const action = fs.readFileSync(path.join(root, "app/admin/projekty/nowy/actions.ts"), "utf8");

for (const needle of ["generateProjectCode", "next_project_code", "duplicateState", "existingProjectHref"]) {
  if (!action.includes(needle)) {
    console.error(`FAIL: create action missing ${needle}`);
    process.exit(1);
  }
}

const form = fs.readFileSync(path.join(root, "components/admin/AdminProjectCreateForm.tsx"), "utf8");

for (const needle of ["Automatycznie", "DP-YYYY-NNNN", "state.existingProjectHref"]) {
  if (!form.includes(needle)) {
    console.error(`FAIL: admin form missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: project code policy guard passed.");
