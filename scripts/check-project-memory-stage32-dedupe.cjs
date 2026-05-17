/*
  Etap 32 V5 guard: the canonical Etap 32 project memory block must not be duplicated.
  This is a documentation/status guard, not a runtime test.
*/
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const appRoot = process.cwd();
const vaultRoot = process.env.OBSIDIAN_VAULT || '';
const markerStart = '<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->';
const markerEnd = '<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->';
const detail = 'Szczegóły: [[2026-05-17 - Etap 32 uporzadkowanie pamieci projektu]]';

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function read(base, rel) {
  const file = path.join(base, rel);
  assert.ok(fs.existsSync(file), `Missing file: ${file}`);
  return fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
}

function expectOne(base, rel, opts = {}) {
  const text = read(base, rel);
  assert.equal(count(text, markerStart), 1, `${rel} must contain exactly one Etap32 start marker`);
  assert.equal(count(text, markerEnd), 1, `${rel} must contain exactly one Etap32 end marker`);
  assert.ok(text.includes('Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte'), `${rel} missing canonical V1 status`);
  assert.ok(text.includes('Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta'), `${rel} missing canonical blocker list`);
  if (opts.detailMaxOne) {
    assert.ok(count(text, detail) <= 1, `${rel} must not duplicate Etap32 detail link`);
  }
}

const appFiles = [
  '_project/03_CURRENT_STAGE.md',
  '_project/07_NEXT_STEPS.md',
  '_project/14_TEST_HISTORY.md',
  '_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md',
];

for (const rel of appFiles) {
  expectOne(appRoot, rel);
}

expectOne(appRoot, '_project/06_GUARDS_AND_TESTS.md');

if (vaultRoot) {
  expectOne(vaultRoot, '10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md', { detailMaxOne: true });
  expectOne(vaultRoot, '10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md', { detailMaxOne: true });
}

console.log('OK: Etap 32 memory blocks are deduplicated.');
