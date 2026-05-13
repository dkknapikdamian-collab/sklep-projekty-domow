const fs = require("fs");
const path = require("path");

const root = process.cwd();
const actionsPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");
const formPath = path.join(root, "components", "admin", "AdminProjectCreateForm.tsx");
const packagePath = path.join(root, "package.json");

if (!fs.existsSync(actionsPath)) throw new Error("Missing actions.ts");
if (!fs.existsSync(formPath)) throw new Error("Missing AdminProjectCreateForm.tsx");
if (!fs.existsSync(packagePath)) throw new Error("Missing package.json");

let actions = fs.readFileSync(actionsPath, "utf8");

actions = actions.replace(
  /const initialState: CreateProjectState = \{\s*ok: false,\s*message: ""\s*\};\s*\n\s*export \{ initialState \};\s*/m,
  ""
);

actions = actions.replace(/export \{ initialState \};\s*/g, "");

if (actions.includes("export { initialState }")) {
  throw new Error("Failed to remove initialState export from actions.ts");
}

fs.writeFileSync(actionsPath, actions, "utf8");

let form = fs.readFileSync(formPath, "utf8");

form = form.replace(
  'import { createProjectAction, initialState } from "@/app/admin/projekty/nowy/actions";',
  'import { createProjectAction } from "@/app/admin/projekty/nowy/actions";'
);

if (!form.includes("const initialState")) {
  form = form.replace(
    "const CUSTOM_FLOOR = \"__custom__\";",
    `const CUSTOM_FLOOR = "__custom__";

const initialState = {
  ok: false,
  message: ""
};`
  );
}

fs.writeFileSync(formPath, form, "utf8");

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:use-server-exports-v17"] = "node scripts/check-use-server-action-exports-v17.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:use-server-exports-v17")) {
  pkg.scripts.verify = "npm run verify:use-server-exports-v17 && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:use-server-exports-v17";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log("OK: V17 use server export repair applied.");
