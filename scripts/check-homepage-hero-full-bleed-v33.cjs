const fs = require("fs");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = fs.readFileSync("app/page.tsx", "utf8");
const css = fs.readFileSync("app/globals.css", "utf8");

if (!page.includes("const heroBackgroundImage = hero.imageUrl") && !page.includes("backgroundImage")) {
  fail("home page missing hero backgroundImage mechanism.");
}

if (!page.includes("home-hero--image-bg")) {
  fail("home page missing image-bg hero class variant.");
}

if (/<div className=\"hero-image-placeholder\">/.test(page)) {
  fail("home page still renders hero-image-placeholder.");
}

if (!page.includes("<HomeProjectSearch projects={projects} />")) {
  fail("home page missing HomeProjectSearch overlay component.");
}

for (const snippet of ["<h1>{hero.title}</h1>", "<p>{hero.subtitle}</p>", "{hero.ctaLabel}", "href={hero.ctaHref}"]) {
  if (!page.includes(snippet)) {
    fail(`home page missing hero text/cta binding: ${snippet}`);
  }
}

for (const cssSnippet of [
  ".home-hero.home-hero--image-bg",
  "background-size: cover",
  "background-position: center right",
  ".home-hero.home-hero--no-image",
  ".hero-overlay",
  ".hero-copy",
  ".hero-points",
  ".home-search"
]) {
  if (!css.includes(cssSnippet)) {
    fail(`globals.css missing required hero rule: ${cssSnippet}`);
  }
}

console.log("OK: V33 homepage hero full-bleed final guard passed.");
