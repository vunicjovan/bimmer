# Allow script execution for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Check if Scoop is already installed - if not, install it
if (Get-Command scoop -ErrorAction SilentlyContinue) {
    Write-Host "Scoop is already installed." -ForegroundColor Green
}
else {
    Write-Host "Installing Scoop..." -ForegroundColor Yellow
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
}

# Ensure Scoop is available for Just installation
if (-not (Get-Command scoop -ErrorAction SilentlyContinue)) {
    Write-Error "Scoop is not installed. Cannot install Just."
    exit 1
}

# Install Just if it's not installed already
if (Get-Command just -ErrorAction SilentlyContinue) {
    Write-Host "Just is already installed." -ForegroundColor Green
}
else {
    Write-Host "Installing Just..." -ForegroundColor Yellow
    scoop install just
    Write-Host "Just installation completed." -ForegroundColor Green
}

# Ensure VS Code CLI is available
if (-not (Get-Command code -ErrorAction SilentlyContinue)) {
    Write-Error "VS Code CLI ('code') not found. Make sure VS Code is installed and 'code' is in PATH."
    exit 1
}

# Path to the file with list of VSC extensions
$extensions = Get-Content "vscode-extensions.txt"

# Install the listed VSC extensions
foreach ($ext in $extensions) {
    Write-Host "Installing VS Code extension: $ext" -ForegroundColor Yellow
    code --install-extension $ext --force
}

Write-Host "VS Code extensions installation completed." -ForegroundColor Green
