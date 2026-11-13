import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://juwelier-fein.de',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: {
    '/produkte/silberschmuck': '/',
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|google[0-9a-f]+)(\.html)?$/.test(page),
      serialize(item) {
        item.url = item.url.replace(/\.html$/, '').replace(/\/index$/, '/');
        return item;
      },
    }),
  ],
});
