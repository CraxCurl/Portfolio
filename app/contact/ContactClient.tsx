"use client";

import { useState } from "react";
import { Check, MapPin, Send, Clock } from "lucide-react";
import { contact, profile } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ScreenNavigator from "@/components/ScreenNavigator";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/PixelIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/8bit/alert";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import { Textarea } from "@/components/ui/8bit/textarea";

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; receipt: boolean }
  | { status: "error"; error: string };

const fallbackError = "Something broke on the way out. Please reach out via LinkedIn or email directly.";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
    <div className="min-h-screen">
      <PageHeader
        screenTag="PLAYER 2 JOIN // SCREEN 06"
        title="Player 2, Join?"
        lead="Internships, collaborations, or a problem you can't stop thinking about — all transmissions welcome."
        badge="Transmissions Online"
        accentColor="text-accent"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="retro text-[8px] uppercase">
            <Clock className="mr-1 size-2.5 text-primary" />
            Fast Response
          </Badge>
          <Badge variant="secondary" className="retro text-[8px] uppercase">
            {profile.location.split(",")[0]}
          </Badge>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* ── Status Banner ───────────────────────────────────────────── */}
        <Reveal className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-primary bg-primary/10 p-4">
            <div className="flex items-center gap-3">
              <span className="size-3 bg-primary" />
              <span className="retro text-[9px] font-bold text-foreground uppercase">
                AVAILABILITY: OPEN FOR INTERNSHIPS &amp; COLLABORATIONS (2026)
              </span>
            </div>
            <span className="retro text-[8px] text-muted-foreground uppercase">
              STATUS: READY
            </span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* ── Left Column: Direct Transmission Routes ─────────────────── */}
          <Reveal className="px-2 lg:px-0">
            <Card font="normal" className="[--card-spacing:--spacing(6)] h-full border-2 border-border">
              <CardContent className="flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="retro text-[9px] text-accent uppercase font-bold">
                    Transmission Channels
                  </p>
                  <h2 className="retro mt-4 text-sm font-bold text-foreground sm:text-base">
                    {contact.heading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {contact.lead}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button asChild size="lg" className="w-full text-[10px]">
                    <a
                      href={profile.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedinIcon className="mr-2 size-4" />
                      Connect on LinkedIn
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full text-[10px]"
                  >
                    <a href={profile.links.github} target="_blank" rel="noreferrer">
                      <GithubIcon className="mr-2 size-4" />
                      View GitHub Profile
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full text-[10px]"
                  >
                    <a href={`mailto:${profile.email}`}>
                      <MailIcon className="mr-2 size-4" />
                      Direct Email: {profile.email}
                    </a>
                  </Button>
                </div>

                <div className="border-t border-dashed border-border pt-4">
                  <p className="retro flex items-center gap-2 text-[9px] text-muted-foreground uppercase">
                    <MapPin className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                    Base Station: {profile.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* ── Right Column: Interactive Form ──────────────────────────── */}
          <Reveal delay={0.1} className="px-2">
            <Card font="normal" className="[--card-spacing:--spacing(6)] border-2 border-border">
              <CardContent className="flex-1">
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                  <div className="border-b border-dashed border-border pb-3">
                    <p className="retro text-[10px] text-accent uppercase font-bold">
                      Direct Message Dispatch
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <Label htmlFor="contact-name" className="text-[9px] uppercase font-bold">
                      Player Name
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
                      className="text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <Label htmlFor="contact-email" className="text-[9px] uppercase font-bold">
                      Your Email Address
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
                      className="text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <Label htmlFor="contact-message" className="text-[9px] uppercase font-bold">
                      Transmission Content
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      maxLength={4000}
                      placeholder="What are we building together?"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      className="resize-none text-xs leading-relaxed"
                    />
                  </div>

                  {/* Honeypot for spam bots */}
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

                  <div className="flex flex-col gap-4 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={sending}
                      className="w-full text-[10px]"
                    >
                      {state.status === "sent" ? (
                        <Check className="mr-2 size-4" aria-hidden="true" />
                      ) : (
                        <Send className="mr-2 size-4" aria-hidden="true" />
                      )}
                      {sending ? "Transmitting Signal..." : "Send Transmission"}
                    </Button>

                    <p className="retro text-center text-[8px] leading-relaxed text-muted-foreground">
                      {sending ? (
                        <span className="animate-pixel-blink text-primary">
                          Encrypting &amp; Dispatching to inbox...
                        </span>
                      ) : (
                        "Sent via secure Resend relay with receipt copy"
                      )}
                    </p>
                  </div>

                  <div aria-live="polite">
                    {state.status === "sent" && (
                      <Alert font="normal" className="border-2 border-primary bg-primary/10">
                        <AlertTitle className="retro text-[10px] text-primary">
                          Transmission Received
                        </AlertTitle>
                        <AlertDescription className="text-xs text-foreground mt-1">
                          {state.receipt
                            ? `Your message has landed in ${profile.firstName}'s inbox — a confirmation receipt has been dispatched to your email.`
                            : `Your message has landed in ${profile.firstName}'s inbox.`}
                        </AlertDescription>
                      </Alert>
                    )}

                    {state.status === "error" && (
                      <Alert font="normal" variant="destructive">
                        <AlertTitle className="retro text-[10px]">
                          Transmission Error
                        </AlertTitle>
                        <AlertDescription className="text-xs mt-1">
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
      </div>

      <ScreenNavigator currentId="contact" />
    </div>
  );
}
