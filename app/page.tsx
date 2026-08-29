import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Trophy, Cpu, Briefcase, MessageSquare, Play } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { featuredProject, profile, sections } from "@/lib/data";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";

const icons = {
  journey: Briefcase,
  arsenal: Cpu,
  adventures: Terminal,
  playworld: Trophy,
  contact: MessageSquare,
} as const;

export default function Home() {
  const portalSections = sections.filter((s) => s.id !== "home");

  return (
    <div className="flex flex-col">
      {/* ── Title Screen & Character Sheet ─────────────────────────────── */}
      <Hero />

      {/* ── Mission Select / Hub Grid ──────────────────────────────────── */}
      <section
        id="hub-missions"
        aria-labelledby="hub-heading"
        className="relative border-t-4 border-foreground bg-muted/30 py-20 dark:border-ring"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mb-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="retro flex items-center gap-2 text-[10px] text-accent uppercase">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2 animate-pixel-blink bg-accent"
                  />
                  Mission Select
                </p>
                <h2
                  id="hub-heading"
                  className="retro text-pixel mt-3 text-xl text-foreground sm:text-2xl lg:text-3xl uppercase"
                >
                  Explore The Portfolio
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                  Each realm contains detailed deep-dives, interactive inspect tools, and full logs.
                </p>
              </div>

              <Badge variant="outline" className="retro text-[8px] uppercase">
                <Sparkles className="mr-1 size-2.5" />
                5 Realms Online
              </Badge>
            </div>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portalSections.map((section, index) => {
              const Icon = icons[section.id as keyof typeof icons] || Terminal;
              return (
                <Reveal key={section.id} delay={0.05 * index} className="h-full">
                  <Link href={section.href} className="group block h-full">
                    <Card
                      font="normal"
                      className="[--card-spacing:--spacing(6)] h-full transition-all duration-150 hover:-translate-y-1 hover:border-primary hover:shadow-[6px_6px_0_0_var(--primary)]"
                    >
                      <CardContent className="flex h-full flex-col justify-between gap-6">
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="flex size-10 items-center justify-center bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground dark:bg-ring dark:text-background">
                              <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <Badge variant="secondary" className="retro text-[8px] uppercase">
                              {section.statBadge}
                            </Badge>
                          </div>

                          <div className="mt-6">
                            <p className="retro text-[9px] text-accent uppercase">
                              {section.tag}
                            </p>
                            <h3 className="retro mt-2 text-sm text-foreground transition-colors group-hover:text-primary sm:text-base">
                              {section.label}
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                              {section.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t-2 border-dashed border-border pt-4">
                          <span className="retro text-[9px] text-muted-foreground uppercase group-hover:text-foreground">
                            Enter Screen
                          </span>
                          <span className="retro flex items-center gap-1 text-[9px] font-bold text-primary transition-transform group-hover:translate-x-1">
                            Go &gt;
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Save Slot Spotlight ───────────────────────────────── */}
      <section className="border-t-4 border-foreground bg-background py-20 dark:border-ring">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="retro text-[10px] text-accent uppercase">
                  Featured Build Spotlight
                </p>
                <h2 className="retro text-pixel mt-2 text-xl text-foreground sm:text-2xl uppercase">
                  {featuredProject.name}
                </h2>
              </div>

              <Button asChild variant="outline" size="sm" className="text-[9px]">
                <Link href="/adventures">
                  All 9 Builds
                  <ArrowRight className="ml-1.5 size-3" />
                </Link>
              </Button>
            </div>

            <Card font="normal" className="[--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
              <CardContent className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="text-[8px] bg-accent text-accent-foreground">
                      Autosave
                    </Badge>
                    {featuredProject.highlight && (
                      <Badge variant="secondary" className="text-[8px]">
                        {featuredProject.highlight}
                      </Badge>
                    )}
                    <span className="retro text-[9px] text-muted-foreground uppercase">
                      Year: {featuredProject.year}
                    </span>
                  </div>

                  <p className="retro mt-4 text-xs font-bold text-primary sm:text-sm">
                    {featuredProject.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredProject.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-[8px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:items-end">
                  {featuredProject.live && (
                    <Button asChild size="lg" className="w-full text-[10px] sm:w-auto">
                      <a href={featuredProject.live} target="_blank" rel="noreferrer">
                        <Play className="mr-2 size-3.5" />
                        Launch Live App
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="outline" size="lg" className="w-full text-[10px] sm:w-auto">
                    <Link href="/adventures">
                      Inspect All Save Slots
                      <ArrowRight className="ml-2 size-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ── Ready to Join Banner ───────────────────────────────────────── */}
      <section className="border-t-4 border-foreground bg-primary py-16 text-primary-foreground dark:border-ring">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 text-center sm:px-8 md:flex-row md:text-left">
          <div>
            <p className="retro text-[10px] uppercase opacity-90">
              Player 2 Join Ready
            </p>
            <h2 className="retro mt-2 text-xl font-bold uppercase sm:text-2xl">
              Let&apos;s Build The Next Big Thing
            </h2>
            <p className="mt-2 max-w-lg text-sm text-primary-foreground/80">
              Open to internships, AI/web engineering collaborations, and hackathon teams.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-card text-[10px]"
            >
              <Link href="/contact">
                Press Start / Contact
                <ArrowRight className="ml-2 size-3.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-[10px]"
            >
              <a href={`mailto:${profile.email}`}>
                Direct Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
