import Link from "next/link";
import { profile, sections } from "@/lib/data";
import { GithubIcon, HeartIcon, LinkedinIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/8bit/button";

/**
 * Ticker elements. Exactly one copy is accessible to crawlers and screen readers;
 * all visual duplication for the seamless CSS infinite scroll is marked aria-hidden.
 */
const ticker = [
  profile.insertCoin,
  profile.name,
  profile.role,
  profile.location,
];

function TickerTrack({ isDuplicate = false }: { isDuplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={isDuplicate ? "true" : undefined}
    >
      {[0, 1, 2].map((copy) => (
        <div
          key={copy}
          className="flex items-center"
          aria-hidden={!isDuplicate && copy === 0 ? undefined : "true"}
        >
          {ticker.map((entry) => (
            <span
              key={entry}
              className="retro flex items-center gap-8 px-8 text-[9px] whitespace-nowrap text-primary-foreground uppercase"
            >
              {entry}
              <span
                aria-hidden="true"
                className="inline-block size-2 bg-primary-foreground"
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-4 border-foreground bg-card/50 dark:border-ring">
      {/* Ticker */}
      <div className="overflow-hidden border-b-4 border-foreground bg-primary py-3 dark:border-ring">
        <div className="flex w-max animate-pixel-marquee">
          <TickerTrack />
          <TickerTrack isDuplicate />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/"
              className="retro flex items-center gap-2.5 text-sm text-foreground transition-colors hover:text-primary"
            >
              <span
                aria-hidden="true"
                className="inline-block size-3 bg-accent"
              />
              {profile.logo}
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.headline}
            </p>

            <div className="mt-7 flex items-center gap-4">
              <Button asChild size="icon" variant="ghost" aria-label="GitHub profile">
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-5" />
                </a>
              </Button>
              <Button
                asChild
                size="icon"
                variant="ghost"
                aria-label="LinkedIn profile"
              >
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="size-5" />
                </a>
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:shrink-0">
            <p className="retro text-[9px] text-muted-foreground uppercase">
              Select screen
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3.5">
              {sections.map(({ id, label, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className="retro group flex items-center gap-2 text-[10px] text-foreground uppercase transition-colors hover:text-primary"
                  >
                    <span className="text-[8px] text-muted-foreground transition-colors group-hover:text-primary">
                      &gt;
                    </span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t-4 border-dashed border-foreground pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-ring">
          <p className="retro text-[9px] text-muted-foreground uppercase">
            © {new Date().getFullYear()} {profile.name} · VIT Chennai
          </p>
          <p className="retro flex items-center gap-2.5 text-[9px] text-muted-foreground uppercase">
            Built with
            <HeartIcon className="size-3.5 text-accent" />
            Next.js &amp; 8bitcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
