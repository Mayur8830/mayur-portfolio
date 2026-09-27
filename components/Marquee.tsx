"use client";

import { useEffect, useRef } from "react";

/**
 * Seamless ticker. The group is duplicated and the track is translated by
 * exactly one group width, so the wrap is invisible. Slows on hover.
 */
export default function Marquee({ items, speed = 42 }: { items: string[]; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const group = el.firstElementChild as HTMLElement | null;
    if (!group) return;

    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let rate = 1;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const width = group.offsetWidth;
      if (width > 0) {
        offset = (offset + speed * rate * dt) % width;
        el.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const slow = () => { rate = 0.22; };
    const fast = () => { rate = 1; };
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", fast);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", fast);
    };
  }, [speed]);

  return (
    <div className="marquee">
      <div ref={track} className="marquee__track">
        {[0, 1].map((g) => (
          <div className="marquee__group" key={g} aria-hidden={g === 1}>
            {items.map((item) => (
              <span className="marquee__item" key={`${g}-${item}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
