const fs = require("fs");
const path = require("path");

const root = process.argv[2] || process.cwd();
const vault = process.argv[3] || "";
const marker = "SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15";

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function mustExist(p, label) {
  if (!fs.existsSync(p)) fail("Missing " + label + ": " + p);
}

function read(rel) {
  const p = path.join(root, rel);
  mustExist(p, rel);
  return fs.readFileSync(p, "utf8");
}

const required = [
  "00_PROJECT_STATUS.md",
  "01_PROJECT_GOAL.md",
  "02_WORK_RULES.md",
  "03_CURRENT_STAGE.md",
  "04_DECISIONS.md",
  "05_MANUAL_TESTS.md",
  "06_GUARDS_AND_TESTS.md",
  "07_NEXT_STEPS.md",
  "08_CHANGELOG_AI.md",
  "09_CONTEXT_FOR_OBSIDIAN.md",
  "10_PROJECT_TIMELINE.md",
  "11_USER_CONFIRMED_TESTS.md",
  "12_IMPLEMENTATION_LEDGER.md",
  "13_PROJECTS_AND_CAMPAIGNS_LEDGER.md",
  "14_TEST_HISTORY.md",
  "15_ACTIVE_SOURCE_MAP.md",
  "16_OBSIDIAN_NAMING_RULES.md",
];

mustExist(path.join(root, "AGENTS.md"), "AGENTS.md");
mustExist(path.join(root, "_project"), "_project");
mustExist(path.join(root, "_project", "runs"), "_project/runs");
mustExist(path.join(root, "_project", "history"), "_project/history");
for (const file of required) mustExist(path.join(root, "_project", file), "_project/" + file);

if (!read("AGENTS.md").includes(marker)) fail("AGENTS.md missing V6 marker");

const decisions = read(path.join("_project", "04_DECISIONS.md"));
for (const phrase of [
  "aplikacja sklepowa",
  "Projekt w formacie PDF na e-mail",
  "Katalog produkcyjny",
]) {
  if (!decisions.includes(phrase)) fail("Decisions missing phrase: " + phrase);
}

const testHistory = read(path.join("_project", "14_TEST_HISTORY.md"));
for (const phrase of [
  "TEST AUTOMATYCZNY / GUARD",
  "TEST RECZNY DO WYKONANIA",
  "TEST RECZNY POTWIERDZONY PRZEZ DAMIANA",
  "BRAK POTWIERDZONEGO TESTU",
]) {
  if (!testHistory.includes(phrase)) fail("Test history missing status: " + phrase);
}

const naming = read(path.join("_project", "16_OBSIDIAN_NAMING_RULES.md"));
for (const phrase of ["INDEX.md", "STATUS.md", "00_START - Sklep projekty domow.md"]) {
  if (!naming.includes(phrase)) fail("Naming rules missing phrase: " + phrase);
}

const runFiles = fs.readdirSync(path.join(root, "_project", "runs"))
  .filter((name) => name.includes("sklep_full_memory_obsidian_repo_v6") && name.endsWith(".md"));
if (runFiles.length === 0) fail("Missing V6 run report in _project/runs");

if (vault) {
  const obs = path.join(vault, "10_PROJEKTY", "Sklep_projekty_domow");
  mustExist(obs, "Obsidian project section");
  mustExist(path.join(obs, "00_START - Sklep projekty domow.md"), "Obsidian start file");
  mustExist(path.join(obs, "01_STATUS - Sklep projekty domow.md"), "Obsidian status file");
  mustExist(path.join(obs, "12_AUDYT_NAZW_PLIKOW_OBSIDIAN - Sklep projekty domow.md"), "Obsidian naming audit file");
  const generic = new Set(["INDEX.md", "STATUS.md", "LEDGER.md", "CONTEXT.md", "NOTES.md", "REPORT.md", "TESTS.md", "TODO.md", "NEXT.md"]);
  for (const name of fs.readdirSync(obs)) {
    if (generic.has(name.toUpperCase())) fail("Generic active Obsidian file still exists: " + name);
  }
}

console.log("OK: Sklep full memory V6 guard passed.");
