"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const DURATION = 1750;

/**
 * First-visit curtain. Rendered on the server so there is no hydration
 * mismatch, then torn down from a timer: immediately for repeat visits in the
 * same tab or under reduced-motion, otherwise once the meter fills. At frame
 * zero the curtain is just the page background with an invisible mark, so the
 * skipped case has nothing to flash.
 */
export default function Intro({ mark = "MK" }: { mark?: string }) {
  // `instant` rides along with `open` so the skip path can drop the curtain in
  // a single frame instead of playing the 850ms slide-up.
  const [{ open, instant }, setCurtain] = useState({ open: true, instant: false });

  useEffect(() => {
    const seen = sessionStorage.getItem("mk-intro") === "1";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skip = seen || still;

    if (!skip) {
      sessionStorage.setItem("mk-intro", "1");
      document.body.style.overflow = "hidden";
    }

    const t = setTimeout(() => {
      setCurtain({ open: false, instant: skip });
      document.body.style.overflow = "";
    }, skip ? 0 : DURATION);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="intro"
          initial={{ opacity: 1 }}
          exit={
            instant
              ? { opacity: 0, transition: { duration: 0 } }
              : { y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          <motion.span
            className="intro__mark"
            initial={{ opacity: 0, y: 22, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {mark}
          </motion.span>

          <div className="intro__meter">
            <motion.i
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.45, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <motion.span
            className="intro__count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Loading portfolio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
