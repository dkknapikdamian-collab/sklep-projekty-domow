const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const fail = (message) => {
  console.error("FAIL: " + message);
  process.exit(1);
};

const requiredFiles = [
  "lib/admin/project-publication-readiness.ts",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/nowy/actions.ts",
  "app/admin/projekty/[id]/edytuj/page.tsx",
  "lib/project-repository.ts"
];

const missingFiles = requiredFiles.filter((file) => !exists(file));
if (missingFiles.length) {
  console.error("FAIL: Missing V35/V52 publication readiness files:");
  for (const file of missingFiles) console.error("- " + file);
  process.exit(1);
}

const readiness = read("lib/admin/project-publication-readiness.ts");
for (const needle of [
  "canPublish",
  "missing",
  "checks",
  "getProjectPublicationReadiness",
  "code",
  "description",
  "hero",
  "thumbnail",
  "floorPlan",
  "privateDocumentation",
  "salesVariant",
  "hasDocumentationPrivateFile",
  "hasSalesVariant",
  "baseVariantConfirmed",
  "Nie mozna opublikowac projektu. Brakuje"
]) {
  if (!readiness.includes(needle)) fail(`readiness module missing marker: ${needle}`);
}

const adminActions = read("app/admin/projekty/actions.ts");
for (const needle of [
  "getProjectPublicationReadiness",
  "if (status === \"active\")",
  "getProjectPublicationErrorMessage",
  "description",
  "privateFileRows",
  "variantRows",
  "project_files",
  "project_variants",
  "baseVariantConfirmed",
  "privateFiles: privateFileRows",
  "variants: variantRows"
]) {
  if (!adminActions.includes(needle)) fail(`updateProjectStatusAction missing production publication guard marker: ${needle}`);
}

const createActions = read("app/admin/projekty/nowy/actions.ts");
for (const needle of [
  "if (status === \"active\")",
  "getProjectPublicationReadiness",
  "getProjectPublicationErrorMessage",
  "heroFile",
  "thumbnailFile",
  "floorPlanGroundFile",
  "floorPlanRoofFile",
  "documentationFile",
  "privateFiles:",
  "variants:",
  "baseVariantConfirmed",
  "description: str(formData, \"description\")"
]) {
  if (!createActions.includes(needle)) fail(`createProjectAction missing active publication readiness guard: ${needle}`);
}

if (!createActions.includes('status = str(formData, "status") || "draft"')) {
  fail("draft fallback was removed; draft must still be saveable.");
}

const editPage = read("app/admin/projekty/[id]/edytuj/page.tsx");
for (const needle of [
  "ProjectPublicationReadinessBox",
  "Gotowość publikacji",
  'data-admin-publication-readiness-v52="true"',
  "data-publication-readiness-can-publish",
  'data-admin-publication-readiness-list="true"',
  "data-publication-readiness-check",
  "data-publication-readiness-status",
  'data-admin-publication-readiness-blocker="true"',
  'data-admin-publication-readiness-ok="true"',
  "Aktywacja projektu zostanie zablokowana"
]) {
  if (!editPage.includes(needle)) fail(`admin edit page missing publication readiness UI marker: ${needle}`);
}

if (exists("app/admin-v8.css")) {
  const css = read("app/admin-v8.css");
  for (const needle of [
    "STAGE52 PROJECT PUBLICATION READINESS START",
    ".admin-publication-readiness-box",
    'data-publication-readiness-status="ok"',
    'data-publication-readiness-status="missing"'
  ]) {
    if (!css.includes(needle)) fail(`admin CSS missing publication readiness style marker: ${needle}`);
  }
}

const publicRepo = read("lib/project-repository.ts");
if (!publicRepo.includes('.eq("status", "active")')) {
  fail("public repository no longer filters active-only projects.");
}

console.log("OK: project publication readiness V35/V52 guard passed.");
