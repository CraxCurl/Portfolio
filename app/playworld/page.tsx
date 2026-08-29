import type { Metadata } from "next";
import PlayworldClient from "./PlayworldClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Playworld // Trophy Room",
  description: `Achievements, hackathon runs (Faraway Round 2), open source selections (GSSoC'26), and certifications of ${profile.name}.`,
};

export default function PlayworldPage() {
  return <PlayworldClient />;
}
