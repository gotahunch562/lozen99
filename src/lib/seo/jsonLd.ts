export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdObject
  | JsonLdValue[];

export interface JsonLdObject {
  [key: string]: JsonLdValue | undefined;
}

export interface BreadcrumbItemInput {
  name: string;
  href: string;
}

export interface SeriesInput {
  name: string;
  href: string;
  description?: string;
}

export interface BasePageInput {
  title: string;
  description?: string;
  href: string;
  image?: string;
  imageAlt?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  keywords?: string[];
  breadcrumbs?: BreadcrumbItemInput[];
}

export interface ArticleJsonLdInput extends BasePageInput {
  type?: "Article" | "BlogPosting" | "ScholarlyArticle" | "Report";
  section?: string;
  isPartOf?: SeriesInput;
}

export interface NewsArticleJsonLdInput extends BasePageInput {
  section?: string;
  dateline?: string;
}

export interface CollectionPageJsonLdInput {
  title: string;
  description?: string;
  href: string;
  items?: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
}

export interface CreativeWorkSeriesJsonLdInput {
  name: string;
  description?: string;
  href: string;
  items?: Array<{
    title: string;
    href: string;
    position?: number;
    description?: string;
  }>;
}

export interface ServiceJsonLdInput {
  name: string;
  description?: string;
  href: string;
  serviceType?: string;
  areaServed?: string;
  offer?: {
    price?: string | number;
    priceCurrency?: string;
    availability?: string;
    href?: string;
  };
  offers?: Array<{
    name: string;
    description?: string;
    href?: string;
    price?: string | number;
    priceCurrency?: string;
  }>;
}

export interface EventJsonLdInput {
  name: string;
  description?: string;
  href: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
  location?: {
    name?: string;
    address?: string;
  };
  organizer?: {
    name: string;
    href?: string;
  };
  performer?: {
    name: string;
    href?: string;
  };
  image?: string;
}

export interface DatasetJsonLdInput {
  name: string;
  description?: string;
  href: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
  license?: string;
  creatorName?: string;
  distribution?: Array<{
    name: string;
    href: string;
    encodingFormat: string;
    contentSize?: string;
  }>;
}

const SITE_URL = "https://www.lozenadvisory.com";
const SITE_NAME = "Lozen Advisory";
const ORGANIZATION_NAME = "Lozen Advisory LLC";
const DEFAULT_AUTHOR_NAME = "Akilah E. Kamaria";

const compact = <T>(items: Array<T | false | null | undefined>): T[] =>
  items.filter(Boolean) as T[];

export const absoluteUrl = (href?: string | null): string | undefined => {
  if (!href) return undefined;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  if (href.startsWith("#")) return `${SITE_URL}/${href}`;
  return `${SITE_URL}${href.startsWith("/") ? href : `/${href}`}`;
};

export const createOrganizationJsonLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORGANIZATION_NAME,
  url: SITE_URL,
  email: "hello@lozenadvisory.com",
  founder: {
    "@type": "Person",
    name: DEFAULT_AUTHOR_NAME,
  },
});

export const createWebSiteJsonLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const createBreadcrumbJsonLd = (
  items: BreadcrumbItemInput[],
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.href),
  })),
});

export const createCreativeWorkSeriesJsonLd = ({
  name,
  description,
  href,
  items = [],
}: CreativeWorkSeriesJsonLdInput): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "CreativeWorkSeries",
  "@id": `${absoluteUrl(href)}#series`,
  name,
  description,
  url: absoluteUrl(href),
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  hasPart: items.map((item, index) => ({
    "@type": "Article",
    position: item.position ?? index + 1,
    headline: item.title,
    description: item.description,
    url: absoluteUrl(item.href),
    isPartOf: {
      "@id": `${absoluteUrl(href)}#series`,
    },
  })),
});

export const createArticleJsonLd = ({
  title,
  description,
  href,
  image,
  datePublished,
  dateModified,
  authorName = DEFAULT_AUTHOR_NAME,
  keywords,
  breadcrumbs,
  type = "Article",
  section,
  isPartOf,
}: ArticleJsonLdInput): JsonLdObject | JsonLdObject[] => {
  const article: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    url: absoluteUrl(href),
    mainEntityOfPage: absoluteUrl(href),
    image: image ? absoluteUrl(image) : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection: section,
    keywords: keywords?.join(", "),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    isPartOf: isPartOf
      ? {
          "@type": "CreativeWorkSeries",
          "@id": `${absoluteUrl(isPartOf.href)}#series`,
          name: isPartOf.name,
          description: isPartOf.description,
          url: absoluteUrl(isPartOf.href),
        }
      : undefined,
  };

  return breadcrumbs?.length
    ? [article, createBreadcrumbJsonLd(breadcrumbs)]
    : article;
};

