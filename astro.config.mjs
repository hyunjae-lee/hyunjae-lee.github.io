// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site: served from the domain root, so no `base` is needed.
  site: 'https://hyunjae-lee.github.io',
  // English is the default (served at root); Korean is served under /ko/.
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ko: 'ko' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
