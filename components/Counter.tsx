"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` once scrolled into view. `suffix`/`prefix` keep the
 * surrounding copy ("5 years", "8 products") intact.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const settle = () => { el.textContent = `${prefix}${value}${suffix}`; };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${prefix}${Math.round(value * eased)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, prefix, suffix, duration]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}
