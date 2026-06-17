import { cmsFromEnv, cmsFromRequest } from '@aero-cms/astro-sdk';

/** Request-scoped client with host-based site resolution (SSR). */
export function getCms(request?: Request) {
  if (request) return cmsFromRequest(request, import.meta.env);
  return cmsFromEnv(import.meta.env);
}

/** Env-only client (e.g. build-time scripts). */
export const cms = cmsFromEnv(import.meta.env);
