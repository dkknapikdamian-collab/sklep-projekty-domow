const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "app/admin/projekty/page.tsx",
  "components/admin/AdminProjectsListClient.tsx",
  "components/admin/AdminProjectsTable.tsx",
  "app/admin-real-v20.css",
  "scripts/check-admin-list-search-filter-v20.cjs",
  "docs/implementation/STAGE20_ADMIN_LIST_SEARCH_FILTER.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V20 admin list search/filter files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const page = read("app/admin/projekty/page.tsx");
for (const needle of [
  "AdminProjectsListClient",
  "getAdminProjects",
  "status) === \"updated\"",
  "deleted) === \"1\"",
  "cancelled) === \"1\""
]) {
  if (!page.includes(needle)) {
    console.error(`FAIL: admin projects page missing V20 wiring: ${needle}`);
    process.exit(1);
  }
}

if (page.includes("<input placeholder=\"Szukaj po nazwie, kodzie, statusie...\"")) {
  console.error("FAIL: admin projects page still contains the old dead search input.");
  process.exit(1);
}

if (page.includes("<select>\n            <option>Wszystkie statusy</option>")) {
  console.error("FAIL: admin projects page still contains the old dead status select.");
  process.exit(1);
}

const client = read("components/admin/AdminProjectsListClient.tsx");
for (const needle of [
  '"use client"',
  "useState",
  "useMemo",
  "searchTerm",
  "setSearchTerm",
  "statusFilter",
  "setStatusFilter",
  "filteredProjects",
  "project.canPublish",
  "project.mediaCount <= 0",
  "project.projectRoomsCount <= 0",
  "data-admin-project-search",
  "data-admin-project-status-filter",
  "value={searchTerm}",
  "onChange={(event) => setSearchTerm(event.target.value)}",
  "value={statusFilter}",
  "onChange={(event) => setStatusFilter(event.target.value)}",
  "project.name",
  "project.code",
  "project.slug",
  "project.status",
  "statusFilter === \"all\" || project.status === statusFilter",
  "statusFilter === \"incomplete\"",
  "statusFilter === \"no-media\"",
  "statusFilter === \"no-rooms\"",
  "AdminProjectsTable projects={filteredProjects}",
  "clearFilters"
]) {
  if (!client.includes(needle)) {
    console.error(`FAIL: AdminProjectsListClient missing real search/filter wiring: ${needle}`);
    process.exit(1);
  }
}

for (const status of ["active", "draft", "incomplete", "no-media", "no-rooms"]) {
  if (!client.includes(`value: \"${status}\"`)) {
    console.error(`FAIL: AdminProjectsListClient missing status option: ${status}`);
    process.exit(1);
  }
}

const table = read("components/admin/AdminProjectsTable.tsx");
if (!table.includes("projects.map((project)")) {
  console.error("FAIL: AdminProjectsTable must render the projects passed by filtered client state.");
  process.exit(1);
}

const css = read("app/admin-real-v20.css");
for (const needle of ["admin-toolbar-live", "admin-filter-summary", "admin-clear-filter-button", "admin-status-submit"]) {
  if (!css.includes(needle)) {
    console.error(`FAIL: V20 CSS missing ${needle}`);
    process.exit(1);
  }
}

const globals = read("app/globals.css");
if (!globals.includes('@import "./admin-real-v20.css";')) {
  console.error("FAIL: globals.css does not import admin-real-v20.css.");
  process.exit(1);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-list-search-filter-v20"] !== "node scripts/check-admin-list-search-filter-v20.cjs") {
  console.error("FAIL: package.json missing verify:admin-list-search-filter-v20 script.");
  process.exit(1);
}

if (!pkg.scripts.verify || !pkg.scripts.verify.includes("verify:admin-list-search-filter-v20")) {
  console.error("FAIL: npm run verify does not include verify:admin-list-search-filter-v20.");
  process.exit(1);
}

console.log("OK: admin list search/filter V20 guard passed.");
