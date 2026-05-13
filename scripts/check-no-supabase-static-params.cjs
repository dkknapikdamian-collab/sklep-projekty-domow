const fs = require("fs");
const path = require("path");

const root = process.cwd();
const slugPage = path.join(root, "app", "projekty", "[slug]", "page.tsx");

if (!fs.existsSync(slugPage)) {
  console.error("FAIL: Missing app/projekty/[slug]/page.tsx");
  process.exit(1);
}

const source = fs.readFileSync(slugPage, "utf8");

if (source.includes("generateStaticParams")) {
  console.error("FAIL: app/projekty/[slug]/page.tsx must not use generateStaticParams while project data comes from Supabase/cookies.");
  process.exit(1);
}

if (source.includes("getPublicProjects")) {
  console.error("FAIL: dynamic slug page must not import getPublicProjects for build-time params.");
  process.exit(1);
}

if (!source.includes('export const dynamic = "force-dynamic"')) {
  console.error('FAIL: dynamic slug page should export dynamic = "force-dynamic".');
  process.exit(1);
}

console.log("OK: no Supabase/cookies data load in generateStaticParams.");
