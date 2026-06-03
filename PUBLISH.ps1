$ErrorActionPreference = "Stop"

# ========================
# PATHS
# ========================

$Source = "C:\hyunjae\lab"
$Target = "C:\hyunjae\quartz-site\content"
$Repo = "C:\hyunjae\quartz-site"

# ========================
# SYNC
# ========================

Write-Host ""
Write-Host "========================="
Write-Host " Syncing Obsidian Vault "
Write-Host "========================="
Write-Host ""

robocopy $Source $Target /E `
  /XD .obsidian .trash "90 #Private" `
  /XF .DS_Store desktop.ini

# robocopy exit code handling
if ($LASTEXITCODE -le 7) {
    $global:LASTEXITCODE = 0
} else {
    throw "Robocopy failed with exit code $LASTEXITCODE"
}

# ========================
# GIT
# ========================

Set-Location $Repo

Write-Host ""
Write-Host "========================="
Write-Host " Git Status "
Write-Host "========================="
Write-Host ""

git status --short

$Changes = git status --porcelain

if (-not $Changes) {
    Write-Host ""
    Write-Host "No changes to publish."
    exit
}

# ========================
# COMMIT MESSAGE
# ========================

$NewFiles = $Changes |
Where-Object { $_ -match "^\?\?" } |
ForEach-Object { $_.Substring(3) }

$ModifiedFiles = $Changes |
Where-Object { $_ -match "^ M|^M |^MM" } |
ForEach-Object { $_.Substring(3) }

$DeletedFiles = $Changes |
Where-Object { $_ -match "^ D|^D " } |
ForEach-Object { $_.Substring(3) }

$Summary = @()

if ($NewFiles) {
    $Summary += "add " + (($NewFiles | Select-Object -First 5) -join ", ")
}

if ($ModifiedFiles) {
    $Summary += "update " + (($ModifiedFiles | Select-Object -First 5) -join ", ")
}

if ($DeletedFiles) {
    $Summary += "delete " + (($DeletedFiles | Select-Object -First 3) -join ", ")
}

if (-not $Summary) {
    $Summary += "update notes"
}

$CommitMessage = "publish: " + ($Summary -join "; ")

Write-Host ""
Write-Host "========================="
Write-Host " Commit Message "
Write-Host "========================="
Write-Host ""

Write-Host $CommitMessage

# ========================
# GIT ADD
# ========================

git add content quartz.config.ts quartz.layout.ts quartz/styles

# ========================
# COMMIT & PUSH
# ========================

git commit -m $CommitMessage
git push

Write-Host ""
Write-Host "========================="
Write-Host " Published Successfully "
Write-Host "========================="
Write-Host ""