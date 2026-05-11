# AGENTS.md — Copperlane (Lexington Themes)

**Copperlane** is a multi-section marketing site for an **automotive service / shop** brand: services, service packages, customer stories, team, careers, blog, FAQ, contact, and book-appointment flows. Primary use case is **local business marketing and lead generation** (not a SaaS app shell).

**Publisher:** [Lexington Themes](https://lexingtonthemes.com/) — theme-specific links follow the [README](./README.md) pattern ([theme specs](https://lexingtonthemes.com/templates/copperlane), [documentation](https://lexingtonthemes.com/documentation), [changelog](https://lexingtonthemes.com/changelog/copperlane), [support](https://lexingtonthemes.com/legal/support/), [get the bundle](https://lexingtonthemes.com)).

## Tech stack

| Area | Detail |
|------|--------|
| **Framework** | Astro `^6.0.8` (`package.json`) |
| **Styling** | Tailwind CSS `^4.2.2` via `@tailwindcss/vite`; plugins in `src/styles/global.css`: `@tailwindcss/typography`, `@tailwindcss/forms`, `tailwind-scrollbar-hide` |
| **Content / MDX** | `@astrojs/mdx` `^5.0.2` |
| **RSS** | `@astrojs/rss` `^4.0.17` (`src/pages/rss.xml.js`; not registered as an `integration` in `astro.config.mjs`) |
| **Sitemap** | `@astrojs/sitemap` `^3.7.1` |
| **Lexington** | `@lexingtonthemes/seo` `^0.1.0` — [`AstroSeo`](https://www.npmjs.com/package/@lexingtonthemes/seo) in `src/components/fundations/head/Seo.astro` |
| **Config** | `astro.config.mjs`: `site: "https://yourwebsite.com"`, Vite plugin + integrations `[tailwindcss(), sitemap(), mdx()]` |
| **Aliases** | `tsconfig.json`: `@/*` → `src/*` |

No other `@lexingtonthemes/*` packages appear in `package.json`.

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes: home, about, FAQ, contact, apply, book-appointment, blog, services, packages, jobs, team, customers, legal, system design pages, `404.astro`, `rss.xml.js` |
| `src/layouts/` | `BaseLayout.astro`, plus `BlogLayout`, `ServicesLayout`, `PackageLayout`, `JobsLayout`, `TeamLayout`, `CustomersLayout`, `LegalLayout` |
| `src/components/` | `global/` (Navigation, Footer, Search, menus), `landing/`, feature folders (`blog/`, `services/`, …), `fundations/` (head, elements, containers, icons, scripts), `assets/` (Logo) |
| `src/content/` | Markdown per collection: `posts/`, `services/`, `packages/`, `jobs/`, `team/`, `customers/`, `legal/` |
| `src/styles/` | `global.css` — Tailwind entry, `@theme` tokens (fonts, accent/base colors, shadows) |
| `src/images/` | Images referenced from frontmatter (`image.url` paths like `/src/images/...`) — organized in subfolders (`blog/`, `services/`, `team/`, `customers/`, `assets/`, …) |
| `public/` | Currently **`public/videos/`** (e.g. `car1.mp4` … `car4.mp4`). `Favicons.astro` links to root favicon paths (`/favicon.ico`, etc.) — those files are **not** in this repo snapshot; add under `public/` when shipping. |

There is **no** dedicated changelog content collection in this repo (changelog lives on Lexington’s site per README).

## Content collections (`src/content.config.ts`)

Loader pattern for all: `glob({ pattern: "**/*.md", base: "./src/content/<folder>" })`. Slugs for routes use **`entry.id`** (stem of the `.md` filename, e.g. `privacy.md` → `privacy`).

### `team` → `src/content/team/`

- **Required:** `name` (string), `image: { url: image(), alt: string }`
- **Optional:** `role`, `bio`, `socials: { twitter?, email?, linkedin?, website? }`
- **Images:** `image.url` must satisfy Astro’s `image()` helper (local paths such as `/src/images/team/...` as in existing entries).
- **Template:** copy from `src/content/team/david-lee.md`.

### `posts` → `src/content/posts/`

- **Required:** `title`, `pubDate` (coerced date), `description`, `image: { url: image(), alt: string }`, `tags` (string array)
- **Optional:** `isFeatured` (boolean, default `false`)
- **Images:** same `image()` pattern; e.g. `src/content/posts/1.md` uses `/src/images/blog/...`.
- **Template:** copy from `src/content/posts/1.md`.

### `legal` → `src/content/legal/`

- **Required:** `page` (string), `pubDate` (coerced date)
- **Images:** none in schema.
- **Template:** copy from `src/content/legal/privacy.md`.

### `services` → `src/content/services/`

- **Required:** `title`, `shortDescription`, `description`
- **Optional:** `category`, `image: { url: image(), alt }`, `priceFrom`, `duration`, `isFeatured` (default `false`)
- **Template:** copy from `src/content/services/oil-change.md`.

### `jobs` → `src/content/jobs/`

- **Required:** `title`, `department`, `location`, `type` (`"Full-Time" \| "Part-Time" \| "Contract" \| "Internship"`), `description`, `responsibilities` (string array), `requirements` (string array), `postedDate` (coerced date)
- **Optional:** `salary`, `applyUrl`
- **Images:** none in schema.
- **Template:** copy from `src/content/jobs/automotive-technician.md`.

### `packages` → `src/content/packages/`

- **Required:** `title`, `description`, `includedServices` (string array), `price`
- **Optional:** `duration`, `isFeatured` (default `false`)
- **Images:** none in schema. `includedServices` entries align with service entry **ids** where linked (e.g. `"oil-change"` in `winter-safety-package.md`).
- **Template:** copy from `src/content/packages/winter-safety-package.md`.

### `customers` → `src/content/customers/`

- **Required:** `name`
- **Optional:** `type` (`"Individual" \| "Business"`), `image: { url: image(), alt }`, `quote`, `serviceUsed`, `vehicle`, `location`
- **Template:** copy from `src/content/customers/laura-smith.md`.

## Routing conventions

| URL pattern | Source |
|-------------|--------|
| `/` | `src/pages/index.astro` |
| `/about`, `/faq`, `/contact`, `/apply`, `/book-appointment` | matching `.astro` files in `src/pages/` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/posts/[...slug]` | `src/pages/blog/posts/[...slug].astro` — slug = `posts` collection `entry.id` |
| `/blog/tags`, `/blog/tags/[tag]` | `src/pages/blog/tags/index.astro`, `[tag].astro` (`tag` is the raw tag string from frontmatter) |
| `/services`, `/services/[...slug]` | index + `src/pages/services/[...slug].astro` |
| `/packages`, `/packages/[...slug]` | index + dynamic slug |
| `/jobs`, `/jobs/[...slug]` | index + dynamic slug |
| `/team`, `/team/[...slug]` | index + dynamic slug |
| `/customers`, `/customers/[...slug]` | index + dynamic slug |
| `/legal/[...slug]` | `src/pages/legal/[...slug].astro` |
| `/system/*` | design system pages (`overview`, `colors`, `typography`, `buttons`, `link`) |
| `/404` | `src/pages/404.astro` |
| `/rss.xml` | `src/pages/rss.xml.js` — glob is `./blog/*.{md,mdx}` relative to `src/pages/`; **no such files exist** in-repo (posts live in `src/content/posts/`). Adjust if you need a working feed. |

Dynamic routes use `getCollection(...)` and `render()` from `astro:content`; several set `trailingSlash: false` in `getStaticPaths`.

## Customization guide

- **Site URL / canonical:** set `site` in `astro.config.mjs` (currently `https://yourwebsite.com`). Replace placeholder URLs in `src/components/fundations/head/Seo.astro` (`AstroSeo` props are placeholders today).
- **Brand colors / typography:** `src/styles/global.css` — `@theme` block (`--font-display`, `--font-sans`, `--color-accent-*`, `--color-base-*`, shadows). Google Fonts / Inter links: `src/components/fundations/head/Fonts.astro`.
- **Navigation / footer:** `src/components/global/Navigation.astro`, `Footer.astro` (and `MegaMenu.astro` / `MobileMenu.astro` as needed).
- **Global chrome:** `src/layouts/BaseLayout.astro` imports `global.css`, `BaseHead`, `Navigation`, `Footer`, `Search`; supports `hideNavigation` / `hideFooter` props.
- **Head stack:** `src/components/fundations/head/BaseHead.astro` composes `Seo`, `Meta`, `Fonts`, `Favicons`, `FuseJS` script.

## Commands

From [README](./README.md): `npm install`, `npm run dev`, `npm run build`, `npm run preview`, `npm run astro ...`, `npm run astro --help`. **Requirements:** Node 18 or 20 (LTS), npm.

## Guardrails

1. **Do not rename** `src/components/fundations/` — the folder spelling **`fundations`** is intentional across imports.
2. **Do not widen** Zod schemas in `src/content.config.ts` without updating every layout/page that reads `entry.data` / frontmatter.
3. **Preserve `image()` fields** — paths must stay compatible with Astro assets / content image pipeline where used.
4. Keep edits **minimal** and consistent with existing patterns (collection + layout + page trio).
5. Changing **`astro.config.mjs`** `site` **and** SEO canonical URLs should stay in sync for production.

---

*Generated for the **Copperlane** repository only; verify paths after refactors.*
