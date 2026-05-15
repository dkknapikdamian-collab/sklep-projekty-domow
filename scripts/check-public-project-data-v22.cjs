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

if (!/from\(\s*["']projects["']\s*\)\s*\.\s*select\(\s*["']\*["']\s*\)\s*\.\s*eq\(\s*["']status["']\s*,\s*["']active["']\s*\)/s.test(repo)) {
  console.error("FAIL: public project repository must query projects with an explicit status=active filter at the data source.");
  process.exit(1);
}

if (!/export async function getPublicProjectBySlug[\s\S]*?const projects = await getPublicProjects\(\);[\s\S]*?projects\.find\(\(item\) => item\.slug === slug\)/.test(repo)) {
  console.error("FAIL: /projekty/[slug] must resolve projects through getPublicProjects() so draft/hidden/archived slugs cannot leak.");
  process.exit(1);
}

if (!/export async function getRelatedPublicProjects[\s\S]*?const projects = await getPublicProjects\(\);[\s\S]*?const pool = projects\.filter\(\(item\) => item\.slug !== project\.slug\)/.test(repo)) {
  console.error("FAIL: related projects must be selected from getPublicProjects() so only active projects can appear.");
  process.exit(1);
}

for (const forbidden of [
  '.neq("status"',
  ".neq('status'",
  '.not("status"',
  ".not('status'",
  '.in("status"',
  ".in('status'"
]) {
  if (repo.includes(forbidden)) {
    console.error(`FAIL: public repository must not broaden public status filtering with ${forbidden}. Use status=active only.`);
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

const publicPages = [
  "app/projekty/page.tsx",
  "app/projekty/[slug]/page.tsx",
  "components/project/ProjectDetailPage.tsx",
  "components/project/RelatedProjects.tsx"
];

for (const file of publicPages) {
  const source = read(file);
  if (/\.from\(\s*["']projects["']\s*\)/.test(source)) {
    console.error(`FAIL: ${file} must not query projects directly; use lib/project-repository.ts active-only helpers.`);
    process.exit(1);
  }
}

const slugPage = read("app/projekty/[slug]/page.tsx");
if (!slugPage.includes("notFound()")) {
  console.error("FAIL: /projekty/[slug] must call notFound() for unavailable project.");
  process.exit(1);
}

const card = read("components/project/ProjectCard.tsx");
for (const needle of [
  "project.media.thumbnail",
  "project.media.hero",
  "project.media.gallery[0]",
  "project.media.elevations[0]?.url",
  "project.name",
  "project.usableArea",
  "project.roomsCount",
  "project.garage",
  "project.priceGross",
  "`/projekty/${project.slug}`"
]) {
  if (!card.includes(needle)) {
    console.error(`FAIL: ProjectCard is missing admin/public data binding: ${needle}`);
    process.exit(1);
  }
}

const tabs = read("components/project/ProjectTabs.tsx");
for (const needle of ["project.rooms.length > 0", "Kondygnacja", "Tabela pomieszczen zostanie uzupelniona", "Suma powierzchni pomieszczen"]) {
  if (!tabs.includes(needle)) {
    console.error(`FAIL: ProjectTabs missing V22 rooms/files rendering: ${needle}`);
    process.exit(1);
  }
}

if (tabs.includes("project.privateFilesInfo")) {
  console.error("FAIL: ProjectTabs must not render private project file info publicly after V37.");
  process.exit(1);
}

for (const needle of [
  "project.description",
  "project.features",
  "project.media.plans",
  "project.media.elevations",
  "project.rooms",
  "project.addons",
  "project.usableArea",
  "project.buildingArea",
  "project.roomsCount",
  "project.bathroomsCount",
  "project.garage",
  "project.type",
  "project.technology",
  "project.roof",
  "project.minPlotWidth",
  "project.minPlotLength",
  "project.buildingHeight"
]) {
  if (!tabs.includes(needle)) {
    console.error(`FAIL: ProjectTabs is missing admin/public detail binding: ${needle}`);
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

for (const needle of [
  "project.priceGross",
  "project.code",
  "project.slug",
  "project.name",
  "variant.name",
  "variant.priceGross",
  "addon.code",
  "addon.name",
  "addon.priceGross",
  "addon.description",
  "addon.deliveryAction"
]) {
  if (!purchase.includes(needle)) {
    console.error(`FAIL: ProjectPurchaseBox is missing admin/public purchase binding: ${needle}`);
    process.exit(1);
  }
}

const gallery = read("components/project/ProjectGallery.tsx");
for (const needle of [
  "project.media.hero",
  "project.media.thumbnail",
  "project.media.gallery",
  "project.media.elevations",
  "project.media.plans",
  "MediaSlot"
]) {
  if (!gallery.includes(needle)) {
    console.error(`FAIL: ProjectGallery is missing admin/public media binding: ${needle}`);
    process.exit(1);
  }
}

const stats = read("components/project/ProjectStats.tsx");
for (const needle of [
  "project.usableArea",
  "project.roomsCount",
  "project.bathroomsCount",
  "project.garage",
  "project.type",
  "project.roof",
  "project.minPlotWidth",
  "project.technology"
]) {
  if (!stats.includes(needle)) {
    console.error(`FAIL: ProjectStats is missing admin/public technical binding: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: V22 public project data parity guard passed with V27/V29 public-read compatibility.");
