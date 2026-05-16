const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

const projectsPath = path.join(root, "data", "projects.ts");
if (fs.existsSync(projectsPath)) {
  const source = fs.readFileSync(projectsPath, "utf8");
  const mustContain = "export const projects: Project[] = [];";
  if (!source.includes(mustContain)) {
    fail("data/projects.ts nie moze zawierac fikcyjnych projektow w production shell. Wymagany zapis: " + mustContain);
  }
}

const requiredFiles = [
  "app/admin/projekty/actions.ts",
  "lib/project-repository.ts",
  "scripts/check-real-admin-projects.cjs",
  "scripts/check-no-legacy-demo-components.cjs",
  "package.json"
];

const missingFiles = requiredFiles.filter((file) => !exists(file));
if (missingFiles.length) fail("Missing demo cleanup files: " + missingFiles.join(", "));

const adminProjectActions = read("app/admin/projekty/actions.ts");
for (const needle of [
  "createSampleProjectAction",
  "demo-projekt-przykladowy-v28",
  "NARZEDZIE TESTOWE",
  "status: \"draft\"",
  "demoSampleSafety: true",
  "toStatus: \"draft\"",
  "newStatus: \"draft\""
]) {
  if (!adminProjectActions.includes(needle)) fail("sample project action missing STAGE53 demo safety marker: " + needle);
}

const sampleFunctionStart = adminProjectActions.indexOf("export async function createSampleProjectAction");
if (sampleFunctionStart < 0) fail("createSampleProjectAction not found.");
const sampleFunction = adminProjectActions.slice(sampleFunctionStart);
if (sampleFunction.includes("status: \"active\"")) {
  fail("createSampleProjectAction must not create active sample/demo projects.");
}
if (sampleFunction.includes("projekt-przykladowy-v22")) {
  fail("old active sample slug projekt-przykladowy-v22 must not remain in createSampleProjectAction.");
}

const publicRepository = read("lib/project-repository.ts");
for (const needle of [
  "STAGE53_DEMO_SAMPLE_PUBLIC_GUARD",
  "isDemoOrSampleProject",
  "DEMO_SAMPLE_PUBLIC_BLOCKLIST",
  "!isDemoOrSampleProject(project)"
]) {
  if (!publicRepository.includes(needle)) fail("public repository missing demo/sample blocker: " + needle);
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts?.["verify:no-demo-content"] !== "node scripts/check-no-demo-content.cjs") {
  fail("package.json missing verify:no-demo-content script.");
}
if (!String(packageJson.scripts?.verify || "").includes("verify:no-demo-content")) {
  fail("main verify script missing verify:no-demo-content.");
}

const runtimeFilesToScan = [
  "app/projekty/page.tsx",
  "app/projekty/[slug]/page.tsx",
  "components/project/ProjectCard.tsx",
  "components/project/ProjectDetailPage.tsx"
];
const forbiddenRuntimeNames = ["Dom w Aurorach 14", "Dom w Malinowkach 6", "Dom w Malinówkach 6", "Dom Klejnot 29", "Projekt Przykladowy V22", "projekt-przykladowy-v22"];
const hits = [];
for (const rel of runtimeFilesToScan) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, "utf8");
  for (const needle of forbiddenRuntimeNames) {
    if (text.includes(needle)) hits.push(rel + ": " + needle);
  }
}
if (hits.length) fail("znaleziono fikcyjne nazwy projektow w publicznym runtime: " + hits.join("; "));

console.log("OK: production shell blocks demo/sample projects from public offers.");
