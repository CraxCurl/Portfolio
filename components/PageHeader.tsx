import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";

interface PageHeaderProps {
  screenTag: string;
  title: string;
  subtitle?: string;
  lead: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
  accentColor?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  screenTag,
  title,
  subtitle,
  lead,
  badge,
  badgeVariant = "default",
  accentColor = "text-primary",
  children,
}: PageHeaderProps) {
  return (
    <div className="relative border-b-4 border-foreground bg-card/60 px-5 pt-28 pb-10 sm:px-8 sm:pt-32 sm:pb-12 dark:border-ring">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-[9px]">
              <Link href="/">
                <ArrowLeft className="mr-1.5 size-3" />
                Hub
              </Link>
            </Button>
            <span className="retro text-[9px] text-muted-foreground uppercase">
              /
            </span>
            <span className="retro inline-flex items-center gap-2 text-[9px] text-accent uppercase">
              <span
                aria-hidden="true"
                className="inline-block size-2 bg-accent"
              />
              {screenTag}
            </span>
          </div>

          {badge && (
            <Badge variant={badgeVariant} className="retro text-[8px] uppercase">
              <Sparkles className="mr-1 size-2.5" />
              {badge}
            </Badge>
          )}
        </div>

        {/* Title & Lead */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <h1
              className={cn(
                "retro text-pixel text-2xl leading-[1.3] uppercase sm:text-3xl lg:text-4xl",
                accentColor,
              )}
            >
              <span className="block text-xs sm:text-sm text-muted-foreground font-mono font-normal tracking-wider mb-2 normal-case">
                Vinayak Tripathi | AI &amp; Full Stack Developer at VIT Chennai
              </span>
              <span className="block">{title}</span>
            </h1>

            {subtitle && (
              <h2 className="retro mt-3 text-xs font-bold text-foreground uppercase sm:text-sm">
                {subtitle}
              </h2>
            )}

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {lead}
            </p>
          </div>

          {children && (
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
