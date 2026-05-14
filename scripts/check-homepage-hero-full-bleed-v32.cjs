const fs = require('fs');

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const page = fs.readFileSync('app/page.tsx', 'utf8');
const css = fs.readFileSync('app/globals.css', 'utf8');

if (!page.includes('const heroBackgroundImage = hero.imageUrl')) {
  fail('home page missing computed hero background image.');
}

if (!page.includes('home-hero--image-bg')) {
  fail('home page missing image-background hero class.');
}

if (!page.includes('style={heroBackgroundImage ? { backgroundImage: heroBackgroundImage } : undefined}')) {
  fail('home page missing backgroundImage style binding.');
}

if (/<div className="hero-image-placeholder">/.test(page)) {
  fail('home page still renders old side image placeholder instead of full hero background.');
}

if (!page.includes('<HomeProjectSearch projects={projects} />')) {
  fail('home page must keep the separate search UI overlay.');
}

if (!page.includes('<h1>{hero.title}</h1>') || !page.includes('<p>{hero.subtitle}</p>')) {
  fail('home page must keep hero title/subtitle as HTML text, not baked into image.');
}

if (!css.includes('STAGE32_HOMEPAGE_HERO_FULL_BLEED_BG')) {
  fail('globals.css missing V32 hero full-bleed marker.');
}

for (const snippet of [
  '.home-hero.home-hero--image-bg',
  'background-size: cover',
  'background-position: center right',
  '.home-hero.home-hero--image-bg .hero-overlay',
  '.home-hero.home-hero--image-bg .hero-copy'
]) {
  if (!css.includes(snippet)) {
    fail(`globals.css missing V32 snippet: ${snippet}`);
  }
}

console.log('OK: V32 homepage hero full-bleed background guard passed.');
