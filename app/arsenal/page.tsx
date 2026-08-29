import type { Metadata } from "next";
import ArsenalClient from "./ArsenalClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Arsenal // Skill Tree",
  description: `Tech stack, AI frameworks, web engineering tools, and systems capabilities for ${profile.name}.`,
};

export default function ArsenalPage() {
  return <ArsenalClient />;
}
