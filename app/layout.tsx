import type { Metadata, Viewport } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/8bit/tooltip";

/**
 * Press Start 2P is the 8bitcn display face. `components/ui/8bit/styles/retro.css`
 * reads it from `--font-press-start`, so the whole kit picks it up from here
 * rather than from the Google Fonts CDN import the registry ships with.
 */
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/** Body copy: Press Start 2P is unreadable past a few words, so prose is mono. */
const body = Geist_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const description = `${profile.role} and ${profile.headline.split("|")[0].trim()}. Building multi-agent AI systems, accessible web tooling and IoT that solves real problems.`;

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    profile.name,
    "AI developer",
    "full stack developer",
    "VIT Chennai",
    "multi-agent AI",
    "React",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  // The theme is class-driven and starts light, so this is a fixed value rather
  // than a `prefers-color-scheme` pair.
  themeColor: "#f2efe2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `suppressHydrationWarning` is required by next-themes: it writes the
    // theme class onto <html> before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(pressStart.variable, body.variable, "antialiased")}
    >
      <body className="scanlines crt-vignette min-h-dvh font-sans">
        {/* Light is the intended first impression; `enableSystem` is off so a
            dark OS preference doesn't override it. `d` toggles from anywhere. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
