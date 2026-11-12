"use client";

import { useState } from "react";
import { Check, MapPin, Send } from "lucide-react";

import { contact, profile } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/PixelIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/8bit/alert";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import { Separator } from "@/components/ui/8bit/separator";
import { Textarea } from "@/components/ui/8bit/textarea";

/**
 * The form posts to `/api/contact`, which sends two emails through Resend: the
 * message to Vinayak, and a receipt to whoever wrote it. Everything the visitor
 * is told here reflects what the server actually reported back.
 */
type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; receipt: boolean }
  | { status: "error"; error: string };

const fallbackError = "Something broke on the way out. Please try LinkedIn.";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  /** Honeypot — hidden from people, irresistible to bots. */
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  const sending = state.status === "sending";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending) {
      return;
    }

    setState({ status: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const payload: { ok?: boolean; receipt?: boolean; error?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        setState({ status: "error", error: payload.error ?? fallbackError });
        return;
      }

      setState({ status: "sent", receipt: payload.receipt !== false });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setState({ status: "error", error: fallbackError });
    }
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      {/* ── Direct routes ─────────────────────────────────────────────── */}
      <Reveal className="px-2 lg:px-0">
        <Card font="normal" className="[--card-spacing:--spacing(6)] h-full">
          <CardContent className="flex h-full flex-col gap-7">
            <div>
              <p className="retro text-[9px] text-accent uppercase">
                Player 2 join
              </p>
              <p className="retro mt-5 text-xs leading-relaxed text-foreground sm:text-sm">
                {contact.heading}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {contact.lead}
              </p>
            </div>

            <Separator />

            <div className="flex flex-col gap-5">
              <Button asChild size="lg" className="w-full text-[10px]">
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full text-[10px]"
              >
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full text-[10px]"
              >
                <a href={`mailto:${profile.email}`}>
                  <MailIcon className="size-4" />
                  Email
                </a>
              </Button>
            </div>

            <p className="retro mt-auto flex items-center gap-2.5 text-[9px] text-muted-foreground uppercase">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              {profile.location}
            </p>
          </CardContent>
        </Card>
      </Reveal>

      {/* ── Composer ──────────────────────────────────────────────────── */}
      <Reveal delay={0.1} className="px-2">
        <Card font="normal" className="[--card-spacing:--spacing(6)]">
          {/* The kit's `CardContent` spreads props after its own className, so
              passing one replaces the built-in `flex-1 retro` — which is what we
              want here: the form's own labels and buttons carry `retro`. */}
          <CardContent className="flex-1">
            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5">
                <Label htmlFor="contact-name" className="text-[9px] uppercase">
                  Player name
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  required
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="text-[10px]"
                />
              </div>

              <div className="flex flex-col gap-3.5">
                <Label htmlFor="contact-email" className="text-[9px] uppercase">
                  Your email
                </Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="text-[10px]"
                />
              </div>

              <div className="flex flex-col gap-3.5">
                <Label
                  htmlFor="contact-message"
                  className="text-[9px] uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  maxLength={4000}
                  placeholder="What are we building?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="resize-none text-[10px] leading-relaxed"
                />
              </div>

              {/* Off-screen rather than `hidden`, so headless bots still see it. */}
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="contact-company">Company (leave empty)</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="text-[10px]"
                >
                  {state.status === "sent" ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Send className="size-4" aria-hidden="true" />
                  )}
                  {sending ? "Sending" : "Send message"}
                </Button>

                <p className="retro text-[9px] leading-relaxed text-muted-foreground">
                  {sending ? (
                    <span className="animate-pixel-blink text-primary">
                      Transmitting…
                    </span>
                  ) : (
                    "Lands in my inbox, and you get a copy back"
                  )}
                </p>
              </div>

              <div aria-live="polite">
                {state.status === "sent" && (
                  <Alert font="normal">
                    <AlertTitle className="retro text-[10px]">
                      Message sent
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      {state.receipt
                        ? `It's in ${profile.firstName}'s inbox: a confirmation copy is on its way to you too.`
                        : `It's in ${profile.firstName}'s inbox. The confirmation copy to you didn't go through, but the message did.`}
                    </AlertDescription>
                  </Alert>
                )}

                {state.status === "error" && (
                  <Alert font="normal" variant="destructive">
                    <AlertTitle className="retro text-[10px]">
                      Not sent
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      {state.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
