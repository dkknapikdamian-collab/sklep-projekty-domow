const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json not found");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:no-static-supabase"] = "node scripts/check-no-supabase-static-params.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:no-static-supabase")) {
  pkg.scripts.verify = "npm run verify:no-static-supabase && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:no-static-supabase";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

const gitignorePath = path.join(root, ".gitignore");
let gitignore = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, "utf8") : "";
if (!gitignore.split(/\r?\n/).includes("tsconfig.tsbuildinfo")) {
  gitignore = gitignore.replace(/\s*$/, "\n") + "tsconfig.tsbuildinfo\n";
  fs.writeFileSync(gitignorePath, gitignore);
}

console.log("OK: package.json and .gitignore updated for V12.");
