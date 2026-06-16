import type { AstroCookies } from 'astro';

export const LANG_COOKIE = 'aero_lang';

export function getRequestLang(cookies: AstroCookies): string | undefined {
  const value = cookies.get(LANG_COOKIE)?.value;
  return value && value.length > 0 ? value : undefined;
}

export function cmsLangOptions(lang?: string) {
  return lang ? { lang } : undefined;
}

export function langQuery(lang?: string): string {
  return lang ? `?lang=${encodeURIComponent(lang)}` : '';
}
