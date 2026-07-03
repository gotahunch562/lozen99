import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";

export const SITE_URL = "https://www.lozenadvisory.com";
export const BASELINE_LASTMOD = "2026-05-19";

const POSTS_DIR = join(process.cwd(), "src/content/posts");
const SERVICES_DIR = join(process.cwd(), "src/content/services");
const PAGES_DIR = join(process.cwd(), "src/pages");
const TRACKER_PAGE = join(PAGES_DIR, "menopause-legislation-tracker.astro");

const CONTENT_EXTENSIONS = new Set([".astro", ".md", ".mdx"]);
const CONTENT_COLLECTION_EXTENSIONS = new Set([".md", ".mdx"]);

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

const PUBLISHED_DATE_FIELDS = ["datePublished", "pubDate", "publishDate", "date"];

const AI_WORKFORCE_SERIES_KEY = "ai-workforce-materiality";
const AI_WORKFORCE_BASELINE_LASTMOD = "2026-05-31";

const EXPLICIT_PAGE_DATES = new Map([
  ["/ai-workforce-materiality-briefing/", "2026-05-31"],
  ["/disclosure-independent-governance/", "2026-07-03"],
  ["/frameworks/power-user-trap/", "2026-07-03"],
  ["/news-press/menopause-market-correction/", "2026-05-19"],
  ["/voluntary-benefit-disclosure-gap/", "2026-04-27"],
  ["/", "2026-06-27"],
  ["/menopause-and-the-law/", "2026-06-06"],
]);

const EXCLUDED_EXACT_PATHS = new Set([
  "/blog/archive/",
  "/4s-sovereign-capacity-model/",
  "/sovereign-capacity-model/",
  "/why-lozen-advisory/",
  "/disclosure-independence-performance/",
  "/disclosure-independence-work-infrastructure/",
  "/invisible-attrition/power-user-trap/",
  "/normal-blood-tests-feel-off/",
  "/menopause-support-women-lawyers/",
  "/billable-hour-visibility-tax/",
  "/leadership-pipeline-manager-drain/",
  "/succession-planning-retention-risk-data-gap/",
  "/voluntary-benefit-disclosure-gap/",
]);

const EXCLUDED_PATH_PATTERNS = [
  /^\/tags?\/?$/i,
  /^\/tags?\/[^/]+\/?$/i,
  /^\/blog\/tags?\/?$/i,
  /^\/blog\/tags?\/[^/]+\/?$/i,
  /^\/categor(?:y|ies)\/?$/i,
  /^\/categor(?:y|ies)\/[^/]+\/?$/i,
  /^\/blog\/categor(?:y|ies)\/?$/i,
  /^\/blog\/categor(?:y|ies)\/[^/]+\/?$/i,
  /^\/authors?\/?$/i,
  /^\/authors?\/[^/]+\/?$/i,
  /^\/page\/\d+\/?$/i,
];

function toPosixPath(path) {
  return path.split(sep).join("/");
}

function hasFileExtension(pathname) {
  return /\/[^/?#]+\.[a-z0-9]{2,8}$/i.test(pathname);
}

export function normalizeSitePath(value) {
  if (!value) return "/";

  let pathname = String(value).trim();

  if (pathname.startsWith(SITE_URL)) {
    pathname = new URL(pathname).pathname;
  } else if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      return "";
    }
  }

  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  if (pathname === "/") return pathname;
  if (hasFileExtension(pathname)) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function normalizeSiteUrl(value) {
  const pathname = normalizeSitePath(value);
  if (!pathname) return "";
  return `${SITE_URL}${pathname}`;
}

