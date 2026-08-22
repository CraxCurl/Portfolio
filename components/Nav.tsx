"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLeft, navRight, profile, sections, type SectionId } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { RetroModeSwitcher } from "@/components/ui/retro-mode-switcher";
import { Button } from "@/components/ui/8bit/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/8bit/sheet";

const label = (id: SectionId) =>
  sections.find((s) => s.id === id)?.label ?? id;

function NavLink({
  id,
  active,
  onNavigate,
  className,
}: {
  id: SectionId;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      onClick={onNavigate}
      aria-current={active ? "true" : undefined}
      className={cn(
        "retro relative inline-flex items-center gap-2 px-2 py-1.5 text-[10px] uppercase transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {/* The blinking selector arrow only rides along with the active item. */}
      <span
        aria-hidden="true"
        className={cn(
          "text-[10px] leading-none",
          active ? "animate-pixel-blink opacity-100" : "opacity-0",
        )}
      >
        &gt;
      </span>
      {label(id)}
    </a>
  );
}

export default function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur-sm dark:border-ring">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Wordmark */}
        <a
          href="#home"
          className="retro flex shrink-0 items-center gap-2 text-xs text-foreground sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="inline-block size-3 bg-accent animate-pixel-blink"
          />
          {profile.logo}
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {[...navLeft, ...navRight].map((id) => (
            <NavLink key={id} id={id} active={active === id} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <RetroModeSwitcher />

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="size-8"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader className="pt-8">
                <SheetTitle className="retro text-sm">
                  {profile.logo}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 pb-8">
                {sections.map(({ id }) => (
                  <NavLink
                    key={id}
                    id={id}
                    active={active === id}
                    onNavigate={() => setOpen(false)}
                    className="py-3 text-xs"
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
