#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const scopedFiles = [
  "app/zamowienie/page.tsx",
  "components/order/CheckoutForm.tsx",
  "scripts/check-manual-payment-v48.cjs"
];

const badCharRegex = /[\u0102\u0139\u00c3\u00c4\u00c5\ufffd\u0098]/u;
const badFragments = [
  "ZAM\\u0102",
  "zam\\u0102",
  "p\\u0139",
  "r\\u00c4",
  "u\\u0139",
  "Wr\\u0102",
  "Przejd\\u0139",
  "p\\u00c5",
  "\\u0098CZNY"
].map((value) => value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16))));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function read(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) fail("missing file: " + rel);
  return fs.readFileSync(abs, "utf8");
}

const failures = [];
for (const rel of scopedFiles) {
  const text = read(rel);
  if (badCharRegex.test(text) || badFragments.some((fragment) => text.includes(fragment))) {
    failures.push(rel);
  }
}

if (failures.length) {
  console.error("FAIL: mojibake characters found in active checkout scope:");
  for (const rel of failures) console.error("- " + rel);
  process.exit(1);
}

console.log("OK: no mojibake in active checkout scope.");
