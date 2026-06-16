# AeroCMS Astro Starter

Astro starter website for Aero CMS using `@aero-cms/astro-sdk`. Public content API, component content schema sync, admin preview ve SEO (sitemap/robots) için başlangıç noktası.

## Gereksinimler

- Node.js 20+
- Çalışan AeroCMS API (`aero-cms-api`)

## Hızlı Başlangıç

```bash
cp .env.example .env
npm install
npm run dev
```

| Servis | Varsayılan URL |
|--------|----------------|
| Frontend | `http://localhost:3000` |
| API (yerel) | `http://localhost:5047` |
| Admin panel | `http://localhost:5173/admin/` |

`aero-cms-setup` kullanıyorsanız `FRONTEND_STACK=astro` ile `make setup` sonrası `.env` otomatik oluşturulur.

## Ortam Değişkenleri

```bash
ASTRO_CMS_API_URL=http://localhost:5047
PUBLIC_SITE_URL=http://localhost:3000
PUBLIC_ADMIN_ORIGIN=http://localhost:5173
# CMS_TOKEN=  # npm run cms:sync için admin JWT
```

## Sayfalar

| Rota | Açıklama |
|------|----------|
| `/` | Ana sayfa (component content) |
| `/haberler`, `/etkinlikler`, `/dokumanlar` | İçerik listeleri |
| `/iletisim` | CMS formu |
| `/arama` | Site içi arama |
| `/[slug]` | CMS sayfaları |
| `/sitemap.xml` | Build-time sitemap |
| `/robots.txt` | Arama motoru kuralları |

## Schema Sync

```bash
CMS_TOKEN=your_admin_jwt npm run cms:sync
```

Schema tanımları: `src/lib/schemas.ts`

## Preview

URL'de `?cms-preview=true` ile admin panelden canlı önizleme çalışır. `PUBLIC_ADMIN_ORIGIN` allowlist olarak kullanılır.

## Build ve Docker

```bash
npm run build
npm run preview
```

Statik çıktı `dist/` klasöründe üretilir.

```bash
docker build -t aero-cms-astro-starter .
docker run --rm -p 8080:80 aero-cms-astro-starter
```

Build argümanları: `ASTRO_CMS_API_URL`, `PUBLIC_SITE_URL`, `PUBLIC_ADMIN_ORIGIN`

## İlgili Repolar

- [aero-cms-api](https://github.com/aero-cms/aero-cms-api)
- [@aero-cms/astro-sdk](https://www.npmjs.com/package/@aero-cms/astro-sdk)
- [aero-cms-setup](https://github.com/aero-cms/aero-cms-setup)
