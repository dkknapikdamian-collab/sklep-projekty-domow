const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const fail = (message) => {
  console.error("FAIL: " + message);
  process.exit(1);
};

for (const file of [
  "app/admin/projekty/actions.ts",
  "components/admin/AdminProjectMediaManager.tsx",
  "lib/admin/order-files.ts",
  "lib/admin/project-files-model.ts",
  "package.json"
]) {
  if (!exists(file)) fail("missing file: " + file);
}

const actions = read("app/admin/projekty/actions.ts");
for (const marker of [
  "floorPlansPrivateFile",
  "floor_plans",
  "setProjectPrivateFileActiveAction",
  "setProjectPrivateFileActiveBoundAction",
  "project_private_file_status_update",
  "active: nextActive",
  "metadata:",
  "ETAP26B_PRIVATE_FILES_UX"
]) {
  if (!actions.includes(marker)) fail("actions.ts missing marker: " + marker);
}

const manager = read("components/admin/AdminProjectMediaManager.tsx");
for (const marker of [
  "floorPlansPrivateFile",
  "Rzuty pomieszczeń PDF",
  "setProjectPrivateFileActiveBoundAction",
  "data-admin-set-private-file-active",
  "Aktywuj plik",
  "Dezaktywuj plik",
  "data-admin-private-file-required-for-publication",
  "data-admin-private-file-auto-send"
]) {
  if (!manager.includes(marker)) fail("AdminProjectMediaManager.tsx missing marker: " + marker);
}

const orderFiles = read("lib/admin/order-files.ts");
for (const marker of [
  "floor_plans",
  "Rzuty pomieszczeń PDF",
  "ADMIN_ORDER_PRIVATE_FILE_FULFILLMENT_KINDS",
  "kind === \"floor_plans\"",
  "isProjectFileActive"
]) {
  if (!orderFiles.includes(marker)) fail("order-files.ts missing marker: " + marker);
}

const model = read("lib/admin/project-files-model.ts");
for (const marker of ["floor_plans", "Rzuty pomieszczeń PDF", "PROJECT_FILE_STORAGE_BUCKET"]) {
  if (!model.includes(marker)) fail("project-files-model.ts missing marker: " + marker);
}

for (const privateSource of [actions, orderFiles, model]) {
  if (privateSource.includes("google_drive") || privateSource.includes("driveFileId") || privateSource.includes("storage_file_id")) {
    fail("Etap 26B must remain Supabase Storage, not Google Drive.");
  }
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["verify:project-private-files-ux-v26b"] !== "node scripts/check-project-private-files-ux-v26b.cjs") {
  fail("package.json missing verify:project-private-files-ux-v26b script.");
}

console.log("OK: Etap 26B private files UX guard passed.");
