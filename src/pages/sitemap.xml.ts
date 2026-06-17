import type { APIRoute } from 'astro';
import { getCms } from '../lib/cms';
import { unwrapCmsData } from '@aero-cms/astro-sdk';

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  const cms = getCms(request);
  const staticPaths = ['', '/haberler', '/etkinlikler', '/dokumanlar', '/iletisim', '/arama'];

  const urls: Array<{ loc: string; lastmod?: string; priority?: number }> = staticPaths.map((path) => ({
    loc: `${siteUrl}${path}`,
    priority: path === '' ? 1 : 0.7,
  }));

  try {
    const pages = unwrapCmsData(await cms.getSitemap());
    for (const item of pages) {
      const path = item.url.startsWith('/') ? item.url : `/${item.url}`;
      urls.push({
        loc: `${siteUrl}${path}`,
        lastmod: item.lastmod,
        priority: item.priority ?? 0.8,
      });
    }
  } catch {
    // static entries only
  }

  const body = urls
    .map((entry) => {
      const lastmod = entry.lastmod ? `<lastmod>${xmlEscape(entry.lastmod)}</lastmod>` : '';
      const priority = entry.priority != null ? `<priority>${entry.priority}</priority>` : '';
      return `<url><loc>${xmlEscape(entry.loc)}</loc>${lastmod}${priority}</url>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
