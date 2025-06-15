
import { fetchPublishedArticles } from './blogService';

export const generateSitemap = async (baseUrl: string): Promise<string> => {
  const articles = await fetchPublishedArticles();
  
  const staticPages = [
    '',
    '/events',
    '/jobs', 
    '/blog',
    '/about'
  ];

  const staticUrls = staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  const articleUrls = articles.map(article => `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${articleUrls}
</urlset>`.trim();
};
