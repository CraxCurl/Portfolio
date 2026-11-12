/**
 * Email bodies for the contact form.
 *
 * Two messages go out per submission: a notification to me carrying the
 * visitor's details, and a receipt to the visitor confirming it arrived. Both
 * are plain HTML with inline styles — mail clients strip `<style>` blocks and
 * ignore external CSS — plus a text fallback for clients that prefer it.
 */

import { profile } from "@/lib/data";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ContactEmail = {
  subject: string;
  html: string;
  text: string;
};

/** Hex equivalents of the light-theme tokens; mail clients don't grok oklch. */
const ink = "#1e2130";
const paper = "#f2efe2";
const card = "#faf8ee";
const green = "#148a48";
const pink = "#e0396a";
const dim = "#5c6070";

/** Every interpolated value lands in an HTML string, so it has to be escaped. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keeps the line breaks the visitor actually typed into the textarea. */
function toParagraphs(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

/**
 * Shared chrome: a centred card on a cream page, with the pixel wordmark and a
 * hard border to echo the site without needing images or web fonts.
 */
function shell({
  heading,
  accent,
  body,
}: {
  heading: string;
  accent: string;
  body: string;
}) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px 12px;background:${paper};font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:${ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:${card};border:4px solid ${ink};">
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${dim};">
                  ${escapeHtml(profile.logo)}
                </p>
                <p style="margin:14px 0 0 0;font-size:16px;font-weight:700;line-height:1.5;color:${accent};">
                  ${escapeHtml(heading)}
                </p>
                <div style="margin:22px 0 0 0;border-top:2px dashed ${ink};opacity:0.35;"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px 28px;font-size:14px;line-height:1.7;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px 28px;">
                <div style="border-top:2px dashed ${ink};opacity:0.35;"></div>
                <p style="margin:18px 0 0 0;font-size:11px;line-height:1.7;color:${dim};">
                  Sent from the contact form on ${escapeHtml(profile.name)}'s portfolio.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A labelled row — used for the visitor's name and address. */
function field(label: string, value: string) {
  return `<p style="margin:0 0 14px 0;">
    <span style="display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${dim};">${escapeHtml(label)}</span>
    <span style="display:block;margin-top:4px;font-size:14px;">${value}</span>
  </p>`;
}

/** Goes to me: the actual message, with reply-to pointed at the visitor. */
export function notificationEmail(input: ContactMessage): ContactEmail {
  const body = [
    field("From", escapeHtml(input.name)),
    field(
      "Email",
      `<a href="mailto:${escapeHtml(input.email)}" style="color:${green};">${escapeHtml(input.email)}</a>`,
    ),
    `<div style="margin-top:22px;padding:18px;background:${paper};border-left:4px solid ${green};">
      <span style="display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${dim};">Message</span>
      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${toParagraphs(input.message)}</p>
    </div>`,
    `<p style="margin:22px 0 0 0;font-size:12px;color:${dim};">Hit reply to answer ${escapeHtml(input.name)} directly.</p>`,
  ].join("\n");

  return {
    subject: `New portfolio message from ${input.name}`,
    html: shell({ heading: `${input.name} wants to text you`, accent: green, body }),
    text: [
      `New message from the portfolio contact form.`,
      ``,
      `From:    ${input.name}`,
      `Email:   ${input.email}`,
      ``,
      `Message:`,
      input.message,
      ``,
      `Reply straight to this email to answer ${input.name}.`,
    ].join("\n"),
  };
}

/** Goes to the visitor: confirmation that it landed, plus a copy of what they sent. */
export function acknowledgementEmail(input: ContactMessage): ContactEmail {
  const body = [
    `<p style="margin:0 0 16px 0;">Hi ${escapeHtml(input.name)},</p>`,
    `<p style="margin:0 0 16px 0;">Your message has been successfully sent to ${escapeHtml(profile.firstName)}. It's in his inbox now and he'll reply to this address as soon as he can.</p>`,
    `<div style="margin:22px 0;padding:18px;background:${paper};border-left:4px solid ${pink};">
      <span style="display:block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${dim};">What you sent</span>
      <p style="margin:10px 0 0 0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${toParagraphs(input.message)}</p>
    </div>`,
    `<p style="margin:0 0 16px 0;font-size:12px;color:${dim};">You can also find him on <a href="${profile.links.linkedin}" style="color:${green};">LinkedIn</a> and <a href="${profile.links.github}" style="color:${green};">GitHub</a>.</p>`,
    `<p style="margin:0;font-size:12px;color:${dim};">Didn't send this? Ignore this email: nothing else will follow.</p>`,
  ].join("\n");

  return {
    subject: `Your message reached ${profile.name}`,
    html: shell({
      heading: "Message delivered: thanks for reaching out",
      accent: pink,
      body,
    }),
    text: [
      `Hi ${input.name},`,
      ``,
      `Your message has been successfully sent to ${profile.firstName}. It's in his inbox now and he'll reply to this address as soon as he can.`,
      ``,
      `What you sent:`,
      input.message,
      ``,
      `LinkedIn: ${profile.links.linkedin}`,
      `GitHub:   ${profile.links.github}`,
      ``,
      `Didn't send this? Ignore this email: nothing else will follow.`,
    ].join("\n"),
  };
}
