import type { VercelRequest, VercelResponse } from "@vercel/node";

type EnquiryBody = {
  name?: string;
  email?: string;
  organisation?: string;
  requirement?: string;
  urgency?: string;
  message?: string;
  company_website?: string;
  consent?: boolean;
};

const MAX = {
  name: 120,
  email: 160,
  organisation: 160,
  requirement: 160,
  urgency: 40,
  message: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: EnquiryBody;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as EnquiryBody;
  } catch {
    return res.status(400).json({ error: "Invalid request body." });
  }

  if (clean(body.company_website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const organisation = clean(body.organisation, MAX.organisation);
  const requirement = clean(body.requirement, MAX.requirement);
  const urgency = clean(body.urgency, MAX.urgency);
  const message = clean(body.message, MAX.message);

  if (!name || !email || !organisation || !requirement || !urgency || !message) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (body.consent !== true) {
    return res.status(400).json({ error: "Please accept the privacy policy." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM;

  if (!apiKey || !to || !from) {
    return res.status(502).json({ error: "Enquiry service is not configured." });
  }

  const subject = `Confidential enquiry — ${requirement} (${urgency})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation}`,
    `Requirement: ${requirement}`,
    `Urgency: ${urgency}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
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
        text,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Unable to send your enquiry." });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Unable to send your enquiry." });
  }
}
