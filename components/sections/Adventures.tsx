"use client";

import { ArrowUpRight, Play } from "lucide-react";

import { featuredProject, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
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

/** Per-project accent, kept legible in both themes. */
const accents: Record<Project["accent"], { text: string; block: string }> = {
  pink: { text: "text-accent", block: "bg-accent" },
  lime: { text: "text-primary", block: "bg-primary" },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    block: "bg-sky-600 dark:bg-sky-400",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    block: "bg-violet-600 dark:bg-violet-400",
  },
  amber: {
    text: "text-yellow-600 dark:text-yellow-400",
    block: "bg-yellow-600 dark:bg-yellow-400",
  },
};

const slot = (index: number) => `Slot ${String(index + 1).padStart(2, "0")}`;

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3">
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

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      {project.live && (
        <Button asChild size="sm" className="text-[9px]">
          <a href={project.live} target="_blank" rel="noreferrer">
            <Play className="size-3" aria-hidden="true" />
            Play live
          </a>
        </Button>
      )}

      {project.repo && (
        <Button asChild size="sm" variant="outline" className="text-[9px]">
          <a href={project.repo} target="_blank" rel="noreferrer">
            <GithubIcon className="size-3.5" />
            Source
          </a>
        </Button>
      )}
    </div>
  );
}

/** Full write-up lives behind a dialog so the grid stays scannable. */
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

          <DialogTitle className={cn("retro text-sm sm:text-base", accent.text)}>
            {project.name}
          </DialogTitle>

          <DialogDescription className="retro text-[10px] leading-relaxed text-foreground">
            {project.tagline}
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-2 flex flex-col gap-6">
          <StackList stack={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accents[project.accent];

  return (
    <Card font="normal" className="[--card-spacing:--spacing(6)] h-full">
      <CardContent className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <p className="retro flex items-center gap-2.5 text-[9px] text-muted-foreground uppercase">
            <span aria-hidden="true" className={cn("size-2", accent.block)} />
            {slot(index)}
          </p>
          <p className="retro text-[9px] text-muted-foreground">
            {project.year}
          </p>
        </div>

        <div>
          <h3
            className={cn(
              "retro text-xs leading-relaxed sm:text-sm",
              accent.text,
            )}
          >
            {project.name}
          </h3>
          <p className="retro mt-3 text-[9px] leading-relaxed text-foreground">
            {project.tagline}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto flex flex-col gap-6 pt-2">
          <StackList stack={project.stack.slice(0, 3)} />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ProjectDialog project={project} index={index}>
              <Button size="sm" variant="outline" className="text-[9px]">
                Read log
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </Button>
            </ProjectDialog>

            {project.live && (
              <Button asChild size="sm" className="text-[9px]">
                <a href={project.live} target="_blank" rel="noreferrer">
                  <Play className="size-3" aria-hidden="true" />
                  Live
                </a>
              </Button>
            )}

            {!project.live && project.repo && (
              <Button asChild size="sm" className="text-[9px]">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-3.5" />
                  Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Adventures() {
  const featuredIndex = projects.indexOf(featuredProject);
  const rest = projects.filter((project) => project !== featuredProject);
  const accent = accents[featuredProject.accent];

  return (
    <div className="flex flex-col gap-14">
      {/* ── Featured save ─────────────────────────────────────────────── */}
      <Reveal className="px-2">
        <Card
          font="normal"
          className="[--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]"
        >
          <CardContent className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="retro flex items-center gap-2.5 text-[9px] text-muted-foreground uppercase">
                  <span
                    aria-hidden="true"
                    className={cn("size-2", accent.block)}
                  />
                  {slot(featuredIndex)} · Autosave
                </p>
                {featuredProject.highlight && (
                  <Badge className="text-[8px]">
                    {featuredProject.highlight}
                  </Badge>
                )}
              </div>

              <h3
                className={cn(
                  "retro mt-7 text-base leading-relaxed sm:text-xl",
                  accent.text,
                )}
              >
                {featuredProject.name}
              </h3>

              <p className="retro mt-4 text-[10px] leading-relaxed text-foreground sm:text-xs">
                {featuredProject.tagline}
              </p>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {featuredProject.description}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <p className="retro mb-5 text-[9px] text-muted-foreground uppercase">
                  Loadout
                </p>
                <StackList stack={featuredProject.stack} />
              </div>

              <ProjectLinks project={featuredProject} />
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* ── Remaining saves ───────────────────────────────────────────── */}
      <div className="grid gap-x-8 gap-y-10 px-2 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <Reveal
            key={project.name}
            delay={0.05 * (projects.indexOf(project) % 3)}
            className="h-full"
          >
            <ProjectCard project={project} index={projects.indexOf(project)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
