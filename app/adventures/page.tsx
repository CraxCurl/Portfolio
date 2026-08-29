import type { Metadata } from "next";
import AdventuresClient from "./AdventuresClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Adventures // Save Slots",
  description: `Showcase of 9 shipped software & AI projects by ${profile.name}, including AscendIQ, Sahayak, GraphGuard AI, ResQLink, and more.`,
};

export default function AdventuresPage() {
  return <AdventuresClient />;
}
