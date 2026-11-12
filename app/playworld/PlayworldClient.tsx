"use client";

import { Award, Medal, Trophy, Sparkles, Star } from "lucide-react";
import { achievements, profile, stats } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ScreenNavigator from "@/components/ScreenNavigator";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/PixelIcon";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Separator } from "@/components/ui/8bit/separator";

const trophies = [Trophy, Medal, Award];

export default function PlayworldClient() {
  return (
    <div className="min-h-screen">
      <PageHeader
        screenTag="TROPHY ROOM // SCREEN 05"
        title="The Trophy Room"
        subtitle="Playworld: Hackathon Achievements & Open Source Selections"
        lead="Selections, hackathon runs and certifications worth putting on the shelf."
        badge="Accredited Honors"
        accentColor="text-yellow-500"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="retro text-[8px] uppercase">
            <Star className="mr-1 size-2.5 text-yellow-500" />
            Hall of Fame
          </Badge>
          <Badge variant="secondary" className="retro text-[8px] uppercase">
            35,000+ Pool
          </Badge>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* High Scores Strip */}
        <Reveal className="mb-14">
          <div className="border-4 border-foreground bg-card/60 dark:border-ring">
            <div className="border-b-2 border-foreground bg-muted/50 px-4 py-2 dark:border-ring">
              <p className="retro text-[9px] text-accent uppercase font-bold">
                HIGH SCORE LEADERBOARD // STAT TRACKER
              </p>
            </div>
            <dl className="grid grid-cols-2 divide-x-2 divide-y-2 divide-foreground sm:grid-cols-4 sm:divide-y-0 dark:divide-ring">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 p-6 text-center"
                >
                  <dd className="retro text-pixel text-2xl font-bold text-primary sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dt className="retro text-[9px] uppercase text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Trophy Cards Grid */}
        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="retro text-xs font-bold uppercase text-foreground sm:text-sm">
              Major Accolades &amp; Certifications
            </h2>
            <Badge variant="outline" className="text-[8px]">
              {achievements.length} Items
            </Badge>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {achievements.map((achievement, index) => {
              const Icon = trophies[index % trophies.length];

              return (
                <Reveal
                  key={achievement.title}
                  delay={0.08 * index}
                  className="h-full"
                >
                  <Card
                    font="normal"
                    className="[--card-spacing:--spacing(6)] h-full border-2 border-border transition-all duration-150 hover:-translate-y-1 hover:border-primary hover:shadow-[4px_4px_0_0_var(--primary)]"
                  >
                    <CardContent className="flex h-full flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex size-11 items-center justify-center bg-primary text-primary-foreground">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>

                          {achievement.stat && (
                            <Badge variant="secondary" className="retro text-[8px] uppercase">
                              {achievement.stat}
                            </Badge>
                          )}
                        </div>

                        <h3 className="retro mt-5 text-xs font-bold leading-relaxed text-foreground sm:text-sm">
                          {achievement.title}
                        </h3>

                        <div className="mt-3 flex flex-col gap-1.5 border-l-2 border-primary/50 pl-3">
                          <p className="retro text-[9px] font-bold text-primary">
                            {achievement.org}
                          </p>
                          <p className="retro text-[8px] text-muted-foreground uppercase">
                            {achievement.period}
                          </p>
                        </div>

                        <Separator className="my-4" />

                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 border-t border-dashed border-border pt-3">
                        <Sparkles className="size-3 text-accent" />
                        <span className="retro text-[8px] text-accent uppercase">
                          Verified Milestone
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bonus Round Card */}
        <Reveal>
          <Card font="normal" className="border-2 border-foreground dark:border-ring">
            <CardContent className="flex flex-col items-start justify-between gap-8 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="retro text-[9px] text-accent uppercase font-bold">
                  Bonus Round // Open Source Commits
                </p>
                <h3 className="retro mt-2 text-xs font-bold uppercase text-foreground sm:text-sm">
                  Everything ships from public repositories
                </h3>
                <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  Multi agent experiments, browser extensions, IoT firmware, and game clones are open for inspection on GitHub.
                </p>
              </div>

              <Button asChild size="lg" className="shrink-0 text-[10px]">
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon className="mr-2 size-4" />
                  Explore GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <ScreenNavigator currentId="playworld" />
    </div>
  );
}
