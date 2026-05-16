#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const files = [
  "app/zamowienie/page.tsx",
  "components/order/CheckoutForm.tsx"
];

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function read(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) fail("missing file: " + rel);
  return fs.readFileSync(abs, "utf8");
}

function normalize(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const combined = files.map(read).join("\n");
const haystack = normalize(combined);
const rawBad = /[\u0102\u0139\u00c3\u00c4\u00c5\ufffd\u0098]/u;
if (rawBad.test(combined)) {
  fail("checkout contains mojibake characters");
}

const required = [
  "data-checkout-non-public-v31",
  "data-order-without-payment-v31",
  "data-payment-later-v31",
  "Techniczny test zamówienia",
  "zamówienie bez płatności",
  "etap techniczny przed integracją",
  "niewidoczny publicznie",
  "nie uruchamia płatności",
  "integracji płatności online",
  "webhooków i statusów płatności"
];

for (const marker of required) {
  if (!haystack.includes(normalize(marker))) {
    fail("missing Etap 31 checkout non-public marker: " + marker);
  }
}

const forbidden = [
  "ręczny przelew",
  "reczny przelew",
  "przelew ręczny",
  "przelew reczny",
  "płatność ręczna",
  "platnosc reczna",
  "ręczna płatność",
  "reczna platnosc",
  "dane do przelewu",
  "płatność odbywa się ręcznie",
  "platnosc odbywa sie recznie",
  "ręcznym potwierdzeniu płatności",
  "manual payment",
  "manual-payment",
  "legacy / temporary / internal only",
  "legacy-manual-payment-flow"
];

for (const phrase of forbidden) {
  if (haystack.includes(normalize(phrase))) {
    fail("checkout still exposes forbidden manual-payment copy: " + phrase);
  }
}

const pkg = JSON.parse(read("package.json").replace(/^\uFEFF/, ""));
const expected = "node scripts/check-manual-payment-v48.cjs";
if (pkg.scripts?.["verify:payment-direction-v48"] !== expected) {
  fail("package.json must point verify:payment-direction-v48 to scripts/check-manual-payment-v48.cjs");
}
if (pkg.scripts?.["verify:manual-payment-v48"] && pkg.scripts["verify:manual-payment-v48"] !== expected) {
  fail("package.json verify:manual-payment-v48 must point to the Etap 31 compatibility guard or be removed");
}
if (pkg.scripts?.["verify:checkout-mojibake-v31b"] !== "node scripts/check-checkout-mojibake-v31b.cjs") {
  fail("package.json missing verify:checkout-mojibake-v31b");
}
if (!String(pkg.scripts?.verify || "").includes("verify:payment-direction-v48")) {
  fail("main verify script must include verify:payment-direction-v48");
}

console.log("OK: Etap 31 checkout is marked as non-public order test without manual-payment target flow.");
