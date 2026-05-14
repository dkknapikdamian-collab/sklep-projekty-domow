const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "app/admin/strona-glowna/page.tsx",
  "app/admin/strona-glowna/actions.ts",
  "components/admin/AdminHomepageContentForm.tsx",
  "lib/site-content.ts",
  "supabase/migrations/0013_site_content_homepage_hero.sql",
  "scripts/check-admin-homepage-content-v23.cjs",
  "docs/implementation/STAGE23_ADMIN_HOMEPAGE_CONTENT.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V23 files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const homePage = read("app/page.tsx");
for (const needle of ["getHomepageHeroContent", "hero.title", "hero.subtitle", "hero.ctaLabel", "hero.ctaHref"]) {
  if (!homePage.includes(needle)) {
    console.error(`FAIL: home page missing hero content binding: ${needle}`);
    process.exit(1);
  }
}

const siteContent = read("lib/site-content.ts");
for (const needle of ["defaultHomepageHero", "from(\"site_content\")", ".eq(\"key\", \"homepage_hero\")", ".eq(\"is_active\", true)"]) {
  if (!siteContent.includes(needle)) {
    console.error(`FAIL: site-content loader missing rule: ${needle}`);
    process.exit(1);
  }
}

const adminPage = read("app/admin/page.tsx");
if (!adminPage.includes("/admin/strona-glowna")) {
  console.error("FAIL: admin dashboard missing link to /admin/strona-glowna");
  process.exit(1);
}

const actions = read("app/admin/strona-glowna/actions.ts");
for (const needle of ["updateHomepageHeroAction", "site-media", "homepage_hero", "revalidatePath(\"/\")"]) {
  if (!actions.includes(needle)) {
    console.error(`FAIL: homepage action missing logic: ${needle}`);
    process.exit(1);
  }
}

const migration = read("supabase/migrations/0013_site_content_homepage_hero.sql").toLowerCase();
for (const needle of ["create table if not exists public.site_content", "insert into storage.buckets", "site-media", "create policy"]) {
  if (!migration.includes(needle)) {
    console.error(`FAIL: migration missing expected block: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: V23 admin homepage content guard passed.");
