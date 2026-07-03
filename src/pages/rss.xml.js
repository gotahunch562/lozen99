const siteUrl = "https://www.lozenadvisory.com";

const feedTitle = "Lozen Advisory";
const feedDescription =
  "Research and analysis from Lozen Advisory on disclosure-independent performance protection, workforce risk, retention systems, menopause-at-work policy, and invisible attrition.";

const feedItems = [
  {
    title: "Lozen Advisory Research",
    path: "/blog",
    description:
      "Research and analysis from Lozen Advisory on disclosure-dependent systems, workforce risk, leadership continuity, and performance protection.",
  },
  {
    title: "Menopause Legislation Tracker",
    path: "/menopause-legislation-tracker",
    description:
      "A policy tracker and governance audit of menopause-related legislation, disclosure requirements, and populations excluded by activation-dependent systems.",
  },
  {
    title: "The Architecture of Invisible Attrition — Executive Report Series",
    path: "/architecture-of-invisible-attrition-series",
    description:
      "A four-part analysis of corporate retention systems and the structural flaws that compound leadership pipeline risk and succession exposure.",
  },
  {
    title: "Retention Risk Analysis",
    path: "/retention-risk-analysis",
    description:
      "An article about evaluation and the likelihood of losing valuable employees when workforce risk forms outside existing measurement systems.",
  },
  {
    title: "Disclosure Independence Infrastructure",
    path: "/disclosure-independence-performance",
    description:
      "A Lozen Advisory analysis of why disclosure-dependent systems cannot fully measure workforce risk before a record is created.",
  },
];

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const items = feedItems
    .map((item) => {
      const link = `${siteUrl}${item.path}`;

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(item.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(feedDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
