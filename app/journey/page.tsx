import type { Metadata } from "next";
import JourneyClient from "./JourneyClient";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journey | Career Quest Log & Experience",
  description: `Roles, web development club memberships at VIT Chennai, NIELIT training and education timeline for ${profile.name}.`,
};

export default function JourneyPage() {
  return <JourneyClient />;
}
