import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      pubDate: z.coerce.date(),
      datePublished: z.coerce.date().optional(),
      dateModified: z.coerce.date().optional(),
      category: z.string().optional(),
      seriesKey: z.string().optional(),
      seriesOrder: z.coerce.number().int().positive().optional(),
      homepageSection: z.enum(["menopause-at-work"]).optional(),
      description: z.string(),
      excerpt: z.string().optional(),
      metaDescription: z.string().optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      spineDestination: z.string().optional(),
      draft: z.boolean().optional().default(false),
      isFeatured: z.boolean().optional().default(false),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      description: z.string(),
      metaDescription: z.string().optional(),
      category: z.string().optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      priceFrom: z.string().optional(),
      duration: z.string().optional(),
      isFeatured: z.boolean().optional().default(false),
    }),
});

export const collections = {
  posts,
  services,
};