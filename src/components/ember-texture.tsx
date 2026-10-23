"use client";

import { useEffect, useRef } from "react";

/**
 * Surface layers for an ember panel: a fine paper grain, and a soft light that follows the
 * mouse. Place it as a direct child of the panel (which must be `relative isolate`); both
 * layers sit between the gradient (-z-20) and the legibility scrim (-z-10), so text contrast
 * is unchanged. The light is mouse-only and off under reduced motion.
 */
export function EmberTexture() {
  const glow = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const light = glow.current;
    const panel = light?.parentElement;
    if (!light || !panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = panel.getBoundingClientRect();
        light.style.setProperty("--gx", `${e.clientX - r.left}px`);
        light.style.setProperty("--gy", `${e.clientY - r.top}px`);
        light.style.opacity = "1";
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      light.style.opacity = "0";
    };

    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <span aria-hidden className="ember-grain pointer-events-none absolute inset-0 -z-[15]" />
      <span
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[12] bg-[radial-gradient(circle_320px_at_var(--gx,50%)_var(--gy,50%),rgb(255_196_140/0.38),transparent_70%)] opacity-0 transition-opacity duration-500"
      />
    </>
  );
}
