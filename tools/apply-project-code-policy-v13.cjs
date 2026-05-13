const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json not found");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:project-code-policy"] = "node scripts/check-project-code-policy.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:project-code-policy")) {
  pkg.scripts.verify = "npm run verify:project-code-policy && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:project-code-policy";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

console.log("OK: package.json updated for project code policy.");
