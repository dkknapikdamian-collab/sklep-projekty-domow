const fs = require("fs");
const path = require("path");

const repo = process.cwd();
const actionsPath = path.join(repo, "app/admin/projekty/actions.ts");
const packagePath = path.join(repo, "package.json");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function findFunctionBlock(source, marker) {
  const start = source.indexOf(marker);
  if (start === -1) fail(`missing marker: ${marker}`);

  const braceStart = source.indexOf("{", start);
  if (braceStart === -1) fail(`missing opening brace for ${marker}`);

  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }

  fail(`missing closing brace for ${marker}`);
}

const actions = read(actionsPath);
const updateFn = findFunctionBlock(actions, "export async function updateProjectAction");

if (!updateFn.includes("/admin/projekty?updated=") || !updateFn.includes("&saved=1")) {
  fail("updateProjectAction success must redirect to /admin/projekty?updated=...&saved=1.");
}

if (!updateFn.includes("oldProject.code") || !updateFn.includes("encodeURIComponent")) {
  fail("updateProjectAction redirect must include encoded project code.");
}

if (updateFn.includes('return { ok: true, message: "Zapisano projekt i wszystkie powiazane dane." }')) {
  fail("updateProjectAction still returns success state instead of redirecting to project list.");
}

if (!updateFn.includes("NEXT_REDIRECT") || !updateFn.includes("throw error;")) {
  fail("updateProjectAction catch must rethrow NEXT_REDIRECT so redirect is not swallowed.");
}

if (!updateFn.includes("ok: false") || !updateFn.includes("Nieznany blad zapisu projektu")) {
  fail("updateProjectAction must still return error state on failures.");
}

const packageJson = JSON.parse(read(packagePath));
const scripts = packageJson.scripts || {};

if (scripts["verify:admin-save-redirect-v31"] !== "node scripts/check-admin-save-redirect-v31.cjs") {
  fail("package.json missing verify:admin-save-redirect-v31 script.");
}

if (!String(scripts.verify || "").includes("npm run verify:admin-save-redirect-v31")) {
  fail("package.json verify chain missing verify:admin-save-redirect-v31.");
}

console.log("OK: V31E admin save redirect guard passed.");
