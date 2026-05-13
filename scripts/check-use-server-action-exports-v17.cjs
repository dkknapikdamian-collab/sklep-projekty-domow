const fs = require("fs");
const path = require("path");

const root = process.cwd();
const actionsPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");
const formPath = path.join(root, "components", "admin", "AdminProjectCreateForm.tsx");

if (!fs.existsSync(actionsPath)) {
  console.error("FAIL: Missing app/admin/projekty/nowy/actions.ts");
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  console.error("FAIL: Missing components/admin/AdminProjectCreateForm.tsx");
  process.exit(1);
}

const actions = fs.readFileSync(actionsPath, "utf8");
const form = fs.readFileSync(formPath, "utf8");

if (!actions.includes('"use server"')) {
  console.error('FAIL: actions.ts should remain a "use server" file.');
  process.exit(1);
}

for (const forbidden of [
  "export { initialState }",
  "export const initialState",
  "export let initialState",
  "export var initialState"
]) {
  if (actions.includes(forbidden)) {
    console.error(`FAIL: actions.ts exports non-async runtime value: ${forbidden}`);
    process.exit(1);
  }
}

if (!actions.includes("export async function createProjectAction")) {
  console.error("FAIL: actions.ts must export async function createProjectAction.");
  process.exit(1);
}

if (form.includes("initialState } from") || form.includes("{ createProjectAction, initialState }")) {
  console.error("FAIL: AdminProjectCreateForm must not import initialState from server action file.");
  process.exit(1);
}

if (!form.includes("const initialState")) {
  console.error("FAIL: AdminProjectCreateForm should define local initialState.");
  process.exit(1);
}

console.log("OK: use server action exports are valid.");
