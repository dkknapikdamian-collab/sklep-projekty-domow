const fs = require("fs");
const path = require("path");

const root = process.cwd();

const requiredFiles = [
  "lib/supabase/env.ts",
  "lib/supabase/browser.ts",
  "lib/supabase/server.ts",
  "lib/supabase/service-role.ts",
  "lib/auth/admin.ts",
  "middleware.ts",
  "app/admin/login/page.tsx",
  "app/admin/logout/route.ts",
  "app/admin/setup/page.tsx",
  "supabase/migrations/0010_admin_foundation.sql",
  "docs/deployment/VERCEL_SETUP.md",
  "docs/supabase/SUPABASE_SETUP.md"
];

const missing = requiredFiles.filter((rel) => !fs.existsSync(path.join(root, rel)));

if (missing.length) {
  console.error("FAIL: Missing Supabase/Vercel foundation files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

for (const dep of ["@supabase/supabase-js", "@supabase/ssr"]) {
  if (!deps[dep]) {
    console.error(`FAIL: Missing dependency ${dep}`);
    process.exit(1);
  }
}

const envExamplePath = path.join(root, ".env.example");
const envExample = fs.existsSync(envExamplePath) ? fs.readFileSync(envExamplePath, "utf8") : "";

for (const key of ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]) {
  if (!envExample.includes(key)) {
    console.error(`FAIL: .env.example missing ${key}`);
    process.exit(1);
  }
}

const migration = fs.readFileSync(path.join(root, "supabase/migrations/0010_admin_foundation.sql"), "utf8").toLowerCase();

for (const required of ["grant select", "enable row level security", "create policy", "storage.buckets"]) {
  if (!migration.includes(required)) {
    console.error(`FAIL: migration missing ${required}`);
    process.exit(1);
  }
}

console.log("OK: Supabase + Vercel foundation guard passed.");
