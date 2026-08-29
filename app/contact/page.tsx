import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact // Player 2 Join",
  description: `Get in touch with ${profile.name} for internships, full-stack & AI engineering opportunities, and technical collaborations.`,
};

export default function ContactPage() {
  return <ContactClient />;
}
