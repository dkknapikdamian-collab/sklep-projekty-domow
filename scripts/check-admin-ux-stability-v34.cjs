const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8").replace(/^\uFEFF/, "");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireFile(file, needles) {
  if (!exists(file)) fail("missing file: " + file);
  const content = read(file);
  const lower = content.toLowerCase();
  for (const needle of needles) {
    if (!lower.includes(String(needle).toLowerCase())) {
      fail(file + " missing marker: " + needle);
    }
  }
  return content;
}

requireFile("components/admin/AdminScrollStabilizer.tsx", [
  "use client",
  "sessionStorage",
  "scrollTo",
  "scrollRestoration",
  "addEventListener(\"submit\"",
  "data-admin-action-pending"
]);

requireFile("components/admin/AdminHeader.tsx", [
  "AdminScrollStabilizer",
  "<AdminScrollStabilizer />"
]);

requireFile("app/globals.css", [
  "@import \"./admin-ux-stability-v34.css\""
]);

requireFile("app/admin-ux-stability-v34.css", [
  "--admin-readable-max",
  ".admin-shell",
  ".admin-project-edit-shell",
  "calc(100vw",
  "1580px",
  "scroll-margin-top",
  "@media"
]);

requireFile("app/admin/projekty/[id]/edytuj/page.tsx", [
  "admin-project-edit-shell",
  "data-admin-project-edit-shell-v34"
]);

const seed = requireFile("supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql", [
  "DP-TEST-034",
  "admin-test-house-aurora-v34",
  "status",
  "draft",
  "project_media",
  "images.unsplash.com",
  "project_files",
  "TEST_DATA_SEED",
  "DO_URUCHOMIENIA",
  "NIE URUCHAMIAC",
  "::jsonb",
  "V4 fix"
]);

if (/features\s*=\s*array\[/i.test(seed) || /array\[[^\]]*audit runtime/i.test(seed)) {
  fail("seed SQL still uses text[] array syntax for projects.features.");
}

if (/related_slugs\s*,[\s\S]*array\[\]::text\[\]/i.test(seed) || /related_slugs\s*=\s*array\[\]::text\[\]/i.test(seed)) {
  fail("seed SQL still uses text[] array syntax for projects.related_slugs.");
}

requireFile("_project/19_ETAP34_ADMIN_UX_MANUAL_TESTS.md", [
  "TEST RĘCZNY DO WYKONANIA",
  "scroll",
  "szerokość",
  "media",
  "pliki prywatne",
  "zamówienia",
  "checklisty",
  "projekt testowy"
]);

requireFile("_project/runs/2026-05-17_1335_etap34_v4_seed_jsonb_fix.md", [
  "Etap 34 V4",
  "jsonb",
  "features",
  "related_slugs",
  "TESTY RĘCZNE",
  "Obsidian",
  "DO POTWIERDZENIA"
]);

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts["verify:admin-ux-stability-v34"] !== "node scripts/check-admin-ux-stability-v34.cjs") {
  fail("package.json missing verify:admin-ux-stability-v34 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-ux-stability-v34")) {
  fail("main verify does not include verify:admin-ux-stability-v34.");
}

console.log("OK: Etap 34 V4 admin UX stability + JSONB seed guard passed.");
