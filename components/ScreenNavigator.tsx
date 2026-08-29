import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { sections, type SectionId } from "@/lib/data";
import { Button } from "@/components/ui/8bit/button";

interface ScreenNavigatorProps {
  currentId: SectionId;
}

export default function ScreenNavigator({ currentId }: ScreenNavigatorProps) {
  const currentIndex = sections.findIndex((s) => s.id === currentId);
  const prevSection =
    currentIndex > 0 ? sections[currentIndex - 1] : sections[sections.length - 1];
  const nextSection =
    currentIndex < sections.length - 1 ? sections[currentIndex + 1] : sections[0];

  return (
    <nav
      aria-label="Screen Navigation"
      className="mt-16 border-t-4 border-foreground bg-card/40 py-8 dark:border-ring"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        {/* Previous screen */}
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full text-[9px] sm:w-auto"
        >
          <Link href={prevSection.href}>
            <ArrowLeft className="mr-2 size-3.5" />
            <span className="text-muted-foreground">{prevSection.tag}</span>
            <span className="font-bold">{prevSection.label}</span>
          </Link>
        </Button>

        {/* Hub link */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-[9px] text-muted-foreground uppercase hover:text-foreground"
        >
          <Link href="/">
            <LayoutGrid className="mr-1.5 size-3" />
            Mission Hub
          </Link>
        </Button>

        {/* Next screen */}
        <Button
          asChild
          size="lg"
          className="w-full text-[9px] sm:w-auto"
        >
          <Link href={nextSection.href}>
            <span className="text-primary-foreground/70">{nextSection.tag}</span>
            <span className="font-bold">{nextSection.label}</span>
            <ArrowRight className="ml-2 size-3.5" />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
