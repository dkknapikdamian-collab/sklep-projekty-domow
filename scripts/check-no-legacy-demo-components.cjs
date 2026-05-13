const fs = require("fs");
const path = require("path");

const root = process.cwd();

const forbiddenFiles = [
  "components/ProjectCard.tsx",
  "components/ProjectPurchaseBox.tsx",
  "components/RoomsTable.tsx",
  "components/SpecsStrip.tsx",
  "components/SearchBox.tsx",
  "components/HouseVisual.tsx",
  "lib/search.ts"
];

const existing = forbiddenFiles.filter((file) => fs.existsSync(path.join(root, file)));

if (existing.length) {
  console.error("FAIL: Old demo components still exist:");
  for (const file of existing) console.error("- " + file);
  process.exit(1);
}

const scanFiles = [
  "components/project/ProjectCard.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "components/project/ProjectTabs.tsx",
  "components/project/ProjectStats.tsx",
  "components/project/ProjectGallery.tsx"
];

const forbiddenProps = [
  "shortDescription",
  "longDescription",
  "promoPrice",
  "roomList",
  "project.price ",
  "project.price}",
  "project.badge ",
  "project.badge}"
];

const hits = [];

for (const rel of scanFiles) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, "utf8");
  for (const prop of forbiddenProps) {
    if (text.includes(prop)) {
      hits.push(`${rel}: ${prop}`);
    }
  }
}

if (hits.length) {
  console.error("FAIL: Current components use old Project fields:");
  for (const hit of hits) console.error("- " + hit);
  process.exit(1);
}

console.log("OK: no legacy demo components or old Project fields.");
