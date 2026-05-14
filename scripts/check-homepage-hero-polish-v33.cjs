const fs = require("fs");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = fs.readFileSync("app/page.tsx", "utf8");
const css = fs.readFileSync("app/globals.css", "utf8");

if (!page.includes('data-home-hero-variant={hero.imageUrl ? "image-bg" : "no-image"}')) {
  fail("homepage hero missing explicit variant marker for image/no-image mode.");
}

if (!page.includes('className="hero-cta-row"')) {
  fail("homepage hero CTA wrapper class missing.");
}

if (!page.includes('<HomeProjectSearch projects={projects} />')) {
  fail("homepage hero must keep standalone HomeProjectSearch component.");
}

if (!css.includes('.hero-cta-row')) {
  fail("globals.css missing hero-cta-row class.");
}

if (!page.includes('className={`home-hero ${hero.imageUrl ? "home-hero--image-bg" : "home-hero--no-image"}`}')) {
  fail("homepage hero variant class binding missing.");
}

console.log("OK: V33 homepage hero polish guard passed.");
