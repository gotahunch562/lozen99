import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const userAgent = context.request.headers.get("user-agent") || "";

  const forwardedFor = context.request.headers.get("x-forwarded-for") || "";
  const realIp = context.request.headers.get("x-real-ip") || "";
  const vercelForwardedFor =
    context.request.headers.get("x-vercel-forwarded-for") || "";

  const connectingIp =
    vercelForwardedFor.split(",")[0].trim() ||
    realIp ||
    forwardedFor.split(",")[0].trim();

  const protectedPaths = [
    "/invisible-attrition/",
    "/ai-legislation-tracker/",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  const blockedIps = new Set([
    "156.249.3.130",
    "45.206.82.92",
  ]);

  const allowedGoodBots =
    /googlebot|bingbot|slurp|duckduckbot|applebot|facebookexternalhit|linkedinbot|twitterbot/i;

  const badBotPattern =
    /ahrefsbot|semrushbot|mj12bot|bytespider|petalbot|dotbot|dataforseobot|scrapy|python-requests|curl|wget|go-http-client|axios|node-fetch/i;

  const isBlockedIp = blockedIps.has(connectingIp);
  const isGoodBot = allowedGoodBots.test(userAgent);
  const isBadBot = badBotPattern.test(userAgent);

  if (isGoodBot) {
    return next();
  }

  if (isBlockedIp || (isProtectedPath && isBadBot)) {
    return new Response("Access denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return next();
});
