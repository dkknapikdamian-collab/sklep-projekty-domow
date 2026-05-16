#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const requiredFiles = [
  '_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md',
  '_project/07_NEXT_STEPS.md',
  '_project/16_PRODUCTION_READINESS_CHECKLIST.md',
];

const requiredPhrases = [
  'Nie wdrazamy platnosci recznych jako docelowego modelu',
  'Aplikacja nie jest jeszcze publiczna',
  'Docelowo platnosci maja byc automatyczne',
  'manual-payment sa legacy/do korekty przed publikacja',
];

let failed = false;
const failures = [];

function read(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    failed = true;
    failures.push(`MISSING_FILE: ${rel}`);
    return '';
  }
  return fs.readFileSync(abs, 'utf8');
}

function normalize(text) {
  return String(text)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/Ĺ‚/g, 'l').replace(/Ĺ/g, 'L')
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

for (const rel of requiredFiles) {
  const content = read(rel);
  const haystack = normalize(content);
  for (const phrase of requiredPhrases) {
    if (!haystack.includes(normalize(phrase))) {
      failed = true;
      failures.push(`MISSING_DECISION_PHRASE in ${rel}: ${phrase}`);
    }
  }
}

const targetModelPatterns = [
  /docelowo\s+platnosci\s+reczn/i,
  /platnosci\s+reczne\s+sa\s+docelowym\s+modelem/i,
  /manual[-\s]?payment\s+is\s+target/i,
  /model\s+docelowy\s*[:\-]\s*platnosci\s+reczne/i,
];

for (const rel of requiredFiles) {
  const lines = read(rel).split(/\r?\n/);
  lines.forEach((line, index) => {
    const normalizedLine = normalize(line);
    const safe = /nie wdrazamy|legacy|do korekty|przed publikacja|do potwierdzenia|tymczas|temporary|internal|pomocnicz|blokad|nie jest jeszcze publiczna/i.test(normalizedLine);
    if (!safe && targetModelPatterns.some((rx) => rx.test(normalizedLine))) {
      failed = true;
      failures.push(`FORBIDDEN_TARGET_MODEL in ${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

const packageJsonPath = path.join(root, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const manualScript = pkg.scripts && pkg.scripts['verify:manual-payment-v48'];
  const directionScript = pkg.scripts && pkg.scripts['verify:payment-direction-v48'];
  if (!manualScript || !manualScript.includes('check-manual-payment-legacy-v48.cjs')) {
    failed = true;
    failures.push('PACKAGE_SCRIPT_NOT_POINTING_TO_LEGACY_GUARD: verify:manual-payment-v48');
  }
  if (!directionScript || !directionScript.includes('check-manual-payment-legacy-v48.cjs')) {
    failed = true;
    failures.push('PACKAGE_SCRIPT_NOT_POINTING_TO_LEGACY_GUARD: verify:payment-direction-v48');
  }
}

if (failed) {
  console.error('FAIL: manual-payment-v48 legacy guard detected blockers.');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log('OK: payment v48 guards legacy/payment-roadmap decision, not manual payments as target model.');