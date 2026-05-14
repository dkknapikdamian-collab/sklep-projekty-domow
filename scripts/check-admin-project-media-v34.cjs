const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const manager = read("components/admin/AdminProjectMediaManager.tsx");
const actions = read("app/admin/projekty/actions.ts");

for (const marker of [
  "data-admin-project-current-media=\"true\"",
  "data-admin-media-preview=\"true\"",
  "data-admin-media-sort-order=\"true\"",
  "data-admin-media-is-hero=\"true\"",
  "data-admin-media-is-thumbnail=\"true\"",
  "data-admin-media-public-url=\"true\"",
  "data-admin-set-media-hero=\"true\"",
  "data-admin-set-media-thumbnail=\"true\"",
  "data-admin-delete-media-item=\"true\"",
  "setProjectMediaTypeBoundAction",
  "deleteProjectMediaItemBoundAction"
]) {
  if (!manager.includes(marker)) fail(`Admin media manager missing marker: ${marker}`);
}

for (const marker of [
  "export async function setProjectMediaTypeAction",
  "from(\"project_media\")",
  "targetType",
  "redirect(`/admin/projekty/${projectId}/edytuj"
]) {
  if (!actions.includes(marker)) fail(`Admin media action missing marker: ${marker}`);
}

console.log("OK: V34 admin project media guard passed.");
