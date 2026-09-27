"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  /** How far into the viewport before it triggers. 0 = any edge. */
  margin?: string;
};

/** Fade/rise on first entry. IntersectionObserver — no scroll listener per node. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  margin = "0px 0px -12% 0px",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal--in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("reveal--in");
        io.disconnect();
      },
      { rootMargin: margin, threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
