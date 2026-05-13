const fs = require("fs");
const path = require("path");

const root = process.cwd();
const contentDir = path.join(root, "content", "projects");
const templateDir = path.join(contentDir, "_TEMPLATE");

if (!fs.existsSync(contentDir)) {
  console.error("FAIL: Brak folderu content/projects");
  process.exit(1);
}

if (!fs.existsSync(templateDir)) {
  console.error("FAIL: Brak folderu content/projects/_TEMPLATE");
  process.exit(1);
}

const projectDirs = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => !entry.name.startsWith("_"));

for (const entry of projectDirs) {
  const jsonPath = path.join(contentDir, entry.name, "project.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`FAIL: Folder ${entry.name} nie ma project.json`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const required = ["code", "slug", "name", "description", "priceGross", "status", "mediaBase"];

  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      console.error(`FAIL: ${jsonPath} brakuje pola ${key}`);
      process.exit(1);
    }
  }

  if (data.status === "active" && data.priceGross <= 0) {
    console.error(`FAIL: Aktywny projekt ${data.code} musi mieć realną cenę większą od 0.`);
    process.exit(1);
  }
}

console.log(`OK: content/projects gotowe. Liczba realnych folderów projektów: ${projectDirs.length}`);
