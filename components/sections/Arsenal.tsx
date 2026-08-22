"use client";

import { Code2, Cpu, Database, Wrench } from "lucide-react";

import { skillGroups, type SkillGroup } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Progress } from "@/components/ui/8bit/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/8bit/tabs";

const icons: Record<SkillGroup["icon"], typeof Cpu> = {
  ai: Cpu,
  web: Code2,
  data: Database,
  systems: Wrench,
};

/** One fill colour per branch of the tree, so the tabs stay distinguishable. */
const fills = ["bg-primary", "bg-secondary", "bg-accent", "bg-yellow-500"];

export default function Arsenal() {
  return (
    // `font="normal"` on the root: the kit's `retro` class sets font-family,
    // line-height and letter-spacing, all of which every descendant inherits.
    // The pixel face is opted into per element instead.
    <Tabs
      font="normal"
      defaultValue={skillGroups[0].title}
      className="gap-8"
    >
      <div className="px-2">
        <TabsList className="group-data-horizontal/tabs:h-auto grid w-full grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-4">
          {skillGroups.map((group) => {
            const Icon = icons[group.icon];

            return (
              <TabsTrigger
                key={group.title}
                value={group.title}
                className="retro h-auto gap-2 px-2 py-3.5 text-[9px] leading-tight whitespace-normal uppercase data-[state=active]:text-accent-foreground"
              >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                {group.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {skillGroups.map((group, groupIndex) => (
        <TabsContent key={group.title} value={group.title} className="px-2">
          <Card font="normal" className="[--card-spacing:--spacing(6)]">
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {group.blurb}
                </p>
                <p className="retro shrink-0 text-[9px] text-muted-foreground uppercase">
                  {group.skills.length} skills
                </p>
              </div>

              <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="px-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="retro text-[9px] leading-relaxed text-foreground">
                        {skill.name}
                      </dt>
                      <dd className="retro shrink-0 text-[9px] text-muted-foreground">
                        {skill.level}
                      </dd>
                    </div>

                    <div className="mt-3">
                      <Progress
                        value={skill.level}
                        variant="retro"
                        progressBg={fills[groupIndex % fills.length]}
                        className="h-3"
                        aria-label={`${skill.name} confidence`}
                      />
                    </div>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
