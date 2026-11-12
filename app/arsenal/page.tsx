import type { Metadata } from "next";
import ArsenalClient from "./ArsenalClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Arsenal | AI & Full Stack Developer Skills",
  description: `Tech stack, multi agent AI frameworks, web engineering tools, and systems capabilities for ${profile.name}.`,
};

export default function ArsenalPage() {
  return <ArsenalClient />;
}
