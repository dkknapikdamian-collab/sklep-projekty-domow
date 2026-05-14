const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "";

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const repo = read("lib/project-repository.ts");
const site = read("lib/site-content.ts");

if (!repo.includes('import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";')) {
  fail("project-repository must import createSupabaseServiceRoleClient.");
}
if (!repo.includes("const supabase = createSupabaseServiceRoleClient();")) {
  fail("project-repository must use createSupabaseServiceRoleClient for public SSR reads.");
}
if (!repo.includes('.eq("status", "active")')) {
  fail("project-repository must still filter public projects to status=active.");
}
if (repo.includes("createSupabaseServerClient")) {
  fail("project-repository must not use anon/cookie server client for public media reads after V27/V29.");
}
if (/\.from\(\s*["']project_files["']\s*\)/.test(repo)) {
  fail("project-repository must not read private project file rows in public pages after V27/V29.");
}

if (!site.includes('import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";')) {
  fail("site-content must import createSupabaseServiceRoleClient.");
}
if (!site.includes("const supabase = createSupabaseServiceRoleClient();")) {
  fail("site-content must use createSupabaseServiceRoleClient for homepage hero reads.");
}
if (site.includes("createSupabaseServerClient")) {
  fail("site-content must not use anon/cookie server client for homepage hero after V27/V29.");
}

console.log("OK: V27/V29 public service-role read guard passed.");
