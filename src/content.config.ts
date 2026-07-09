import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().optional(),
        excerpt: z.string().optional(),
        metaDescription: z.string().optional(),
        seo_title: z.string().optional(),
        pubDate: z.coerce.date(),
        datePublished: z.coerce.date().optional(),
        dateModified: z.coerce.date().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        image: z
          .object({
            url: image(),
            alt: z.string().optional(),
          })
          .optional(),
      })
      .passthrough(),
});

const services = defineCollection({
  loader: glob({
    base: "./src/content/services",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().optional(),
        excerpt: z.string().optional(),
        image: z
          .object({
            url: image(),
            alt: z.string().optional(),
          })
          .optional(),
      })
      .passthrough(),
});

const news = defineCollection({
  loader: glob({
    base: "./src/content/news",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    category: z.string().default("Press Release"),
    releaseLabel: z.string().default("For Immediate Release"),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
  }),
});

export const collections = {
  posts,
  services,
  news,
};
