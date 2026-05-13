const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json not found");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:featurepicker-v15b"] = "node scripts/check-featurepicker-v15b.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:featurepicker-v15b")) {
  pkg.scripts.verify = "npm run verify:featurepicker-v15b && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:featurepicker-v15b";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");
console.log("OK: package.json updated for FeaturePicker V15B repair.");
