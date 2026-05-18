#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const skipDirs = new Set(['node_modules', '.git', '.next', '.open-next', '_backup_local', '.vercel', '.wrangler']);
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const changed = [];

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
    if (!/^(app|components|lib|src|server|scripts)\//.test(rel)) continue;
    let text = fs.readFileSync(full, 'utf8');
    if (!text.includes('automatic_payment_methods')) continue;
    const before = text;

    // Remove a Checkout Session param that belongs to PaymentIntents, not Checkout Sessions.
    // Handles common shapes:
    //   automatic_payment_methods: { enabled: true },
    //   automatic_payment_methods: {\n     enabled: true,\n   },
    // with or without a leading comma.
    text = text.replace(/,\s*automatic_payment_methods\s*:\s*\{\s*enabled\s*:\s*true\s*,?\s*\}/g, '');
    text = text.replace(/(\r?\n)[ \t]*automatic_payment_methods\s*:\s*\{\s*(?:\r?\n)?[ \t]*enabled\s*:\s*true\s*,?\s*(?:\r?\n)?[ \t]*\}\s*,?/g, '$1');
    text = text.replace(/automatic_payment_methods\s*:\s*\{\s*enabled\s*:\s*true\s*,?\s*\}\s*,?/g, '');

    if (text !== before) {
      fs.writeFileSync(full, text, 'utf8');
      changed.push(rel);
    }
  }
}

walk(root);

fs.mkdirSync(path.join(root, '_project', 'runs'), { recursive: true });
fs.writeFileSync(path.join(root, '_project', 'runs', '2026-05-18_40c_patched_source_files.txt'), changed.join('\n') + (changed.length ? '\n' : ''), 'utf8');

if (changed.length === 0) {
  console.log('[Stage40C] No automatic_payment_methods patch target changed. Either it was already fixed, or the parameter is generated differently.');
} else {
  console.log('[Stage40C] Patched files:');
  for (const file of changed) console.log(' - ' + file);
}

const remaining = [];
function scanRemaining(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanRemaining(full);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!exts.has(ext)) continue;
    const rel = path.relative(root, full).replace(/\\/g, '/');
    if (!/^(app|components|lib|src|server)\//.test(rel)) continue;
    const text = fs.readFileSync(full, 'utf8');
    if (text.includes('automatic_payment_methods')) remaining.push(rel);
  }
}
scanRemaining(root);
if (remaining.length) {
  console.error('[Stage40C] FAIL: automatic_payment_methods still exists in source:');
  for (const file of remaining) console.error(' - ' + file);
  process.exit(1);
}

console.log('[Stage40C] OK: no automatic_payment_methods left in app/lib/source checkout code.');
