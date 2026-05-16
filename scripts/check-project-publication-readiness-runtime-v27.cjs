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

function loadReadinessModule() {
  const sourceFile = "lib/admin/project-publication-readiness.ts";
  const source = readRequired(sourceFile);

  for (const marker of [
    "getProjectPublicationReadiness",
    "getProjectPublicationErrorMessage",
    "PROJECT_PUBLICATION_MISSING_LABELS",
    "hero",
    "thumbnail",
    "floorPlan",
    "privateDocumentation",
    "salesVariant",
    "projectRooms",
    "hasDocumentationPrivateFile",
    "hasSalesVariant",
    "countNamedRooms"
  ]) {
    if (!source.includes(marker)) fail(sourceFile + " missing marker: " + marker);
  }

  if (/if\s*\(\s*rooms\.length\s*>\s*0\s*\)\s*\{\s*addCheck\(\s*[\"']projectRooms[\"']/.test(source)) {
    fail("projectRooms check is still conditional on rooms.length > 0. Empty rooms must block publication.");
  }

  const actions = readRequired("app/admin/projekty/actions.ts");
  for (const marker of [
    "if (status === \"active\")",
    "getProjectPublicationReadiness",
    "getProjectPublicationErrorMessage",
    "getProjectPublicationContext",
    "mediaRows",
    "roomRows",
    "variantRows",
    "privateFileRows",
    "privateFiles: privateFileRows",
    "variants: variantRows",
    "baseVariantConfirmed"
  ]) {
    if (!actions.includes(marker)) fail("updateProjectStatusAction missing marker: " + marker);
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

function completeInput(overrides = {}) {
  const input = {
    name: "Dom Aurora 014",
    slug: "dom-aurora-014",
    code: "DP-AUR-014",
    description: "Kompletny opis sprzedazowy projektu domu gotowego do publikacji.",
    priceGross: 4990,
    usableArea: 124.5,
    roomsCount: 5,
    baseVariantConfirmed: false,
    rooms: [{ name: "Salon" }, { name: "Kuchnia" }],
    media: [{ mediaType: "hero" }, { media_type: "thumbnail" }, { mediaType: "floor_plan" }],
    variants: [{ name: "Projekt podstawowy", active: true }],
    privateFiles: [{ fileType: "documentation", path: "DP-AUR-014/documentation-v1.pdf" }]
  };

  const next = JSON.parse(JSON.stringify(input));
  return typeof overrides === "function" ? overrides(next) : Object.assign(next, overrides);
}

function expectMissing(name, api, input, expectedKey) {
  const result = api.getProjectPublicationReadiness(input);
  if (result.canPublish) fail(name + ": expected canPublish=false.");
  if (!result.missing.includes(expectedKey)) {
    fail(name + ": expected missing key " + expectedKey + ", got " + result.missing.join(","));
  }
  const message = api.getProjectPublicationErrorMessage(result.missing);
  if (!message.includes("Nie mozna opublikowac projektu. Brakuje")) {
    fail(name + ": publication error message prefix changed.");
  }
  pass(name);
}

function expectPublish(name, api, input) {
  const result = api.getProjectPublicationReadiness(input);
  if (!result.canPublish) fail(name + ": expected canPublish=true, got missing " + result.missing.join(","));
  pass(name);
}

(function main() {
  const api = loadReadinessModule();

  expectPublish("complete project can publish", api, completeInput());

  expectPublish(
    "complete base project can publish with confirmed base variant and no paid variants",
    api,
    completeInput((input) => {
      input.variants = [];
      input.baseVariantConfirmed = true;
      return input;
    })
  );

  expectMissing(
    "project without hero cannot publish",
    api,
    completeInput((input) => {
      input.media = input.media.filter((item) => (item.mediaType || item.media_type) !== "hero");
      return input;
    }),
    "hero"
  );

  expectMissing(
    "project without thumbnail cannot publish",
    api,
    completeInput((input) => {
      input.media = input.media.filter((item) => (item.mediaType || item.media_type) !== "thumbnail");
      return input;
    }),
    "thumbnail"
  );

  expectMissing(
    "project without floor or roof plan cannot publish",
    api,
    completeInput((input) => {
      input.media = input.media.filter((item) => !["floor_plan", "roof_plan"].includes(item.mediaType || item.media_type));
      return input;
    }),
    "floorPlan"
  );

  expectMissing(
    "project without private documentation PDF cannot publish",
    api,
    completeInput((input) => {
      input.privateFiles = [];
      return input;
    }),
    "privateDocumentation"
  );

  expectMissing(
    "project without variant and without base confirmation cannot publish",
    api,
    completeInput((input) => {
      input.variants = [];
      input.baseVariantConfirmed = false;
      return input;
    }),
    "salesVariant"
  );

  expectMissing(
    "project with empty rooms cannot publish",
    api,
    completeInput((input) => {
      input.rooms = [];
      return input;
    }),
    "projectRooms"
  );

  expectMissing(
    "project with unnamed rooms cannot publish",
    api,
    completeInput((input) => {
      input.rooms = [{ name: "" }, { name: "   " }];
      return input;
    }),
    "projectRooms"
  );

  expectMissing(
    "project with zero room count cannot publish",
    api,
    completeInput((input) => {
      input.roomsCount = 0;
      return input;
    }),
    "roomsCount"
  );

  console.log("OK: Etap 27 publication readiness runtime guard passed.");
})();
