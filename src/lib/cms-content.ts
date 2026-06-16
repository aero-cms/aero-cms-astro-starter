import type { CmsClient } from '@aero-cms/core';
import { unwrapCmsData } from '@aero-cms/astro-sdk';

type SchemaFields = Record<string, { default?: string | number | boolean }>;

export function getDefaults(schema: { fields: SchemaFields }): Record<string, string> {
  const defaults: Record<string, string> = {};
  for (const [key, field] of Object.entries(schema.fields)) {
    defaults[key] = String(field.default ?? '');
  }
  return defaults;
}

export async function getComponentContent(
  client: CmsClient,
  schema: { key: string; fields: SchemaFields },
  options?: { pageId?: string; lang?: string },
): Promise<Record<string, string>> {
  const defaults = getDefaults(schema);

  try {
    const data = await unwrapCmsData(await client.getComponentContent(schema.key, options));
    return { ...defaults, ...data };
  } catch {
    return defaults;
  }
}
