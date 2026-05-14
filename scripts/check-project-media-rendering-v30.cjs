const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

for (const file of [
  "components/MediaSlot.tsx",
  "components/project/ProjectGallery.tsx",
  "scripts/check-project-media-rendering-v30.cjs",
  "docs/implementation/STAGE30_PROJECT_MEDIA_RENDERING.md"
]) {
  if (!exists(file)) fail(`missing required V30 file: ${file}`);
}

const mediaSlot = read("components/MediaSlot.tsx");
for (const needle of [
  "data-media-slot-image=\"true\"",
  "className=\"media-slot-image\"",
  "MediaPlaceholder",
  "loading=\"lazy\"",
  "decoding=\"async\""
]) {
  if (!mediaSlot.includes(needle)) fail(`MediaSlot missing V30 behavior: ${needle}`);
}

if (mediaSlot.includes("next/image")) {
  fail("MediaSlot must not use next/image for Supabase Storage URLs in V30.");
}

const gallery = read("components/project/ProjectGallery.tsx");
for (const needle of [
  "data-project-gallery-v30=\"true\"",
  "buildProjectGalleryImages",
  "project.media.hero",
  "project.media.thumbnail",
  "project.media.gallery.map",
  "project.media.plans",
  "project.media.elevations",
  "uniqueImages",
  "extraCount"
]) {
  if (!gallery.includes(needle)) fail(`ProjectGallery missing V30 fallback: ${needle}`);
}

const globals = read("app/globals.css");
if (!globals.includes(".media-slot-image")) fail("globals.css missing .media-slot-image rendering rule.");

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:project-media-rendering-v30"] !== "node scripts/check-project-media-rendering-v30.cjs") {
  fail("package.json missing verify:project-media-rendering-v30 script.");
}
if (!String(pkg.scripts?.verify || "").includes("verify:project-media-rendering-v30")) {
  fail("package.json verify does not include verify:project-media-rendering-v30.");
}

console.log("OK: V30 project media rendering guard passed.");
