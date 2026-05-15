#!/usr/bin/env node
/* SKLEP_PROJEKTY_DOMOW_PROJECT_MEMORY_GUARD_V1 */
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();

const requiredPaths = [
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
];

const missing = [];
for (const rel of requiredPaths) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) missing.push(rel);
}

const pkgPath = path.join(root, 'package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (!pkg.scripts || pkg.scripts['check:project-memory'] !== 'node scripts/check-project-memory.cjs') {
      missing.push('package.json script: check:project-memory');
    }
  } catch (error) {
    console.error('ERROR: package.json is not valid JSON.');
    console.error(error.message);
    process.exit(1);
  }
}

if (missing.length) {
  console.error('Project memory guard failed. Missing or invalid:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('OK: project memory files are present.');
