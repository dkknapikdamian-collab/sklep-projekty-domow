const fs = require("fs");

function read(path) {
  if (!fs.existsSync(path)) throw new Error(`Missing file: ${path}`);
  return fs.readFileSync(path, "utf8");
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    console.error(`FAIL: missing ${label}: ${needle}`);
    process.exit(1);
  }
}


function assertIncludesAny(source, needles, label) {
  if (!needles.some((needle) => source.includes(needle))) {
    console.error(`FAIL: missing ${label}. Expected one of: ${needles.join(" | ")}`);
    process.exit(1);
  }
}
const homepageForm = read("components/admin/AdminHomepageContentForm.tsx");
const homepageAction = read("app/admin/strona-glowna/actions.ts");
const siteContent = read("lib/site-content.ts");
const mediaManager = read("components/admin/AdminProjectMediaManager.tsx");
const globals = read("app/globals.css");
const packageJson = JSON.parse(read("package.json"));

assertIncludes(homepageForm, "displayImageUrl", "homepage display image state");
assertIncludes(homepageForm, "data-admin-current-banner", "homepage current banner marker");
assertIncludes(homepageForm, "admin-current-banner-preview", "homepage banner preview image");
assertIncludes(homepageForm, "Otworz aktualny baner", "homepage banner link");

assertIncludes(homepageAction, "imageUrl?: string | null", "homepage action state imageUrl");
assertIncludes(homepageAction, "uploadedImage?: boolean", "homepage action uploadedImage");
assertIncludes(homepageAction, "Zapisano tresc strony glownej i nowy baner", "homepage upload success message");
assertIncludes(homepageAction, "resolvedImageUrl", "homepage resolved image return");

assertIncludes(siteContent, "imageBucket?: string", "site content image bucket type");
assertIncludes(siteContent, "imagePath?: string", "site content image path type");
assertIncludes(siteContent, "image_bucket, image_path, image_public_url", "site content select image metadata");

assertIncludes(mediaManager, "data-admin-project-current-media", "project current media marker");
assertIncludes(mediaManager, "admin-media-preview-grid", "project media preview grid");
assertIncludes(mediaManager, "item.publicUrl", "project media public URL usage");
assertIncludesAny(mediaManager, [
  "Otworz plik",
  "Otwórz plik",
  'data-admin-media-open-link="Otworz plik"'
], "project media open link");
assertIncludesAny(mediaManager, [
  "Inputy ponizej sluza tylko do wyboru nowych plikow",
  "Inputy poniżej służą tylko do wyboru nowych plików"
], "file input explanation");

assertIncludes(globals, "./admin-media-v25.css", "V25 CSS import");

if (packageJson.scripts["verify:admin-media-visibility-v25"] !== "node scripts/check-admin-media-visibility-v25.cjs") {
  console.error("FAIL: package.json missing verify:admin-media-visibility-v25 script.");
  process.exit(1);
}

if (!packageJson.scripts.verify.includes("verify:admin-media-visibility-v25")) {
  console.error("FAIL: package.json verify does not include verify:admin-media-visibility-v25.");
  process.exit(1);
}

console.log("OK: V25 admin media visibility guard passed.");
