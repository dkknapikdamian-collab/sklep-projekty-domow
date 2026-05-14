const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
  console.log(`PATCHED: ${file}`);
}

function patchPackageJson() {
  const file = "package.json";
  const pkg = JSON.parse(read(file));
  pkg.scripts = pkg.scripts || {};

  pkg.scripts["verify:public-catalog-filters-v22b"] = "node scripts/check-public-catalog-filters-v22b.cjs";
  pkg.scripts["verify:ui-mojibake-status-v22d"] = "node scripts/check-ui-mojibake-status-v22d.cjs";
  pkg.scripts["audit:admin-public-status-v22d"] = "node scripts/audit-admin-public-status-v22d.cjs";

  let verify = String(pkg.scripts.verify || "");
  for (const script of ["verify:ui-mojibake-status-v22d", "verify:public-catalog-filters-v22b"]) {
    if (!verify.includes(script)) {
      verify = verify ? `npm run ${script} && ${verify}` : `npm run ${script}`;
    }
  }
  pkg.scripts.verify = verify;

  write(file, JSON.stringify(pkg, null, 2) + "\n");
}

function patchGlobalsCss() {
  const file = "app/globals.css";
  let source = read(file);

  if (!source.includes('@import "./public-catalog-filters-v22b.css";')) {
    source = '@import "./public-catalog-filters-v22b.css";\n' + source;
  }

  source = source.replace(
    /(\.section-head h2::before\s*\{[\s\S]*?content:\s*)("[^"]*"|'[^']*')/,
    '$1"\\\\2014"'
  );

  const block = source.match(/\.section-head h2::before\s*\{[\s\S]*?\}/)?.[0] || "";
  if (!/content:\s*["']\\{1,2}2014["']/.test(block)) {
    throw new Error("Could not normalize section heading pseudo content.");
  }

  write(file, source);
}

patchPackageJson();
patchGlobalsCss();

console.log("OK: V22H package/global CSS patch applied.");
