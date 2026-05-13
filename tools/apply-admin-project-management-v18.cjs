const fs = require("fs");
const path = require("path");

const root = process.cwd();
const packagePath = path.join(root, "package.json");
const formPath = path.join(root, "components", "admin", "AdminProjectCreateForm.tsx");
const createActionPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");

if (!fs.existsSync(packagePath)) {
  throw new Error("Missing package.json");
}

// Keep earlier "use server" repair applied, because this repo has hit that regression before.
if (fs.existsSync(createActionPath)) {
  let createActions = fs.readFileSync(createActionPath, "utf8");
  createActions = createActions.replace(
    /const initialState: CreateProjectState = \{\s*ok: false,\s*message: ""\s*\};\s*\n\s*export \{ initialState \};\s*/m,
    ""
  );
  createActions = createActions.replace(/export \{ initialState \};\s*/g, "");
  fs.writeFileSync(createActionPath, createActions, "utf8");
}

if (fs.existsSync(formPath)) {
  let form = fs.readFileSync(formPath, "utf8");
  form = form.replace(
    'import { createProjectAction, initialState } from "@/app/admin/projekty/nowy/actions";',
    'import { createProjectAction } from "@/app/admin/projekty/nowy/actions";'
  );

  if (!form.includes("type CreateProjectState")) {
    form = form.replace(
      "type RoomRow =",
      `type CreateProjectState = {
  ok: boolean;
  message: string;
  existingProjectHref?: string;
  existingProjectLabel?: string;
};

type RoomRow =`
    );
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
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["verify:admin-project-management-v18"] = "node scripts/check-admin-project-management-v18.cjs";

if (pkg.scripts.verify && !pkg.scripts.verify.includes("verify:admin-project-management-v18")) {
  pkg.scripts.verify = "npm run verify:admin-project-management-v18 && " + pkg.scripts.verify;
} else if (!pkg.scripts.verify) {
  pkg.scripts.verify = "npm run verify:admin-project-management-v18";
}

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log("OK: V18 admin project management applied.");
