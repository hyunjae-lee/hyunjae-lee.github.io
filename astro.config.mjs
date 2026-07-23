// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site: served from the domain root, so no `base` is needed.
  site: 'https://hyunjae-lee.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
