# Copies the latest Finance Studio build into the site.
# Run from the site folder:  .\scripts\import-finance-studio.ps1
# Optionally pass a different source:  .\scripts\import-finance-studio.ps1 -Source "D:\path\to\finance-studio"

param(
  [string]$Source = "$HOME\Documents\finance-studio",
  [switch]$Build
)

$ErrorActionPreference = "Stop"
$site = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $site "public\apps\finance-studio"

if ($Build) {
  Write-Host "Building Finance Studio in $Source ..."
  Push-Location $Source
  try { npm run build } finally { Pop-Location }
}

$built = Join-Path $Source "dist\index.html"
if (-not (Test-Path $built)) {
  throw "No build found at $built. Run with -Build, or run 'npm run build' in the Finance Studio folder first."
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item $built (Join-Path $dest "index.html") -Force
Write-Host "Copied $built -> $dest\index.html"
Write-Host "Commit and push the site to deploy."
