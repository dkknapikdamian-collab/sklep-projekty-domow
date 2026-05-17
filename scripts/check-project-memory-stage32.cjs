/*
  Etap 32 guard: project memory must state that code has Etapy 22-29 elements,
  but V1 is not closed. This is a documentation/status guard, not a runtime test.
*/
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = process.cwd();
const markerStart = '<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->';
const markerEnd = '<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->';

function read(rel) {
  const file = path.join(root, rel);
  assert.ok(fs.existsSync(file), `Missing file: ${rel}`);
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
}

function mustInclude(rel, needles) {
  const text = read(rel);
  assert.ok(text.includes(markerStart), `${rel} missing Etap32 start marker`);
  assert.ok(text.includes(markerEnd), `${rel} missing Etap32 end marker`);
  for (const needle of needles) {
    assert.ok(text.includes(needle), `${rel} missing required text: ${needle}`);
  }
}

function mustContain(rel, needles) {
  const text = read(rel);
  for (const needle of needles) {
    assert.ok(text.includes(needle), `${rel} missing required text: ${needle}`);
  }
}

const coreNeedles = [
  'Etap 32',
  'Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte',
  'Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta',
  'TEST RĘCZNY DO WYKONANIA',
  'BRAK POTWIERDZONEGO TESTU RĘCZNEGO',
];

mustInclude('_project/03_CURRENT_STAGE.md', coreNeedles);
mustInclude('_project/07_NEXT_STEPS.md', [
  'Etap 32',
  'Nie zaczynać publicznego uruchomienia V1',
  'płatności',
  'runtime testy',
  'finalny flow klienta',
]);
mustInclude('_project/14_TEST_HISTORY.md', [
  'Etap 32',
  'TEST AUTOMATYCZNY / GUARD',
  'verify:project-memory-stage32',
  'BRAK POTWIERDZONEGO TESTU RĘCZNEGO',
]);
mustInclude('_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md', coreNeedles);
mustInclude('_project/06_GUARDS_AND_TESTS.md', [
  'Etap 32',
  'verify:project-memory-stage32',
  'check-project-memory-stage32.cjs',
]);
mustInclude('_project/08_CHANGELOG_AI.md', [
  'Etap 32',
  'Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte',
]);
mustInclude('_project/12_IMPLEMENTATION_LEDGER.md', [
  'Etap 32',
  'pamięci projektu',
  'Obsidian',
]);
mustContain('_project/runs/2026-05-17_0800_etap32_project_memory_ordering.md', [
  'Scan-first confirmation',
  'Run report',
  'Etap 32',
  'GIT / ZIP STATUS',
]);

const pkg = JSON.parse(read('package.json'));
assert.ok(pkg.scripts, 'package.json missing scripts');
assert.equal(pkg.scripts['verify:project-memory-stage32'], 'node scripts/check-project-memory-stage32.cjs');
assert.ok(pkg.scripts.verify.includes('verify:project-memory-stage32'), 'npm run verify must include verify:project-memory-stage32');

console.log('OK: Etap 32 project memory status is explicit and guarded.');
