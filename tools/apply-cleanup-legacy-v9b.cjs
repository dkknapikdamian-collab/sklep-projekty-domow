const fs = require("fs");
const path = require("path");

const root = process.cwd();

const removeFiles = [
  "components/ProjectCard.tsx",
  "components/ProjectPurchaseBox.tsx",
  "components/RoomsTable.tsx",
  "components/SpecsStrip.tsx",
  "components/SearchBox.tsx",
  "components/HouseVisual.tsx",
  "lib/search.ts"
];

for (const rel of removeFiles) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { force: true });
    console.log(`removed ${rel}`);
  } else {
    console.log(`skip missing ${rel}`);
  }
}

const packagePath = path.join(root, "package.json");
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["verify:legacy"] = "node scripts/check-no-legacy-demo-components.cjs";

  if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:legacy")) {
    pkg.scripts.verify = "npm run verify:legacy && " + pkg.scripts.verify;
  } else if (!pkg.scripts.verify) {
    pkg.scripts.verify = "npm run verify:legacy";
  }

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("updated package.json verify:legacy");
}
