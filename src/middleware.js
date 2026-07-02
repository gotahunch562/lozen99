import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const userAgent = context.request.headers.get("user-agent") || "";

  const forwardedFor = context.request.headers.get("x-forwarded-for") || "";
  const realIp = context.request.headers.get("x-real-ip") || "";
  const connectingIp =
    context.request.headers.get("cf-connecting-ip") ||
    realIp ||
    forwardedFor.split(",")[0].trim();

  const isInvisibleAttritionPath =
    url.pathname.startsWith("/invisible-attrition/");

  const blockedIps = new Set([
    "156.249.3.130",
  ]);

  const badBotPattern =
    /ahrefsbot|semrushbot|mj12bot|bytespider|petalbot|dotbot|dataforseobot|scrapy|python-requests|curl|wget/i;

  const isBlockedIp = blockedIps.has(connectingIp);
  const isBadBot = badBotPattern.test(userAgent);

  if (isInvisibleAttritionPath && (isBlockedIp || isBadBot)) {
    return new Response("Access denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return next();
});
