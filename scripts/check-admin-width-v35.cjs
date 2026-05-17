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
    if (!lower.includes(String(needle).toLowerCase())) fail(file + " missing marker: " + needle);
  }
  return content;
}

const globals = requireFile("app/globals.css", [
  "ETAP34_V5_ADMIN_WIDTH_HARD_LOCK_2026_05_17_START",
  "admin-project-edit-shell",
  "data-admin-project-edit-shell-v34",
  "min(1720px",
  "calc(100vw",
  "!important",
  "grid-template-columns",
  "minmax(760px, 1fr)"
]);

if (!/\.admin-shell\.admin-project-edit-shell\[data-admin-project-edit-shell-v34="true"\]/.test(globals)) {
  fail("globals.css missing exact admin edit shell hard-lock selector.");
}

requireFile("app/admin/projekty/[id]/edytuj/page.tsx", [
  "admin-project-edit-shell",
  "data-admin-project-edit-shell-v34"
]);

requireFile("components/admin/AdminScrollStabilizer.tsx", [
  "sessionStorage",
  "scrollTo",
  "scrollRestoration"
]);

requireFile("_project/11_USER_CONFIRMED_TESTS.md", [
  "TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO",
  "DP-TEST-034",
  "seed projektu testowego",
  "szerokość panelu admina",
  "FAIL",
  "wąski tunel",
  "SQL Editor",
  "Etap 34:"
]);

requireFile("_project/19_ETAP34_ADMIN_UX_MANUAL_TESTS.md", [
  "seed projektu testowego",
  "POTWIERDZONE",
  "szerokość panelu",
  "FAIL",
  "DO PONOWNEGO TESTU"
]);

requireFile("_project/18_SQL_LEDGER.md", [
  "2026-05-17_etap34_seed_admin_test_project",
  "URUCHOMIONE",
  "POTWIERDZONE",
  "DP-TEST-034",
  "draft"
]);

requireFile("_project/runs/2026-05-17_1405_etap34_v5_admin_width_confirmations.md", [
  "Etap 34 V5",
  "wąski tunel",
  "TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO",
  "DO PONOWNEGO TESTU",
  "Obsidian"
]);

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts["verify:admin-width-v35"] !== "node scripts/check-admin-width-v35.cjs") {
  fail("package.json missing verify:admin-width-v35 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-width-v35")) {
  fail("main verify does not include verify:admin-width-v35.");
}

console.log("OK: Etap 34 V5 admin width hard lock + confirmations guard passed.");
