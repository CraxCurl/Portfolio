import { Resend } from "resend";

import { profile } from "@/lib/data";
import {
  acknowledgementEmail,
  notificationEmail,
  type ContactMessage,
} from "@/lib/contact-email";

/**
 * Contact form endpoint.
 *
 * One submission fans out to two emails through Resend: the message itself to
 * me (with `replyTo` set to the visitor, so replying just works) and a receipt
 * to the visitor. Both are sent from the verified `stigz.xyz` domain — Resend
 * will reject a `from` on any domain it hasn't verified.
 */

/** Sending identity. Must be on a domain verified in the Resend dashboard. */
const from =
  process.env.CONTACT_FROM_EMAIL ?? `${profile.name} <portfolio@stigz.xyz>`;

/** Inbox the message is delivered to. */
const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

const limits = { name: 80, email: 200, message: 4000 } as const;

/** Deliberately loose: real addresses fail stricter patterns more often than fakes pass. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Throttle, so an open endpoint can't be used to burn through the Resend quota.
 * Module scope means it's per server instance — on serverless that's a soft
 * limit rather than a guarantee, but it stops the obvious flood.
 */
const window = 60_000;
const maxPerWindow = 3;
const seen = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (seen.get(key) ?? []).filter((at) => now - at < window);

  if (recent.length >= maxPerWindow) {
    seen.set(key, recent);
    return true;
  }

  recent.push(now);
  seen.set(key, recent);

  // Opportunistic cleanup — this map would otherwise grow for the process's life.
  if (seen.size > 500) {
    for (const [entry, times] of seen) {
      if (times.every((at) => now - at >= window)) {
        seen.delete(entry);
      }
    }
  }

  return false;
}

/**
 * `x-real-ip` first: on Vercel the platform sets it to the actual client IP,
 * whereas the leftmost `x-forwarded-for` entry is caller-supplied and therefore
 * spoofable. This is a speed bump, not authentication.
 */
function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  return (
    request.headers.get("x-real-ip") ||
    forwarded?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function fail(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}

/** Narrows the untrusted JSON body into a `ContactMessage`. */
function parse(body: unknown): ContactMessage | string {
  if (typeof body !== "object" || body === null) {
    return "That request didn't look right. Try again.";
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // `company` is the honeypot: hidden in the form, so only bots fill it in.
  // Reported as success to avoid telling them which field gave them away.
  if (typeof company === "string" && company.trim().length > 0) {
    return "";
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return "Name, email and message are all required.";
  }

  const trimmed = {
    // The name goes into a Subject header, so internal newlines and tabs are
    // collapsed rather than trimmed — no header injection via a pasted name.
    name: name.trim().replace(/\s+/g, " "),
    email: email.trim(),
    message: message.trim(),
  };

  if (!trimmed.name) return "Add your name so I know who's writing.";
  if (trimmed.name.length > limits.name) return "That name is a little too long.";
  if (!emailPattern.test(trimmed.email) || trimmed.email.length > limits.email) {
    return "That email address doesn't look valid.";
  }
  if (!trimmed.message) return "The message is empty.";
  if (trimmed.message.length > limits.message) {
    return `Keep it under ${limits.message} characters — that's a long one.`;
  }

  return trimmed;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return fail("The form isn't wired up yet — reach me on LinkedIn instead.", 503);
  }

  if (!to) {
    console.error("[contact] no recipient: set CONTACT_TO_EMAIL");
    return fail("The form isn't wired up yet — reach me on LinkedIn instead.", 503);
  }

  if (rateLimited(clientKey(request))) {
    return fail("That's a few messages in a row — give it a minute.", 429);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return fail("That request didn't look right. Try again.", 400);
  }

  const parsed = parse(body);

  if (typeof parsed === "string") {
    // The honeypot path returns an empty reason and a silent success.
    return parsed ? fail(parsed, 400) : Response.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const notify = notificationEmail(parsed);
  const receipt = acknowledgementEmail(parsed);

  const [notifyResult, receiptResult] = await Promise.all([
    resend.emails.send({
      from,
      to,
      replyTo: parsed.email,
      subject: notify.subject,
      html: notify.html,
      text: notify.text,
    }),
    resend.emails.send({
      from,
      to: parsed.email,
      replyTo: to,
      subject: receipt.subject,
      html: receipt.html,
      text: receipt.text,
    }),
  ]);

  // The notification is the one that matters — if it failed, the message is lost.
  if (notifyResult.error) {
    console.error("[contact] notification failed", notifyResult.error);
    return fail("Sending failed on my end. Please try LinkedIn instead.", 502);
  }

  // A bounced receipt is worth logging but not worth failing the submission over.
  if (receiptResult.error) {
    console.error("[contact] receipt failed", receiptResult.error);
    return Response.json({ ok: true, receipt: false });
  }

  return Response.json({ ok: true, receipt: true });
}
