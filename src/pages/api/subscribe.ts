import type { APIRoute } from "astro";

export const prerender = false;

const GROUP_ENV_NAMES = {
  footer: "MAILERLITE_FOOTER_GROUP_ID",
  tacere: "MAILERLITE_TACERE_GROUP_ID",
  poweruser: "MAILERLITE_POWERUSER",
} as const;

type SignupGroup = keyof typeof GROUP_ENV_NAMES;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getRuntimeEnv = (name: string) => {
  const astroValue = import.meta.env[name];
  if (typeof astroValue === "string" && astroValue.length > 0) {
    return astroValue;
  }

  const runtimeProcess = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process;

  return runtimeProcess?.env?.[name];
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });

const methodNotAllowedResponse = () =>
  new Response(JSON.stringify({ message: "This endpoint accepts POST requests only." }), {
    status: 405,
    headers: {
      allow: "POST",
      "content-type": "application/json; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });

export const GET: APIRoute = async () => methodNotAllowedResponse();

export const HEAD: APIRoute = async () =>
  new Response(null, {
    status: 405,
    headers: {
      allow: "POST",
      "x-robots-tag": "noindex, nofollow",
    },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ message: "Invalid request." }, 400);
  }

  let payload: {
    email?: unknown;
    group?: unknown;
    company?: unknown;
  };

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ message: "Invalid request." }, 400);
  }

  if (typeof payload.company === "string" && payload.company.trim().length > 0) {
    return jsonResponse({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const group = typeof payload.group === "string" ? payload.group : "";

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ message: "Enter a valid email address." }, 400);
  }

  if (!(group in GROUP_ENV_NAMES)) {
    return jsonResponse({ message: "Invalid signup form." }, 400);
  }

  const apiKey = getRuntimeEnv("MAILERLITE_API_KEY");
  const groupId = getRuntimeEnv(GROUP_ENV_NAMES[group as SignupGroup]);

  if (!apiKey || !groupId) {
    return jsonResponse(
      { message: "This signup form is not configured yet." },
      500,
    );
  }

  const cleanGroupId = groupId.trim();

  if (!/^\d+$/.test(cleanGroupId)) {
    return jsonResponse(
      { message: "This signup form has an invalid MailerLite group ID." },
      500,
    );
  }

  try {
    const mailerLiteResponse = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: `{"email":${JSON.stringify(email)},"groups":[${cleanGroupId}]}`,
      },
    );

    if (!mailerLiteResponse.ok) {
      let mailerLiteMessage = "Unable to complete signup.";

      try {
        const mailerLitePayload = await mailerLiteResponse.json();
        if (typeof mailerLitePayload?.message === "string") {
          mailerLiteMessage = mailerLitePayload.message;
        }
      } catch {
        // Keep the default user-safe message.
      }

      return jsonResponse(
        { message: mailerLiteMessage },
        mailerLiteResponse.status === 422 ? 400 : 502,
      );
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse(
      { message: "Unable to connect to MailerLite right now." },
      502,
    );
  }
};
