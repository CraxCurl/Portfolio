"use client";

import { useState } from "react";
import { Code2, Cpu, Database, Wrench, Search, Zap } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ScreenNavigator from "@/components/ScreenNavigator";
import Reveal from "@/components/Reveal";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
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

const fills = ["bg-primary", "bg-secondary", "bg-accent", "bg-yellow-500"];

export default function ArsenalClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  const filteredGroups = skillGroups.map((group) => ({
    ...group,
    skills: group.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    ),
  }));

  const hasSearch = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen">
      <PageHeader
        screenTag="SKILL TREE // SCREEN 03"
        title="The Skill Tree"
        subtitle="Arsenal: Technical Skills & Machine Learning Proficiency"
        lead="Four branches, thirty plus nodes. The bars represent self assessed confidence and hands on depth."
        badge={`${totalSkills} Skills Categorized`}
        accentColor="text-secondary"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="retro text-[8px] uppercase">
            <Zap className="mr-1 size-2.5 text-accent" />
            AI &amp; Full Stack
          </Badge>
          <Badge variant="secondary" className="retro text-[8px] uppercase">
            MERN + Python
          </Badge>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Search & Filter Toolbar */}
        <Reveal className="mb-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search skills (e.g. Python, React, WebSockets)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            {hasSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="text-[9px] uppercase"
              >
                Clear Search
              </Button>
            )}
          </div>
        </Reveal>

        {/* If user is searching, show all matched skills in a flat or grouped view */}
        {hasSearch ? (
          <div className="flex flex-col gap-8">
            {filteredGroups.map((group, groupIndex) => {
              if (group.skills.length === 0) return null;
              const Icon = icons[group.icon];

              return (
                <Card key={group.title} font="normal" className="[--card-spacing:--spacing(6)]">
                  <CardContent className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b-2 border-dashed border-border pb-3">
                      <span className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
                        <Icon className="size-3.5" />
                      </span>
                      <h3 className="retro text-xs font-bold uppercase">{group.title}</h3>
                      <Badge variant="outline" className="ml-auto text-[8px]">
                        {group.skills.length} Matches
                      </Badge>
                    </div>

                    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="px-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="retro text-[9px] text-foreground font-bold">
                              {skill.name}
                            </dt>
                            <dd className="retro text-[9px] text-muted-foreground">
                              {skill.level}%
                            </dd>
                          </div>
                          <div className="mt-2.5">
                            <Progress
                              value={skill.level}
                              variant="retro"
                              progressBg={fills[groupIndex % fills.length]}
                              className="h-3"
                            />
                          </div>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Normal Tabbed View */
          <Tabs font="normal" defaultValue={skillGroups[0].title} className="gap-8">
            <div className="px-1">
              <TabsList className="group-data-horizontal/tabs:h-auto grid w-full grid-cols-2 gap-2 p-1.5 sm:grid-cols-4">
                {skillGroups.map((group) => {
                  const Icon = icons[group.icon];
                  return (
                    <TabsTrigger
                      key={group.title}
                      value={group.title}
                      className="retro h-auto gap-2 px-3 py-4 text-[9px] leading-tight uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                    >
                      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      {group.title}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {skillGroups.map((group, groupIndex) => (
              <TabsContent key={group.title} value={group.title} className="mt-6 px-1">
                <Card font="normal" className="[--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
                  <CardContent className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b-2 border-dashed border-border pb-4">
                      <div>
                        <p className="retro text-[10px] text-accent uppercase">Branch Description</p>
                        <p className="mt-1 text-sm text-foreground/90 font-medium">{group.blurb}</p>
                      </div>
                      <Badge variant="secondary" className="retro text-[8px] uppercase">
                        {group.skills.length} Nodes Active
                      </Badge>
                    </div>

                    <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col gap-2 rounded border border-border/50 bg-background/50 p-4">
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="retro text-[10px] font-bold text-foreground">
                              {skill.name}
                            </dt>
                            <dd className="retro text-[9px] text-primary font-bold">
                              {skill.level} XP
                            </dd>
                          </div>

                          <div className="mt-2">
                            <Progress
                              value={skill.level}
                              variant="retro"
                              progressBg={fills[groupIndex % fills.length]}
                              className="h-3.5"
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
        )}

        {/* Weaponry & Tooling Breakdown */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card font="normal" className="border-2 border-border p-5">
            <h4 className="retro text-[10px] text-primary uppercase">Multi Agent Architecture</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Autonomous agent orchestration, state machines, tool use, GNNs, and vector retrieval.
            </p>
          </Card>
          <Card font="normal" className="border-2 border-border p-5">
            <h4 className="retro text-[10px] text-secondary uppercase">Full Stack Web</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              Next.js 16, React 19, TypeScript, Tailwind CSS, Node.js, Express, REST APIs, FastAPI.
            </p>
          </Card>
          <Card font="normal" className="border-2 border-border p-5">
            <h4 className="retro text-[10px] text-accent uppercase">Systems &amp; Hardware</h4>
            <p className="mt-2 text-xs text-muted-foreground">
              ESP32 IoT microcontrollers, GPS modules, Linux CLI, Git &amp; GitHub, Vercel deployments.
            </p>
          </Card>
        </div>
      </div>

      <ScreenNavigator currentId="arsenal" />
    </div>
  );
}
