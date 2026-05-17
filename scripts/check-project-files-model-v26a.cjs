const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireFile(file) {
  if (!exists(file)) fail("missing Etap 26A file: " + file);
  return read(file);
}

function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(file + " missing marker: " + marker);
  }
  return source;
}

const model = requireMarkers("lib/admin/project-files-model.ts", [
  "PROJECT_FILE_STORAGE_BUCKET",
  "PROJECT_FILE_TYPES",
  "PROJECT_FILE_TYPE_CONFIG",
  "documentation",
  "floor_plans",
  "pdf_email_package",
  "full_package",
  "cost_estimate",
  "requiredForPublication",
  "autoSendAfterPayment",
  "isProjectFileActive",
  "isProjectFileRequiredForPublication",
  "isProjectFileAutoSendAfterPayment"
]);

const sql = requireMarkers("supabase/manual/2026-05-17_etap26a_project_files_model.sql", [
  "SQL_LEDGER_ID: 2026-05-17_etap26a_project_files_model",
  "active boolean not null default true",
  "auto_send_after_payment boolean not null default false",
  "required_for_publication boolean not null default false",
  "sort_order integer not null default 100",
  "metadata jsonb not null default '{}'::jsonb",
  "project_files_project_active_idx",
  "project_files_project_required_idx",
  "project_files_project_auto_send_idx"
]);

const actions = requireMarkers("app/admin/projekty/actions.ts", [
  "PROJECT_FILE_STORAGE_BUCKET",
  "getProjectFileDefaults",
  "file_type, path, active, required_for_publication",
  "supabase.storage.from(PROJECT_FILE_STORAGE_BUCKET)",
  "auto_send_after_payment: fileDefaults.autoSendAfterPayment",
  "required_for_publication: fileDefaults.requiredForPublication",
  "sort_order: fileDefaults.sortOrder",
  "stage: \"ETAP26A_PROJECT_FILES_MODEL\"",
  "storage: \"supabase\""
]);

const readiness = requireMarkers("lib/admin/project-publication-readiness.ts", [
  "isProjectFileActive",
  "isProjectFileRequiredForPublication",
  "normalizeProjectFileType",
  "active?: boolean | null",
  "required_for_publication?: boolean | null",
  "hasRequiredPublicationPrivateFiles",
  "Dodaj aktywny prywatny plik wymagany do publikacji"
]);

const orderFiles = requireMarkers("lib/admin/order-files.ts", [
  "PROJECT_FILE_TYPE_CONFIG",
  "getProjectFileTypeConfig",
  "isProjectFileActive",
  "active: boolean",
  "autoSendAfterPayment: boolean",
  "requiredForPublication: boolean",
  "auto_send_after_payment",
  "required_for_publication",
  "if (!isProjectFileActive(row)) continue",
  "Pobierz ręcznie w Supabase Storage"
]);

requireMarkers("lib/admin/projects-admin.ts", [
  "autoSendAfterPayment: boolean",
  "requiredForPublication: boolean",
  "active, auto_send_after_payment, required_for_publication",
  "active: item.active !== false",
  "autoSendAfterPayment: item.auto_send_after_payment === true",
  "requiredForPublication: item.required_for_publication === true"
]);

requireMarkers("components/admin/AdminProjectMediaManager.tsx", [
  "data-admin-private-file-active",
  "data-admin-private-file-required-for-publication",
  "data-admin-private-file-auto-send",
  "Aktywny:",
  "Wymagany do publikacji:",
  "Auto po płatności:"
]);

requireMarkers("docs/implementation/ETAP26A_PROJECT_FILES_MODEL.md", [
  "ETAP26A_PROJECT_FILES_MODEL",
  "Supabase Storage",
  "project_files",
  "verify:project-files-model-v26a",
  "BRAK POTWIERDZONEGO TESTU RĘCZNEGO"
]);

const tsconfig = JSON.parse(requireFile("tsconfig.json"));
if (!Array.isArray(tsconfig.exclude) || !tsconfig.exclude.includes("_backup_local")) {
  fail("tsconfig.json must exclude _backup_local so local backups do not break typecheck.");
}

const pkg = JSON.parse(requireFile("package.json"));
if (pkg.scripts?.["verify:project-files-model-v26a"] !== "node scripts/check-project-files-model-v26a.cjs") {
  fail("package.json missing verify:project-files-model-v26a script");
}
if (!String(pkg.scripts?.verify || "").includes("verify:project-files-model-v26a")) {
  fail("main verify script missing verify:project-files-model-v26a");
}

// Provider safety: no Google Drive model in Etap 26A.
for (const [name, source] of Object.entries({ model, sql, readiness, orderFiles, actions })) {
  for (const forbidden of ["google_drive", "driveFileId", "storage_file_id"]) {
    if (source.includes(forbidden)) {
      fail(`${name} must not contain Google Drive storage marker: ${forbidden}`);
    }
  }
}

// Public URL guard is deliberately narrowed to private project-file sources only.
// Public media upload/admin previews may legitimately contain getPublicUrl/publicUrl.
for (const [name, source] of Object.entries({ model, sql, readiness, orderFiles })) {
  for (const forbidden of ["getPublicUrl", "publicUrl"]) {
    if (source.includes(forbidden)) {
      fail(`${name} must not expose public URL marker in private project file model: ${forbidden}`);
    }
  }
}

console.log("OK: Etap 26A project_files model guard passed.");
