@echo off
echo Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo Git is not installed or not in your PATH. Please install Git first.
    pause
    exit /b
)

echo Adding files...
git add .

echo Committing files...
git commit -m "Initial commit for NeonFocus Todo App"

echo.
echo ========================================================
echo Local repository setup complete!
echo.
echo NEXT STEPS:
echo 1. Go to https://github.com/new and create a repository.
echo 2. Copy the URL (e.g., https://github.com/YourUser/YourRepo.git).
echo 3. Run the following commands in your terminal:
echo    git remote add origin YOUR_REPO_URL
echo    git branch -M main
echo    git push -u origin main
echo ========================================================
pause
