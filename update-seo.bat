@echo off
echo 🚀 Updating SEO for LakeHouse website...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Run the SEO generator
node seo-generator.js

echo.
echo ✅ SEO update complete!
echo 📋 Remember to:
echo    1. Update your domain in seo-generator.js
echo    2. Submit sitemap.xml to Google Search Console
echo    3. Run this script whenever you add new pages
echo.
pause 