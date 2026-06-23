
## Approved InternalPageHero standard

Approved standard pages:

- `/about-ai/`
- `/faq/`
- `/request-briefing/`
- `/privacy-policy/`
- `/terms-of-service/`
- `/tools-resources/`

These pages now define the standard look and style for normal internal utility/index pages.

Approved standard characteristics:
- Shared `InternalPageHero.astro`
- Light internal gradient
- Eyebrow above title
- Title case, no forced uppercase H1
- Tenor Sans display title through page hero tokens
- DM Sans deck through page hero tokens
- Two-column desktop layout
- Hero reads as a full section
- Top spacing clears the floating nav
- Bottom spacing gives enough transition into page content

Do not use `/blog/` spacing as the universal page standard. `/blog/` remains an editorial index layout.

Pages still excluded from this standard:
- `/index/`
- `/contact/`
- `/normal-blood-tests-feel-off/`
- `/blog/tags/`
- `/disclosure-independence-work-infrastructure/`
- `/ai-legislation-tracker/`

Next candidates to evaluate against this standard:
- `/news-press/`
- `/retention-calculator/`
- `/menopause-legislation-tracker/`
- `/women-lawyers-conference/`

## Approved additional page

`/news-press/` has also been fixed and now matches the standard internal hero direction.

Approved standard set now includes:

- `/about-ai/`
- `/faq/`
- `/request-briefing/`
- `/privacy-policy/`
- `/terms-of-service/`
- `/tools-resources/`
- `/news-press/`

## Article / Report Template Typography Issue

Status: Open

Problem:
Article and report pages do not currently share a consistent visual hierarchy. Font sizes, title scale, hero spacing, and article/report presentation vary across template families.

Known template families:
- Blog articles: `src/layouts/BlogLayout.astro`
- Executive/report articles: `src/components/authority/ExecutiveReportArticle.astro`
- Press releases: `src/components/press/PressReleasePage.astro`
- Narrative pages: `src/components/authority/NarrativePage.astro`

Confirmed page mappings:
- `/blog/*` uses `BlogLayout.astro`
- `/billable-hour-visibility-tax/` uses `ExecutiveReportArticle.astro`
- `/leadership-pipeline-manager-drain/` uses `ExecutiveReportArticle.astro`
- `/succession-planning-retention-risk-data-gap/` uses `ExecutiveReportArticle.astro`
- `/voluntary-benefit-disclosure-gap/` uses `ExecutiveReportArticle.astro`
- `/news-press/menopause-market-correction/` uses `PressReleasePage.astro`
- Narrative/authority pages use `NarrativePage.astro`

Design issue:
The pages should not all look identical, but they need a coherent typography system. Report articles, blog articles, press releases, and narrative pages should use compatible title scale, deck/body scale, metadata treatment, and vertical rhythm.

Do not fix this by editing individual article pages. Fix should happen in the shared templates and/or shared CSS tokens.

Recommended next pass:
1. Compare title, deck, metadata, body, section heading, and chapter/number styles across `BlogLayout.astro`, `ExecutiveReportArticle.astro`, and `PressReleasePage.astro`.
2. Define article/report typography tokens in `global.css`.
3. Apply shared or compatible tokens to each template.
4. Leave `NarrativePage.astro` alone unless visual QA shows a specific mismatch.

## Article / Report Typography Reference

Preferred typography reference:
- `/disclosure-independence-infrastructure/`

Reason:
The font size and reading scale on this page are visually acceptable and should be used as a reference point when cleaning up article/report typography.

Important implementation note:
`/disclosure-independence-infrastructure/` uses `src/components/authority/NarrativePage.astro`. Do not assume the article/report pages already inherit this scale. The mismatch likely comes from separate template families:
- `BlogLayout.astro`
- `ExecutiveReportArticle.astro`
- `PressReleasePage.astro`
- `NarrativePage.astro`

Design direction:
Article/report templates do not need to become identical to NarrativePage, but their title size, deck size, body size, heading scale, and vertical rhythm should be compatible with the NarrativePage reading scale.

Do not solve this with one-off page edits. Fix at the shared template/token level.

## NarrativePage Split Hero Decision

Status: Approved

Decision:
The split hero variant in `NarrativePage.astro` is visually acceptable and should not be reduced or redesigned in the current cleanup pass.

Approved split hero pages include:
- `/ai-workforce-materiality-briefing/`
- `/menopause-and-the-law/`
- Other `NarrativePage` pages using `heroImage`

Current cleanup focus:
- Keep split hero layout intact.
- Preserve large image/title presentation for split hero pages.
- Continue applying improved prose width to the body content below the hero.
- If additional cleanup is needed, focus on text-only NarrativePage balance, not split hero scale.