export const createNewsArticleJsonLd = ({
  title,
  description,
  href,
  image,
  datePublished,
  dateModified,
  authorName = DEFAULT_AUTHOR_NAME,
  keywords,
  breadcrumbs,
  section,
  dateline,
}: NewsArticleJsonLdInput): JsonLdObject | JsonLdObject[] => {
  const article: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url: absoluteUrl(href),
    mainEntityOfPage: absoluteUrl(href),
    image: image ? absoluteUrl(image) : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    articleSection: section,
    dateline,
    keywords: keywords?.join(", "),
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return breadcrumbs?.length
    ? [article, createBreadcrumbJsonLd(breadcrumbs)]
    : article;
};

export const createCollectionPageJsonLd = ({
  title,
  description,
  href,
  items = [],
}: CollectionPageJsonLdInput): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: absoluteUrl(href),
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(item.href),
      name: item.title,
      description: item.description,
    })),
  },
});

export const createServiceJsonLd = ({
  name,
  description,
  href,
  serviceType,
  areaServed = "United States",
  offer,
  offers,
}: ServiceJsonLdInput): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: absoluteUrl(href),
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  areaServed,
  offers: offer
    ? {
        "@type": "Offer",
        price: offer.price,
        priceCurrency: offer.priceCurrency ?? "USD",
        availability: offer.availability ?? "https://schema.org/InStock",
        url: absoluteUrl(offer.href ?? href),
      }
    : offers?.length
      ? {
          "@type": "OfferCatalog",
          name: `${SITE_NAME} Services`,
          itemListElement: offers.map((item) => ({
            "@type": "Offer",
            price: item.price,
            priceCurrency: item.priceCurrency ?? "USD",
            url: item.href ? absoluteUrl(item.href) : undefined,
            itemOffered: {
              "@type": "Service",
              name: item.name,
              description: item.description,
            },
          })),
        }
      : undefined,
});

export const createEventJsonLd = ({
  name,
  description,
  href,
  startDate,
  endDate,
  eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode",
  eventStatus = "https://schema.org/EventScheduled",
  location,
  organizer,
  performer,
  image,
}: EventJsonLdInput): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  description,
  url: absoluteUrl(href),
  startDate,
  endDate,
  eventAttendanceMode,
  eventStatus,
  image: image ? absoluteUrl(image) : undefined,
  location: location
    ? {
        "@type": "Place",
        name: location.name,
        address: location.address,
      }
    : undefined,
  organizer: organizer
    ? {
        "@type": "Organization",
        name: organizer.name,
        url: organizer.href ? absoluteUrl(organizer.href) : undefined,
      }
    : {
        "@id": `${SITE_URL}/#organization`,
      },
  performer: performer
    ? {
        "@type": "Person",
        name: performer.name,
        url: performer.href ? absoluteUrl(performer.href) : undefined,
      }
    : undefined,
});

export const createDatasetJsonLd = ({
  name,
  description,
  href,
  keywords,
  datePublished,
  dateModified,
  license,
  creatorName = ORGANIZATION_NAME,
  distribution = [],
}: DatasetJsonLdInput): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Dataset",
  name,
  description,
  url: absoluteUrl(href),
  keywords: keywords?.join(", "),
  datePublished,
  dateModified: dateModified ?? datePublished,
  license,
  creator: {
    "@type": creatorName === ORGANIZATION_NAME ? "Organization" : "Person",
    name: creatorName,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  distribution: distribution.map((item) => ({
    "@type": "DataDownload",
    name: item.name,
    contentUrl: absoluteUrl(item.href),
    encodingFormat: item.encodingFormat,
    contentSize: item.contentSize,
  })),
});

export const createJsonLdGraph = (
  items: Array<JsonLdObject | JsonLdObject[] | false | null | undefined>,
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@graph": compact(items.flat()),
});

export const serializeJsonLd = (
  value: JsonLdObject | JsonLdObject[],
): string => JSON.stringify(value).replace(/</g, "\\u003c");
