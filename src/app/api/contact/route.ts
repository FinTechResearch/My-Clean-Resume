import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Contact endpoint.
 *
 * Two honest modes:
 *
 *  1. If `RESEND_API_KEY` is configured, the message is delivered through
 *     the Resend REST API and the visitor sees a real confirmation.
 *  2. If no mail provider is configured, the endpoint validates the
 *     submission and returns a pre-filled `mailto:` link. The client then
 *     discloses that it is handing the message to the visitor's own mail
 *     client. Nothing is ever pretended to have been sent.
 */

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("That email address does not look right."),
  category: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your idea in a little more detail (at least 20 characters).")
    .max(5000, "Please keep the description under 5000 characters."),
  /** Honeypot — bots fill this in, humans never see it. */
  website: z.string().max(0).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That request could not be read." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped — accept silently, deliver nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, mode: "accepted" });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "adityamadhok2026@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL;

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && from) {
    const subject = `Portfolio enquiry — ${data.name}${
      data.category ? ` (${data.category})` : ""
    }`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          text: [
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Category: ${data.category || "—"}`,
            `Budget: ${data.budget || "—"}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        console.error("[contact] delivery failed", res.status, detail);
        return NextResponse.json(
          {
            ok: false,
            error:
              "The message could not be delivered right now. Please email directly instead.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true, mode: "sent" });
    } catch (error) {
      console.error("[contact] delivery error", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "The message could not be delivered right now. Please email directly instead.",
        },
        { status: 502 },
      );
    }
  }

  // No mail provider configured — hand the message back as a mailto link.
  const bodyText = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Category: ${data.category || "—"}`,
    `Budget: ${data.budget || "—"}`,
    "",
    data.message,
  ].join("\n");

  const mailto = `mailto:${to}?subject=${encodeURIComponent(
    `Portfolio enquiry — ${data.name}`,
  )}&body=${encodeURIComponent(bodyText)}`;

  return NextResponse.json({ ok: true, mode: "mailto", mailto });
}
