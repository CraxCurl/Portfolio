import type { Metadata } from "next";
import AdventuresClient from "./AdventuresClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Adventures | Shipped AI & Full Stack Projects",
  description: `Showcase of 14 shipped software and AI projects by ${profile.name} at VIT Chennai, including AscendIQ, Pixel Heist, AC Feud, GraphGuard AI, ResQLink, and more.`,
};

export default function AdventuresPage() {
  return <AdventuresClient />;
}
