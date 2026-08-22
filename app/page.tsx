import { sections } from "@/lib/data";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PixelSection from "@/components/PixelSection";
import Footer from "@/components/Footer";
import Journey from "@/components/sections/Journey";
import Arsenal from "@/components/sections/Arsenal";
import Adventures from "@/components/sections/Adventures";
import Playworld from "@/components/sections/Playworld";
import Contact from "@/components/sections/Contact";

/** Section copy lives next to the layout; everything else comes from `lib/data`. */
const screens = {
  journey: {
    title: "The quest log",
    lead: "Roles, clubs and coursework in the order they happened — expand a quest for the detail.",
  },
  arsenal: {
    title: "Skill tree",
    lead: "Four branches, thirty-odd nodes. The bars are self-assessed confidence, not a benchmark.",
  },
  adventures: {
    title: "Save slots",
    lead: "Nine builds, from multi-agent AI platforms to hardware that fires an SOS. Most are live.",
  },
  playworld: {
    title: "Trophy room",
    lead: "Selections, hackathon runs and certifications worth putting on the shelf.",
  },
  contact: {
    title: "Player 2, join?",
    lead: "Internships, collaborations, or a problem you can't stop thinking about — all welcome.",
  },
} as const;

const screen = (id: keyof typeof screens) =>
  sections.find((section) => section.id === id)?.screen ?? "";

export default function Home() {
  return (
    <>
      <a
        href="#journey"
        className="retro sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:bg-primary focus:px-5 focus:py-3 focus:text-[10px] focus:text-primary-foreground focus:uppercase"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />

        <PixelSection
          id="journey"
          screen={screen("journey")}
          title={screens.journey.title}
          lead={screens.journey.lead}
        >
          <Journey />
        </PixelSection>

        <PixelSection
          id="arsenal"
          screen={screen("arsenal")}
          title={screens.arsenal.title}
          lead={screens.arsenal.lead}
          className="bg-muted/40"
        >
          <Arsenal />
        </PixelSection>

        <PixelSection
          id="adventures"
          screen={screen("adventures")}
          title={screens.adventures.title}
          lead={screens.adventures.lead}
        >
          <Adventures />
        </PixelSection>

        <PixelSection
          id="playworld"
          screen={screen("playworld")}
          title={screens.playworld.title}
          lead={screens.playworld.lead}
          className="bg-muted/40"
        >
          <Playworld />
        </PixelSection>

        <PixelSection
          id="contact"
          screen={screen("contact")}
          title={screens.contact.title}
          lead={screens.contact.lead}
        >
          <Contact />
        </PixelSection>
      </main>

      <Footer />
    </>
  );
}
