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

function patchAdminPages() {
  const files = walk("app/admin");
  let changed = 0;

  for (const file of files) {
    let source = read(file);
    const before = source;

    if (source.includes('import { Header } from "@/components/Header";')) {
      source = source.replace(
        'import { Header } from "@/components/Header";',
        'import { AdminHeader } from "@/components/admin/AdminHeader";'
      );
    }

    if (source.includes("<Header />")) {
      if (!source.includes("@/components/admin/AdminHeader")) {
        source = source.replace(
          /^(import .+?;\r?\n)/,
          '$1import { AdminHeader } from "@/components/admin/AdminHeader";\n'
        );
      }
      source = source.replace(/<Header\s*\/>/g, "<AdminHeader />");
    }

    if (source !== before) {
      write(file, source);
      changed += 1;
    }
  }

  if (changed === 0) {
    console.log("No admin pages needed Header replacement.");
  }
}

function patchGlobalsCss() {
  const file = "app/globals.css";
  let source = read(file);

  if (!source.includes('@import "./admin-header-v24.css";')) {
    source = '@import "./admin-header-v24.css";\n' + source;
    write(file, source);
  }
}

function patchPackageJson() {
  const file = "package.json";
  const pkg = JSON.parse(read(file));

  pkg.scripts = pkg.scripts || {};
  pkg.scripts["verify:admin-header-v24"] = "node scripts/check-admin-header-v24.cjs";

  const verify = String(pkg.scripts.verify || "");
  if (!verify.includes("verify:admin-header-v24")) {
    pkg.scripts.verify = verify
      ? `npm run verify:admin-header-v24 && ${verify}`
      : "npm run verify:admin-header-v24";
  }

  write(file, JSON.stringify(pkg, null, 2) + "\n");
}

patchAdminPages();
patchGlobalsCss();
patchPackageJson();

console.log("OK: admin header V24 patch applied.");
