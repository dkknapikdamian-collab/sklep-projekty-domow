const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => fs.writeFileSync(path.join(root, file), content, "utf8");

function patchPackageJson() {
  const file = "package.json";
  const pkg = JSON.parse(read(file));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["verify:project-media-rendering-v30"] = "node scripts/check-project-media-rendering-v30.cjs";

  const verify = String(pkg.scripts.verify || "");
  if (!verify.includes("verify:project-media-rendering-v30")) {
    pkg.scripts.verify = `npm run verify:project-media-rendering-v30 && ${verify}`;
  }

  write(file, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("PATCHED: package.json");
}

function patchGlobals() {
  const file = "app/globals.css";
  let content = read(file);
  if (!content.includes(".media-slot-image")) {
    content += `\n\n/* V30: plain image rendering for Supabase Storage media */\n.media-slot-image {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: cover;\n}\n`;
    write(file, content);
    console.log("PATCHED: app/globals.css");
  } else {
    console.log("OK: app/globals.css already has .media-slot-image");
  }
}

patchPackageJson();
patchGlobals();
console.log("OK: V30 patch helper finished.");
