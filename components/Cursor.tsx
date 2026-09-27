"use client";

import { useEffect, useRef } from "react";

const TRAIL = 26;        // points retained in the stroke
const EASE = 0.34;       // how tightly the stroke head chases the pointer
const BASE_W = 5.5;      // stroke width at the tip, in CSS px
const HOVER_W = 9;

const HEAD: [number, number, number] = [124, 92, 255];  // violet
const TAIL: [number, number, number] = [52, 226, 240];  // cyan

/**
 * Custom cursor: a tapering ink stroke drawn on canvas that trails the
 * pointer, plus a DOM tip that carries the hover states. State comes from
 * `data-cursor` on whatever is under the pointer — "link" | "label" | "text" —
 * and `data-cursor-label` fills the tip with text.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    document.body.classList.add("has-cursor");

    const el = root.current!;
    const cv = canvas.current!;
    const tp = tip.current!;
    const ctx = cv.getContext("2d")!;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.floor(window.innerWidth * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();

    // pointer target, eased stroke head, and the trailing point history
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let hx = tx;
    let hy = ty;
    const pts: { x: number; y: number }[] = [];

    let raf = 0;
    let down = false;
    let hover: string | null = null;
    let speed = 0;

    const setState = () => { el.dataset.state = down ? "down" : hover ?? ""; };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.remove("cursor--hidden");

      const hit = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]");
      const next = hit?.dataset.cursor ?? null;
      if (next !== hover) {
        hover = next;
        if (next === "label" && label.current) {
          label.current.textContent = hit?.dataset.cursorLabel ?? "View";
        }
        setState();
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const px = hx;
      const py = hy;
      hx = lerp(hx, tx, EASE);
      hy = lerp(hy, ty, EASE);

      // stroke thickens with velocity, so fast flicks read as a brush sweep
      const d = Math.hypot(hx - px, hy - py);
      speed = lerp(speed, Math.min(d / 14, 1), 0.2);

      pts.unshift({ x: hx, y: hy });
      if (pts.length > TRAIL) pts.length = TRAIL;

      tp.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;

      ctx.clearRect(0, 0, cv.width, cv.height);

      const boost = hover ? HOVER_W : BASE_W;
      const maxW = boost * (1 + speed * 0.55);

      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        const fade = Math.pow(1 - t, 1.6);
        if (fade <= 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.lineWidth = maxW * fade;
        ctx.strokeStyle = `rgba(${Math.round(lerp(HEAD[0], TAIL[0], t))}, ${
          Math.round(lerp(HEAD[1], TAIL[1], t))
        }, ${Math.round(lerp(HEAD[2], TAIL[2], t))}, ${fade * (hover ? 0.95 : 0.8)})`;
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = () => { down = true; setState(); };
    const onUp = () => { down = false; setState(); };
    const onLeave = () => el.classList.add("cursor--hidden");
    const onEnter = () => el.classList.remove("cursor--hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", resize);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} className="cursor cursor--hidden" aria-hidden="true">
      <canvas ref={canvas} className="cursor__ink" />
      <div ref={tip} className="cursor__tip">
        <span ref={label} className="cursor__label" />
      </div>
    </div>
  );
}
