const fs=require("fs"),path=require("path"),cp=require("child_process");
const root=process.cwd();
const fail=m=>{console.error("[Stage40A] FAIL: "+m);process.exit(1)};
const ok=m=>console.log("[Stage40A] OK: "+m);
const read=f=>{const p=path.join(root,f); if(!fs.existsSync(p)) fail("missing "+f); return fs.readFileSync(p,"utf8")};
const pkg=JSON.parse(read("package.json"));
const scripts={
 "cf:build":"opennextjs-cloudflare build",
 "cf:preview":"opennextjs-cloudflare build && opennextjs-cloudflare preview",
 "cf:deploy":"opennextjs-cloudflare build && opennextjs-cloudflare deploy",
 "cf:typegen":"wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts",
 "verify:cloudflare-deploy-v40a":"node scripts/check-cloudflare-deploy-v40a.cjs"
};
for(const [k,v] of Object.entries(scripts)){ if(pkg.scripts?.[k]!==v) fail("bad/missing script "+k) }
ok("Cloudflare scripts present");
if(!pkg.dependencies?.["@opennextjs/cloudflare"]&&!pkg.devDependencies?.["@opennextjs/cloudflare"]) fail("missing @opennextjs/cloudflare");
if(!pkg.dependencies?.["wrangler"]&&!pkg.devDependencies?.["wrangler"]) fail("missing wrangler");
ok("OpenNext/Wrangler dependencies present");
const wr=read("wrangler.jsonc");
for(const needle of ['"main": ".open-next/worker.js"','"name": "sklep-projekty-domow"','"nodejs_compat"','"directory": ".open-next/assets"']) if(!wr.includes(needle)) fail("wrangler missing "+needle);
if(/STRIPE_SECRET_KEY|SUPABASE_SERVICE_ROLE_KEY|whsec_|sk_test_|sk_live_|sb_secret_/i.test(wr)) fail("secret-looking value in wrangler.jsonc");
ok("wrangler contract valid and no secrets");
if(!read("open-next.config.ts").includes("defineCloudflareConfig")) fail("bad open-next.config.ts");
read("app/api/payments/stripe/webhook/route.ts"); ok("Stripe webhook route exists");
const gi=read(".gitignore");
for(const e of [".open-next/",".wrangler/",".dev.vars",".dev.vars.*","cloudflare-env.d.ts"]) if(!gi.includes(e)) fail(".gitignore missing "+e);
try{const tracked=cp.execSync("git ls-files .env .env.local .dev.vars .dev.vars.local",{cwd:root,encoding:"utf8"}).trim(); if(tracked) fail("tracked secret/env files: "+tracked.replace(/\n/g,", "))}catch(e){}
ok("no tracked env files detected");
read("docs/cloudflare/2026-05-18_etap40a_cloudflare_opennext_foundation.md");
read("_project/runs/2026-05-18_40a_cloudflare_opennext_foundation.md");
console.log("[Stage40A] PASS: Cloudflare/OpenNext foundation guard passed.");
