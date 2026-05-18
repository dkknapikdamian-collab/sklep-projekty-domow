const fs = require("fs");
const path = require("path");
const root = process.cwd();
let failed = false;
function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { console.error(`[Stage42A] FAIL missing ${rel}`); failed = true; return ""; }
  let text = fs.readFileSync(full, "utf8");
  if (text.charCodeAt(0) === 0xfeff) { console.error(`[Stage42A] FAIL ${rel} has BOM`); failed = true; text = text.slice(1); }
  return text;
}
function ok(cond, msg) { if (cond) console.log(`[Stage42A] OK: ${msg}`); else { console.error(`[Stage42A] FAIL: ${msg}`); failed = true; } }
const doc = read("docs/payments/2026-05-18_etap42a_resend_provider_decision.md");
const pkgRaw = read("package.json");
const roadmap = read("_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md");
const run = read("_project/runs/2026-05-18_42a_resend_provider_decision.md");
for (const marker of ["Provider e-mail V1.1: Resend", "EMAIL_PROVIDER=resend", "RESEND_API_KEY", "EMAIL_FROM", "EMAIL_REPLY_TO", "bezpieczny link do panelu pobrania", "nie są wysyłane jako załączniki", "statusu płatności paid", "Etap 42B - Resend runtime integration"]) ok(doc.includes(marker), `doc marker ${marker}`);
ok(roadmap.includes("ETAP42A_RESEND_PROVIDER_DECISION"), "roadmap has Stage42A block");
ok(run.includes("Resend provider decision"), "run note exists");
try { const pkg = JSON.parse(pkgRaw); ok(pkg.scripts && pkg.scripts["verify:resend-provider-decision-v42a"] === "node scripts/check-resend-provider-decision-v42a.cjs", "package script exists"); } catch (e) { console.error(`[Stage42A] FAIL package parse ${e.message}`); failed = true; }
if (failed) process.exit(1);
console.log("[Stage42A] PASS: Resend provider decision recorded.");
