# Simple LakeHouse SEO Updater
param([string]$Domain = "https://your-domain.com")

Write-Host "🚀 Starting LakeHouse SEO Update..." -ForegroundColor Green

# Configuration
$siteName = "LakeHouse"
$defaultDescription = "Rhino plugin for architects with powerful automation tools"
$defaultKeywords = "Rhino plugin, architecture software, area takeoff, object management"

# Find all HTML files
$htmlFiles = Get-ChildItem -Filter "*.html" | Select-Object -ExpandProperty Name
Write-Host "📁 Found $($htmlFiles.Count) HTML files" -ForegroundColor Cyan

# Generate sitemap
$currentDate = Get-Date -Format "yyyy-MM-dd"
$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"@

foreach ($file in $htmlFiles) {
    $sitemap += @"

    <url>
        <loc>$Domain/$file</loc>
        <lastmod>$currentDate</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>"
}

$sitemap += @"

</urlset>"

Set-Content "sitemap.xml" $sitemap -Encoding UTF8
Write-Host "✅ Generated sitemap.xml" -ForegroundColor Green

# Update robots.txt
$robotsContent = @"
User-agent: *
Allow: /

# Sitemap location
Sitemap: $Domain/sitemap.xml
"@

Set-Content "robots.txt" $robotsContent -Encoding UTF8
Write-Host "✅ Updated robots.txt" -ForegroundColor Green

Write-Host ""
Write-Host "✅ SEO update complete!" -ForegroundColor Green
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update domain: $Domain" -ForegroundColor White
Write-Host "   2. Submit sitemap.xml to Google Search Console" -ForegroundColor White
Write-Host ""
Write-Host "💡 Usage: .\simple-seo-updater.ps1 -Domain 'https://your-actual-domain.com'" -ForegroundColor Yellow 