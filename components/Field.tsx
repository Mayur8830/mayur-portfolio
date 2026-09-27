"use client";

import { useEffect, useRef } from "react";

/** Ambient backdrop: drifting aurora blobs, grid, grain, and a pointer-tracked glow. */
export default function Field() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      el.style.opacity = "0";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      cx += (x - cx) * 0.045;
      cy += (y - cy) * 0.045;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="field" aria-hidden="true">
      <div className="field__blob field__blob--a" />
      <div className="field__blob field__blob--b" />
      <div className="field__blob field__blob--c" />
      <div className="field__grid" />
      <div ref={glow} className="field__pointer" />
      <div className="field__grain" />
      <div className="field__vignette" />
    </div>
  );
}
