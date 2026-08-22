import { Briefcase, GraduationCap } from "lucide-react";

import { about, timeline, type TimelineItem } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { Badge } from "@/components/ui/8bit/badge";
import { Card, CardContent } from "@/components/ui/8bit/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/8bit/accordion";

/** Both in-progress roles start expanded so the log reads as "live". */
const openByDefault = timeline
  .map((item, index) => (item.current ? `quest-${index}` : null))
  .filter((value): value is string => value !== null);

function QuestIcon({ kind }: { kind: TimelineItem["kind"] }) {
  const Icon = kind === "education" ? GraduationCap : Briefcase;

  return (
    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center bg-foreground text-background dark:bg-ring dark:text-background">
      <Icon className="size-3.5" aria-hidden="true" />
    </span>
  );
}

export default function Journey() {
  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      {/* ── Briefing ───────────────────────────────────────────────────── */}
      <Reveal className="px-2 lg:px-0">
        <div className="lg:sticky lg:top-28">
          {/* `font="normal"` keeps the pixel face off body copy — the kit puts
              `retro` on the card root, which every child would inherit. */}
          <Card font="normal" className="[--card-spacing:--spacing(6)]">
            <CardContent className="flex flex-col gap-5">
              <p className="retro text-[10px] text-accent uppercase">Briefing</p>

              <p className="retro text-xs leading-relaxed text-foreground sm:text-sm">
                {about.lead}
              </p>

              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </Reveal>

      {/* ── Quest log ──────────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <p className="retro mb-6 flex items-center justify-between gap-4 text-[10px] text-muted-foreground uppercase">
          <span>Quests · {timeline.length}</span>
          <span className="text-primary">
            {timeline.filter((item) => item.current).length} active
          </span>
        </p>

        <Accordion type="multiple" defaultValue={openByDefault} className="gap-0">
          {timeline.map((item, index) => (
            <AccordionItem
              key={`${item.org}-${item.role}`}
              value={`quest-${index}`}
              className="border-dashed"
            >
              <AccordionTrigger className="items-start gap-4 py-5 text-[10px] uppercase hover:no-underline sm:text-[11px]">
                <span className="flex min-w-0 items-start gap-4">
                  <QuestIcon kind={item.kind} />

                  <span className="flex min-w-0 flex-col gap-2 text-left">
                    <span className="leading-relaxed text-foreground">
                      {item.role}
                    </span>
                    <span className="text-[9px] leading-relaxed text-primary normal-case">
                      {item.org}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent font="normal" className="pl-11">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Badge
                    variant={item.current ? "default" : "outline"}
                    className="text-[8px]"
                  >
                    {item.current ? "In progress" : "Cleared"}
                  </Badge>
                  <span className="retro text-[9px] text-muted-foreground uppercase">
                    {item.period}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>

                <p className="retro mt-4 text-[9px] text-muted-foreground/80">
                  {item.meta}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  );
}
