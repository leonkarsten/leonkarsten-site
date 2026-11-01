# Copies built games from the leonkarsten-arcade repo into the site.
# Run from the site folder:  .\scripts\import-arcade.ps1
# Rebuild first with -Build; pass -Source for a different arcade folder.

param(
  [string]$Source = "$HOME\Documents\leonkarsten-arcade",
  [switch]$Build
)

$ErrorActionPreference = "Stop"
$site = Split-Path -Parent $PSScriptRoot

if ($Build) {
  Write-Host "Building the arcade in $Source ..."
  Push-Location $Source
  try { npm run build } finally { Pop-Location }
}

$dist = Join-Path $Source "dist"
$games = Get-ChildItem $dist -Directory | Where-Object { Test-Path (Join-Path $_.FullName "index.html") }
if (-not $games) {
  throw "No built games found in $dist. Run with -Build, or run 'npm run build' in the arcade folder first."
}

foreach ($g in $games) {
  $dest = Join-Path $site "public\play\$($g.Name)"
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-Item (Join-Path $g.FullName "index.html") (Join-Path $dest "index.html") -Force
  Write-Host "Copied $($g.Name) -> $dest\index.html"
  $card = Join-Path $Source "cards\$($g.Name).png"
  if (Test-Path $card) {
    Copy-Item $card (Join-Path $dest "card.png") -Force
    Write-Host "Copied card -> $dest\card.png"
  }
  if (-not (Test-Path (Join-Path $site "src\content\games\$($g.Name).json"))) {
    Write-Warning "No catalogue entry src\content\games\$($g.Name).json, so the Games page will not list it."
  }
}
Write-Host "Commit and push the site to deploy."
