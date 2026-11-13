// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Small, dependency-free rehype pass for Markdown content:
 *  - images below the fold load lazily and decode off the main thread
 *    (modern-web-guidance: optimize-image-priority — article images are never the LCP);
 *  - tables are wrapped in a keyboard-scrollable, labelled region
 *    (modern-web-guidance: responsive-table).
 */
function rehypeModernContent() {
  return (/** @type {any} */ tree, /** @type {any} */ file) => {
    const fm = file?.data?.astro?.frontmatter ?? {};
    const path = String(file?.path ?? file?.history?.[0] ?? '');
    const ko = fm.lang === 'ko' || /projects-ko|[\\/]blog[\\/]/.test(path);
    const tableLabel = ko ? '표 (가로로 스크롤할 수 있음)' : 'Table (scrolls horizontally)';

    /** @param {any} node */
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((/** @type {any} */ child) => {
        if (child.type === 'element' && child.tagName === 'img') {
          child.properties = { loading: 'lazy', decoding: 'async', ...child.properties };
        }
        if (child.type === 'element' && child.tagName === 'table') {
          walk(child);
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-wrapper'], tabIndex: 0, role: 'region', ariaLabel: tableLabel },
            children: [child],
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}

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
  markdown: {
    rehypePlugins: [rehypeModernContent],
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
