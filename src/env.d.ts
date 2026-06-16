/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ASTRO_CMS_API_URL?: string;
  readonly PUBLIC_CMS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
