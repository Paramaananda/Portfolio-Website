"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

const MAX_TILT = 10; // degrees

/**
 * Card that tilts in 3D toward the pointer and shows a soft light where the cursor is.
 * Mouse/trackpad only; touch and reduced motion get a flat card (the hover colour still applies).
 * Exposes `group` so children can react with group-hover.
 */
export function TiltCard({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT * 2}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT * 2}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="[perspective:800px]">
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        className={`group relative isolate overflow-hidden transition-[transform,color] duration-300 ease-out-soft [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d] hover:duration-100 ${className}`}
      >
        {/* Ember fill, same as the Education cards. */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,var(--color-ember-300)_0%,var(--color-ember-400)_45%,var(--color-ember-500)_100%)] opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100"
        />
        {/* Light that follows the cursor. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.45),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {children}
      </div>
    </div>
  );
}
