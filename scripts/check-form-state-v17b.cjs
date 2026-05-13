const fs = require("fs");
const path = require("path");

const root = process.cwd();
const formPath = path.join(root, "components", "admin", "AdminProjectCreateForm.tsx");
const actionsPath = path.join(root, "app", "admin", "projekty", "nowy", "actions.ts");

if (!fs.existsSync(formPath)) {
  console.error("FAIL: Missing AdminProjectCreateForm.tsx");
  process.exit(1);
}

if (!fs.existsSync(actionsPath)) {
  console.error("FAIL: Missing actions.ts");
  process.exit(1);
}

const form = fs.readFileSync(formPath, "utf8");
const actions = fs.readFileSync(actionsPath, "utf8");

for (const needle of [
  "type CreateProjectState",
  "existingProjectHref?: string",
  "existingProjectLabel?: string",
  "const initialState: CreateProjectState"
]) {
  if (!form.includes(needle)) {
    console.error(`FAIL: AdminProjectCreateForm missing ${needle}`);
    process.exit(1);
  }
}

if (form.includes("initialState } from") || form.includes("{ createProjectAction, initialState }")) {
  console.error("FAIL: AdminProjectCreateForm still imports initialState from server action file.");
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

console.log("OK: V17B admin form state type guard passed.");
