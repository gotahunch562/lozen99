# Lozen Advisory — Pillar & Cluster Template

13 files. Two layouts, ten markdown content files, this README.

---

## File locations in your project

```
src/
  layouts/
    PillarLayout.astro          ← copy here
    ClusterLayout.astro         ← copy here
  pages/
    invisible-attrition.md      ← copy here (pillar)
    invisible-attrition/
      exit-data-failure.md      ← cluster 01
      structural-silence.md     ← cluster 02
      succession-blindness.md   ← cluster 03
      performer-masking.md      ← cluster 04
      dashboard-delay.md        ← cluster 05
      stable-performance-as-risk.md  ← cluster 06
      late-governance.md        ← cluster 07
      power-user-trap.md        ← cluster 08
      who-disappears.md         ← cluster 09
```

Astro resolves the directory structure to routes automatically.
`invisible-attrition.md` → `/invisible-attrition`
`invisible-attrition/exit-data-failure.md` → `/invisible-attrition/exit-data-failure`
No routing config needed.

---

## Before first build — three things to verify

**1. BaseLayout props**
Both layouts call `<BaseLayout title={title} metaDescription={metaDescription}>`.
Confirm your `BaseLayout.astro` accepts `title` and `metaDescription` as props
and passes them to `BaseHead` or equivalent. If the prop names differ in your
implementation, update the opening tag in both layout files.

**2. Wrapper variants**
Both layouts use `<Wrapper variant="narrow">` and `<Wrapper variant="prose">`.
Confirm both variants exist in your `Wrapper.astro` before building.
The `prose` variant applies `@tailwindcss/typography` to the article body slot.

**3. Layout paths**
Paths are set correctly for the directory structure above:
- Pillar: `layout: "../layouts/PillarLayout.astro"`
- Clusters: `layout: "../../layouts/ClusterLayout.astro"`
If your layouts live somewhere other than `src/layouts/`, update accordingly.

---

## Design system components used

Both layouts use only what is already in the project:

- `BaseLayout` — shell with nav, head, and footer
- `Text` — typography with variant props
- `Button` — with `isLink`, `variant`, `size` props
- `Wrapper` — container with `variant="narrow"` and `variant="prose"`

No new CSS. No new variables. No parallel token system.

---

## Adding a cluster

1. Duplicate any cluster markdown file.
2. Update every frontmatter field: `clusterNumber`, `slug`, `title`,
   `heading`, `subtitle`, `metaDescription`, `prevCluster`, `nextCluster`.
3. Place the file in `src/pages/invisible-attrition/`.
4. Add the cluster entry to the `clusters` array in `invisible-attrition.md`.

For the last cluster in the sequence, omit `nextCluster` entirely.
The layout renders nothing in that slot.

---

## Embedding the sequence diagram

The `InvisibleAttritionSequence` component is a React island.
To render it inside a markdown page, the file must be `.mdx`.

**Step 1** — Rename `invisible-attrition.md` to `invisible-attrition.mdx`.

**Step 2** — Add the import immediately after the frontmatter closing `---`:

```mdx
import InvisibleAttritionSequence from '../components/InvisibleAttritionSequence.tsx'
```

**Step 3** — Place the component where the diagram belongs in the article body,
replacing the existing comment placeholder:

```mdx
<InvisibleAttritionSequence client:load />
```

**Step 4** — Confirm these are in the project:

- `@astrojs/react` integration installed
- `@astrojs/mdx` integration installed
- Tailwind configured with the `dash-flow` keyframe:

```ts
// tailwind.config.ts
theme: {
  extend: {
    keyframes: {
      "dash-flow": { to: { strokeDashoffset: "-20" } }
    },
    animation: {
      "dash-flow": "dash-flow 1.2s linear infinite"
    }
  }
}
```

- These CSS variables in your global stylesheet:

```css
:root {
  --article-bg:         40 30% 98%;
  --article-text:       25 15% 15%;
  --article-text-muted: 25 10% 45%;
}
```

---

## Adding a second pillar

1. Reuse `PillarLayout.astro` as-is.
2. Create `src/pages/[new-pillar-slug].md`.
3. Set `layout: "../layouts/PillarLayout.astro"` in frontmatter.
4. Populate its own `clusters` array.
5. Create cluster files in `src/pages/[new-pillar-slug]/`.
6. Set `layout: "../../layouts/ClusterLayout.astro"` in each cluster file.
