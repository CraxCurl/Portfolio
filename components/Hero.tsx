import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { profile, skillGroups, stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/PixelIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/8bit/avatar";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Kbd } from "@/components/ui/8bit/kbd";
import HealthBar from "@/components/ui/8bit/health-bar";
import ManaBar from "@/components/ui/8bit/mana-bar";
import XpBar from "@/components/ui/8bit/xp-bar";
import { Progress } from "@/components/ui/8bit/progress";

/** Group averages, so the character sheet is derived from the real skill table. */
const meters = skillGroups.map((group) => ({
  title: group.title,
  value: Math.round(
    group.skills.reduce((sum, skill) => sum + skill.level, 0) /
      group.skills.length,
  ),
}));

/** Four bars, four colours: the kit ships three themed ones plus the plain Progress. */
function Meter({ index, value }: { index: number; value: number }) {
  const common = { value, variant: "retro" as const, className: "h-3" };

  if (index === 0) return <HealthBar {...common} />;
  if (index === 1) return <ManaBar {...common} />;
  if (index === 2) return <XpBar {...common} />;
  return <Progress {...common} progressBg="bg-primary" />;
}

/** Purely decorative sprites, only shown once the viewport has real gutters. */
const blocks = [
  "left-[1.5%] top-[22%] size-4 bg-primary",
  "left-[2.5%] bottom-[26%] size-3 bg-accent",
  "right-[1.5%] top-[16%] size-5 bg-secondary",
  "right-[2.5%] bottom-[30%] size-3 bg-primary",
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Backdrop */}
      <div aria-hidden="true" className="pixel-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]"
      />
      {blocks.map((block) => (
        <span
          key={block}
          aria-hidden="true"
          className={cn(
            "absolute -z-10 hidden animate-pixel-bob opacity-70 xl:block",
            block,
          )}
        />
      ))}

      <div className="mx-auto grid w-full max-w-6xl gap-16 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-12">
        {/* Title screen */}
        <div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="retro inline-flex items-center gap-2 text-[10px] text-primary uppercase">
              <span
                aria-hidden="true"
                className="inline-block size-2 bg-primary"
              />
              {profile.player}
            </span>
            <span className="retro text-[10px] text-muted-foreground uppercase">
              {profile.location}
            </span>
          </div>

          <p className="retro mt-8 text-xs text-muted-foreground uppercase sm:text-sm">
            {profile.welcome}
          </p>

          <h1
            id="home-heading"
            className="retro text-pixel mt-4 text-2xl leading-[1.35] text-foreground sm:text-4xl lg:text-[2.6rem]"
          >
            <span className="block text-xs sm:text-sm text-muted-foreground font-mono font-normal tracking-wider mb-3">
              Vinayak Tripathi | AI &amp; Full Stack Developer at VIT Chennai
            </span>
            <span className="block">{profile.titleTop}</span>
            <span className="mt-2 block text-primary">{profile.titleBottom}</span>
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <Button asChild size="lg" className="text-[10px]">
              <Link href="/adventures">
                View builds
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-[10px]">
              <Link href="/contact">Press start</Link>
            </Button>

            <div className="flex items-center gap-4">
              <Button asChild size="icon" variant="ghost" aria-label="GitHub profile">
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-5" />
                </a>
              </Button>
              <Button asChild size="icon" variant="ghost" aria-label="LinkedIn profile">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <LinkedinIcon className="size-5" />
                </a>
              </Button>
            </div>
          </div>

          <p className="retro mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-muted-foreground">
            <Kbd>D</Kbd>
            <span className="uppercase">toggles day / night</span>
            <span aria-hidden="true" className="text-primary">
              ·
            </span>
            <span className="animate-pixel-blink text-accent uppercase">
              {profile.insertCoin}
            </span>
          </p>
        </div>

        {/* Character sheet */}
        <div className="px-2">
          <Card className="[--card-spacing:--spacing(6)]">
            <CardContent className="retro flex flex-col gap-6">
              <div className="flex items-center gap-5">
                <Avatar
                  variant="retro"
                  className="size-20 shrink-0 sm:size-24"
                >
                  <AvatarImage
                    src={profile.avatar}
                    alt={`${profile.name} avatar`}
                    className="pixelated"
                  />
                  <AvatarFallback className="rounded-none text-sm">
                    VT
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="text-[11px] leading-snug text-foreground sm:text-xs">
                    {profile.name}
                  </p>
                  <p className="mt-2 text-[9px] leading-relaxed text-primary uppercase">
                    {profile.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <Badge className="text-[8px]">Lv. 2 B.Tech</Badge>
                <Badge variant="secondary" className="text-[8px]">
                  GSSoC&apos;26
                </Badge>
              </div>

              <dl className="flex flex-col gap-5">
                {meters.map((meter, index) => (
                  <div key={meter.title} className="px-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[9px] text-muted-foreground uppercase">
                        {meter.title}
                      </dt>
                      <dd className="text-[9px] text-foreground">
                        {meter.value}
                      </dd>
                    </div>
                    <div className="mt-2.5">
                      <Meter index={index} value={meter.value} />
                    </div>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* HUD score strip */}
      <div className="absolute inset-x-0 bottom-0 hidden border-t-4 border-foreground bg-card/80 backdrop-blur-sm lg:block dark:border-ring">
        <dl className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <dt className="retro text-[9px] text-muted-foreground uppercase">
                {stat.label}
              </dt>
              <dd className="retro text-xs text-primary">{stat.value}</dd>
            </div>
          ))}
          <Link
            href="/journey"
            className="retro flex items-center gap-2 text-[9px] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            Quest Log
            <ArrowRight className="size-3.5 animate-pixel-bob" aria-hidden="true" />
          </Link>
        </dl>
      </div>
    </section>
  );
}
