import { profile, sections } from "@/lib/data";
import { GithubIcon, HeartIcon, LinkedinIcon } from "@/components/PixelIcon";
import { Button } from "@/components/ui/8bit/button";

/** Repeated once per track; the track itself is rendered twice for the loop. */
const ticker = [
  profile.insertCoin,
  profile.name,
  profile.role,
  profile.location,
];

function TickerTrack() {
  return (
    <div className="flex shrink-0 items-center">
      {[0, 1, 2].map((copy) =>
        ticker.map((entry) => (
          <span
            key={`${copy}-${entry}`}
            className="retro flex items-center gap-8 px-8 text-[9px] whitespace-nowrap text-primary-foreground uppercase"
          >
            {entry}
            <span aria-hidden="true" className="inline-block size-2 bg-primary-foreground" />
          </span>
        )),
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-4 border-foreground dark:border-ring">
      {/* Ticker */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-b-4 border-foreground bg-primary py-3 dark:border-ring"
      >
        <div className="flex w-max animate-pixel-marquee">
          <TickerTrack />
          <TickerTrack />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="retro flex items-center gap-2.5 text-sm text-foreground">
              <span
                aria-hidden="true"
                className="inline-block size-3 bg-accent"
              />
              {profile.logo}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.headline}
            </p>

            <div className="mt-7 flex items-center gap-6">
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
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="retro text-[10px] text-foreground uppercase transition-colors hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t-4 border-dashed border-foreground pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-ring">
          <p className="retro text-[9px] text-muted-foreground uppercase">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="retro flex items-center gap-2.5 text-[9px] text-muted-foreground uppercase">
            Built with
            <HeartIcon className="size-3.5 animate-pixel-blink text-accent" />
            Next.js &amp; 8bitcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