export function shouldExcludeSitemapUrl(value) {
  const pathname = normalizeSitePath(value);
  if (!pathname) return true;
  if (EXCLUDED_EXACT_PATHS.has(pathname)) return true;
  return EXCLUDED_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

function getFrontmatter(fileContent) {
  const match = fileContent.match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function getField(frontmatter, fieldName) {
  const pattern = new RegExp(`^${fieldName}:\\s*(.+?)\\s*$`, "m");
  const match = frontmatter.match(pattern);
  if (!match) return "";
  return match[1].trim().replace(/^["']/, "").replace(/["']$/, "");
}

function getFirstField(frontmatter, fields) {
  for (const fieldName of fields) {
    const value = getField(frontmatter, fieldName);
    if (value) return value;
  }
  return "";
}

function getLastmodFromFrontmatter(frontmatter) {
  return getFirstField(frontmatter, DATE_FIELDS);
}

function getPublishedDateFromFrontmatter(frontmatter) {
  return getFirstField(frontmatter, PUBLISHED_DATE_FIELDS);
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

export function normalizeDate(value) {
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

function normalizeReadableDate(value) {
  if (!value) return "";

  const date = new Date(`${String(value).trim()} UTC`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function maxIsoDate(dates) {
  const validDates = dates.filter(Boolean).map(normalizeDate).filter(Boolean);
  if (!validDates.length) return "";
  return validDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
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

function normalizeBlogSlug(slug) {
  return String(slug || "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/^blog\//, "")
    .replace(/^posts\//, "")
    .replace(/\.mdx?$/, "");
}

function blogUrlFromSlug(slug) {
  const cleanSlug = normalizeBlogSlug(slug);
  return cleanSlug ? `${SITE_URL}/blog/${cleanSlug}/` : "";
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
  return routePath ? `${SITE_URL}/${routePath}/` : `${SITE_URL}/`;
}

function isContentPageFile(filePath) {
  const extension = extname(filePath);
  if (!CONTENT_EXTENSIONS.has(extension)) return false;

  const relativePath = toPosixPath(relative(PAGES_DIR, filePath));
  const fileName = basename(filePath);
  const pathParts = relativePath.split("/");

  if (!relativePath || relativePath.startsWith("..")) return false;
  if (fileName === "404.astro" || fileName === "500.astro") return false;
  if (relativePath === "sitemap.xml.ts") return false;
  if (relativePath === "rss.xml.js") return false;
  if (pathParts.some((part) => part.startsWith("_"))) return false;
  if (pathParts.some((part) => part.includes("[") || part.includes("]"))) return false;
  if (pathParts[0] === "api") return false;

  return true;
}

function getDateFromVisiblePageText(pageContent) {
  const lastUpdatedMatch = pageContent.match(
    /Last\s+updated:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
  );

  if (lastUpdatedMatch?.[1]) {
    return normalizeReadableDate(lastUpdatedMatch[1]);
  }

  const statusDateMatch = pageContent.match(
    /Current\s+legislative\s+status\s+as\s+of\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i,
  );

  if (statusDateMatch?.[1]) {
    return normalizeReadableDate(statusDateMatch[1]);
  }

  return "";
}

function getDateFromPageScript(pageContent) {
  const dateModified = pageContent.match(/dateModified:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  if (dateModified?.[1]) return normalizeDate(dateModified[1]);

  const publishedDateIso = pageContent.match(/publishedDateIso\s*=\s*["'](\d{4}-\d{2}-\d{2})["']/);
  if (publishedDateIso?.[1]) return normalizeDate(publishedDateIso[1]);

  return "";
}

function buildBlogMaps() {
  const lastmodByUrl = new Map();
  const publishedDates = [];
  const aiSeriesPublishedDates = [];

  if (!existsSync(POSTS_DIR)) {
    return { lastmodByUrl, latestBlogPublishedDate: "", latestAiSeriesPublishedDate: "" };
  }

  const files = readdirSync(POSTS_DIR).filter((file) =>
    CONTENT_COLLECTION_EXTENSIONS.has(extname(file)),
  );

  for (const file of files) {
    const filePath = join(POSTS_DIR, file);
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (!frontmatter || isDraft(frontmatter) || isNoindex(frontmatter)) continue;

    const slug = getField(frontmatter, "slug") || basename(file, extname(file));
    const url = blogUrlFromSlug(slug);
    const lastmod = normalizeDate(getLastmodFromFrontmatter(frontmatter));
    const publishedDate = normalizeDate(getPublishedDateFromFrontmatter(frontmatter));
    const seriesKey = getField(frontmatter, "seriesKey");

    if (url && lastmod) lastmodByUrl.set(url, lastmod);
    if (publishedDate) publishedDates.push(publishedDate);
    if (seriesKey === AI_WORKFORCE_SERIES_KEY && publishedDate) {
      aiSeriesPublishedDates.push(publishedDate);
    }
  }

  return {
    lastmodByUrl,
    latestBlogPublishedDate: maxIsoDate(publishedDates),
    latestAiSeriesPublishedDate: maxIsoDate(aiSeriesPublishedDates),
  };
}

function buildServiceLastmodMap() {
  const lastmodByUrl = new Map();

  if (!existsSync(SERVICES_DIR)) return lastmodByUrl;

  const files = readdirSync(SERVICES_DIR).filter((file) =>
    CONTENT_COLLECTION_EXTENSIONS.has(extname(file)),
  );

  for (const file of files) {
    const filePath = join(SERVICES_DIR, file);
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (isDraft(frontmatter) || isNoindex(frontmatter)) continue;

    const slug = basename(file, extname(file));
    const url = `${SITE_URL}/services/${slug}/`;
    const lastmod = normalizeDate(getLastmodFromFrontmatter(frontmatter));

    if (lastmod) lastmodByUrl.set(url, lastmod);
  }

  return lastmodByUrl;
}

function buildStaticPageLastmodMap() {
  const lastmodByUrl = new Map();

  if (!existsSync(PAGES_DIR)) return lastmodByUrl;

  const files = walkFiles(PAGES_DIR).filter(isContentPageFile);

  for (const filePath of files) {
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (isDraft(frontmatter) || isNoindex(frontmatter)) continue;

    const url = normalizeSiteUrl(pageFileToUrl(filePath));
    if (!url || shouldExcludeSitemapUrl(url)) continue;

    const lastmod =
      normalizeDate(getLastmodFromFrontmatter(frontmatter)) ||
      getDateFromPageScript(fileContent) ||
      getDateFromVisiblePageText(fileContent);

    if (lastmod) lastmodByUrl.set(url, lastmod);
  }

  return lastmodByUrl;
}

const blogDateData = buildBlogMaps();
const serviceLastmodByUrl = buildServiceLastmodMap();
const staticPageLastmodByUrl = buildStaticPageLastmodMap();

export function resolveLastmodForUrl(value) {
  const url = normalizeSiteUrl(value);
  const pathname = normalizeSitePath(value);

  if (!url || shouldExcludeSitemapUrl(url)) return "";

  if (blogDateData.lastmodByUrl.has(url)) {
    return blogDateData.lastmodByUrl.get(url);
  }

  if (serviceLastmodByUrl.has(url)) {
    return serviceLastmodByUrl.get(url);
  }

  if (staticPageLastmodByUrl.has(url)) {
    return staticPageLastmodByUrl.get(url);
  }

  if (pathname === "/blog/") {
    return blogDateData.latestBlogPublishedDate || normalizeDate(BASELINE_LASTMOD);
  }

  if (pathname === "/ai-workforce-materiality/") {
    return blogDateData.latestAiSeriesPublishedDate || normalizeDate(AI_WORKFORCE_BASELINE_LASTMOD);
  }

  if (EXPLICIT_PAGE_DATES.has(pathname)) {
    return normalizeDate(EXPLICIT_PAGE_DATES.get(pathname));
  }

  return normalizeDate(BASELINE_LASTMOD);
}

export function resolveDateForHref(href) {
  return resolveLastmodForUrl(href);
}
