"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, Sparkles, Filter, CheckCircle2, Clock } from "lucide-react";
import { about, timeline, type TimelineItem } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ScreenNavigator from "@/components/ScreenNavigator";
import Reveal from "@/components/Reveal";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/8bit/accordion";

function QuestIcon({ kind }: { kind: TimelineItem["kind"] }) {
  const Icon = kind === "education" ? GraduationCap : Briefcase;

  return (
    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center bg-foreground text-background dark:bg-ring dark:text-background">
      <Icon className="size-3.5" aria-hidden="true" />
    </span>
  );
}

export default function JourneyClient() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");

  const filteredTimeline = timeline.filter((item) => {
    if (filter === "all") return true;
    return item.kind === filter;
  });

  const openByDefault = timeline
    .map((item, index) => (item.current ? `quest-${index}` : null))
    .filter((value): value is string => value !== null);

  const activeCount = timeline.filter((t) => t.current).length;
  const clearedCount = timeline.length - activeCount;

  return (
    <div className="min-h-screen">
      <PageHeader
        screenTag="QUEST LOG // SCREEN 02"
        title="The Quest Log"
        lead="Roles, clubs and coursework in the order they happened — expand a quest for full detail."
        badge={`${activeCount} Active · ${clearedCount} Cleared`}
        accentColor="text-primary"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="retro text-[8px] uppercase">
            <Clock className="mr-1 size-2.5" />
            2025 — 2026
          </Badge>
          <Badge variant="secondary" className="retro text-[8px] uppercase">
            <Sparkles className="mr-1 size-2.5" />
            VIT Chennai
          </Badge>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* ── Left Column: Briefing & Summary ─────────────────────────── */}
          <div className="flex flex-col gap-8">
            <Reveal className="px-2 lg:px-0">
              <div className="lg:sticky lg:top-28">
                <Card font="normal" className="[--card-spacing:--spacing(6)]">
                  <CardContent className="flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
                      <p className="retro text-[10px] text-accent uppercase">
                        Mission Briefing
                      </p>
                      <Badge className="text-[8px]">Undergrad</Badge>
                    </div>

                    <h2 className="retro text-xs leading-relaxed text-foreground sm:text-sm">
                      {about.lead}
                    </h2>

                    {about.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}

                    <div className="border-t-2 border-dashed border-border pt-4">
                      <p className="retro mb-3 text-[9px] text-muted-foreground uppercase">
                        Quick Milestones
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border-2 border-border p-2.5">
                          <p className="retro text-xs font-bold text-primary">GSSoC&apos;26</p>
                          <p className="retro text-[8px] text-muted-foreground uppercase">AI / Agents Track</p>
                        </div>
                        <div className="border-2 border-border p-2.5">
                          <p className="retro text-xs font-bold text-primary">2 Clubs</p>
                          <p className="retro text-[8px] text-muted-foreground uppercase">Robotics &amp; Android</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Interactive Quest Log ──────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Filter bar */}
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border pb-4">
                <div className="flex items-center gap-1.5">
                  <Filter className="size-3.5 text-muted-foreground" />
                  <span className="retro text-[9px] text-muted-foreground uppercase">
                    Filter:
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <Button
                    size="sm"
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    className="h-7 text-[8px] uppercase"
                  >
                    All ({timeline.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={filter === "work" ? "default" : "outline"}
                    onClick={() => setFilter("work")}
                    className="h-7 text-[8px] uppercase"
                  >
                    Work &amp; Clubs ({timeline.filter((t) => t.kind === "work").length})
                  </Button>
                  <Button
                    size="sm"
                    variant={filter === "education" ? "default" : "outline"}
                    onClick={() => setFilter("education")}
                    className="h-7 text-[8px] uppercase"
                  >
                    Education ({timeline.filter((t) => t.kind === "education").length})
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Quests Accordion */}
            <Reveal delay={0.1}>
              <Accordion
                type="multiple"
                defaultValue={openByDefault}
                className="gap-4"
              >
                {filteredTimeline.map((item, index) => (
                  <AccordionItem
                    key={`${item.org}-${item.role}`}
                    value={`quest-${index}`}
                    className="border-2 border-border bg-card/40 p-2"
                  >
                    <AccordionTrigger className="items-start gap-4 py-4 text-[10px] uppercase hover:no-underline sm:text-[11px]">
                      <span className="flex min-w-0 items-start gap-4">
                        <QuestIcon kind={item.kind} />

                        <span className="flex min-w-0 flex-col gap-2 text-left">
                          <span className="leading-relaxed font-bold text-foreground">
                            {item.role}
                          </span>
                          <span className="text-[9px] leading-relaxed text-primary normal-case">
                            {item.org}
                          </span>
                        </span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent font="normal" className="pl-11 pr-4 pb-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-dashed border-border pb-3">
                        <Badge
                          variant={item.current ? "default" : "secondary"}
                          className="text-[8px]"
                        >
                          {item.current ? (
                            <>
                              <Clock className="mr-1 size-2.5" />
                              In Progress
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-1 size-2.5" />
                              Cleared
                            </>
                          )}
                        </Badge>
                        <span className="retro text-[9px] text-muted-foreground uppercase">
                          {item.period}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                        {item.summary}
                      </p>

                      <p className="retro mt-4 text-[9px] text-muted-foreground">
                        Location: {item.meta}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>

      <ScreenNavigator currentId="journey" />
    </div>
  );
}
