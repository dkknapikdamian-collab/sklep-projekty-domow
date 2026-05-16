#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const errors = [];

function fail(message) {
  errors.push(message);
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function requireFile(rel) {
  if (!exists(rel)) fail(`Missing required file: ${rel}`);
}

function requireIncludes(rel, needles) {
  const text = read(rel);
  for (const needle of needles) {
    if (!text.includes(needle)) fail(`${rel} missing required marker: ${needle}`);
  }
}

const checklist = "_project/16_PRODUCTION_READINESS_CHECKLIST.md";
requireFile(checklist);
requireFile("_project/00_PROJECT_STATUS.md");
requireFile("_project/03_CURRENT_STAGE.md");
requireFile("_project/05_MANUAL_TESTS.md");
requireFile("_project/06_GUARDS_AND_TESTS.md");
requireFile("_project/07_NEXT_STEPS.md");
requireFile("_project/11_USER_CONFIRMED_TESTS.md");
requireFile("_project/14_TEST_HISTORY.md");
requireFile("README.md");
requireFile("package.json");

requireIncludes(checklist, [
  "Etap 29 pre-release V1",
  "OK",
  "BLOKADA",
  "DO POTWIERDZENIA",
  "NIE DOTYCZY V1",
  "Env Supabase ustawiony",
  "Service role tylko server-side",
  "Public media bucket działa",
  "Private files bucket działa",
  "Migracje zastosowane",
  "Brak demo w publicu",
  "Checkout / zamówienie działa zgodnie z V1",
  "Admin zamówień działa",
  "Admin audit działa",
  "Audit zapisuje realne operacje admina",
  "Build przechodzi",
  "Ręczny test Damiana zapisany",
  "Obsidian zaktualizowany",
  "Brak sprzecznych tekstów o płatnościach",
  "Brak fikcyjnych obietnic automatycznej wysyłki",
  "Nie wdraża Stripe",
  "Nie wdraża płatności ręcznej jako nowej funkcji",
  "Nie wdraża automatycznej wysyłki plików",
  "Nie wdraża faktur",
  "Nie wdraża panelu klienta"
]);

const checklistText = read(checklist);
const requiredStatuses = ["OK", "BLOKADA", "DO POTWIERDZENIA", "NIE DOTYCZY V1"];
for (const status of requiredStatuses) {
  if (!checklistText.includes(status)) fail(`Checklist missing status option: ${status}`);
}

const requiredSections = ["## Teza", "## Kryterium końcowe", "## Checklist pre-release V1", "## Najkrótszy test praktyczny", "## Czego ten etap nie robi", "## Wymagany guard"];
for (const section of requiredSections) {
  if (!checklistText.includes(section)) fail(`Checklist missing section: ${section}`);
}

const packageJsonText = read("package.json");
let packageJson;
try {
  packageJson = JSON.parse(packageJsonText);
} catch (error) {
  fail(`package.json is not valid JSON: ${error.message}`);
}

if (packageJson) {
  if (packageJson.scripts?.["verify:production-readiness-v52"] !== "node scripts/check-production-readiness-v52.cjs") {
    fail("package.json missing verify:production-readiness-v52 script.");
  }
  if (!String(packageJson.scripts?.verify || "").includes("verify:production-readiness-v52")) {
    fail("package.json main verify script must include verify:production-readiness-v52.");
  }
}

const docsMarkers = [
  "Etap 29",
  "pre-release",
  "testowej sprzedaży realnego projektu",
  "bez udawania automatyzacji"
];
requireIncludes("README.md", ["verify:production-readiness-v52"]);
for (const rel of [
  "_project/00_PROJECT_STATUS.md",
  "_project/03_CURRENT_STAGE.md",
  "_project/05_MANUAL_TESTS.md",
  "_project/06_GUARDS_AND_TESTS.md",
  "_project/07_NEXT_STEPS.md",
  "_project/14_TEST_HISTORY.md"
]) {
  requireIncludes(rel, docsMarkers.slice(0, 2));
}
requireIncludes("_project/11_USER_CONFIRMED_TESTS.md", ["Brak potwierdzenia Etapu 29", "TEST RĘCZNY DO WYKONANIA"]);

const forbiddenPublicClaims = [
  "automatyczna wysyłka plików",
  "automatyczna wysylka plikow",
  "natychmiastowy dostęp do plików",
  "natychmiastowy dostep do plikow",
  "faktura automatyczna",
  "Stripe działa",
  "Stripe dziala",
  "PayU działa",
  "PayU dziala"
];
const publicFiles = [
  "app/page.tsx",
  "app/projekty/page.tsx",
  "app/projekty/[slug]/page.tsx",
  "app/koszyk/page.tsx",
  "app/zamowienie/page.tsx",
  "components/project/ProjectCard.tsx",
  "components/project/ProjectDetailPage.tsx"
];
for (const rel of publicFiles) {
  if (!exists(rel)) continue;
  const text = read(rel);
  for (const claim of forbiddenPublicClaims) {
    if (text.includes(claim)) fail(`Forbidden public pre-release claim in ${rel}: ${claim}`);
  }
}

if (errors.length) {
  console.error("Production readiness V52 check failed:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("OK: Etap 29 production readiness checklist is present and guarded.");