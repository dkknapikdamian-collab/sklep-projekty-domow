#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const defaultVault = 'C:/Users/malim/Desktop/biznesy_ai/00_OBSIDIAN_VAULT';
const vault = process.env.OBSIDIAN_VAULT || defaultVault;
const obsidianProjectRel = path.join('10_PROJEKTY', 'Sklep_projekty_domow');
const errors = [];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function requireFile(rel) {
  if (!exists(rel)) errors.push(`Missing required file: ${rel}`);
}

function requireContains(rel, patterns) {
  const text = read(rel);
  for (const pattern of patterns) {
    if (!text.includes(pattern)) errors.push(`File ${rel} is missing marker: ${pattern}`);
  }
}

const appFiles = [
  'AGENTS.md',
  '_project/00_PROJECT_STATUS.md',
  '_project/01_PROJECT_GOAL.md',
  '_project/02_WORK_RULES.md',
  '_project/03_CURRENT_STAGE.md',
  '_project/04_DECISIONS.md',
  '_project/05_MANUAL_TESTS.md',
  '_project/06_GUARDS_AND_TESTS.md',
  '_project/07_NEXT_STEPS.md',
  '_project/08_CHANGELOG_AI.md',
  '_project/09_CONTEXT_FOR_OBSIDIAN.md',
  '_project/10_PROJECT_TIMELINE.md',
  '_project/11_USER_CONFIRMED_TESTS.md',
  '_project/runs/.gitkeep',
  '_project/history/.gitkeep',
  'scripts/check-project-memory.cjs',
];

for (const file of appFiles) requireFile(file);

requireContains('AGENTS.md', [
  'Sklep z projektami domów',
  '_project/',
  'ZIP',
  'Obsidian',
  'Fakt',
]);

requireContains('_project/01_PROJECT_GOAL.md', [
  'Zakres V1',
  'Zakres V2',
  'Projekt w formacie PDF na e-mail',
  '+250 zł',
]);

requireContains('_project/04_DECISIONS.md', [
  'Aktywne decyzje',
  'HIPOTEZA / PROPOZYCJA',
  'Fikcyjne projekty',
]);

requireContains('_project/06_GUARDS_AND_TESTS.md', [
  'node scripts/check-project-memory.cjs',
  'npm run check:project-memory',
  'npm run build',
]);

requireContains('_project/11_USER_CONFIRMED_TESTS.md', [
  'Potwierdzenia Damiana',
  'brak guardu - tylko test ręczny',
]);

const runsDir = path.join(root, '_project', 'runs');
if (fs.existsSync(runsDir)) {
  const reports = fs.readdirSync(runsDir).filter((name) => name.includes('sklep-pelny-mozg-projektu') && name.endsWith('.md'));
  if (reports.length === 0) errors.push('Missing AI report in _project/runs/*sklep-pelny-mozg-projektu.md');
}

if (fs.existsSync(vault)) {
  const obsidianProject = path.join(vault, obsidianProjectRel);
  const obsFiles = [
    '00_START - Sklep projekty domow.md',
    '01_KIERUNEK I ZAKRES - Sklep projekty domow.md',
    '02_STAN OBECNY - Sklep projekty domow.md',
    '03_DECYZJE - Sklep projekty domow.md',
    '04_ETAPY I WDROZENIA - Sklep projekty domow.md',
    '05_TESTY RECZNE - Sklep projekty domow.md',
    '06_GUARDY I TESTY AUTOMATYCZNE - Sklep projekty domow.md',
    '07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md',
    '08_HISTORIA I ZMIANY KIERUNKU - Sklep projekty domow.md',
    '09_NASTEPNY KROK - Sklep projekty domow.md',
    '10_ZASADY PROJEKTU - Sklep projekty domow.md',
  ];

  for (const name of obsFiles) {
    const full = path.join(obsidianProject, name);
    if (!fs.existsSync(full)) errors.push(`Missing Obsidian project file: ${path.join(obsidianProjectRel, name)}`);
    if (!name.includes('Sklep projekty domow')) errors.push(`Obsidian file name must include project name: ${name}`);
  }

  const forbiddenGeneric = ['INDEX.md', 'STATUS.md', 'CONTEXT.md'];
  for (const name of forbiddenGeneric) {
    const full = path.join(obsidianProject, name);
    if (fs.existsSync(full)) errors.push(`Forbidden generic Obsidian file in project folder: ${name}`);
  }

  const reportsDir = path.join(obsidianProject, '_RAPORTY_AI');
  if (!fs.existsSync(reportsDir)) {
    errors.push('Missing Obsidian reports dir: _RAPORTY_AI');
  } else {
    const reports = fs.readdirSync(reportsDir).filter((name) => name.includes('sklep-pelny-mozg-projektu') && name.endsWith('.md'));
    if (reports.length === 0) errors.push('Missing Obsidian AI report in _RAPORTY_AI/*sklep-pelny-mozg-projektu.md');
  }
} else {
  console.warn(`[WARN] Obsidian vault not found at ${vault}. Skipping Obsidian file checks.`);
}

if (errors.length) {
  console.error('Project memory check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('OK: project memory files are complete for Sklep projekty domow.');
