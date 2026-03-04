const fs = require('fs');
const path = require('path');

const domain = 'https://bh.advogados.emp.br';
const outDir = path.join(__dirname, '..');

// Basic institutional pages
const sitemapUrls = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/sobre', priority: '0.6', changefreq: 'monthly' },
    { url: '/contato', priority: '0.6', changefreq: 'monthly' },
    { url: '/termos', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacidade', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' }
];

// Helper to scan directory and add clean URLs
function scanDir(subPath, priority, changefreq) {
    const fullPath = path.join(outDir, subPath);
    if (fs.existsSync(fullPath)) {
        // Add the index of the directory itself
        if (fs.existsSync(path.join(fullPath, 'index.html'))) {
            sitemapUrls.push({ url: `${subPath}/`, priority, changefreq });
        }

        // Add subdirectories (clean URLs)
        const items = fs.readdirSync(fullPath);
        items.forEach(item => {
            const itemPath = path.join(fullPath, item);
            if (fs.statSync(itemPath).isDirectory()) {
                // It's a page directory
                sitemapUrls.push({ url: `${subPath}/${item}/`, priority, changefreq });
            }
        });
    }
}

// Helper to scan root-level service folders (pilares)
function scanRootFolders() {
    const items = fs.readdirSync(outDir);
    const skip = ['assets', 'scripts', 'node_modules', 'blog', 'bairros'];
    items.forEach(item => {
        const itemPath = path.join(outDir, item);
        if (fs.statSync(itemPath).isDirectory() && !skip.includes(item) && !item.startsWith('.')) {
            // Check if it has an index.html
            if (fs.existsSync(path.join(itemPath, 'index.html'))) {
                sitemapUrls.push({ url: `/${item}/`, priority: '0.8', changefreq: 'weekly' });
            }
        }
    });
}

// 1. Scan Clusters (Root folders like /prisao/, /inquerito/, etc.)
scanRootFolders();

// 1. Scan Blog
scanDir('/blog', '0.7', 'monthly');

// 2. Scan Bairros
scanDir('/bairros', '0.6', 'monthly');

// Generate XML
const today = new Date().toISOString().split('T')[0];

const xmlTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(item => `  <url>
    <loc>${domain}${item.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xmlTemplate);
console.log(`✅ Sitemap SEO Avançado gerado em sitemap.xml com ${sitemapUrls.length} URLs e tags Changefreq!`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Disallow: /assets/
Disallow: /scripts/
Allow: /

Sitemap: ${domain}/sitemap.xml
`;
fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt gerado com sucesso!');
