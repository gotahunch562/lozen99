import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const SITE_URL = "https://www.lozenadvisory.com";
const POSTS_DIR = join(process.cwd(), "src/content/posts");

function getFrontmatter(fileContent) {
  const match = fileContent.match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function getField(frontmatter, fieldName) {
  const pattern = new RegExp(`^${fieldName}:\\s*(.+?)\\s*$`, "m");
  const match = frontmatter.match(pattern);
  if (!match) return "";

  return match[1]
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "");
}

function isDraft(frontmatter) {
  return /^draft:\s*true\s*$/im.test(frontmatter);
}

function normalizeDate(value) {
  if (!value) return "";

  const cleanValue = value
    .trim()
    .replace(/^&[A-Za-z0-9_-]+\s+/, "")
    .replace(/^\*[A-Za-z0-9_-]+$/, "");

  if (!cleanValue) return "";

  const date = /^\d{4}-\d{2}-\d{2}$/.test(cleanValue)
    ? new Date(`${cleanValue}T00:00:00.000Z`)
    : new Date(cleanValue);

  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function normalizeBlogUrl(slug) {
  const cleanSlug = slug
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/^blog\//, "");

  return `${SITE_URL}/blog/${cleanSlug}/`;
}

function getBlogLastmodMap() {
  const lastmodMap = new Map();

  if (!existsSync(POSTS_DIR)) return lastmodMap;

  const files = readdirSync(POSTS_DIR).filter((file) =>
    [".md", ".mdx"].includes(extname(file))
  );

  for (const file of files) {
    const filePath = join(POSTS_DIR, file);
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (!frontmatter || isDraft(frontmatter)) continue;

    const slug = getField(frontmatter, "slug") || basename(file, extname(file));

    const date =
      getField(frontmatter, "updatedDate") ||
      getField(frontmatter, "dateModified") ||
      getField(frontmatter, "publishDate") ||
      getField(frontmatter, "pubDate") ||
      getField(frontmatter, "datePublished") ||
      getField(frontmatter, "date");

    const lastmod = normalizeDate(date);

    if (slug && lastmod) {
      lastmodMap.set(normalizeBlogUrl(slug), lastmod);
    }
  }

  return lastmodMap;
}

const blogLastmodMap = getBlogLastmodMap();

const staticLastmodMap = new Map([
  [`${SITE_URL}/menopause-legislation-tracker/`, "2026-05-29T00:00:00.000Z"],
]);


const excludedSitemapUrls = new Set([
  `${SITE_URL}/disclosure-independence-work-infrastructure/`,
]);


export function serializeSitemapItem(item) {
  const normalizedUrl = item.url.endsWith("/") ? item.url : `${item.url}/`;

  if (excludedSitemapUrls.has(normalizedUrl)) {
    return undefined;
  }

  const lastmod = blogLastmodMap.get(normalizedUrl) || staticLastmodMap.get(normalizedUrl);

  if (lastmod) {
    item.lastmod = lastmod;
  }

  return item;
}
