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
  "scripts/check-public-catalog-filters-v22b.cjs",
  "docs/implementation/STAGE22B_PUBLIC_CATALOG_FILTERS.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V22B public catalog filter files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const filters = read("lib/public-catalog-filters.ts");
for (const needle of [
  "export function getCatalogFiltersFromSearchParams",
  "export function filterPublicProjects",
  "export function buildCatalogOptions",
  "export function hasPublicCatalogFilters",
  "export function hasActivePublicCatalogFilters",
  "projectMatchesQuery"
]) {
  if (!filters.includes(needle)) {
    console.error(`FAIL: public-catalog-filters missing ${needle}`);
    process.exit(1);
  }
}

const catalog = read("app/projekty/page.tsx");
for (const needle of [
  'action="/projekty"',
  'method="get"',
  'data-public-catalog-search="query-params"',
  'data-public-catalog-filters="query-params"',
  "filterPublicProjects(projects, filters)",
  "buildCatalogOptions(projects)",
  "filteredProjects.map"
]) {
  if (!catalog.includes(needle)) {
    console.error(`FAIL: catalog page missing V22B wiring: ${needle}`);
    process.exit(1);
  }
}

const homeSearch = read("components/project/HomeProjectSearch.tsx");
for (const needle of [
  "export function HomeProjectSearch",
  "projects }: { projects: Project[] }",
  "buildCatalogOptions(projects)",
  'action="/projekty"',
  'method="get"',
  'name="style"',
  'name="areaFrom"',
  'name="areaTo"',
  'name="rooms"',
  'name="garage"',
  'name="floors"'
]) {
  if (!homeSearch.includes(needle)) {
    console.error(`FAIL: HomeProjectSearch missing ${needle}`);
    process.exit(1);
  }
}

const home = read("app/page.tsx");
for (const needle of [
  "HomeProjectSearch projects={projects}",
  "getHomepageHeroContent",
  "hero.title",
  "hero.subtitle",
  "hero.ctaLabel",
  "hero.ctaHref"
]) {
  if (!home.includes(needle)) {
    console.error(`FAIL: home page missing V22H/V23 binding: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: public catalog filters V22B/V22H guard passed.");
