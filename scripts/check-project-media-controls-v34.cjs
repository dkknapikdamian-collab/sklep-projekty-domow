const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const actions = read("app/admin/projekty/actions.ts");
const mediaManager = read("components/admin/AdminProjectMediaManager.tsx");
const repo = read("lib/project-repository.ts");
const gallery = read("components/project/ProjectGallery.tsx");

for (const marker of [
  "export async function deleteProjectMediaItemAction",
  "from(\"project_media\")",
  "export async function deleteProjectPrivateFileItemAction",
  "from(\"project_files\")"
]) {
  if (!actions.includes(marker)) fail(`Missing V34 action marker: ${marker}`);
}

for (const marker of [
  "data-admin-delete-media-item=\"true\"",
  "data-admin-delete-private-file-item=\"true\"",
  "deleteProjectMediaItemAction",
  "deleteProjectPrivateFileItemAction"
]) {
  if (!mediaManager.includes(marker)) fail(`Missing V34 media manager marker: ${marker}`);
}

if (/from\(\s*["']project_files["']\s*\)/.test(repo)) {
  fail("Public project repository must not read private project_files.");
}

if (!gallery.includes('data-project-gallery-v30="true"')) {
  fail("Project gallery marker missing.");
}

console.log("OK: V34 project media controls guard passed.");
