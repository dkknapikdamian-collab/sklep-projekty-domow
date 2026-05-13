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

// Remove invalid non-async runtime export from a "use server" file.
actions = actions.replace(
  /const initialState: CreateProjectState = \{\s*ok: false,\s*message: ""\s*\};\s*\n\s*export \{ initialState \};\s*/m,
  ""
);
actions = actions.replace(
  /const initialState = \{\s*ok: false,\s*message: ""\s*\};\s*\n\s*export \{ initialState \};\s*/m,
  ""
);
actions = actions.replace(/export \{ initialState \};\s*/g, "");

fs.writeFileSync(actionsPath, actions, "utf8");

let form = fs.readFileSync(formPath, "utf8");

form = form.replace(
  'import { createProjectAction, initialState } from "@/app/admin/projekty/nowy/actions";',
  'import { createProjectAction } from "@/app/admin/projekty/nowy/actions";'
);

const typeBlock = `type CreateProjectState = {
  ok: boolean;
  message: string;
  existingProjectHref?: string;
  existingProjectLabel?: string;
};

`;

if (!form.includes("type CreateProjectState")) {
  form = form.replace("type RoomRow =", typeBlock + "type RoomRow =");
}

if (form.includes("const initialState = {")) {
  form = form.replace("const initialState = {", "const initialState: CreateProjectState = {");
}

if (!form.includes("const initialState: CreateProjectState")) {
  form = form.replace(
    'const CUSTOM_FLOOR = "__custom__";',
    `const CUSTOM_FLOOR = "__custom__";

const initialState: CreateProjectState = {
  ok: false,
  message: ""
};`
  );
}

fs.writeFileSync(formPath, form, "utf8");

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:form-state-v17b"] = "node scripts/check-form-state-v17b.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:form-state-v17b")) {
  pkg.scripts.verify = "npm run verify:form-state-v17b && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:form-state-v17b";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log("OK: V17B admin form state type repair applied.");
