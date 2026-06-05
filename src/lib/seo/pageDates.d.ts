export declare const SITE_URL: string;
export declare const BASELINE_LASTMOD: string;
export declare function normalizeDate(value: string | Date | null | undefined): string;
export declare function normalizeSitePath(value: string | null | undefined): string;
export declare function normalizeSiteUrl(value: string | null | undefined): string;
export declare function shouldExcludeSitemapUrl(value: string | null | undefined): boolean;
export declare function resolveLastmodForUrl(value: string | null | undefined): string;
export declare function resolveDateForHref(href: string | null | undefined): string;
