const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}
function compact(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}
function lower(value) {
  return compact(value).toLocaleLowerCase("pl-PL");
}
function has(source, marker) {
  return lower(source).includes(lower(marker));
}

const required = [
  "components/order/CheckoutForm.tsx",
  "app/zamowienie/page.tsx",
  "_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md",
  "_project/16_PRODUCTION_READINESS_CHECKLIST.md",
  "_project/07_NEXT_STEPS.md",
  "_project/03_CURRENT_STAGE.md",
  "_project/14_TEST_HISTORY.md",
  "_project/15_ACTIVE_SOURCE_MAP.md",
  "package.json"
];
for (const file of required) {
  if (!exists(file)) fail(`missing payment direction file: ${file}`);
}

const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.["verify:manual-payment-v48"]) {
  fail("package.json must not expose verify:manual-payment-v48 as an active guard.");
}
if (pkg.scripts?.["verify:payment-direction-v48"] !== "node scripts/check-payment-direction-v48.cjs") {
  fail("package.json missing verify:payment-direction-v48 script.");
}
if (!String(pkg.scripts?.verify || "").includes("verify:payment-direction-v48")) {
  fail("main verify script missing verify:payment-direction-v48.");
}

const checkoutForm = read("components/order/CheckoutForm.tsx");
for (const marker of [
  "data-payment-direction-v48",
  "data-legacy-manual-payment-flow-v48",
  "nie jest docelowym modelem płatności",
  "automatycznym providerem płatności",
  "przed publicznym uruchomieniem"
]) {
  if (!has(checkoutForm, marker)) fail(`checkout form missing payment-direction marker: ${marker}`);
}

const checkoutPage = read("app/zamowienie/page.tsx");
for (const marker of [
  "data-payment-direction-page-v48",
  "tymczasowy wewnętrzny flow zamówienia",
  "nie jest docelowym modelem płatności",
  "automatycznym providerem płatności"
]) {
  if (!has(checkoutPage, marker)) fail(`checkout page missing payment-direction marker: ${marker}`);
}

for (const [file, source] of [["CheckoutForm.tsx", checkoutForm], ["app/zamowienie/page.tsx", checkoutPage]]) {
  for (const forbidden of [
    "Płatność odbywa się ręcznie po kontakcie z obsługą",
    "Dane do przelewu wyślemy po weryfikacji",
    "bez Stripe",
    "PayU",
    "Akceptuję kontakt w sprawie zamówienia projektu i ręcznej płatności",
    "ręcznym potwierdzeniu płatności"
  ]) {
    if (has(source, forbidden)) fail(`${file} still promotes old manual payment copy: ${forbidden}`);
  }
}

const docs = [
  "_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md",
  "_project/16_PRODUCTION_READINESS_CHECKLIST.md",
  "_project/07_NEXT_STEPS.md",
  "_project/03_CURRENT_STAGE.md",
  "_project/14_TEST_HISTORY.md",
  "_project/15_ACTIVE_SOURCE_MAP.md"
].map((file) => [file, read(file)]);

for (const [file, source] of docs) {
  for (const marker of [
    "ETAP_A_PAYMENT_DIRECTION_FIX",
    "Nie wdrażamy płatności ręcznych jako docelowego modelu",
    "legacy / temporary / internal only",
    "automatycz",
    "webhooki",
    "statusy płatności",
    "TEST RĘCZNY DO WYKONANIA"
  ]) {
    if (!has(source, marker)) fail(`${file} missing direction marker: ${marker}`);
  }
}

const activeRoadmap = read("_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md") + "\n" + read("_project/15_ACTIVE_SOURCE_MAP.md");
if (has(activeRoadmap, "Etap 23 - spojnosc komunikacji platnosci recznej")) {
  fail("active roadmap/source map still contains old Etap 23 manual payment direction.");
}

console.log("OK: payment direction V48 guard passed.");
