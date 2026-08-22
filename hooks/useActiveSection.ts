"use client";

import { useEffect, useState } from "react";
import { sections, type SectionId } from "@/lib/data";

/**
 * Tracks which section is under the middle of the viewport.
 *
 * The negative rootMargin collapses the observer root to a horizontal line at
 * the vertical centre, so exactly one section can intersect at a time — far
 * steadier than comparing intersection ratios.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const els = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
