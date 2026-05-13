$ErrorActionPreference = "Stop"

$Target = "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
New-Item -ItemType Directory -Force -Path $Target | Out-Null

$Source = Split-Path -Parent $MyInvocation.MyCommand.Path
Copy-Item -Force -Recurse -Path (Join-Path $Source "*") -Destination $Target -Exclude "APPLY_TO_LOCAL_FOLDER.ps1"

Set-Location $Target

if (!(Test-Path ".git")) {
  git init | Out-Host
}

git add .
git commit -m "Initial project foundation: design lock and production plan" | Out-Host

Write-Host ""
Write-Host "OK: Pliki projektu wgrane do: $Target"
Write-Host "Rekomendowana nazwa repo: sklep-projekty-domow"
Write-Host "Następny krok push:"
Write-Host 'gh repo create dkknapikdamian-collab/sklep-projekty-domow --private --source . --remote origin --push'
