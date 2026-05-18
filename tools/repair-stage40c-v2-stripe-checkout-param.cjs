const fs = require('fs');
const path = require('path');

const repo = process.argv[2] || process.cwd();
const file = path.join(repo, 'lib', 'payments', 'stripe-payments.ts');
if (!fs.existsSync(file)) {
  console.error(`[Stage40C-V2] FAIL: missing target file: ${file}`);
  process.exit(1);
}
let text = fs.readFileSync(file, 'utf8');
const before = text;

const patterns = [
  /\r?\n\s*automatic_payment_methods\s*:\s*\{\s*enabled\s*:\s*true\s*,?\s*\}\s*,?/g,
  /\r?\n\s*automatic_payment_methods\s*:\s*\{[\s\S]*?\}\s*,/g,
];
for (const pattern of patterns) text = text.replace(pattern, '');

if (text === before) {
  console.error('[Stage40C-V2] FAIL: no automatic_payment_methods block was removed. Inspect lib/payments/stripe-payments.ts manually.');
  process.exit(1);
}
fs.writeFileSync(file, text, 'utf8');
console.log('[Stage40C-V2] OK: removed unsupported automatic_payment_methods from lib/payments/stripe-payments.ts');
