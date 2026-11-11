import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://juwelier-fein.de',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: {
    '/produkte/silberschmuck': '/',
  },
  integrations: [sitemap()],
});
