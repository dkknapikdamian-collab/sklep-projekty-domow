const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), "utf8") : "";
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

for (const file of [
  "components/admin/AdminUiDebugReporter.tsx",
  "components/admin/AdminHeader.tsx",
  "app/admin-ui-debug-v28.css",
  "app/admin/debug/page.tsx",
  "app/globals.css",
  "package.json",
  "docs/implementation/STAGE28_ADMIN_UI_DEBUG_REPORTER.md"
]) {
  if (!exists(file)) fail(`missing required V28/V29 file: ${file}`);
}

const component = read("components/admin/AdminUiDebugReporter.tsx");
for (const needle of [
  "sklep-projekty-domow:admin-ui-debug-reports:v28",
  "document.addEventListener(\"click\", handler, true)",
  "event.preventDefault()",
  "event.stopPropagation()",
  "event.stopImmediatePropagation()",
  "Pobierz raport i wyczysc",
  "downloadText(`admin-ui-debug-",
  "setReports([])",
  "Enter zapisuje",
  "Shift+Enter"
]) {
  if (!component.includes(needle)) fail(`AdminUiDebugReporter missing behavior: ${needle}`);
}

const header = read("components/admin/AdminHeader.tsx");
if (!header.includes('import { AdminUiDebugReporter } from "@/components/admin/AdminUiDebugReporter";')) {
  fail("AdminHeader must import AdminUiDebugReporter.");
}
if (!header.includes("<AdminUiDebugReporter />")) {
  fail("AdminHeader must render AdminUiDebugReporter.");
}
if (!header.includes('href="/admin/debug"')) {
  fail("AdminHeader must link to /admin/debug.");
}

const route = read("app/admin/debug/page.tsx");
for (const needle of [
  "data-admin-debug-v29",
  "Tryb zglaszania bledow z ekranu",
  "Kliknij problematyczny element",
  "Enter zapisuje",
  "Pobierz raport i wyczysc",
  "localStorage"
]) {
  if (!route.includes(needle)) fail(`/admin/debug route misses V29 UI-reporting instruction: ${needle}`);
}
if (route.includes("getAdminDebugDiagnostics") || route.includes("Panel diagnostyczny sklepu")) {
  fail("/admin/debug route still looks like old V26 diagnostics instead of V29 UI reporting instructions.");
}

const globals = read("app/globals.css");
if (!globals.includes('@import "./admin-ui-debug-v28.css";')) fail("globals.css must import admin-ui-debug-v28.css.");

const pkg = JSON.parse(read("package.json") || "{}");
if (pkg.scripts?.["verify:admin-ui-debug-v28"] !== "node scripts/check-admin-ui-debug-v28.cjs") {
  fail("package.json missing verify:admin-ui-debug-v28 script.");
}
if (!String(pkg.scripts?.verify || "").includes("verify:admin-ui-debug-v28")) {
  fail("package.json verify must include verify:admin-ui-debug-v28.");
}

console.log("OK: V28/V29 admin UI debug reporter guard passed.");
