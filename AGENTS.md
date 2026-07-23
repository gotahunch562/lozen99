# AGENTS.md — Lozen Advisory Website

This repository is the production website for Lozen Advisory.

Production site: https://www.lozenadvisory.com

This is no longer a generic Copperlane automotive-theme project. Some inherited component names and package metadata remain, but future work should treat the codebase as a Lozen Advisory Astro site.

## Required workflow

Use pnpm through Corepack.

```bash
corepack enable
corepack pnpm install
corepack pnpm run build
```

Do not use npm.

Do not create or restore:

```text
package-lock.json
```

Keep:

```text
pnpm-lock.yaml
pnpm-workspace.yaml
```

Do not commit:

```text
node_modules/
.astro/
.vercel/
dist/
.DS_Store
```

Before committing code, content schema, route, navigation, layout, or styling changes, run:

```bash
corepack pnpm run build
```

## Stack

- Astro 6
- Tailwind CSS 4
- `@astrojs/vercel`
- `@astrojs/sitemap`
- `@astrojs/mdx`
- `@astrojs/rss`
- `@lexingtonthemes/seo`
- Node 22.x
- pnpm through Corepack

## Vercel settings

Use these settings on Vercel:

```text
Install Command: corepack pnpm install
Build Command: corepack pnpm run build
Output Directory: dist
Node.js Version: 22.x
```

## Content preservation rule

Do not rewrite, paraphrase, summarize, improve, or otherwise alter Lozen Advisory article copy, service copy, press copy, page prose, or user-supplied descriptions unless the user explicitly asks for copy changes.

For site/code work, preserve supplied content verbatim. Limit changes to structure, routing, styling, schema, metadata fields, or component implementation unless copy editing is explicitly requested.

When frontmatter is needed, add only technical wrapper fields. Do not invent visible article descriptions unless the user asks.

## File replacement rule

When providing implementation changes, prefer complete replacement files or complete terminal commands that make the intended change. Do not provide isolated snippets as the final implementation instruction.

## Core public routes

Important active routes include:

```text
/
 /services
 /booking
 /request-briefing
 /blog
 /blog/archive
 /news-press
 /news-press/menopause-market-correction
 /menopause-legislation-tracker
 /retention-calculator
 /tools-resources
 /invisible-attrition
 /invisible-attrition/
 /events
 /about
 /about-ai
 /faq
 /contact
 /privacy-policy
 /terms-of-service
 /women-lawyers-conference
```

The `/women-lawyers-conference` route is an intentional QR-code landing page and does not need to be included in main navigation.

## CTA routing rules

Use `/request-briefing` for Request Briefing CTAs.

Use `/booking` for MAPS Blueprint℠ and private-session payment-flow references.

Do not automatically convert `/booking` links to `/request-briefing`.

General public contact email:

```text
hello@lozenadvisory.com
```

Press/media email:

```text
media@lozenadvisory.com
```

Use the media address only for press, media, and news contexts.

## Blog architecture

Blog content lives in:

```text
src/content/posts/
```

The visible blog category system is curated. It is not an automatic tag cloud.

Active blog categories are:

```text
Legal Profession
Legislative Analysis
Performance & Career
Research & Policy
The Tender Path
Disclosure Independence
CFO Resources
Corporate Boards
```

Category display is controlled in:

```text
src/pages/blog/index.astro
src/pages/blog/archive.astro
```

Pages CMS category options are controlled in:

```text
.pages.yml
```

Tags are secondary metadata. Do not let old or internal tags such as Disclosure Day, Workplace Disclosure, or Invisible Attrition become the primary public category structure.

## Executive Report Series

The Executive Report Series is four reports plus a hub.

Hub:

```text
/invisible-attrition/
```

Reports:

```text
/menopause-and-the-law/
/blog/aba-study-women-lawyers-mental-health/
/retention-risk-analysis/
/retention-risk-analysis/
```

Do not describe the report series as five-part unless the actual public series structure changes.

## Menopause legislation tracker

Route:

```text
/menopause-legislation-tracker
```

When tracker records are updated, also update the visible “Last updated” date and any related structured-data `dateModified` value.

The tracker is a flagship public data asset. Prioritize desktop clarity while keeping mobile from breaking.

## Downloads

Public downloads live in:

```text
public/download/
```

Known filenames:

```text
Lozen_PowerUserTrap_Brief.pdf
Lozen_Tacere_Brief.pdf
performance-protection-handout.pdf
symptom-literacy-checklist.pdf
```

Preserve exact filenames unless intentionally changed.

## Design system

Primary visual direction:

- Institutional navy base
- Yellow accent/CTA system
- Tenor Sans for display
- DM Sans for body, navigation, UI, and forms
- Restrained uppercase only for metadata labels and eyebrows
- Page titles and section headings should not be forced uppercase

Global styles live in:

```text
src/styles/global.css
```

Do not redesign flagship pages unless requested. Prefer small, systematic fixes through shared components and global tokens.

## Navigation notes

Main navigation and menus should make active public pages reachable without turning the mega menu into a sitemap.

Blog and News & Press belong in main navigation.

MAPS Blueprint belongs in main navigation.

The mega menu should not duplicate every main-nav item.

## Lozen Advisory positioning notes

Lozen Advisory’s core site frame is a governance and measurement problem: what organizations cannot see because the data was never created.

The menopause-at-work and AI-governance connection is methodological, not topical. The shared issue is disclosure-dependent data and structurally incomplete measurement.

Avoid reducing the firm’s positioning to wellness, awareness, benefits education, or generic menopause support.

Use business-facing language around:

```text
measurement failure
disclosure dependence
benefits utilization
succession risk
leadership pipeline risk
retention analytics
board-facing accountability
AI workforce data incompleteness
```

## Build verification

After documentation-only changes, a build is optional.

After code, content schema, routing, navigation, layout, or styling changes, a build is required.

Standard verification:

```bash
git status
corepack pnpm run build
git status
```

Then commit only intended files.
