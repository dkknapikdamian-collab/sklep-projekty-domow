const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "app/admin/projekty/nowy/actions.ts",
  "components/admin/AdminProjectCreateForm.tsx",
  "lib/project-repository.ts",
  "lib/admin/projects-admin.ts",
  "supabase/migrations/0011_project_variants_and_admin_read_policies.sql",
  "app/projekty/page.tsx",
  "app/projekty/[slug]/page.tsx"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("FAIL: Missing real admin project files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const action = fs.readFileSync(path.join(root, "app/admin/projekty/nowy/actions.ts"), "utf8");

for (const needle of [
  "createSupabaseServiceRoleClient",
  "project_rooms",
  "project_addons",
  "project_variants",
  "project_media",
  "project-private-files",
  "project-media"
]) {
  if (!action.includes(needle)) {
    console.error(`FAIL: create project action missing ${needle}`);
    process.exit(1);
  }
}

const repo = fs.readFileSync(path.join(root, "lib/project-repository.ts"), "utf8");

for (const needle of ["getPublicProjects", "getPublicProjectBySlug", "getRelatedPublicProjects"]) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: project repository missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: real admin project creation guard passed.");
