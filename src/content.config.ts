import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
  news,
};
