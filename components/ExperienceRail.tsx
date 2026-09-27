"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Timeline whose accent line draws itself as the section scrolls through. */
export default function ExperienceRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 62%"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useSpring(raw, { stiffness: 160, damping: 34, restDelta: 0.001 });

  return (
    <div className="xp" ref={ref}>
      <div className="xp__rail">
        <motion.i style={{ scaleY }} />
      </div>
      {children}
    </div>
  );
}
