const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "lib/project-repository.ts",
  "app/page.tsx",
  "app/projekty/page.tsx",
  "app/projekty/[slug]/page.tsx",
  "components/project/ProjectDetailPage.tsx",
  "components/project/ProjectTabs.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "scripts/check-public-project-data-v22.cjs",
  "docs/implementation/STAGE22_PUBLIC_PROJECT_DATA_PARITY.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V22 files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const repo = read("lib/project-repository.ts");
for (const needle of [
  '.eq("status", "active")',
  "project_rooms",
  "project_variants",
  "project_addons",
  "project_media",
  "relatedSlugs.length > 0",
  "candidate.type === project.type"
]) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: project repository missing V22 rule: ${needle}`);
    process.exit(1);
  }
}

if (!repo.includes("createSupabaseServiceRoleClient")) {
  console.error("FAIL: project repository missing V27/V29 server-only service role public read.");
  process.exit(1);
}

if (/\.from\(\s*["']project_files["']\s*\)/.test(repo)) {
  console.error("FAIL: project repository should not query private project files from public pages after V27/V29.");
  process.exit(1);
}

for (const forbidden of [
  "getLocalPublishedProjects",
  "getLocalProjectBySlug",
  "from \"@/lib/projects\""
]) {
  if (repo.includes(forbidden)) {
    console.error(`FAIL: public repository still uses local/static source: ${forbidden}`);
    process.exit(1);
  }
}

const slugPage = read("app/projekty/[slug]/page.tsx");
if (!slugPage.includes("notFound()")) {
  console.error("FAIL: /projekty/[slug] must call notFound() for unavailable project.");
  process.exit(1);
}

const tabs = read("components/project/ProjectTabs.tsx");
for (const needle of ["project.rooms.length > 0", "Kondygnacja", "Tabela pomieszczen zostanie uzupelniona", "project.privateFilesInfo"]) {
  if (!tabs.includes(needle)) {
    console.error(`FAIL: ProjectTabs missing V22 rooms/files rendering: ${needle}`);
    process.exit(1);
  }
}

const purchase = read("components/project/ProjectPurchaseBox.tsx");
for (const needle of ["project.variants", "project.addons", "Projekt podstawowy"]) {
  if (!purchase.includes(needle)) {
    console.error(`FAIL: ProjectPurchaseBox missing V22 variants/addons rendering: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: V22 public project data parity guard passed with V27/V29 public-read compatibility.");
