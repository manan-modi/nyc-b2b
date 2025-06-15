
import { useEffect, useState } from 'react';
import { generateSitemap } from '@/lib/sitemapGenerator';

const SitemapPage = () => {
  const [sitemap, setSitemap] = useState<string>('');

  useEffect(() => {
    const loadSitemap = async () => {
      try {
        const baseUrl = window.location.origin;
        const sitemapXml = await generateSitemap(baseUrl);
        setSitemap(sitemapXml);
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
      }
    };

    loadSitemap();
  }, []);

  useEffect(() => {
    if (sitemap) {
      // Set the response content type to XML
      const blob = new Blob([sitemap], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link to download/view the XML
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      
      // Replace the page content with the XML
      document.body.innerHTML = `<pre style="font-family: monospace; white-space: pre-wrap; margin: 20px;">${sitemap}</pre>`;
    }
  }, [sitemap]);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      {sitemap ? (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{sitemap}</pre>
      ) : (
        <p>Generating sitemap...</p>
      )}
    </div>
  );
};

export default SitemapPage;
