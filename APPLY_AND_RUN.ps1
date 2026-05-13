$ErrorActionPreference = "Stop"

$Target = "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
New-Item -ItemType Directory -Force -Path $Target | Out-Null

$Source = Split-Path -Parent $MyInvocation.MyCommand.Path
Copy-Item -Force -Recurse -Path (Join-Path $Source "*") -Destination $Target -Exclude "APPLY_AND_RUN.ps1"

Set-Location $Target

if (!(Test-Path ".git")) {
  git init | Out-Host
}

git add .
git commit -m "Convert storefront to production shell without fake projects" | Out-Host

npm install
npm run verify
npm run dev
