const fs = require("fs");

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const card = read("components/project/ProjectCard.tsx");
const gallery = read("components/project/ProjectGallery.tsx");
const repo = read("lib/project-repository.ts");
const mediaSlot = read("components/MediaSlot.tsx");

for (const marker of [
  "project.media.thumbnail ||",
  "project.media.hero ||",
  "project.media.gallery[0] ||",
  "project.media.elevations[0]?.url",
  "item.type === \"floor_plan\""
]) {
  if (!card.includes(marker)) fail(`ProjectCard fallback missing marker: ${marker}`);
}

for (const marker of [
  "project.media.hero",
  "project.media.thumbnail",
  "project.media.gallery.map",
  "project.media.elevations.map",
  "item.type === \"floor_plan\"",
  "item.type === \"roof_plan\"",
  "item.type === \"section\"",
  "item.type === \"other\"",
  "uniqueImages"
]) {
  if (!gallery.includes(marker)) fail(`ProjectGallery ordering missing marker: ${marker}`);
}

if (!repo.includes('from("project_media")')) {
  fail("Public repository must read project_media.");
}

if (/from\(\s*["']project_files["']\s*\)/.test(repo)) {
  fail("Public repository must not read project_files.");
}

for (const marker of ["<img", "src={normalizedSrc}", "data-media-slot-image=\"true\""]) {
  if (!mediaSlot.includes(marker)) fail(`MediaSlot missing real src render: ${marker}`);
}

console.log("OK: V34 public project media guard passed.");
