const fs = require("fs");
const path = require("path");

const root = process.cwd();

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function pass(message) {
  console.log("PASS: " + message);
}

function readRequired(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) fail("missing required file: " + file);
  return fs.readFileSync(fullPath, "utf8");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadReadinessModule() {
  const sourceFile = "lib/admin/project-publication-readiness.ts";
  const source = readRequired(sourceFile);

  for (const marker of [
    "getProjectPublicationReadiness",
    "getProjectPublicationErrorMessage",
    "PROJECT_PUBLICATION_MISSING_LABELS",
    "projectRooms",
    "countNamedRooms(rooms) > 0",
    "hasDocumentationPrivateFile",
    "hasSalesVariant",
    "hero",
    "thumbnail",
    "floorPlan",
    "privateDocumentation",
    "salesVariant"
  ]) {
    if (!source.includes(marker)) fail(`${sourceFile} missing marker: ${marker}`);
  }

  if (/if\s*\(\s*rooms\.length\s*>\s*0\s*\)\s*\{[\s\S]*?addCheck\(\"projectRooms\"/.test(source)) {
    fail("projectRooms check is still conditional on rooms.length > 0; empty rooms would pass publication readiness.");
  }

  let ts;
  try {
    ts = require("typescript");
  } catch (error) {
    fail("typescript package is required to run this runtime guard. Run npm install first.");
  }

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove
    }
  }).outputText;

  const module = { exports: {} };
  const exports = module.exports;
  const localRequire = (id) => {
    throw new Error("Unexpected runtime require while loading publication readiness guard: " + id);
  };

  try {
    const factory = new Function("require", "module", "exports", transpiled + "\nreturn module.exports;");
    factory(localRequire, module, exports);
  } catch (error) {
    fail("could not load transpiled project-publication-readiness.ts: " + error.message);
  }

  if (typeof module.exports.getProjectPublicationReadiness !== "function") {
    fail("getProjectPublicationReadiness export is not a function.");
  }

  if (typeof module.exports.getProjectPublicationErrorMessage !== "function") {
    fail("getProjectPublicationErrorMessage export is not a function.");
  }

  return module.exports;
}

function baseProject(overrides = {}) {
  const project = {
    name: "Dom Aurora 014",
    slug: "aurora-014",
    code: "DP-AUR-014",
    description: "Czytelny opis sprzedażowy projektu domu dla klienta.",
    priceGross: 4990,
    usableArea: 123.45,
    roomsCount: 5,
    baseVariantConfirmed: false,
    rooms: [{ name: "Salon z kuchnią" }],
    media: [{ media_type: "hero" }, { media_type: "thumbnail" }, { media_type: "floor_plan" }],
    variants: [{ name: "Projekt podstawowy", active: true }],
    privateFiles: [{ file_type: "documentation", path: "DP-AUR-014/documentation-v1.pdf" }]
  };

  const next = clone(project);
  return typeof overrides === "function" ? overrides(next) : Object.assign(next, overrides);
}

function expectMissing(name, getProjectPublicationReadiness, input, expectedKey) {
  const result = getProjectPublicationReadiness(input);
  if (result.canPublish) fail(`${name}: expected canPublish=false.`);
  if (!result.missing.includes(expectedKey)) {
    fail(`${name}: expected missing key ${expectedKey}, got ${JSON.stringify(result.missing)}.`);
  }
  const check = result.checks.find((item) => item.key === expectedKey);
  if (!check) fail(`${name}: expected check row for ${expectedKey}.`);
  if (check.ok) fail(`${name}: check ${expectedKey} should be false.`);
  if (!String(check.help || "").trim()) fail(`${name}: check ${expectedKey} should have readable help text.`);
  pass(name);
}

function expectCanPublish(name, getProjectPublicationReadiness, input) {
  const result = getProjectPublicationReadiness(input);
  if (!result.canPublish) fail(`${name}: expected canPublish=true, missing ${JSON.stringify(result.missing)}.`);
  if (result.missing.length !== 0) fail(`${name}: expected no missing items.`);
  for (const key of ["hero", "thumbnail", "floorPlan", "privateDocumentation", "salesVariant", "projectRooms"]) {
    const check = result.checks.find((item) => item.key === key);
    if (!check) fail(`${name}: missing check row ${key}.`);
    if (!check.ok) fail(`${name}: check row ${key} should be ok.`);
  }
  pass(name);
}

(function main() {
  const {
    getProjectPublicationReadiness,
    getProjectPublicationErrorMessage,
    PROJECT_PUBLICATION_MISSING_LABELS
  } = loadReadinessModule();

  expectCanPublish("complete project can be published", getProjectPublicationReadiness, baseProject());

  expectMissing(
    "project without hero is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.media = project.media.filter((item) => item.media_type !== "hero");
      return project;
    }),
    "hero"
  );

  expectMissing(
    "project without thumbnail is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.media = project.media.filter((item) => item.media_type !== "thumbnail");
      return project;
    }),
    "thumbnail"
  );

  expectMissing(
    "project without plan is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.media = project.media.filter((item) => item.media_type !== "floor_plan" && item.media_type !== "roof_plan");
      return project;
    }),
    "floorPlan"
  );

  expectMissing(
    "project without private documentation PDF is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.privateFiles = [];
      return project;
    }),
    "privateDocumentation"
  );

  expectMissing(
    "project without variant or confirmed base project is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.variants = [];
      project.baseVariantConfirmed = false;
      return project;
    }),
    "salesVariant"
  );

  expectMissing(
    "project without named rooms is blocked",
    getProjectPublicationReadiness,
    baseProject((project) => {
      project.rooms = [];
      return project;
    }),
    "projectRooms"
  );

  const message = getProjectPublicationErrorMessage(["hero", "thumbnail", "floorPlan", "privateDocumentation", "projectRooms"]);
  for (const required of [
    "Nie mozna opublikowac projektu. Brakuje",
    PROJECT_PUBLICATION_MISSING_LABELS.hero,
    PROJECT_PUBLICATION_MISSING_LABELS.thumbnail,
    PROJECT_PUBLICATION_MISSING_LABELS.floorPlan,
    PROJECT_PUBLICATION_MISSING_LABELS.privateDocumentation,
    PROJECT_PUBLICATION_MISSING_LABELS.projectRooms
  ]) {
    if (!message.includes(required)) fail(`publication error message missing readable label: ${required}`);
  }
  pass("publication error message is readable");

  const actions = readRequired("app/admin/projekty/actions.ts");
  for (const marker of [
    "if (status === \"active\")",
    "getProjectPublicationReadiness",
    "getProjectPublicationErrorMessage",
    "mediaRows",
    "roomRows",
    "variantRows",
    "privateFileRows",
    "privateFiles: privateFileRows",
    "variants: variantRows"
  ]) {
    if (!actions.includes(marker)) fail(`updateProjectStatusAction missing marker: ${marker}`);
  }
  pass("admin status action uses publication readiness before active status");

  const packageJson = JSON.parse(readRequired("package.json"));
  if (packageJson.scripts?.["verify:project-publication-runtime-v27"] !== "node scripts/check-project-publication-runtime-v27.cjs") {
    fail("package.json missing verify:project-publication-runtime-v27 script.");
  }
  if (!String(packageJson.scripts?.verify || "").includes("verify:project-publication-runtime-v27")) {
    fail("main verify script missing verify:project-publication-runtime-v27.");
  }
  pass("package.json wires Etap 27 runtime guard");

  console.log("OK: Etap 27 project publication readiness runtime guard passed.");
})();
