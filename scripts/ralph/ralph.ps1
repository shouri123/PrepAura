# ==============================================================================
# Ralph Autonomous Loop Runner (Windows PowerShell)
# Project: PrepAura
# Objective: Repeatedly run AI coding agent until all PRD stories pass.
# Strict Rule: Zero emoji policy.
# ==============================================================================

[CmdletBinding()]
param (
    [int]$MaxIterations = 20,
    [ValidateSet("claude", "amp")]
    [string]$Tool = "claude",
    [string]$PrdPath = "$PSScriptRoot\prd.json",
    [string]$PromptPath = "$PSScriptRoot\prompt.md",
    [string]$LogPath = "$PSScriptRoot\ralph.log"
)

$ProjectRoot = Resolve-Path "$PSScriptRoot\..\.."
Set-Location -Path $ProjectRoot

Write-Host "================================================================================" -ForegroundColor Cyan
Write-Host "[RALPH] Starting PrepAura Autonomous Development Loop" -ForegroundColor Cyan
Write-Host "[RALPH] Project Root: $ProjectRoot"
Write-Host "[RALPH] Selected Tool: $Tool"
Write-Host "[RALPH] Max Iterations: $MaxIterations"
Write-Host "================================================================================"

if (-not (Test-Path $PrdPath)) {
    Write-Error "[ERROR] PRD file not found at: $PrdPath"
    exit 1
}

if (-not (Test-Path $PromptPath)) {
    Write-Error "[ERROR] Prompt file not found at: $PromptPath"
    exit 1
}

function Get-PendingStories {
    param ([string]$Path)
    $content = Get-Content -Path $Path -Raw | ConvertFrom-Json
    return @($content.userStories | Where-Object { -not $_.passes })
}

$pending = Get-PendingStories -Path $PrdPath
if ($pending.Count -eq 0) {
    Write-Host "[RALPH] All user stories in PRD are already marked as passing!" -ForegroundColor Green
    exit 0
}

Write-Host "[RALPH] Initial pending stories: $($pending.Count)" -ForegroundColor Yellow

for ($i = 1; $i -le $MaxIterations; $i++) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host ""
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "[RALPH] Iteration $i of $MaxIterations - $timestamp" -ForegroundColor Cyan
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray

    $pending = Get-PendingStories -Path $PrdPath
    if ($pending.Count -eq 0) {
        Write-Host ""
        Write-Host "================================================================================" -ForegroundColor Green
        Write-Host "[RALPH] SUCCESS: All user stories in PRD have passed!" -ForegroundColor Green
        Write-Host "================================================================================" -ForegroundColor Green
        exit 0
    }

    $currentStory = $pending[0]
    Write-Host "[RALPH] Targeting: $($currentStory.id) - $($currentStory.title)" -ForegroundColor Yellow

    $promptText = Get-Content -Path $PromptPath -Raw

    # Verify CLI availability
    $cliCmd = Get-Command $Tool -ErrorAction SilentlyContinue
    if (-not $cliCmd) {
        Write-Error "[ERROR] '$Tool' CLI command not found in PATH. Ensure $Tool is installed."
        exit 1
    }

    Write-Host "[RALPH] Invoking $Tool with prompt directive..." -ForegroundColor DarkCyan

    try {
        if ($Tool -eq "claude") {
            & claude --print $promptText 2>&1 | Tee-Object -FilePath $LogPath -Append
        } elseif ($Tool -eq "amp") {
            & amp run $promptText 2>&1 | Tee-Object -FilePath $LogPath -Append
        }
    } catch {
        Write-Warning "[RALPH] Tool invocation encountered an error: $_"
    }

    # Re-evaluate PRD after cycle
    $pendingAfter = Get-PendingStories -Path $PrdPath
    if ($pendingAfter.Count -eq 0) {
        Write-Host ""
        Write-Host "================================================================================" -ForegroundColor Green
        Write-Host "[RALPH] SUCCESS: All user stories completed after iteration $i!" -ForegroundColor Green
        Write-Host "================================================================================" -ForegroundColor Green
        exit 0
    }

    $completedCount = $pending.Count - $pendingAfter.Count
    if ($completedCount -gt 0) {
        Write-Host "[RALPH] Completed $completedCount story in this iteration." -ForegroundColor Green
    } else {
        Write-Host "[RALPH] Story still in progress or unverified." -ForegroundColor DarkYellow
    }

    Write-Host "[RALPH] Cooling down for 3 seconds..."
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "================================================================================" -ForegroundColor Yellow
Write-Host "[RALPH] WARNING: Reached max iteration limit ($MaxIterations). Check progress.txt." -ForegroundColor Yellow
Write-Host "================================================================================" -ForegroundColor Yellow
exit 1
