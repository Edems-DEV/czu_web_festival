# Aurora 2026 - PowerShell Checkpoint Sync & Packaging Tool
# Usage:
#   .\scripts\sync-checkpoints.ps1          # Sync core master project to checkpoints
#   .\scripts\sync-checkpoints.ps1 -Zip     # Sync and create .zip packages
#   .\scripts\sync-checkpoints.ps1 -Check   # Verify synchronization integrity

param (
    [switch]$Zip,
    [switch]$Check,
    [switch]$Watch
)

$nodeScript = Join-Path $PSScriptRoot "sync-checkpoints.js"

if ($Zip) {
    node $nodeScript --zip
} elseif ($Check) {
    node $nodeScript --check
} elseif ($Watch) {
    node $nodeScript --watch
} else {
    node $nodeScript
}
