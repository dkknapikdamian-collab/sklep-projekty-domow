#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const skipDirs = new Set(['node_modules', '.git', '.next', '.open-next', '_backup_local', '.vercel', '.wrangler']);
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const hits = [];
const checkoutMarkers = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!exts.has(ext)) continue;
    const rel = path.relative(root, full).replace(/\\/g, '/');
    if (!/^(app|components|lib|src|server)\//.test(rel)) continue;
    const text = fs.readFileSync(full, 'utf8');
    if (text.includes('automatic_payment_methods')) hits.push(rel);
    if (/checkout\.sessions\.create|\/v1\/checkout\/sessions|stripe checkout/i.test(text)) checkoutMarkers.push(rel);
  }
}
walk(root);

if (hits.length) {
  console.error('[Stage40C] FAIL: Stripe Checkout source still contains unsupported automatic_payment_methods param:');
  for (const hit of hits) console.error(' - ' + hit);
  process.exit(1);
}

if (!checkoutMarkers.length) {
  console.error('[Stage40C] FAIL: no checkout session source marker found. Guard cannot prove target path.');
  process.exit(1);
}

console.log('[Stage40C] OK: no unsupported automatic_payment_methods param in source.');
console.log('[Stage40C] OK: checkout session source markers found:');
for (const file of [...new Set(checkoutMarkers)].slice(0, 20)) console.log(' - ' + file);
console.log('[Stage40C] PASS: Stripe Checkout Session params guard passed.');
