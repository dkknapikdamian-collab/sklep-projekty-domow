const fs = require("fs");

function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = read("app/admin/debug/page.tsx");
const diagnostics = read("lib/admin/debug-diagnostics.ts");
const header = read("components/admin/AdminHeader.tsx");
const dashboard = read("app/admin/page.tsx");
const globals = read("app/globals.css");
const pkg = JSON.parse(read("package.json") || "{}");

if (!page.includes("data-admin-debug-v26")) fail("admin debug page missing data-admin-debug-v26 marker.");
if (!page.includes("getAdminDebugDiagnostics")) fail("admin debug page missing getAdminDebugDiagnostics call.");
if (!page.includes("Panel diagnostyczny sklepu")) fail("admin debug page missing visible debug title.");

if (!diagnostics.includes("requiredBuckets")) fail("debug diagnostics missing requiredBuckets.");
if (!diagnostics.includes('"site-media"') || !diagnostics.includes('"project-media"') || !diagnostics.includes('"project-private-files"')) {
  fail("debug diagnostics missing required Storage buckets.");
}
if (!diagnostics.includes('"site_content"') || !diagnostics.includes('"project_media"') || !diagnostics.includes('"projects"')) {
  fail("debug diagnostics missing required table checks.");
}
if (!diagnostics.includes("SUPABASE_SERVICE_ROLE_KEY")) fail("debug diagnostics missing service role env check.");
if (diagnostics.includes("process.env.SUPABASE_SERVICE_ROLE_KEY ||")) fail("debug diagnostics may expose or fallback secrets incorrectly.");

if (!header.includes('href="/admin/debug"')) fail("AdminHeader missing /admin/debug nav link.");
if (!dashboard.includes('href="/admin/debug"')) fail("admin dashboard missing debug action card.");
if (!globals.includes('@import "./admin-debug-v26.css";')) fail("globals.css missing admin-debug-v26 import.");

if (pkg.scripts?.["verify:admin-debug-v26"] !== "node scripts/check-admin-debug-v26.cjs") {
  fail("package.json missing verify:admin-debug-v26 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:admin-debug-v26")) {
  fail("package.json verify does not include verify:admin-debug-v26.");
}

console.log("OK: admin debug panel V26 guard passed.");
