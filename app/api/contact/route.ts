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

/** Sending identity. Must be on a domain verified in the Resend dashboard or onboarding@resend.dev. */
const rawFrom = process.env.CONTACT_FROM_EMAIL?.replace(/^["']|["']$/g, "").trim();
const from =
  rawFrom && rawFrom.length > 0
    ? rawFrom
    : `${profile.name} <onboarding@resend.dev>`;

/** Inbox the message is delivered to. */
const to = process.env.CONTACT_TO_EMAIL?.replace(/^["']|["']$/g, "").trim() || profile.email;

const limits = { name: 80, email: 200, message: 4000 } as const;

/** Deliberately loose: real addresses fail stricter patterns more often than fakes pass. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Throttle, so an open endpoint can't be used to burn through the Resend quota.
 * Module scope means it's per server instance — on serverless that's a soft
 * limit rather than a guarantee, but it stops the obvious flood.
 */
const window = 60_000;
const maxPerWindow = 5;
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

function providerError(error: unknown) {
  if (error && typeof error === "object") {
    const details = error as { message?: unknown; name?: unknown };

    return {
      name: typeof details.name === "string" ? details.name : undefined,
      message:
        typeof details.message === "string" ? details.message : undefined,
    };
  }

  return { message: typeof error === "string" ? error : undefined };
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
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return fail("The contact relay isn't configured yet. Please email vinayak02tripathi2006@gmail.com directly or connect on LinkedIn.", 503);
  }

  if (!to) {
    console.error("[contact] no recipient: set CONTACT_TO_EMAIL");
    return fail("The recipient address isn't configured. Please email vinayak02tripathi2006@gmail.com directly.", 503);
  }

  if (rateLimited(clientKey(request))) {
    return fail("That's a few messages in a row — please wait a minute before sending another.", 429);
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

  let notifyResult;
  let receiptResult;

  // 1. Send the essential notification email to Vinayak
  try {
    notifyResult = await resend.emails.send({
      from,
      to,
      replyTo: parsed.email,
      subject: notify.subject,
      html: notify.html,
      text: notify.text,
    });
  } catch (error) {
    console.error("[contact] Resend notification request failed", providerError(error));
    return fail(`Unable to dispatch email: please email directly at ${profile.email} or reach out on LinkedIn.`, 502);
  }

  if (notifyResult.error) {
    console.error(
      "[contact] notification failed",
      providerError(notifyResult.error),
    );
    return fail(
      notifyResult.error.message || `Unable to send message: please email directly at ${profile.email}.`,
      502,
    );
  }

  // 2. Attempt receipt email to sender (non-critical: won't fail submission if visitor address is unverified in test mode)
  try {
    receiptResult = await resend.emails.send({
      from,
      to: parsed.email,
      replyTo: to,
      subject: receipt.subject,
      html: receipt.html,
      text: receipt.text,
    });

    if (receiptResult.error) {
      console.warn("[contact] receipt send returned error (expected in unverified test mode):", providerError(receiptResult.error));
    }
  } catch (error) {
    console.warn("[contact] receipt send exception ignored:", providerError(error));
  }

  const hasReceipt = Boolean(receiptResult && !receiptResult.error);
  return Response.json({ ok: true, receipt: hasReceipt });
}
