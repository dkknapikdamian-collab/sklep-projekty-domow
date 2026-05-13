const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(packagePath)) {
  throw new Error("package.json not found");
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

pkg.dependencies = pkg.dependencies || {};
pkg.scripts = pkg.scripts || {};

pkg.dependencies["@supabase/supabase-js"] = pkg.dependencies["@supabase/supabase-js"] || "^2.86.0";
pkg.dependencies["@supabase/ssr"] = pkg.dependencies["@supabase/ssr"] || "^0.8.0";

pkg.scripts["verify:supabase-foundation"] = "node scripts/check-supabase-foundation.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:supabase-foundation")) {
  pkg.scripts.verify = "npm run verify:supabase-foundation && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:supabase-foundation";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

console.log("OK: package.json updated for Supabase + Vercel foundation.");
