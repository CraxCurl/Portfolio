import { Award, Medal, Trophy } from "lucide-react";

import { achievements, profile, stats } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/PixelIcon";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";

const trophies = [Trophy, Medal, Award];

export default function Playworld() {
  return (
    <div className="flex flex-col gap-16">
      {/* ── Hi-scores ─────────────────────────────────────────────────── */}
      <Reveal className="px-2">
        <div className="border-y-4 border-foreground dark:border-ring">
          <dl className="grid grid-cols-2 divide-x-4 divide-y-4 divide-foreground sm:grid-cols-4 sm:divide-y-0 dark:divide-ring">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-3 px-5 py-7 text-center sm:px-6"
              >
                <dd className="retro text-pixel text-xl text-primary sm:text-2xl">
                  {stat.value}
                </dd>
                <dt className="retro text-[9px] leading-relaxed text-muted-foreground uppercase">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* ── Trophies ──────────────────────────────────────────────────── */}
      <div className="grid gap-x-8 gap-y-10 px-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => {
          const Icon = trophies[index % trophies.length];

          return (
            <Reveal
              key={achievement.title}
              delay={0.05 * index}
              className="h-full"
            >
              <Card
                font="normal"
                className="[--card-spacing:--spacing(6)] h-full"
              >
                <CardContent className="flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-10 items-center justify-center bg-foreground text-background dark:bg-ring">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>

                    {achievement.stat && (
                      <Badge variant="secondary" className="text-[8px]">
                        {achievement.stat}
                      </Badge>
                    )}
                  </div>

                  <h3 className="retro text-[11px] leading-relaxed text-foreground">
                    {achievement.title}
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    <p className="retro text-[9px] leading-relaxed text-primary">
                      {achievement.org}
                    </p>
                    <p className="retro text-[9px] text-muted-foreground uppercase">
                      {achievement.period}
                    </p>
                  </div>

                  <Separator className="my-1" />

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* ── Bonus round ───────────────────────────────────────────────── */}
      <Reveal className="px-2">
        <Card font="normal" className="[--card-spacing:--spacing(6)]">
          <CardContent className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="retro text-[9px] text-accent uppercase">
                Bonus round
              </p>
              <p className="retro mt-4 text-[10px] leading-relaxed text-foreground sm:text-xs">
                Everything above ships from one place.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Repos, experiments and half finished side quests all live on
                GitHub: the commit log is the honest version of this page.
              </p>
            </div>

            <Button asChild size="lg" className="shrink-0 text-[10px]">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                <GithubIcon className="size-4" />
                Browse the repos
              </a>
            </Button>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
