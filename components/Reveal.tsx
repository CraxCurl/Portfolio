"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll-triggered entrance.
 *
 * Deliberately short and linear rather than eased — a spring or cubic curve
 * reads as "modern web", which fights the rest of the page. A quick linear
 * snap looks closer to a sprite popping into frame.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
