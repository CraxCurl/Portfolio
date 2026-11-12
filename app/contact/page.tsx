import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact | Connect with Vinayak Tripathi",
  description: `Get in touch with ${profile.name}, AI & Full Stack Developer at VIT Chennai, for internships, opportunities, and technical collaborations.`,
};

export default function ContactPage() {
  return <ContactClient />;
}
