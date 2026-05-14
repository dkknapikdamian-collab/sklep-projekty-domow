const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

for (const file of [
  "components/admin/AdminUiDebugReporter.tsx",
  "components/admin/AdminHeader.tsx",
  "app/admin-ui-debug-v28.css",
  "app/globals.css",
  "package.json",
  "docs/implementation/STAGE28_ADMIN_UI_DEBUG_REPORTER.md"
]) {
  if (!exists(file)) fail(`missing required V28 file: ${file}`);
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

const globals = read("app/globals.css");
if (!globals.includes('@import "./admin-ui-debug-v28.css";')) fail("globals.css must import admin-ui-debug-v28.css.");

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts["verify:admin-ui-debug-v28"] !== "node scripts/check-admin-ui-debug-v28.cjs") {
  fail("package.json missing verify:admin-ui-debug-v28 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-ui-debug-v28")) {
  fail("package.json verify must include verify:admin-ui-debug-v28.");
}

console.log("OK: V28 admin UI debug reporter guard passed with V28B import coverage.");
