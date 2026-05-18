const fs = require('fs');
const path = require('path');
const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts ||= {};
pkg.scripts['verify:cloudflare-env-persistence-v40b'] = 'node scripts/check-cloudflare-env-persistence-v40b.cjs';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('[Stage40B-FIX] package.json script patched.');
