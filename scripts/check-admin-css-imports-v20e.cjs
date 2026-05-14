const fs = require("fs");
const path = require("path");

const root = process.cwd();
const globalsPath = path.join(root, "app", "globals.css");

if (!fs.existsSync(globalsPath)) {
  console.error("FAIL: Missing app/globals.css.");
  process.exit(1);
}

const globals = fs.readFileSync(globalsPath, "utf8");

if (globals.includes("admin-real-v19.css")) {
  console.error("FAIL: app/globals.css still imports removed/stale admin-real-v19.css.");
  process.exit(1);
}

if (!globals.includes("admin-real-v20.css")) {
  console.error("FAIL: app/globals.css does not import admin-real-v20.css.");
  process.exit(1);
}

const importMatches = [...globals.matchAll(/@import\s+["']\.\/(.+?\.css)["'];/g)];
const missingImports = [];

for (const match of importMatches) {
  const relativeFile = match[1];
  const targetPath = path.join(root, "app", relativeFile);
  if (!fs.existsSync(targetPath)) {
    missingImports.push(relativeFile);
  }
}

if (missingImports.length) {
  console.error("FAIL: app/globals.css imports CSS files that do not exist:");
  for (const file of missingImports) console.error("- app/" + file);
  process.exit(1);
}

console.log("OK: admin CSS imports V20E guard passed.");
