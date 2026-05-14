const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "components/admin/AdminHeader.tsx");

if (!fs.existsSync(file)) {
  throw new Error("Missing components/admin/AdminHeader.tsx");
}

let src = fs.readFileSync(file, "utf8");
const importLine = 'import { AdminUiDebugReporter } from "@/components/admin/AdminUiDebugReporter";';

if (!src.includes(importLine)) {
  const lines = src.split(/\r?\n/);
  let lastImportIndex = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim().startsWith("import ")) lastImportIndex = i;
  }

  if (lastImportIndex === -1) {
    throw new Error("Could not find import block in AdminHeader.tsx");
  }

  lines.splice(lastImportIndex + 1, 0, importLine);
  src = lines.join("\n");
}

if (!src.includes("<AdminUiDebugReporter />")) {
  src = src.replace(
    "    </header>\n  );",
    "      <AdminUiDebugReporter />\n    </header>\n  );"
  );
}

fs.writeFileSync(file, src, "utf8");
console.log("PATCHED: AdminHeader import/render for AdminUiDebugReporter V28B");
