import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const userAgent = context.request.headers.get("user-agent") || "";

  const isInvisibleAttritionPath =
    url.pathname.startsWith("/invisible-attrition/");

  const isChrome149 =
    userAgent.includes("Chrome/149.");

  if (isInvisibleAttritionPath && isChrome149) {
    return new Response("Access denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return next();
});
