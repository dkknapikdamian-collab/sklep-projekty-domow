const fs = require('fs');
const path = require('path');

const repo = process.cwd();
const pagePath = path.join(repo, 'app', 'page.tsx');
const cssPath = path.join(repo, 'app', 'globals.css');
const packagePath = path.join(repo, 'package.json');

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, content) { fs.writeFileSync(file, content, 'utf8'); }

function patchPage() {
  let src = read(pagePath);
  let changed = false;

  if (!src.includes('const heroBackgroundImage = hero.imageUrl')) {
    const marker = '  return (\n    <>';
    const insert = `  const heroBackgroundImage = hero.imageUrl\n    ? [\n        "linear-gradient(90deg, rgba(8,12,14,.96) 0%, rgba(8,12,14,.82) 27%, rgba(8,12,14,.38) 58%, rgba(8,12,14,.64) 100%)",\n        "linear-gradient(180deg, rgba(8,12,14,.08) 0%, rgba(8,12,14,.70) 100%)",\n        \`url("\${hero.imageUrl}")\`\n      ].join(", ")\n    : undefined;\n\n`;
    if (!src.includes(marker)) {
      throw new Error('Could not find HomePage return marker for V32 hero background insert.');
    }
    src = src.replace(marker, insert + marker);
    changed = true;
  }

  const oldSection = '<section className="home-hero">';
  const newSection = `<section\n          className={\`home-hero \${hero.imageUrl ? "home-hero--image-bg" : "home-hero--no-image"}\`}\n          style={heroBackgroundImage ? { backgroundImage: heroBackgroundImage } : undefined}\n        >`;
  if (src.includes(oldSection)) {
    src = src.replace(oldSection, newSection);
    changed = true;
  }

  if (src.includes('className="hero-image-placeholder"')) {
    const block = /\n\s*<div className="hero-image-placeholder">[\s\S]*?\n\s*<\/div>\n\s*<\/div>\n\n\s*<HomeProjectSearch/;
    if (!block.test(src)) {
      throw new Error('Could not remove old side hero image block for V32.');
    }
    src = src.replace(block, '\n          </div>\n\n          <HomeProjectSearch');
    changed = true;
  }

  if (changed) {
    write(pagePath, src);
    console.log('PATCHED: app/page.tsx full-bleed hero background layout.');
  } else {
    console.log('OK: app/page.tsx already has V32 hero layout.');
  }
}

function patchCss() {
  let css = read(cssPath);
  const marker = 'STAGE32_HOMEPAGE_HERO_FULL_BLEED_BG';
  if (css.includes(marker)) {
    console.log('OK: app/globals.css already has V32 styles.');
    return;
  }

  css += `\n\n/* ${marker}\n   Banner is the full-width hero background. Text/buttons/search stay as real HTML overlays. */\n.home-hero.home-hero--image-bg {\n  min-height: 520px;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center right;\n  border-bottom: 1px solid rgba(255,255,255,.08);\n}\n\n.home-hero.home-hero--image-bg .hero-overlay {\n  min-height: 520px;\n  display: block;\n  padding: 68px 26px 128px;\n}\n\n.home-hero.home-hero--image-bg .hero-copy {\n  position: relative;\n  z-index: 2;\n  max-width: 620px;\n}\n\n.home-hero.home-hero--image-bg .hero-copy h1 {\n  max-width: 620px;\n  font-size: clamp(38px, 4.5vw, 58px);\n  line-height: .96;\n  letter-spacing: -.055em;\n  text-shadow: 0 18px 45px rgba(0,0,0,.62);\n}\n\n.home-hero.home-hero--image-bg .hero-copy p {\n  max-width: 490px;\n  font-size: 17px;\n  color: rgba(255,255,255,.90);\n  text-shadow: 0 14px 36px rgba(0,0,0,.70);\n}\n\n.home-hero.home-hero--image-bg .hero-points {\n  max-width: 650px;\n  margin-top: 38px;\n}\n\n.home-hero.home-hero--image-bg .hero-points span {\n  color: rgba(255,255,255,.88);\n  text-shadow: 0 12px 26px rgba(0,0,0,.68);\n}\n\n.home-hero.home-hero--image-bg .hero-image-placeholder {\n  display: none;\n}\n\n.home-hero.home-hero--no-image .hero-overlay {\n  display: block;\n  max-width: 1280px;\n  min-height: 440px;\n  padding: 70px 26px 120px;\n}\n\n.home-hero.home-hero--no-image .hero-copy {\n  max-width: 620px;\n}\n\n@media (max-width: 900px) {\n  .home-hero.home-hero--image-bg {\n    min-height: 560px;\n    background-position: 62% center;\n  }\n\n  .home-hero.home-hero--image-bg .hero-overlay {\n    min-height: 560px;\n    padding: 48px 22px 142px;\n  }\n\n  .home-hero.home-hero--image-bg .hero-points {\n    grid-template-columns: 1fr;\n    gap: 18px;\n    max-width: 360px;\n  }\n}\n`;

  write(cssPath, css);
  console.log('PATCHED: app/globals.css V32 full-bleed hero styles.');
}

function patchPackage() {
  const pkg = JSON.parse(read(packagePath));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts['verify:homepage-hero-full-bleed-v32'] = 'node scripts/check-homepage-hero-full-bleed-v32.cjs';

  const verify = pkg.scripts.verify || '';
  if (!verify.includes('verify:homepage-hero-full-bleed-v32')) {
    pkg.scripts.verify = `npm run verify:homepage-hero-full-bleed-v32 && ${verify}`;
  }

  write(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('PATCHED: package.json verify:homepage-hero-full-bleed-v32.');
}

patchPage();
patchCss();
patchPackage();
console.log('OK: V32 homepage hero full-bleed patch applied.');
