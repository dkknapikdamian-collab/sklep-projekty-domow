const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const write = (file, content) => fs.writeFileSync(path.join(root, file), content, "utf8");

function patchAdminHeader() {
  const file = "components/admin/AdminHeader.tsx";
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error("Missing components/admin/AdminHeader.tsx");
  let src = read(file);
  const importLine = 'import { AdminUiDebugReporter } from "@/components/admin/AdminUiDebugReporter";';

  if (!src.includes(importLine)) {
    const lines = src.split(/\r?\n/);
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].trim().startsWith("import ")) lastImportIndex = i;
    }
    if (lastImportIndex === -1) throw new Error("Could not find import block in AdminHeader.tsx");
    lines.splice(lastImportIndex + 1, 0, importLine);
    src = lines.join("\n");
  }

  if (!src.includes("<AdminUiDebugReporter />")) {
    src = src.replace(
      "    </header>\n  );",
      "      <AdminUiDebugReporter />\n    </header>\n  );"
    );
  }

  write(file, src);
  console.log("PATCHED: components/admin/AdminHeader.tsx");
}

function patchGlobals() {
  const file = "app/globals.css";
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error("Missing app/globals.css");
  let src = read(file);
  const line = '@import "./admin-ui-debug-v28.css";';
  if (!src.includes(line)) {
    src = `${line}\n${src}`;
  }
  write(file, src);
  console.log("PATCHED: app/globals.css");
}

function prependVerifyScript(verify, scriptName) {
  const token = `npm run ${scriptName}`;
  const parts = String(verify || "")
    .split("&&")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item !== token);
  return [token, ...parts].join(" && ");
}

function patchPackage() {
  const file = "package.json";
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new Error("Missing package.json");
  const pkg = JSON.parse(read(file));
  pkg.scripts = pkg.scripts || {};
  pkg.scripts["verify:admin-ui-debug-v28"] = "node scripts/check-admin-ui-debug-v28.cjs";
  if (!String(pkg.scripts.verify || "").includes("verify:admin-ui-debug-v28")) {
    pkg.scripts.verify = prependVerifyScript(pkg.scripts.verify, "verify:admin-ui-debug-v28");
  }
  write(file, JSON.stringify(pkg, null, 2) + "\n");
  console.log("PATCHED: package.json");
}

patchAdminHeader();
patchGlobals();
patchPackage();
console.log("OK: V28C missing assets/import repair applied.");
