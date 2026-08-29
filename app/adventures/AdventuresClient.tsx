"use client";

import { useState } from "react";
import { ArrowUpRight, Play, Sparkles, Filter } from "lucide-react";
import { featuredProject, projects, type Project, type ProjectCategory } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import ScreenNavigator from "@/components/ScreenNavigator";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/PixelIcon";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { cn } from "@/lib/utils";

const accents: Record<Project["accent"], { text: string; block: string; border: string }> = {
  pink: { text: "text-accent", block: "bg-accent", border: "hover:border-accent" },
  lime: { text: "text-primary", block: "bg-primary", border: "hover:border-primary" },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    block: "bg-sky-600 dark:bg-sky-400",
    border: "hover:border-sky-500",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    block: "bg-violet-600 dark:bg-violet-400",
    border: "hover:border-violet-500",
  },
  amber: {
    text: "text-yellow-600 dark:text-yellow-400",
    block: "bg-yellow-600 dark:bg-yellow-400",
    border: "hover:border-yellow-500",
  },
};

const slot = (index: number) => `Slot ${String(index + 1).padStart(2, "0")}`;

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <Badge variant="outline" className="text-[8px]">
            {tech}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectDialog({
  project,
  index,
  children,
}: {
  project: Project;
  index: number;
  children: React.ReactNode;
}) {
  const accent = accents[project.accent];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        font="normal"
        className="max-h-[85dvh] overflow-y-auto sm:max-w-2xl"
      >
        <DialogHeader className="gap-4 text-left">
          <p className="retro flex items-center gap-3 text-[9px] text-muted-foreground uppercase">
            <span aria-hidden="true" className={cn("size-2", accent.block)} />
            {slot(index)} · {project.year}
          </p>

          <DialogTitle className={cn("retro text-base sm:text-lg", accent.text)}>
            {project.name}
          </DialogTitle>

          <DialogDescription className="retro text-[10px] leading-relaxed text-foreground">
            {project.tagline}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-col gap-6">
          <div>
            <p className="retro mb-3 text-[9px] text-muted-foreground uppercase">
              Technology Stack
            </p>
            <StackList stack={project.stack} />
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t-2 border-dashed border-border pt-4">
            {project.live && (
              <Button asChild size="sm" className="text-[9px]">
                <a href={project.live} target="_blank" rel="noreferrer">
                  <Play className="mr-1.5 size-3" aria-hidden="true" />
                  Launch Live Demo
                </a>
              </Button>
            )}

            {project.repo && (
              <Button asChild size="sm" variant="outline" className="text-[9px]">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GithubIcon className="mr-1.5 size-3.5" />
                  Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdventuresClient() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProjectCategory>("all");

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "all") return true;
    return project.category === selectedCategory;
  });

  return (
    <div className="min-h-screen">
      <PageHeader
        screenTag="SAVE SLOTS // SCREEN 04"
        title="The Save Slots"
        lead="Nine builds, from multi-agent AI career copilots to hardware emergency SOS systems. Most are live and testable."
        badge={`${projects.length} Shipped Projects`}
        accentColor="text-accent"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="retro text-[8px] uppercase">
            <Sparkles className="mr-1 size-2.5" />
            5 Live Deployments
          </Badge>
          <Badge variant="secondary" className="retro text-[8px] uppercase">
            Full Open Source
          </Badge>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {/* ── Category Filter Pills ───────────────────────────────────── */}
        <Reveal className="mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border pb-5">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              <span className="retro text-[9px] text-muted-foreground uppercase">
                Filter Category:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="h-8 text-[8px] uppercase"
              >
                All ({projects.length})
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === "ai" ? "default" : "outline"}
                onClick={() => setSelectedCategory("ai")}
                className="h-8 text-[8px] uppercase"
              >
                AI &amp; Multi-Agent ({projects.filter((p) => p.category === "ai").length})
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === "web" ? "default" : "outline"}
                onClick={() => setSelectedCategory("web")}
                className="h-8 text-[8px] uppercase"
              >
                Web &amp; Full-Stack ({projects.filter((p) => p.category === "web").length})
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === "hardware" ? "default" : "outline"}
                onClick={() => setSelectedCategory("hardware")}
                className="h-8 text-[8px] uppercase"
              >
                Hardware &amp; IoT ({projects.filter((p) => p.category === "hardware").length})
              </Button>
              <Button
                size="sm"
                variant={selectedCategory === "tools" ? "default" : "outline"}
                onClick={() => setSelectedCategory("tools")}
                className="h-8 text-[8px] uppercase"
              >
                Games &amp; Tools ({projects.filter((p) => p.category === "tools").length})
              </Button>
            </div>
          </div>
        </Reveal>

        {/* ── Featured Save Slot Banner (When on All) ──────────────────── */}
        {selectedCategory === "all" && (
          <Reveal className="mb-14">
            <Card
              font="normal"
              className="[--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)] border-2 border-accent"
            >
              <CardContent className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="retro flex items-center gap-2 text-[9px] text-accent uppercase font-bold">
                      <span aria-hidden="true" className="size-2.5 animate-pixel-blink bg-accent" />
                      Slot 01 · Primary Save
                    </p>
                    {featuredProject.highlight && (
                      <Badge className="text-[8px] bg-accent text-accent-foreground">
                        {featuredProject.highlight}
                      </Badge>
                    )}
                    <span className="retro text-[9px] text-muted-foreground">
                      Year: {featuredProject.year}
                    </span>
                  </div>

                  <h3 className="retro mt-5 text-xl font-bold uppercase text-accent sm:text-2xl">
                    {featuredProject.name}
                  </h3>

                  <p className="retro mt-2 text-xs font-bold text-foreground sm:text-sm">
                    {featuredProject.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-6 border-t-2 border-dashed border-border pt-6 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-10">
                  <div>
                    <p className="retro mb-3 text-[9px] text-muted-foreground uppercase">
                      Architecture &amp; Loadout
                    </p>
                    <StackList stack={featuredProject.stack} />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {featuredProject.live && (
                      <Button asChild size="sm" className="text-[9px]">
                        <a href={featuredProject.live} target="_blank" rel="noreferrer">
                          <Play className="mr-1.5 size-3" />
                          Launch App
                        </a>
                      </Button>
                    )}

                    {featuredProject.repo && (
                      <Button asChild size="sm" variant="outline" className="text-[9px]">
                        <a href={featuredProject.repo} target="_blank" rel="noreferrer">
                          <GithubIcon className="mr-1.5 size-3.5" />
                          GitHub Repo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        )}

        {/* ── Project Cards Grid ───────────────────────────────────────── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const index = projects.indexOf(project);
            const accent = accents[project.accent];

            return (
              <Reveal key={project.name} delay={0.05 * (index % 3)} className="h-full">
                <Card
                  font="normal"
                  className={cn(
                    "[--card-spacing:--spacing(6)] h-full flex flex-col justify-between border-2 transition-all duration-150 hover:-translate-y-1",
                    accent.border,
                  )}
                >
                  <CardContent className="flex h-full flex-col justify-between gap-6">
                    <div>
                      {/* Top meta */}
                      <div className="flex items-start justify-between gap-3">
                        <p className="retro flex items-center gap-2 text-[9px] text-muted-foreground uppercase">
                          <span aria-hidden="true" className={cn("size-2", accent.block)} />
                          {slot(index)}
                        </p>
                        <Badge variant="outline" className="retro text-[8px]">
                          {project.year}
                        </Badge>
                      </div>

                      {/* Title & Tagline */}
                      <div className="mt-4">
                        <h3 className={cn("retro text-sm font-bold uppercase sm:text-base", accent.text)}>
                          {project.name}
                        </h3>
                        <p className="retro mt-2 text-[9px] leading-relaxed text-foreground font-semibold">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer loadout & action buttons */}
                    <div className="flex flex-col gap-4 border-t border-dashed border-border pt-4">
                      <StackList stack={project.stack.slice(0, 3)} />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <ProjectDialog project={project} index={index}>
                          <Button size="sm" variant="outline" className="h-7 text-[8px] uppercase">
                            Details
                            <ArrowUpRight className="ml-1 size-3" />
                          </Button>
                        </ProjectDialog>

                        <div className="flex items-center gap-2">
                          {project.live && (
                            <Button asChild size="sm" className="h-7 text-[8px] uppercase">
                              <a href={project.live} target="_blank" rel="noreferrer">
                                <Play className="mr-1 size-2.5" />
                                Live
                              </a>
                            </Button>
                          )}

                          {project.repo && (
                            <Button asChild size="sm" variant="ghost" className="h-7 px-2">
                              <a href={project.repo} target="_blank" rel="noreferrer" aria-label="Source code">
                                <GithubIcon className="size-3.5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>

      <ScreenNavigator currentId="adventures" />
    </div>
  );
}
