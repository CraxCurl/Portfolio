import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/data";
import Reveal from "@/components/Reveal";

/**
 * Shared frame for every non-hero section: an arcade "screen name" caption,
 * a pixel heading, an optional lead paragraph, then the body.
 */
export default function PixelSection({
  id,
  screen,
  title,
  lead,
  children,
  className,
}: {
  id: SectionId;
  screen: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("relative border-t-4 border-foreground dark:border-ring", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <p className="retro flex items-center gap-3 text-[10px] text-primary uppercase sm:text-xs">
            <span aria-hidden="true" className="inline-block size-2 bg-primary" />
            {screen}
          </p>

          <h2
            id={`${id}-heading`}
            className="retro mt-5 text-2xl leading-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {title}
          </h2>

          {lead && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {lead}
            </p>
          )}
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
