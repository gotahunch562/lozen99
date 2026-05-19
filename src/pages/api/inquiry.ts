import type { APIRoute } from "astro";

export const prerender = false;

type InquiryType = "contact" | "briefing";

const VALID_TYPES = new Set<InquiryType>(["contact", "briefing"]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });

const getRuntimeEnv = (name: string) => {
  const processEnv = (globalThis as any).process?.env?.[name];
  const importMetaEnv = (import.meta as any).env?.[name];

  return String(processEnv ?? importMetaEnv ?? "").trim();
};

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getResendErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();

    if (typeof data?.message === "string") {
      return data.message;
    }

    if (typeof data?.error?.message === "string") {
      return data.error.message;
    }
  } catch {
    // Fall through to generic error.
  }

  return "Unable to send this inquiry right now.";
};

const buildInquiryRows = (payload: Record<string, unknown>) => {
  const rows: Array<[string, string]> = [
    ["Inquiry type", asString(payload.type)],
    ["First name", asString(payload["first-name"]) || asString(payload.firstName)],
    ["Last name", asString(payload["last-name"]) || asString(payload.lastName)],
    ["Title", asString(payload.title)],
    ["Company", asString(payload.company)],
    ["Company size", asString(payload["company-size"]) || asString(payload.companySize)],
    ["Email", asString(payload.email)],
    ["Phone", asString(payload.phone)],
    ["Message", asString(payload.message)],
    ["Briefing details", asString(payload.details)],
  ];

  return rows.filter(([, value]) => value.length > 0);
};

const buildPlainText = (rows: Array<[string, string]>) =>
  rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");

const buildHtml = (rows: Array<[string, string]>) => {
  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="vertical-align:top;padding:10px 12px;border-bottom:1px solid #d8e1ee;color:#0b1f3d;font-family:Arial,sans-serif;font-size:14px;width:180px;">
            ${escapeHtml(label)}
          </th>
          <td style="vertical-align:top;padding:10px 12px;border-bottom:1px solid #d8e1ee;color:#14294a;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#14294a;line-height:1.6;">
      <h1 style="margin:0 0 16px;color:#06172f;font-size:22px;">Lozen Advisory Website Inquiry</h1>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #d8e1ee;">
        ${tableRows}
      </table>
    </div>
  `;
};

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;

  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return jsonResponse({ message: "Invalid request format." }, 400);
    }

    payload = await request.json();
  } catch {
    return jsonResponse({ message: "Unable to read this inquiry." }, 400);
  }

  // Honeypot. Real users should never fill this field.
  if (asString(payload.website).length > 0) {
    return jsonResponse({ ok: true });
  }

  const type = asString(payload.type) as InquiryType;
  const email = asString(payload.email).toLowerCase();
  const firstName = asString(payload["first-name"]) || asString(payload.firstName);
  const lastName = asString(payload["last-name"]) || asString(payload.lastName);
  const message = asString(payload.message) || asString(payload.details);

  if (!VALID_TYPES.has(type)) {
    return jsonResponse({ message: "This inquiry form is not recognized." }, 400);
  }

  if (!firstName || !lastName) {
    return jsonResponse({ message: "Enter your first and last name." }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ message: "Enter a valid email address." }, 400);
  }

  if (!message) {
    return jsonResponse({ message: "Enter a message before sending." }, 400);
  }

  const apiKey = getRuntimeEnv("RESEND_API_KEY");
  const from = getRuntimeEnv("RESEND_FROM_EMAIL");
  const to = getRuntimeEnv("RESEND_TO_EMAIL") || "hello@lozenadvisory.com";

  if (!apiKey || !from || !to) {
    return jsonResponse(
      { message: "This inquiry form is not configured yet." },
      500,
    );
  }

  const rows = buildInquiryRows(payload);
  const subject =
    type === "briefing"
      ? `Strategic Briefing Request — ${firstName} ${lastName}`
      : `Lozen Advisory Contact Inquiry — ${firstName} ${lastName}`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: buildHtml(rows),
        text: buildPlainText(rows),
      }),
    });

    if (!resendResponse.ok) {
      const message = await getResendErrorMessage(resendResponse);
      return jsonResponse({ message }, 502);
    }

    return jsonResponse({
      ok: true,
      message: "Your inquiry was sent.",
    });
  } catch {
    return jsonResponse(
      { message: "Unable to connect to the inquiry service right now." },
      502,
    );
  }
};
