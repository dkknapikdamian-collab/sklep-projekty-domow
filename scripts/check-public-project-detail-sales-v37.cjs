const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "components/project/ProjectDetailPage.tsx",
  "components/project/ProjectGallery.tsx",
  "components/project/ProjectTabs.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "lib/project-repository.ts",
  "scripts/check-public-project-detail-sales-v37.cjs"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V37 public detail sales files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const detail = read("components/project/ProjectDetailPage.tsx");
if (!detail.includes("ProjectGallery")) {
  console.error("FAIL: ProjectDetailPage must use ProjectGallery.");
  process.exit(1);
}

const tabs = read("components/project/ProjectTabs.tsx");
for (const needle of [
  "data-public-project-sales-v37",
  "Dane techniczne",
  "data-project-technical-section",
  "Pomieszczenia",
  "data-project-rooms-section",
  "Suma powierzchni pomieszczen",
  "Co zawiera projekt",
  "data-project-included-section",
  "Dodatki",
  "data-project-addons-section",
  "Dlaczego warto",
  "project.rooms",
  "project.addons",
  "project.media.plans",
  "project.description"
]) {
  if (!tabs.includes(needle)) {
    console.error(`FAIL: ProjectTabs missing V37 sales section/data marker: ${needle}`);
    process.exit(1);
  }
}

const purchase = read("components/project/ProjectPurchaseBox.tsx");
for (const needle of ["project.variants", "orderedAddons", "project.addons", "DODATKI", "WERSJA PROJEKTU"]) {
  if (!purchase.includes(needle)) {
    console.error(`FAIL: ProjectPurchaseBox missing V37 variant/addon marker: ${needle}`);
    process.exit(1);
  }
}

const repo = read("lib/project-repository.ts");
for (const needle of ["project_rooms", "project_variants", "project_addons", "project_media", '.eq("status", "active")']) {
  if (!repo.includes(needle)) {
    console.error(`FAIL: public repository missing real data source marker: ${needle}`);
    process.exit(1);
  }
}

if (/\.from\(\s*["']project_files["']\s*\)/.test(repo) || tabs.includes("project.privateFilesInfo")) {
  console.error("FAIL: public project detail must not render project_files/private file info.");
  process.exit(1);
}

console.log("OK: public project detail sales V37 guard passed.");
