$ErrorActionPreference="Stop"
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
Write-Host "== Stage40A Cloudflare/OpenNext preview/build =="
node --version
npm --version
npx wrangler --version
npm run verify:cloudflare-deploy-v40a
npm run cf:build
if(!(Test-Path ".open-next\worker.js")){ throw "Brak .open-next\worker.js po cf:build" }
Write-Host "OK: .open-next\worker.js istnieje"
Write-Host "Następnie: npx wrangler login ; npm run cf:deploy"
