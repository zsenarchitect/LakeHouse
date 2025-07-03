const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    domain: 'https://your-domain.com', // Replace with your actual domain
    siteName: 'LakeHouse',
    defaultDescription: 'Rhino plugin for architects with powerful automation tools',
    defaultKeywords: 'Rhino plugin, architecture software, area takeoff, object management',
    author: 'LakeHouse'
};

// Page configurations with custom SEO data
const pageConfigs = {
    'index.html': {
        title: 'LakeHouse - Rhino Plugin for Architects | Area Takeoff, Object Management & More',
        description: 'LakeHouse Rhino plugin for architects. Features include Area Takeoff, Object Manager, Content Merger, Layer Color Randomizer, and Random Select. No Grasshopper skills required.',
        keywords: 'Rhino plugin, architecture software, area takeoff, object management, layer management, architectural tools, Rhino 8, Grasshopper alternative, architectural automation',
        priority: 1.0,
        changefreq: 'weekly'
    },
    'feature.html': {
        title: 'LakeHouse Features - Area Takeoff, Object Manager, Content Merger & More',
        description: 'Explore LakeHouse Rhino plugin features: Area Takeoff for live calculations, Object Manager for batch transformations, Content Merger for layer/material cleanup, Layer Color Randomizer, and Random Select.',
        keywords: 'Rhino features, area takeoff, object manager, content merger, layer color randomizer, random select, architectural tools',
        priority: 0.9,
        changefreq: 'monthly'
    },
    'contact.html': {
        title: 'Contact LakeHouse - Get Support for Rhino Plugin',
        description: 'Contact LakeHouse for support, questions, or feedback about our Rhino plugin for architects. Get help with Area Takeoff, Object Manager, and other features.',
        keywords: 'contact LakeHouse, Rhino plugin support, architectural software help',
        priority: 0.7,
        changefreq: 'monthly'
    }
};

// Function to generate meta tags for a page
function generateMetaTags(pageName, config) {
    const pageConfig = pageConfigs[pageName] || {
        title: `${config.siteName} - ${pageName.replace('.html', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        description: config.defaultDescription,
        keywords: config.defaultKeywords,
        priority: 0.8,
        changefreq: 'monthly'
    };

    return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageConfig.title}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="${pageConfig.description}">
    <meta name="keywords" content="${pageConfig.keywords}">
    <meta name="author" content="${config.author}">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="${pageConfig.title}">
    <meta property="og:description" content="${pageConfig.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${config.domain}/${pageName}">
    <meta property="og:image" content="${config.domain}/asset/main_icon.svg">
    <meta property="og:site_name" content="${config.siteName}">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageConfig.title}">
    <meta name="twitter:description" content="${pageConfig.description}">
    <meta name="twitter:image" content="${config.domain}/asset/main_icon.svg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${config.domain}/${pageName}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="asset/main_icon.svg">
    <link rel="apple-touch-icon" href="asset/main_icon.svg">`;
}

// Function to update HTML file with new meta tags
function updateHTMLFile(filePath, newMetaTags) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find and replace the meta section
        const metaStart = content.indexOf('<meta charset="UTF-8">');
        const headEnd = content.indexOf('</head>');
        
        if (metaStart !== -1 && headEnd !== -1) {
            const beforeMeta = content.substring(0, metaStart);
            const afterHead = content.substring(headEnd);
            content = beforeMeta + newMetaTags + '\n    ' + afterHead;
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${filePath}`);
            return true;
        } else {
            console.log(`⚠️  Could not find meta tags in ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Function to generate sitemap
function generateSitemap() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    htmlFiles.forEach(file => {
        const pageConfig = pageConfigs[file] || {
            priority: 0.8,
            changefreq: 'monthly'
        };
        
        sitemap += `
    <url>
        <loc>${config.domain}/${file}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${pageConfig.changefreq}</changefreq>
        <priority>${pageConfig.priority}</priority>
    </url>`;
    });
    
    sitemap += `
</urlset>`;
    
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✅ Generated sitemap.xml');
}

// Function to update robots.txt
function updateRobotsTxt() {
    const robotsContent = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${config.domain}/sitemap.xml

# Disallow any private or admin areas (if you add them later)
# Disallow: /admin/
# Disallow: /private/`;
    
    fs.writeFileSync('robots.txt', robotsContent);
    console.log('✅ Updated robots.txt');
}

// Main function
function updateSEO() {
    console.log('🚀 Starting SEO update...\n');
    
    // Update domain in config if needed
    if (config.domain === 'https://your-domain.com') {
        console.log('⚠️  Please update the domain in seo-generator.js config section');
        console.log('   Current domain: https://your-domain.com\n');
    }
    
    // Find all HTML files
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    console.log(`📁 Found ${htmlFiles.length} HTML files: ${htmlFiles.join(', ')}\n`);
    
    // Update each HTML file
    let updatedCount = 0;
    htmlFiles.forEach(file => {
        const newMetaTags = generateMetaTags(file, config);
        if (updateHTMLFile(file, newMetaTags)) {
            updatedCount++;
        }
    });
    
    // Generate sitemap and robots.txt
    generateSitemap();
    updateRobotsTxt();
    
    console.log(`\n✅ SEO update complete! Updated ${updatedCount}/${htmlFiles.length} files`);
    console.log('📋 Next steps:');
    console.log('   1. Update the domain in seo-generator.js if needed');
    console.log('   2. Run this script whenever you add new pages');
    console.log('   3. Submit sitemap.xml to Google Search Console');
}

// Run the script
if (require.main === module) {
    updateSEO();
}

module.exports = { updateSEO, generateMetaTags, generateSitemap }; 