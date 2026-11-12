import type { Metadata, Viewport } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/8bit/tooltip";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Vinayak Tripathi | AI & Full Stack Developer at VIT Chennai";
const siteDescription =
  "Portfolio of Vinayak Tripathi, CSE (AI & Robotics) undergraduate at VIT Chennai. Building multi agent AI systems, accessible web tools, and IoT solutions.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourthera.xyz"),
  title: {
    default: siteTitle,
    template: `%s | Vinayak Tripathi`,
  },
  description: siteDescription,
  keywords: [
    "Vinayak Tripathi",
    "Vinayak Tripathi VIT Chennai",
    "AI Developer",
    "Full Stack Developer",
    "Multi Agent AI",
    "Next.js Portfolio",
    "CSE AI Robotics",
  ],
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourthera.xyz",
    siteName: "Vinayak Tripathi | Portfolio",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2efe2",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://yourthera.xyz/#person",
      name: "Vinayak Tripathi",
      url: "https://yourthera.xyz",
      image: profile.avatar,
      jobTitle: "AI & Full Stack Developer",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Vellore Institute of Technology Chennai",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Multi Agent Systems",
        "Full Stack Development",
        "Next.js",
        "FastAPI",
        "React",
        "IoT",
      ],
      sameAs: [
        profile.links.github,
        profile.links.linkedin,
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://yourthera.xyz/#website",
      url: "https://yourthera.xyz",
      name: "Vinayak Tripathi | AI & Full Stack Developer at VIT Chennai",
      description: siteDescription,
      publisher: {
        "@id": "https://yourthera.xyz/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(pressStart.variable, body.variable, "antialiased")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="scanlines crt-vignette min-h-dvh font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <div className="flex min-h-dvh flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
