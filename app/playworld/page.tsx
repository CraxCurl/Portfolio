import type { Metadata } from "next";
import PlayworldClient from "./PlayworldClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Playworld | Achievements & Hackathons",
  description: `Achievements, hackathon runs at Faraway Round 2, open source selections at GSSoC 26, and certifications of ${profile.name}.`,
};

export default function PlayworldPage() {
  return <PlayworldClient />;
}
