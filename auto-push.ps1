# Auto-push script for School Website
# This script will automatically push changes to GitHub at regular intervals

while ($true) {
    # Get current timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Add all changes
    git add .
    
    # Check if there are changes to commit
    $status = git status --porcelain
    
    if ($status) {
        # Commit changes with timestamp
        git commit -m "Auto-update: $timestamp"
        
        # Push to GitHub
        git push origin feature/add-pages
        
        Write-Host "Changes pushed to GitHub at $timestamp" -ForegroundColor Green
    } else {
        Write-Host "No changes to commit at $timestamp" -ForegroundColor Yellow
    }
    
    # Wait for 15 minutes before next push
    Write-Host "Waiting for 15 minutes before next check..."
    Start-Sleep -Seconds 900
}
