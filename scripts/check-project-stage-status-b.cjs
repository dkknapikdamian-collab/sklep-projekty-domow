const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const fail = (msg) => {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
};
const assertIncludes = (file, text, marker) => {
  if (!file.includes(text)) fail(`missing marker: ${marker || text}`);
};

const current = read("_project/03_CURRENT_STAGE.md");
const next = read("_project/07_NEXT_STEPS.md");
const tests = read("_project/14_TEST_HISTORY.md");
const roadmap = read("_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md");
const checklist = read("_project/16_PRODUCTION_READINESS_CHECKLIST.md");

assertIncludes(current, "Aktualny realny stan - Etap B", "current stage Etap B real status");
assertIncludes(current, "Kod ma wdrożone elementy etapów 22-29", "22-29 not fully closed");
assertIncludes(current, "Nie wolno traktować Etapu 29 jako pełnego zamknięcia V1", "Etap 29 not V1 close");
assertIncludes(current, "docelowe płatności automatyczne nie są wdrożone", "automatic payments not implemented");

const firstChunk = current.slice(0, 2200);
if (firstChunk.includes("Etap 20: Widok audit logu")) {
  fail("Etap 20 still appears in the first active current-stage chunk");
}

assertIncludes(next, "Najbliższy realny kierunek", "next real direction");
assertIncludes(next, "Etap A: korekta kierunku płatności", "Etap A after memory fix");
assertIncludes(next, "Runtime audit admina", "runtime audit next");
assertIncludes(next, "Pełny flow sklepu bez publikacji klientom", "full flow without public release");

assertIncludes(tests, "Etap B: naprawa project memory", "test history Etap B");
assertIncludes(tests, "Runtime V1: TEST RĘCZNY DO WYKONANIA", "runtime manual test not confirmed");
assertIncludes(tests, "Runtime audit admina: TEST RĘCZNY DO WYKONANIA", "audit manual test not confirmed");

assertIncludes(roadmap, "Etap B - naprawa project memory", "roadmap Etap B memory fix");
assertIncludes(roadmap, "Etap 29 nie zamyka V1", "roadmap Etap 29 warning");
assertIncludes(roadmap, "Automatyczne płatności online - osobny przyszły etap", "payments future separate stage");

assertIncludes(checklist, "BLOKADA: aktualny realny stan po Etapie B", "readiness blocker");
assertIncludes(checklist, "aplikacja nie jest jeszcze publiczna dla klientów", "not public to clients");

console.log("OK: Etap B project memory status is canonical and guarded.");