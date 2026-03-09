const fs = require('fs');
const path = require('path');

const domain = 'https://bh.advogados.emp.br';
const outDir = path.join(__dirname, '..');

// Basic institutional pages
const mainUrls = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/sobre', priority: '0.6', changefreq: 'monthly' },
    { url: '/contato', priority: '0.6', changefreq: 'monthly' },
    { url: '/termos', priority: '0.3', changefreq: 'monthly' },
    { url: '/privacidade', priority: '0.3', changefreq: 'monthly' },
    { url: '/cookies', priority: '0.3', changefreq: 'monthly' }
];

const blogUrls = [];
const bairrosUrls = [];

// Helper to scan directory and add clean URLs
function scanDir(subPath, targetArray, priority, changefreq) {
    const fullPath = path.join(outDir, subPath);
    if (fs.existsSync(fullPath)) {
        // Add the index of the directory itself
        if (fs.existsSync(path.join(fullPath, 'index.html'))) {
            targetArray.push({ url: `${subPath}/`, priority, changefreq });
        }

        // Add subdirectories (clean URLs)
        const items = fs.readdirSync(fullPath);
        items.forEach(item => {
            const itemPath = path.join(fullPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                // It's a page directory
                targetArray.push({ url: `${subPath}/${item}/`, priority, changefreq });
            }
        });
    }
}

// Helper to scan root-level service folders (pilares)
function scanRootFolders() {
    const items = fs.readdirSync(outDir);
    const skip = ['assets', 'scripts', 'node_modules', 'blog', 'bairros', 'script-gerador'];
    items.forEach(item => {
        const itemPath = path.join(outDir, item);
        if (fs.statSync(itemPath).isDirectory() && !skip.includes(item) && !item.startsWith('.')) {
            // Check if it has an index.html
            if (fs.existsSync(path.join(itemPath, 'index.html'))) {
                mainUrls.push({ url: `/${item}/`, priority: '0.8', changefreq: 'weekly' });
            }
        }
    });
}

// 1. Scan Clusters (Root folders like /prisao/, /inquerito/, etc.) go to Main
scanRootFolders();

// 2. Scan Blog -> goes to Blog
scanDir('/blog', blogUrls, '0.7', 'monthly');

// 3. Scan Bairros -> goes to Bairros
scanDir('/bairros', bairrosUrls, '0.6', 'monthly');

// Helper to generate the XML
const today = new Date().toISOString().split('T')[0];

function formatXML(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${domain}${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// Generate all XMLs
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), formatXML(mainUrls));
console.log(`✅ Sitemap Principal gerado em sitemap.xml com ${mainUrls.length} URLs!`);

fs.writeFileSync(path.join(outDir, 'sitemap_blog.xml'), formatXML(blogUrls));
console.log(`✅ Sitemap Blog gerado em sitemap_blog.xml com ${blogUrls.length} URLs!`);

fs.writeFileSync(path.join(outDir, 'sitemap_bairros.xml'), formatXML(bairrosUrls));
console.log(`✅ Sitemap Bairros gerado em sitemap_bairros.xml com ${bairrosUrls.length} URLs!`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Disallow: /assets/
Disallow: /scripts/
Disallow: /script-gerador/
Allow: /

Sitemap: ${domain}/sitemap.xml
Sitemap: ${domain}/sitemap_blog.xml
Sitemap: ${domain}/sitemap_bairros.xml
`;
fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt atualizado com 3 sitemaps!');
