import {
  normalizeSiteUrl,
  resolveLastmodForUrl,
  shouldExcludeSitemapUrl,
} from "./pageDates.mjs";

export function serializeSitemapItem(item) {
  const normalizedUrl = normalizeSiteUrl(item.url);

  if (!normalizedUrl || shouldExcludeSitemapUrl(normalizedUrl)) {
    return undefined;
  }

  const lastmod = resolveLastmodForUrl(normalizedUrl);

  if (lastmod) {
    item.lastmod = lastmod;
  } else {
    delete item.lastmod;
  }

  return item;
}
