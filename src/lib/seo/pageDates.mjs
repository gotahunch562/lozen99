python3 - <<'PY'
from pathlib import Path

path = Path("src/lib/seo/pageDates.mjs")
text = path.read_text(encoding="utf-8")

old = '''const POSTS_DIR = join(process.cwd(), "src/content/posts");
const SERVICES_DIR = join(process.cwd(), "src/content/services");
const PAGES_DIR = join(process.cwd(), "src/pages");'''

new = '''const POSTS_DIR = join(process.cwd(), "src/content/posts");
const SERVICES_DIR = join(process.cwd(), "src/content/services");
const NEWS_DIR = join(process.cwd(), "src/content/news");
const PAGES_DIR = join(process.cwd(), "src/pages");'''

if old not in text:
    raise SystemExit("Could not find directory constants. No changes made.")

text = text.replace(old, new, 1)

marker = '''function buildStaticPageLastmodMap() {'''

news_function = '''function buildNewsLastmodMap() {
  const lastmodByUrl = new Map();

  if (!existsSync(NEWS_DIR)) return lastmodByUrl;

  const files = walkFiles(NEWS_DIR).filter((filePath) =>
    CONTENT_COLLECTION_EXTENSIONS.has(extname(filePath)),
  );

  for (const filePath of files) {
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = getFrontmatter(fileContent);

    if (!frontmatter || isDraft(frontmatter) || isNoindex(frontmatter)) {
      continue;
    }

    const relativePath = toPosixPath(relative(NEWS_DIR, filePath));
    const extension = extname(relativePath);
    const slug =
      getField(frontmatter, "slug") ||
      relativePath.slice(0, -extension.length);

    const url = `${SITE_URL}/news-press/${slug}/`;
    const lastmod = normalizeDate(getLastmodFromFrontmatter(frontmatter));

    if (lastmod) {
      lastmodByUrl.set(url, lastmod);
    }
  }

  return lastmodByUrl;
}

'''

if marker not in text:
    raise SystemExit("Could not find static-page function. No changes made.")

text = text.replace(marker, news_function + marker, 1)

old = '''const blogDateData = buildBlogMaps();
const serviceLastmodByUrl = buildServiceLastmodMap();
const staticPageLastmodByUrl = buildStaticPageLastmodMap();'''

new = '''const blogDateData = buildBlogMaps();
const serviceLastmodByUrl = buildServiceLastmodMap();
const newsLastmodByUrl = buildNewsLastmodMap();
const staticPageLastmodByUrl = buildStaticPageLastmodMap();'''

if old not in text:
    raise SystemExit("Could not find map initialization. No changes made.")

text = text.replace(old, new, 1)

old = '''  if (serviceLastmodByUrl.has(url)) {
    return serviceLastmodByUrl.get(url);
  }

  if (pathname === "/blog/") {'''

new = '''  if (serviceLastmodByUrl.has(url)) {
    return serviceLastmodByUrl.get(url);
  }

  if (newsLastmodByUrl.has(url)) {
    return newsLastmodByUrl.get(url);
  }

  if (pathname === "/blog/") {'''

if old not in text:
    raise SystemExit("Could not find resolver insertion point. No changes made.")

text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
print("Updated src/lib/seo/pageDates.mjs to scan src/content/news")
PY
