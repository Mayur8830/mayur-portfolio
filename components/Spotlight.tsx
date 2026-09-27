"use client";

import { useCallback, type ReactNode } from "react";

/**
 * Card wrapper that feeds pointer position to CSS custom properties, driving
 * the radial highlight in `.card::before`.
 */
export default function Spotlight({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div className={`card ${className}`.trim()} onPointerMove={onMove} {...rest}>
      {children}
    </div>
  );
}
