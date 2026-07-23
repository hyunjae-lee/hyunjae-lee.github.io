# hyunjae-lee.github.io

Personal resume & portfolio — a minimal static site built with **Astro + Tailwind CSS**,
deployed to GitHub Pages.

**Live:** <https://hyunjae-lee.github.io>

## Requirements

- **Node.js 18.20+ / 20.3+ / 22+** (LTS recommended)
- npm (bundled with Node)

## Local development

```bash
npm install      # first time only
npm run dev      # http://localhost:4321
```

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Structure

```text
src/
├─ config.ts              # ← edit here: name, links, and the whole resume
├─ layouts/BaseLayout.astro
├─ components/            # Header, Footer, ThemeToggle, ProjectCard
├─ pages/
│  ├─ index.astro         # the resume (Home)
│  ├─ 404.astro
│  └─ projects/           # list + [slug] detail, generated from content
├─ content/
│  ├─ projects/           # one Markdown file per project
│  └─ blog/               # reserved for a future blog
└─ styles/global.css      # Tailwind, dark mode, and print styles
public/                   # favicon, og.png, robots.txt
scripts/gen-og.mjs        # regenerate the social share image
```

## Editing content

- **Resume** (summary, experience, education, skills, certifications, languages,
  honors, publications) → [`src/config.ts`](src/config.ts), in the `resume` object.
- **Name, links, nav** → also `src/config.ts`.

## Adding a project

Each project is a Markdown file in `src/content/projects/`.

1. Copy [`_template.md`](src/content/projects/_template.md) to `my-project.md`.
2. Fill in the frontmatter and body.
3. Set `draft: false` to publish; `featured: true` also surfaces it on the home page.

Projects are sorted by **`date`, newest first** — give a project the most recent date
to keep it at the top.

## Print / PDF

The home page has a print stylesheet: **Cmd/Ctrl + P → Save as PDF** produces a clean,
light-themed resume with the site chrome removed.

## Social share image

`public/og.png` is used for link previews. To regenerate after changing text:

```bash
node scripts/gen-og.mjs
```

## Dark mode

Toggle in the header; the choice is saved to `localStorage`, and first visit follows the
OS setting (`prefers-color-scheme`). Printing always uses the light theme.

## Deployment (GitHub Pages)

Pushing to `main` triggers GitHub Actions to build and deploy automatically
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). Pages **Source** is set
to **GitHub Actions**.
