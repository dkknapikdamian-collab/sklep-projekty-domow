#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const file = path.join(root, 'package.json');
const bytes = fs.readFileSync(file);
const hasBom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
if (hasBom) {
  console.error('[Stage40D] FAIL: package.json starts with UTF-8 BOM. Next/OpenNext build can fail while parsing package metadata.');
  process.exit(1);
}

const text = bytes.toString('utf8');
try {
  JSON.parse(text);
} catch (error) {
  console.error('[Stage40D] FAIL: package.json is not valid JSON:', error.message);
  process.exit(1);
}

if (/^\uFEFF/.test(text)) {
  console.error('[Stage40D] FAIL: package.json contains leading FEFF character.');
  process.exit(1);
}

console.log('[Stage40D] PASS: package.json has no UTF-8 BOM and parses as JSON.');
