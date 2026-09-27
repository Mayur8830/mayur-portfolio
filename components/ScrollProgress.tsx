"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Gradient rail across the top, scaled by document scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress__bar" style={{ scaleX }} />
    </div>
  );
}
