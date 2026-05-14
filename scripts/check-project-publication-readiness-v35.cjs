const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "lib/admin/project-publication-readiness.ts",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/nowy/actions.ts",
  "lib/project-repository.ts"
];

const missingFiles = requiredFiles.filter((file) => !exists(file));
if (missingFiles.length) {
  console.error("FAIL: Missing V35 publication readiness files:");
  for (const file of missingFiles) console.error("- " + file);
  process.exit(1);
}

const readiness = read("lib/admin/project-publication-readiness.ts");
for (const needle of ["canPublish", "missing", "missingLabels", "message", "getProjectPublicationReadiness"]) {
  if (!readiness.includes(needle)) {
    console.error(`FAIL: readiness module missing required field: ${needle}`);
    process.exit(1);
  }
}

if (!readiness.includes("Nie mozna opublikowac projektu. Brakuje")) {
  console.error("FAIL: readiness module missing publication error message template.");
  process.exit(1);
}

const adminActions = read("app/admin/projekty/actions.ts");
for (const needle of [
  "getProjectPublicationReadiness",
  "if (status === \"active\")",
  "if (!readiness.canPublish)"
]) {
  if (!adminActions.includes(needle)) {
    console.error(`FAIL: updateProjectAction missing publication readiness flow: ${needle}`);
    process.exit(1);
  }
}

if (!adminActions.includes("const status = str(formData, \"status\") || \"draft\"")) {
  console.error("FAIL: draft status fallback missing in updateProjectAction.");
  process.exit(1);
}

const createActions = read("app/admin/projekty/nowy/actions.ts");
for (const needle of [
  "if (status === \"active\")",
  "getProjectPublicationReadiness",
  "if (!readiness.canPublish)"
]) {
  if (!createActions.includes(needle)) {
    console.error(`FAIL: createProjectAction missing active publication readiness guard: ${needle}`);
    process.exit(1);
  }
}

if (!createActions.includes('status = str(formData, "status") || "draft"')) {
  console.error("FAIL: draft fallback was removed; draft must still be saveable.");
  process.exit(1);
}

const publicRepo = read("lib/project-repository.ts");
if (!publicRepo.includes('.eq("status", "active")')) {
  console.error("FAIL: public repository no longer filters active-only projects.");
  process.exit(1);
}

console.log("OK: project publication readiness V35 guard passed.");
