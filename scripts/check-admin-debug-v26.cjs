const fs = require("fs");

function read(path) {
  return fs.existsSync(path) ? fs.readFileSync(path, "utf8") : "";
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = read("app/admin/debug/page.tsx");
const header = read("components/admin/AdminHeader.tsx");
const globals = read("app/globals.css");
const pkg = JSON.parse(read("package.json") || "{}");

const isV29UiRoute = page.includes("data-admin-debug-v29")
  && page.includes("Tryb zglaszania bledow z ekranu")
  && page.includes("localStorage")
  && !page.includes("getAdminDebugDiagnostics");

const isLegacyV26Route = page.includes("data-admin-debug-v26")
  && page.includes("getAdminDebugDiagnostics")
  && page.includes("Panel diagnostyczny sklepu");

if (!isV29UiRoute && !isLegacyV26Route) {
  fail("admin debug route is neither V29 UI reporting route nor legacy V26 diagnostics route.");
}

if (!header.includes('href="/admin/debug"')) fail("AdminHeader missing /admin/debug nav link.");
if (!globals.includes('@import "./admin-ui-debug-v28.css";')) fail("globals.css missing admin-ui-debug-v28 import.");

if (pkg.scripts?.["verify:admin-debug-v26"] !== "node scripts/check-admin-debug-v26.cjs") {
  fail("package.json missing verify:admin-debug-v26 script.");
}

if (!String(pkg.scripts?.verify || "").includes("verify:admin-debug-v26")) {
  fail("package.json verify does not include verify:admin-debug-v26.");
}

console.log("OK: admin debug route guard passed with V29 UI reporting compatibility.");
