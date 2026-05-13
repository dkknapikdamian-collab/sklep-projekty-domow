const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json not found");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:admin-select-options"] = "node scripts/check-admin-select-options.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:admin-select-options")) {
  pkg.scripts.verify = "npm run verify:admin-select-options && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:admin-select-options";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

console.log("OK: package.json updated for admin select options.");
