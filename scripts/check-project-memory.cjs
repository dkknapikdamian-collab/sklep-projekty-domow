const fs = require('fs');
const path = require('path');

const root = process.cwd();

const requiredFiles = [
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
  '_project/runs/.gitkeep',
];

const requiredAgentMentions = [
  '_project/00_PROJECT_STATUS.md',
  '_project/01_PROJECT_GOAL.md',
  '_project/02_WORK_RULES.md',
  '_project/03_CURRENT_STAGE.md',
  '_project/04_DECISIONS.md',
  '_project/05_MANUAL_TESTS.md',
  '_project/06_GUARDS_AND_TESTS.md',
  '_project/07_NEXT_STEPS.md',
  '_project/08_CHANGELOG_AI.md',
  '_project/runs/',
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const missingFiles = requiredFiles.filter((file) => !exists(file));

let missingMentions = [];
if (exists('AGENTS.md')) {
  const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
  missingMentions = requiredAgentMentions.filter((mention) => !agents.includes(mention));
}

if (missingFiles.length || missingMentions.length) {
  if (missingFiles.length) {
    console.error('ERROR: missing required project memory files:');
    for (const file of missingFiles) console.error(`- ${file}`);
  }

  if (missingMentions.length) {
    console.error('ERROR: AGENTS.md is missing required project memory references:');
    for (const mention of missingMentions) console.error(`- ${mention}`);
  }

  process.exit(1);
}

console.log('OK: project memory structure is complete.');
