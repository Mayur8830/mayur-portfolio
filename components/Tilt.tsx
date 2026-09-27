"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** 3D pointer tilt with perspective. Used on the portrait. */
export default function Tilt({
  children,
  max = 9,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;

    let rx = 0, ry = 0, cx = 0, cy = 0, raf = 0;

    const tick = () => {
      cx += (rx - cx) * 0.12;
      cy += (ry - cy) * 0.12;
      inner.style.transform =
        `perspective(900px) rotateX(${cy.toFixed(3)}deg) rotateY(${cx.toFixed(3)}deg)`;
      if (Math.abs(rx - cx) > 0.01 || Math.abs(ry - cy) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rx = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
      ry = -((e.clientY - r.top) / r.height - 0.5) * 2 * max;
      start();
    };
    const onLeave = () => { rx = 0; ry = 0; start(); };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return <div ref={ref} className={className}>{children}</div>;
}
