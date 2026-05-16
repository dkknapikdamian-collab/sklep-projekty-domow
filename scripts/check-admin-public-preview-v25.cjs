const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

for (const file of [
  "app/admin/projekty/[id]/podglad/page.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "lib/project-repository.ts",
  "app/projekty/[slug]/page.tsx",
  "app/admin-v8.css",
  "package.json"
]) {
  if (!exists(file)) fail("missing file: " + file);
}

function requireIncludes(file, needles) {
  const source = read(file);
  for (const needle of needles) {
    if (!source.includes(needle)) fail(file + " missing marker: " + needle);
  }
  return source;
}

const repo = requireIncludes("lib/project-repository.ts", [
  "export async function getAdminPreviewProjectById",
  ".eq(\"id\", projectId)",
  "return mapProject(projectRow as DbProject, rooms, addons, variants, media);",
  "export async function getPublicProjectBySlug"
]);

const previewHelperStart = repo.indexOf("export async function getAdminPreviewProjectById");
const publicProjectsStart = repo.indexOf("export async function getPublicProjects");
if (previewHelperStart < 0 || publicProjectsStart < previewHelperStart) fail("admin preview helper must sit before public exports.");
const previewHelper = repo.slice(previewHelperStart, publicProjectsStart);
if (previewHelper.includes(".eq(\"status\", \"active\")")) fail("admin preview helper must not filter status=active.");

requireIncludes("app/projekty/[slug]/page.tsx", [
  "getPublicProjectBySlug(slug)",
  "if (!project) notFound();"
]);

requireIncludes("app/admin/projekty/[id]/podglad/page.tsx", [
  "getAdminPreviewProjectById(id)",
  "data-admin-project-public-preview",
  "data-admin-preview-edit-link",
  "data-admin-preview-nonpublic",
  "ProjectDetailPage project={project}",
  "Status: {project.status}"
]);

const table = requireIncludes("components/admin/AdminProjectsTable.tsx", [
  "adminPreviewHref",
  "isPubliclyVisible",
  "data-admin-public-preview-route=\"admin-preview\"",
  "data-admin-project-nonpublic",
  "Niepubliczny",
  "project.status === \"active\""
]);
if (table.includes("href={publicHref} target=\"_blank\" rel=\"noreferrer\" data-admin-action=\"project-public-preview\"")) {
  fail("admin public preview action still points directly to public slug and can 404 for non-active projects.");
}

requireIncludes("app/admin-v8.css", [
  "STAGE25 ADMIN PUBLIC PREVIEW NO 404 START",
  ".admin-public-preview-ribbon",
  ".admin-project-nonpublic",
  "STAGE25 ADMIN PUBLIC PREVIEW NO 404 END"
]);

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts["verify:admin-public-preview-v25"] !== "node scripts/check-admin-public-preview-v25.cjs") {
  fail("package.json missing verify:admin-public-preview-v25 script");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-public-preview-v25")) {
  fail("main verify script does not include verify:admin-public-preview-v25");
}

console.log("OK: admin public preview V25 guard passed.");
