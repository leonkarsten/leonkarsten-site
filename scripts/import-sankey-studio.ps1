# Copies the latest Sankey Studio build into the site.
# Run from the site folder:  .\scripts\import-sankey-studio.ps1
# Optionally pass a different source:  .\scripts\import-sankey-studio.ps1 -Source "D:\path\to\sankey-studio"

param(
  [string]$Source = "$HOME\Documents\sankey-studio",
  [switch]$Build
)

$ErrorActionPreference = "Stop"
$site = Split-Path -Parent $PSScriptRoot
$dest = Join-Path $site "public\apps\sankey-studio"

if ($Build) {
  Write-Host "Building Sankey Studio in $Source ..."
  Push-Location $Source
  try { npm run build } finally { Pop-Location }
}

$built = Join-Path $Source "dist\index.html"
if (-not (Test-Path $built)) {
  throw "No build found at $built. Run with -Build, or run 'npm run build' in the Sankey Studio folder first."
}

New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item $built (Join-Path $dest "index.html") -Force
Write-Host "Copied $built -> $dest\index.html"
Write-Host "Commit and push the site to deploy."
