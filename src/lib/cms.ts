import { createCmsClient } from '@aero-cms/astro-sdk';

const baseUrl =
  import.meta.env.ASTRO_CMS_API_URL ??
  import.meta.env.PUBLIC_CMS_API_URL ??
  import.meta.env.CMS_API_URL ??
  'http://localhost:5047';

export const cms = createCmsClient({ baseUrl });
