const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "app/globals.css",
  "app/admin/projekty/page.tsx",
  "scripts/check-ui-mojibake-status-v22d.cjs"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V22D/V22H files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const css = read("app/globals.css");
const sectionHeadBefore = css.match(/\.section-head h2::before\s*\{[\s\S]*?\}/);
if (!sectionHeadBefore) {
  console.error("FAIL: Missing .section-head h2::before block.");
  process.exit(1);
}

const block = sectionHeadBefore[0];
if (!/content:\s*["']\\{1,2}2014["']/.test(block)) {
  console.error("FAIL: .section-head h2::before must use CSS escaped dash content.");
  console.error(block);
  process.exit(1);
}

for (const pattern of [/Ă/, /Â/, /â€/, /Ä‚/, /Ă˘/, /�/]) {
  if (pattern.test(block)) {
    console.error(`FAIL: Mojibake pattern still present in section heading pseudo element: ${pattern}`);
    process.exit(1);
  }
}

const adminPage = read("app/admin/projekty/page.tsx");
for (const needle of [
  'tone: "success" | "neutral" | "error"',
  'firstParam(searchParams.status) === "error"',
  "decodeURIComponent",
  "admin-form-error",
  'message.tone === "error"'
]) {
  if (!adminPage.includes(needle)) {
    console.error(`FAIL: admin projects page missing V22H status feedback element: ${needle}`);
    process.exit(1);
  }
}

console.log("OK: UI mojibake/status feedback V22D/V22H guard passed.");
