const fs = require("fs");
const path = require("path");

const root = process.cwd();
const projectsPath = path.join(root, "data", "projects.ts");
const source = fs.readFileSync(projectsPath, "utf8");

const mustContain = "export const projects: Project[] = [];";
if (!source.includes(mustContain)) {
  console.error("FAIL: data/projects.ts nie może zawierać fikcyjnych projektów w production shell.");
  console.error(`Wymagany zapis: ${mustContain}`);
  process.exit(1);
}

const forbiddenRuntimeNames = [
  "Dom w Aurorach 14",
  "Dom w Malinówkach 6",
  "Dom Klejnot 29"
];

const runtimeDirs = ["app", "components", "data"];
const hits = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(full)) {
      const txt = fs.readFileSync(full, "utf8");
      for (const needle of forbiddenRuntimeNames) {
        if (txt.includes(needle)) hits.push(`${full}: ${needle}`);
      }
    }
  }
}

for (const dir of runtimeDirs) walk(path.join(root, dir));

if (hits.length) {
  console.error("FAIL: znaleziono fikcyjne nazwy projektów w runtime:");
  for (const hit of hits) console.error("- " + hit);
  process.exit(1);
}

console.log("OK: production shell nie zawiera fikcyjnych projektów w runtime.");
