#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const targets = [
  "app/zamowienie/page.tsx",
  "components/order/CheckoutForm.tsx",
  "scripts/check-manual-payment-v48.cjs",
  "scripts/check-checkout-mojibake-v31b.cjs",
  "AGENTS.md",
  "_project"
];
const bad = /[ĂĹÄÃÅÂ]/;
const allowedExt = new Set([".md", ".tsx", ".ts", ".js", ".cjs", ".json"]);
const skipDirs = new Set(["node_modules", ".next", ".git", "_backup_local"]);
const failures = [];

function walk(abs) {
  if (!fs.existsSync(abs)) return;
  const stat = fs.statSync(abs);
  if (stat.isDirectory()) {
    const name = path.basename(abs);
    if (skipDirs.has(name)) return;
    for (const entry of fs.readdirSync(abs)) walk(path.join(abs, entry));
    return;
  }
  if (!allowedExt.has(path.extname(abs))) return;
  const rel = path.relative(root, abs).replace(/\/g, "/");
  const content = fs.readFileSync(abs, "utf8");
  if (bad.test(content)) failures.push(rel);
}

for (const target of targets) walk(path.join(root, target));

if (failures.length) {
  console.error("FAIL: mojibake characters found in active checkout/project-memory scope:");
  for (const file of failures) console.error(`- ${file}`);
  process.exit(1);
}

console.log("OK: no mojibake markers in checkout/project-memory scope.");
