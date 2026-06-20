$ErrorActionPreference = "Stop"

$Source = "C:\hyunjae\lab"
$Target = "C:\hyunjae\quartz-site\content"
$Repo = "C:\hyunjae\quartz-site"

Write-Host ""
Write-Host "Syncing Obsidian lab to Quartz content..."

robocopy $Source $Target /MIR `
  /XD .obsidian .trash "_templates" "90 #Private" `
  /XF .DS_Store desktop.ini

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

$NewFiles = $Changes |
Where-Object { $_ -match "^\?\?" } |
ForEach-Object { $_.Substring(3) }

$ModifiedFiles = $Changes |
Where-Object { $_ -match "^ M|^M |^MM" } |
ForEach-Object { $_.Substring(3) }

$DeletedFiles = $Changes |
Where-Object { $_ -match "^ D|^D " } |
ForEach-Object { $_.Substring(3) }

$RenamedFiles = $Changes |
Where-Object { $_ -match "^R" } |
ForEach-Object { $_.Substring(3) }

$Summary = @()

if ($NewFiles) {
    $Summary += "add " + (($NewFiles | Select-Object -First 5) -join ", ")
}

if ($ModifiedFiles) {
    $Summary += "update " + (($ModifiedFiles | Select-Object -First 5) -join ", ")
}

if ($DeletedFiles) {
    $Summary += "delete " + (($DeletedFiles | Select-Object -First 5) -join ", ")
}

if ($RenamedFiles) {
    $Summary += "rename " + (($RenamedFiles | Select-Object -First 3) -join ", ")
}

if (-not $Summary) {
    $Summary += "update notes"
}

$CommitMessage = "publish: " + ($Summary -join "; ")

Write-Host ""
Write-Host "Commit message:"
Write-Host $CommitMessage
Write-Host ""

git add content
git add quartz.config.ts quartz.layout.ts quartz/styles
git commit -m $CommitMessage
git push

Write-Host ""
Write-Host "Published successfully."