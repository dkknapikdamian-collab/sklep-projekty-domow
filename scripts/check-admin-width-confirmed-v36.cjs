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

requireFile("app/globals.css", [
  "ETAP34_V5_ADMIN_WIDTH_HARD_LOCK_2026_05_17_START",
  "admin-project-edit-shell",
  "min(1720px",
  "minmax(760px, 1fr)"
]);

requireFile("_project/11_USER_CONFIRMED_TESTS.md", [
  "ETAP34_V6_ADMIN_WIDTH_CONFIRMED_2026_05_17_START",
  "TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA",
  "szerokość panelu admina",
  "poprawione działa",
  "DP-TEST-034"
]);

requireFile("_project/19_ETAP34_ADMIN_UX_MANUAL_TESTS.md", [
  "ETAP34_V6_ADMIN_WIDTH_CONFIRMED_2026_05_17_START",
  "szerokość panelu admina",
  "POTWIERDZONE",
  "scroll"
]);

requireFile("_project/runs/2026-05-17_1425_etap34_v6_admin_width_confirmed.md", [
  "Etap 34 V6",
  "TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA",
  "poprawione działa",
  "Obsidian"
]);

console.log("OK: Etap 34 V6 manual confirmation guard passed.");
