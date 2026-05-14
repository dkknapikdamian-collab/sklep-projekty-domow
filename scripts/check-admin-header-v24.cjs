const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function walk(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];

  const result = [];
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      result.push(...walk(rel));
    } else if (entry.isFile() && rel.endsWith(".tsx")) {
      result.push(rel);
    }
  }
  return result;
}

const requiredFiles = [
  "components/admin/AdminHeader.tsx",
  "app/admin-header-v24.css",
  "scripts/check-admin-header-v24.cjs",
  "docs/implementation/STAGE24_ADMIN_HEADER_SEPARATION.md"
];

for (const file of requiredFiles) {
  if (!exists(file)) {
    console.error(`FAIL: missing ${file}`);
    process.exit(1);
  }
}

const adminHeader = read("components/admin/AdminHeader.tsx");
for (const needle of [
  'data-admin-header-v24="true"',
  'href="/admin"',
  'href="/admin/projekty"',
  'href="/admin/projekty/nowy"',
  'href="/admin/strona-glowna"',
  'Zobacz sklep'
]) {
  if (!adminHeader.includes(needle)) {
    console.error(`FAIL: AdminHeader missing ${needle}`);
    process.exit(1);
  }
}

const globals = read("app/globals.css");
if (!globals.includes('@import "./admin-header-v24.css";')) {
  console.error("FAIL: app/globals.css does not import admin-header-v24.css");
  process.exit(1);
}

const adminFiles = walk("app/admin").filter((file) => !file.includes("/login/") && !file.includes("/logout/"));
const offenders = [];

for (const file of adminFiles) {
  const source = read(file);
  if (source.includes("@/components/Header") || source.includes("<Header />")) {
    offenders.push(file);
  }
}

if (offenders.length) {
  console.error("FAIL: Admin pages still use public Header:");
  for (const file of offenders) console.error("- " + file);
  process.exit(1);
}

const usesAdminHeader = adminFiles.filter((file) => read(file).includes("AdminHeader"));
if (usesAdminHeader.length < 1) {
  console.error("FAIL: no admin page uses AdminHeader");
  process.exit(1);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts["verify:admin-header-v24"]) {
  console.error("FAIL: package.json missing verify:admin-header-v24");
  process.exit(1);
}

if (!String(pkg.scripts.verify || "").includes("verify:admin-header-v24")) {
  console.error("FAIL: npm run verify does not include verify:admin-header-v24");
  process.exit(1);
}

console.log("OK: admin header V24 guard passed.");
