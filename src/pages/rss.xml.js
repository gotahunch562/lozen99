import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const normalizeSlug = (value) =>
  String(value || "")
    .replace(/^\/?blog\//, "")
    .replace(/^\/+/, "")
    .replace(/\.mdx?$/, "");

export async function GET(context) {
  const posts = (await getCollection("posts"))
    .filter((post) => post.data.draft !== true)
    .sort((a, b) => {
      const aDate = new Date(a.data.pubDate || a.data.datePublished || 0).getTime();
      const bDate = new Date(b.data.pubDate || b.data.datePublished || 0).getTime();
      return bDate - aDate;
    });

  return rss({
    title: "Lozen Advisory",
    description:
      "Research, analysis, and advisory writing from Lozen Advisory on disclosure-independent performance protection, Invisible Attrition, workforce risk, and menopause-at-work policy design.",
    site: context.site,
    items: posts.map((post) => {
      const slug = normalizeSlug(post.data.slug || post.slug || post.id);

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${slug}/`,
      };
    }),
  });
}
