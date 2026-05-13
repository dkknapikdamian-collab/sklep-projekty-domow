const fs = require("fs");
const path = require("path");

const root = process.cwd();

const nextConfigPath = path.join(root, "next.config.ts");
const actionsPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");
const packagePath = path.join(root, "package.json");

for (const file of [nextConfigPath, actionsPath, packagePath]) {
  if (!fs.existsSync(file)) {
    console.error(`FAIL: Missing ${path.relative(root, file)}`);
    process.exit(1);
  }
}

const packageSource = fs.readFileSync(packagePath, "utf8");

if (packageSource.charCodeAt(0) === 0xfeff) {
  console.error("FAIL: package.json still has BOM.");
  process.exit(1);
}

try {
  JSON.parse(packageSource);
} catch (error) {
  console.error("FAIL: package.json is not valid JSON.");
  console.error(error.message);
  process.exit(1);
}

const nextConfig = fs.readFileSync(nextConfigPath, "utf8");

for (const needle of ["serverActions", "bodySizeLimit", "25mb"]) {
  if (!nextConfig.includes(needle)) {
    console.error(`FAIL: next.config.ts missing ${needle}`);
    process.exit(1);
  }
}

const actions = fs.readFileSync(actionsPath, "utf8");

for (const needle of [
  "let code =",
  "generateProjectCode",
  "Nie udało się wygenerować kodu projektu",
  "0012_project_code_generation.sql"
]) {
  if (!actions.includes(needle)) {
    console.error(`FAIL: actions.ts missing ${needle}`);
    process.exit(1);
  }
}

console.log("OK: Server Action 400 V16 guard passed.");
