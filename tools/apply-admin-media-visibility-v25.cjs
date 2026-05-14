const fs = require("fs");
const path = require("path");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function ensureGlobalCssImport() {
  const filePath = path.join(process.cwd(), "app", "globals.css");
  let source = fs.readFileSync(filePath, "utf8");

  if (!source.includes('./admin-media-v25.css') && !source.includes('"./admin-media-v25.css"')) {
    const importLine = '@import "./admin-media-v25.css";\n';
    const importMatches = source.match(/^(?:@import[^\n]+;\s*\n)+/);
    if (importMatches) {
      source = source.replace(importMatches[0], `${importMatches[0]}${importLine}`);
    } else {
      source = `${importLine}${source}`;
    }
    fs.writeFileSync(filePath, source, "utf8");
    console.log("PATCHED: app/globals.css import admin-media-v25.css");
  } else {
    console.log("OK: app/globals.css already imports admin-media-v25.css");
  }
}

function ensurePackageScripts() {
  const filePath = path.join(process.cwd(), "package.json");
  const pkg = readJson(filePath);
  pkg.scripts ||= {};

  pkg.scripts["verify:admin-media-visibility-v25"] = "node scripts/check-admin-media-visibility-v25.cjs";

  const guard = "npm run verify:admin-media-visibility-v25";
  const verify = pkg.scripts.verify || "";
  if (!verify.includes("verify:admin-media-visibility-v25")) {
    pkg.scripts.verify = verify ? `${guard} && ${verify}` : guard;
  }

  writeJson(filePath, pkg);
  console.log("PATCHED: package.json V25 verify scripts");
}

ensureGlobalCssImport();
ensurePackageScripts();
console.log("OK: V25 admin media visibility patch metadata applied.");
