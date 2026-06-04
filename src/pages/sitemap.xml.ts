import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, extname, join, relative, sep } from "node:path";

export const prerender = true;

const SITE_URL = "https://www.lozenadvisory.com";
const POSTS_DIR = join(process.cwd(), "src/content/posts");
const PAGES_DIR = join(process.cwd(), "src/pages");
const TRACKER_PAGE = join(PAGES_DIR, "menopause-legislation-tracker.astro");

const CONTENT_EXTENSIONS = new Set([".astro", ".md", ".mdx"]);
const POST_EXTENSIONS = new Set([".md", ".mdx"]);

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

/**
 * Controlled fallback dates for internal pages that do not expose dates
 * in Markdown/MDX frontmatter or visible page text.
 *
 * The menopause legislation tracker is intentionally omitted because its
 * sitemap date is read from the page's own "Last updated:" line.
 *
 * Update this map only for non-blog Astro/internal pages that do not have
 * another reliable date source.
 */
const STATIC_PAGE_LASTMOD = new Map([
  [`${SITE_URL}/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/about-ai/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/about/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/ai-workforce-materiality-briefing/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/ai-workforce-materiality/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/architecture-of-invisible-attrition-series/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/billable-hour-visibility-tax/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/blog/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/booking/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/contact/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/disclosure-independence-infrastructure/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/disclosure-independence-work-infrastructure/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/events/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/events/akilah-kamaria-presenting-at-2026-liwoca-cle-conference/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/faq/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/invisible-attrition/`, "2026-05-14T00:00:00.000Z"],
  [`${SITE_URL}/leadership-pipeline-manager-drain/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/menopause-support-women-lawyers/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/news-press/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/news-press/menopause-market-correction/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/normal-blood-tests-feel-off/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/privacy-policy/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/request-briefing/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/retention-calculator/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/retention-risk-analysis/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/services/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/services/advisory-engagement/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/services/crisis-reputation-workforce-risk/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/services/executive-briefing/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/services/market-intelligence/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/succession-planning-retention-risk-data-gap/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/terms-of-service/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/tools-resources/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/voluntary-benefit-disclosure-gap/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/why-lozen-advisory/`, "2026-06-04T00:00:00.000Z"],
  [`${SITE_URL}/women-lawyers-conference/`, "2026-06-04T00:00:00.000Z"],
]);

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

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
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

function normalizeReadableDate(value) {
  if (!value) return "";

  const date = new Date(`${value.trim()} UTC`);

  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}

function getDateFromVisiblePageText(pageContent) {
  const lastUpdatedMatch = pageContent.match(
    /Last\s+updated:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  );

  if (lastUpdatedMatch?.[1]) {
    return normalizeReadableDate(lastUpdatedMatch[1]);
  }

  const statusDateMatch = pageContent.match(
    /Current\s+legislative\s+status\s+as\s+of\s+([A-Za-z]+\s+\d{1,2},\s+\d{4})/i
  );

  if (statusDateMatch?.[1]) {
    return normalizeReadableDate(statusDateMatch[1]);
  }

  return "";
}

function getTrackerLastmod() {
  if (!existsSync(TRACKER_PAGE)) return "";

  const pageContent = readFileSync(TRACKER_PAGE, "utf8");
  return getDateFromVisiblePageText(pageContent);
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

function isPostFile(filePath) {
  return POST_EXTENSIONS.has(extname(filePath));
}

function getBlogEntries() {
  if (!existsSync(POSTS_DIR)) return [];

  const files = readdirSync(POSTS_DIR)
    .filter((file) => isPostFile(file))
    .sort();

  const entries = [];

  for (const file of files) {
    const filePath = join(POSTS_DIR, file);
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (!frontmatter || isDraft(frontmatter) || isNoindex(frontmatter)) {
      continue;
    }

    const slug = getField(frontmatter, "slug") || basename(file, extname(file));
    const loc = normalizeBlogUrl(slug);
    const lastmod = normalizeDate(getDateFromFrontmatter(frontmatter));

    entries.push({ loc, lastmod });
  }

  return entries;
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

function getStaticPageEntries() {
  if (!existsSync(PAGES_DIR)) return [];

  const files = walkFiles(PAGES_DIR)
    .filter(isContentPageFile)
    .sort();

  const entries = [];

  for (const filePath of files) {
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (isDraft(frontmatter) || isNoindex(frontmatter)) {
      continue;
    }

    const loc = pageFileToUrl(filePath);

    if (!loc || shouldExcludeUrl(loc)) {
      continue;
    }

    let lastmod = normalizeDate(getDateFromFrontmatter(frontmatter));

    if (!lastmod && loc === `${SITE_URL}/menopause-legislation-tracker/`) {
      lastmod = getTrackerLastmod();
    }

    if (!lastmod) {
      lastmod = getDateFromVisiblePageText(fileContent);
    }

    if (!lastmod) {
      lastmod = STATIC_PAGE_LASTMOD.get(loc) || "";
    }

    entries.push({ loc, lastmod });
  }

  return entries;
}

function dedupeAndSortEntries(entries) {
  const entryMap = new Map();

  for (const entry of entries) {
    const loc = normalizeUrl(entry.loc);

    if (!loc || shouldExcludeUrl(loc)) {
      continue;
    }

    const existingEntry = entryMap.get(loc);

    if (!existingEntry || (!existingEntry.lastmod && entry.lastmod)) {
      entryMap.set(loc, { loc, lastmod: entry.lastmod || "" });
    }
  }

  return [...entryMap.values()].sort((a, b) => a.loc.localeCompare(b.loc));
}

function renderUrlEntry(entry) {
  const loc = `    <loc>${escapeXml(entry.loc)}</loc>`;

  if (!entry.lastmod) {
    return `  <url>\n${loc}\n  </url>`;
  }

  return `  <url>\n${loc}\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n  </url>`;
}

function renderSitemap(entries) {
  const urls = entries.map(renderUrlEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;
}

export async function GET() {
  const trackerLastmod = getTrackerLastmod();

  if (trackerLastmod) {
    STATIC_PAGE_LASTMOD.set(`${SITE_URL}/menopause-legislation-tracker/`, trackerLastmod);
  }

  const entries = dedupeAndSortEntries([
    ...getStaticPageEntries(),
    ...getBlogEntries(),
  ]);

  return new Response(renderSitemap(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
