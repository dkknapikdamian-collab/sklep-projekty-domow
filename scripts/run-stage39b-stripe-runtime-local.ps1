$ErrorActionPreference = "Stop"
$App = "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
cd $App

Write-Host "== Stage39B runtime guard ==" -ForegroundColor Cyan
Write-Host "Ten skrypt nie ustawia sekretów. Ustaw je w tej sesji albo w .env.local, ale nie commituj .env.local." -ForegroundColor Yellow
Write-Host "Wymagane do DB smoke: NEXT_PUBLIC_SUPABASE_URL lub SUPABASE_URL oraz SUPABASE_SERVICE_ROLE_KEY." -ForegroundColor Yellow

$env:STAGE39B_REQUIRE_DB="1"
node scripts/check-stage39b-stripe-no-fulfillment-without-paid.cjs
