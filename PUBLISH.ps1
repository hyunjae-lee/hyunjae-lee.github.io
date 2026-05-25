$ErrorActionPreference = "Stop"

$Source = "C:\hyunjae\lab"
$Target = "C:\hyunjae\quartz-site\content"
$Repo = "C:\hyunjae\quartz-site"

Write-Host "Syncing Obsidian lab to Quartz content..."

robocopy $Source $Target /E /XD .obsidian .trash 90_Private /XF .DS_Store desktop.ini

if ($LASTEXITCODE -le 7) {
    $global:LASTEXITCODE = 0
} else {
    throw "Robocopy failed with exit code $LASTEXITCODE"
}

Set-Location $Repo

$Changes = git status --porcelain

if (-not $Changes) {
    Write-Host "No changes to publish."
    exit
}

$NewFiles = $Changes | Where-Object { $_ -match "^\?\?" } | ForEach-Object { $_.Substring(3) }
$ModifiedFiles = $Changes | Where-Object { $_ -match "^ M|^M |^MM" } | ForEach-Object { $_.Substring(3) }

$Summary = @()

if ($NewFiles) {
    $Summary += "add " + (($NewFiles | Select-Object -First 5) -join ", ")
}

if ($ModifiedFiles) {
    $Summary += "update " + (($ModifiedFiles | Select-Object -First 5) -join ", ")
}

if (-not $Summary) {
    $Summary += "update notes"
}

$CommitMessage = "publish: " + ($Summary -join "; ")

Write-Host "Commit message:"
Write-Host $CommitMessage

git add .
git commit -m $CommitMessage
git push

Write-Host "Published successfully."