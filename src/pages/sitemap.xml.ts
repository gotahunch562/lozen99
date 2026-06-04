import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";

const SITE_URL = "https://www.lozenadvisory.com";
const POSTS_DIR = join(process.cwd(), "src/content/posts");
const PAGES_DIR = join(process.cwd(), "src/pages");

const CONTENT_EXTENSIONS = new Set([".astro", ".md", ".mdx"]);

const DATE_FIELDS = [
  "updatedDate",
  "dateModified",
  "lastModified",
  "lastmod",
  "publishDate",
  "pubDate",
  "datePublished",
  "date",
];

const EXCLUDED_EXACT_URLS = new Set([
  `${SITE_URL}/blog/archive/`,
]);

const EXCLUDED_URL_PATTERNS = [
  /\/tags?\/?$/i,
  /\/tags?\/[^/]+\/?$/i,
  /\/blog\/tags?\/?$/i,
  /\/blog\/tags?\/[^/]+\/?$/i,
  /\/categor(?:y|ies)\/?$/i,
  /\/categor(?:y|ies)\/[^/]+\/?$/i,
  /\/blog\/categor(?:y|ies)\/?$/i,
  /\/blog\/categor(?:y|ies)\/[^/]+\/?$/i,
  /\/authors?\/?$/i,
  /\/authors?\/[^/]+\/?$/i,
  /\/page\/\d+\/?$/i,
];

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function normalizeUrl(url) {
  if (!url) return "";

  if (url.endsWith("/")) return url;
  if (/\.[a-z0-9]+$/i.test(url)) return url;

  return `${url}/`;
}

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

function getDateFromFrontmatter(frontmatter) {
  for (const fieldName of DATE_FIELDS) {
    const value = getField(frontmatter, fieldName);
    if (value) return value;
  }

  return "";
}

function isDraft(frontmatter) {
  return /^draft:\s*true\s*$/im.test(frontmatter);
}

function isNoindex(frontmatter) {
  return (
    /^sitemap:\s*false\s*$/im.test(frontmatter) ||
    /^robots:\s*["']?noindex/im.test(frontmatter)
  );
}

function normalizeDate(value) {
  if (!value) return "";

  const cleanValue = String(value)
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

function walkFiles(dir) {
  if (!existsSync(dir)) return [];

  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
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

    if (!frontmatter || isDraft(frontmatter) || isNoindex(frontmatter)) {
      continue;
    }

    const slug = getField(frontmatter, "slug") || basename(file, extname(file));
    const lastmod = normalizeDate(getDateFromFrontmatter(frontmatter));

    if (slug && lastmod) {
      lastmodMap.set(normalizeBlogUrl(slug), lastmod);
    }
  }

  return lastmodMap;
}

function isContentPageFile(filePath) {
  const extension = extname(filePath);
  if (!CONTENT_EXTENSIONS.has(extension)) return false;

  const relativePath = toPosixPath(relative(PAGES_DIR, filePath));
  const fileName = basename(filePath);
  const pathParts = relativePath.split("/");

  if (!relativePath || relativePath.startsWith("..")) return false;
  if (fileName === "404.astro" || fileName === "500.astro") return false;
  if (pathParts.some((part) => part.startsWith("_"))) return false;
  if (pathParts.some((part) => part.includes("[") || part.includes("]"))) return false;
  if (pathParts[0] === "api") return false;

  return true;
}

function pageFileToUrl(filePath) {
  const relativePath = toPosixPath(relative(PAGES_DIR, filePath));
  const extension = extname(relativePath);

  if (!extension) return "";

  const withoutExtension = relativePath.slice(0, -extension.length);
  const pathParts = withoutExtension.split("/");

  if (pathParts[pathParts.length - 1] === "index") {
    pathParts.pop();
  }

  const routePath = pathParts.filter(Boolean).join("/");

  if (!routePath) {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}/${routePath}/`;
}

function shouldExcludeUrl(url) {
  const normalizedUrl = normalizeUrl(url);

  if (!normalizedUrl.startsWith(`${SITE_URL}/`)) return true;
  if (EXCLUDED_EXACT_URLS.has(normalizedUrl)) return true;

  return EXCLUDED_URL_PATTERNS.some((pattern) => pattern.test(normalizedUrl));
}

function getStaticPageLastmodMap() {
  const lastmodMap = new Map();

  if (!existsSync(PAGES_DIR)) return lastmodMap;

  const files = walkFiles(PAGES_DIR).filter(isContentPageFile);

  for (const filePath of files) {
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (isDraft(frontmatter) || isNoindex(frontmatter)) {
      continue;
    }

    const url = pageFileToUrl(filePath);

    if (!url || shouldExcludeUrl(url)) {
      continue;
    }

    const lastmod = normalizeDate(getDateFromFrontmatter(frontmatter));

    if (lastmod) {
      lastmodMap.set(url, lastmod);
    }
  }

  return lastmodMap;
}

const blogLastmodMap = getBlogLastmodMap();
const staticPageLastmodMap = getStaticPageLastmodMap();

export function serializeSitemapItem(item) {
  const normalizedUrl = normalizeUrl(item.url);

  if (shouldExcludeUrl(normalizedUrl)) {
    return undefined;
  }

  const lastmod =
    blogLastmodMap.get(normalizedUrl) || staticPageLastmodMap.get(normalizedUrl);

  if (lastmod) {
    item.lastmod = lastmod;
  }

  return item;
}
