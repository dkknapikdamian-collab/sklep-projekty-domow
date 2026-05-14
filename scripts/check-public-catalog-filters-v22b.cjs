const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "lib/public-catalog-filters.ts",
  "components/project/HomeProjectSearch.tsx",
  "app/projekty/page.tsx",
  "app/page.tsx",
  "app/public-catalog-filters-v22b.css",
  "docs/implementation/STAGE22B_PUBLIC_CATALOG_FILTERS.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V22B public catalog filter files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const filterLib = read("lib/public-catalog-filters.ts");
for (const needle of [
  "getCatalogFiltersFromSearchParams",
  "filterPublicProjects",
  "buildCatalogOptions",
  "hasPublicCatalogFilters",
  "projectSearchHaystack",
  "usableArea",
  "roomsCount",
  "floorsCount"
]) {
  if (!filterLib.includes(needle)) {
    console.error(`FAIL: public catalog filter lib missing ${needle}`);
    process.exit(1);
  }
}

const catalogPage = read("app/projekty/page.tsx");
for (const needle of [
  "searchParams?: Promise",
  "getCatalogFiltersFromSearchParams",
  "filterPublicProjects",
  "buildCatalogOptions",
  "hasPublicCatalogFilters",
  'method="get"',
  'data-public-catalog-search="query-params"',
  'data-public-catalog-filters="query-params"',
  "filteredProjects.length",
  "catalog-filter-empty"
]) {
  if (!catalogPage.includes(needle)) {
    console.error(`FAIL: catalog page missing live filter wiring: ${needle}`);
    process.exit(1);
  }
}

for (const stale of [
  "<input placeholder=\"Szukaj po nazwie, kodzie, metrażu, działce...\" />",
  "<button><Search size={20} /> Szukaj</button>",
  "<select><option>Wszystkie style</option></select>",
  "<select><option>Dowolnie</option></select>"
]) {
  if (catalogPage.includes(stale)) {
    console.error(`FAIL: catalog page still contains dead filter control: ${stale}`);
    process.exit(1);
  }
}

const homeSearch = read("components/project/HomeProjectSearch.tsx");
for (const needle of [
  'action="/projekty"',
  'method="get"',
  'data-public-hero-search="query-params"',
  'name="style"',
  'name="areaFrom"',
  'name="areaTo"',
  'name="rooms"',
  'name="garage"',
  'name="floors"'
]) {
  if (!homeSearch.includes(needle)) {
    console.error(`FAIL: HomeProjectSearch missing query field: ${needle}`);
    process.exit(1);
  }
}

const homePage = read("app/page.tsx");
if (!homePage.includes("HomeProjectSearch") || homePage.includes("home-search\">\n            <label>Styl domu")) {
  console.error("FAIL: home page must use HomeProjectSearch instead of dead hero controls.");
  process.exit(1);
}

const globals = read("app/globals.css");
if (!globals.includes('@import "./public-catalog-filters-v22b.css";')) {
  console.error("FAIL: globals.css does not import public-catalog-filters-v22b.css");
  process.exit(1);
}

const packageJson = JSON.parse(read("package.json"));
if (!packageJson.scripts || packageJson.scripts["verify:public-catalog-filters-v22b"] !== "node scripts/check-public-catalog-filters-v22b.cjs") {
  console.error("FAIL: package.json missing verify:public-catalog-filters-v22b script.");
  process.exit(1);
}
if (!packageJson.scripts.verify.includes("verify:public-catalog-filters-v22b")) {
  console.error("FAIL: npm run verify does not include V22B guard.");
  process.exit(1);
}

console.log("OK: public catalog filters V22B guard passed.");
