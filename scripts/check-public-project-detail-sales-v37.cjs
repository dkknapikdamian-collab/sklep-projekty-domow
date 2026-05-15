const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "components/project/ProjectDetailPage.tsx",
  "components/project/ProjectGallery.tsx",
  "components/project/ProjectMediaGallery.tsx",
  "components/project/ProjectTabs.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "lib/project-repository.ts",
  "types/project.ts",
  "components/admin/AdminProjectCreateForm.tsx",
  "components/admin/admin-project-options.ts",
  "components/admin/SelectWithCustom.tsx",
  "scripts/check-public-project-detail-sales-v37.cjs"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V37 public detail sales files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const detail = read("components/project/ProjectDetailPage.tsx");
for (const needle of ["ProjectGallery", "ProjectPurchaseBox", "ProjectStats", "ProjectTabs", "RelatedProjects"]) {
  if (!detail.includes(needle)) {
    console.error(`FAIL: ProjectDetailPage must keep the sales layout section: ${needle}`);
    process.exit(1);
  }
}

const layoutOrder = ["<ProjectGallery", "<ProjectPurchaseBox", "<ProjectStats", "<ProjectTabs", "<RelatedProjects"];
let previousIndex = -1;
for (const marker of layoutOrder) {
  const currentIndex = detail.indexOf(marker);
  if (currentIndex <= previousIndex) {
    console.error(`FAIL: ProjectDetailPage sales layout order is wrong or missing marker: ${marker}`);
    process.exit(1);
  }
  previousIndex = currentIndex;
}

const galleryAlias = read("components/project/ProjectMediaGallery.tsx");
if (!galleryAlias.includes("ProjectGallery as ProjectMediaGallery")) {
  console.error("FAIL: ProjectMediaGallery must remain a safe alias to the real ProjectGallery implementation.");
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
  "PODOBNE PROJEKTY",
  "project.rooms",
  "project.addons",
  "project.media.plans",
  "project.media.elevations",
  "project.description",
  "technicalRows",
  "includedItems(project)"
]) {
  if (!tabs.includes(needle)) {
    console.error(`FAIL: ProjectTabs missing V37 sales section/data marker: ${needle}`);
    process.exit(1);
  }
}

const tabOrder = [
  "OPIS PROJEKTU",
  "RZUTY I PRZEKROJE",
  "ELEWACJE",
  "POMIESZCZENIA",
  "DANE TECHNICZNE",
  "CO ZAWIERA PROJEKT",
  "DODATKI",
  "PODOBNE PROJEKTY",
  "DLACZEGO WARTO"
];
previousIndex = -1;
for (const label of tabOrder) {
  const currentIndex = tabs.indexOf(label);
  if (currentIndex <= previousIndex) {
    console.error(`FAIL: ProjectTabs tab order is wrong or missing label: ${label}`);
    process.exit(1);
  }
  previousIndex = currentIndex;
}

const purchase = read("components/project/ProjectPurchaseBox.tsx");
for (const needle of [
  "data-project-purchase-box=\"true\"",
  "project.variants",
  "orderedAddons",
  "project.addons",
  "DODATKI",
  "WERSJA PROJEKTU",
  "Projekt podstawowy",
  "selectedVariantPrice",
  "addonsTotal",
  "data-project-addons-picker=\"true\"",
  "data-project-cart-cta=\"true\"",
  "DODAJ DO KOSZYKA",
  "window.location.assign(\"/koszyk\")",
  "addCartItem",
  "availableAddons",
  "selectedAddons",
  "isPdfEmailAddon",
  "send_pdf_email",
  "data-project-pdf-email-addon",
  "Opcjonalny pakiet PDF na e-mail",
  "Nie zastepuje podstawowej dostawy projektu",
  "Pliki zgodnie z wybrana wersja"
]) {
  if (!purchase.includes(needle)) {
    console.error(`FAIL: ProjectPurchaseBox missing V37 variant/addon marker: ${needle}`);
    process.exit(1);
  }
}

const related = read("components/project/RelatedProjects.tsx");
for (const needle of ["id=\"related-projects\"", "data-related-projects-section=\"true\"", "ProjectCard", "ZOBACZ WSZYSTKIE"]) {
  if (!related.includes(needle)) {
    console.error(`FAIL: RelatedProjects missing sales section marker: ${needle}`);
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

const projectTypes = read("types/project.ts");
for (const needle of ["ProjectVariant", "ProjectAddon", "deliveryAction?: \"send_pdf_email\"", "ProjectMedia", "ProjectRoom"]) {
  if (!projectTypes.includes(needle)) {
    console.error(`FAIL: Project type contract missing sales data field: ${needle}`);
    process.exit(1);
  }
}

const createForm = read("components/admin/AdminProjectCreateForm.tsx");
for (const needle of [
  "PDF_EMAIL_PACKAGE",
  "Pakiet PDF na e-mail",
  'priceGross: "250"',
  'deliveryAction: "send_pdf_email"'
]) {
  if (!createForm.includes(needle)) {
    console.error(`FAIL: default project creation must include clear PDF e-mail addon +250 zl marker: ${needle}`);
    process.exit(1);
  }
}

const optionSource = read("components/admin/admin-project-options.ts");
const optionExpectations = [
  ["projectTypeOptions", 8],
  ["garageOptions", 6],
  ["roofOptions", 6],
  ["technologyOptions", 6],
  ["styleOptions", 7],
  ["roomFloorOptions", 6]
];

for (const [name, minimum] of optionExpectations) {
  const match = optionSource.match(new RegExp(`export const ${name}: AdminOption\\[\\] = \\[([\\s\\S]*?)\\];`));
  if (!match) {
    console.error(`FAIL: Missing admin option dictionary: ${name}`);
    process.exit(1);
  }
  const count = (match[1].match(/label:/g) || []).length;
  if (count < minimum) {
    console.error(`FAIL: ${name} has only ${count} options; expected at least ${minimum} for project-shop usage.`);
    process.exit(1);
  }
}

const selectWithCustom = read("components/admin/SelectWithCustom.tsx");
for (const needle of ["Dodaj ręcznie", "customOptions", "localStorage", "removeCustomOption"]) {
  if (!selectWithCustom.includes(needle)) {
    console.error(`FAIL: custom admin selects must allow adding missing shop-specific options: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: public project detail sales V37 guard passed.");
