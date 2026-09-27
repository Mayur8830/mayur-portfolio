"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import { IconArrowUpRight } from "./icons";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
];

export default function Nav({ initials, cta }: { initials: string; cta: string }) {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active link = the last section whose top has passed the nav.
  useEffect(() => {
    const sections = [...LINKS.map((l) => l.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const pick = () => {
      const line = window.scrollY + window.innerHeight * 0.32;
      let current: string | null = null;
      for (const s of sections) {
        if (s.offsetTop <= line) current = s.id;
      }
      setActive(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return (
    <motion.nav
      className={`nav ${stuck ? "nav--stuck" : ""}`.trim()}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav__brand" data-cursor="link">
        <span className="nav__mark">{initials}</span>
        <span className="nav__brandtext">
          Mayur Kale <span>/ dev</span>
        </span>
      </a>

      <div className="nav__track">
        {LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="nav__link"
            aria-current={active === l.id ? "true" : undefined}
            data-cursor="link"
          >
            {active === l.id && (
              <motion.span
                layoutId="nav-pill"
                className="nav__pill"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="nav__label">
              <span className="nav__idx">{String(i + 1).padStart(2, "0")}</span>
              {/* Two stacked copies: the top one rolls out, the accent one rolls in. */}
              <span className="nav__roll">
                <span className="nav__rollup">{l.label}</span>
                <span className="nav__rolldown" aria-hidden="true">{l.label}</span>
              </span>
            </span>
          </a>
        ))}
      </div>

      <Magnetic strength={0.24}>
        <a href="#contact" className="nav__cta" data-cursor="link">
          {cta}
          <IconArrowUpRight className="" />
        </a>
      </Magnetic>
    </motion.nav>
  );
}
