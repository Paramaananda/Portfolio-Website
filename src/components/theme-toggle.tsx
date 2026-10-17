"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

const resolveTheme = (): Theme => {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return "light"; // Default is light; the device preference is ignored.
};

// Re-render when the attribute changes.
const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  // Server render has no theme; `null` keeps the icon neutral until hydration.
  const theme = useSyncExternalStore<Theme | null>(subscribe, resolveTheme, () => null);

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      apply(next);
      return;
    }

    // Grow the new theme out of the button as a circle.
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.classList.add("theme-switching");
    const vt = document.startViewTransition(() => flushSync(() => apply(next)));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    vt.finished.finally(() => root.classList.remove("theme-switching"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? labels.toLight : labels.toDark}
      title={isDark ? labels.toLight : labels.toDark}
      className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink-3"
    >
      {/* Sun in light mode, moon in dark mode; they rotate and cross-fade. */}
      <span className="relative block size-[18px]" aria-hidden>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          className={`absolute inset-0 size-full transition-all duration-500 ease-out-soft ${
            isDark ? "scale-50 -rotate-90 opacity-0" : "opacity-100"
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinejoin="round"
          className={`absolute inset-0 size-full transition-all duration-500 ease-out-soft ${
            isDark ? "opacity-100" : "scale-50 rotate-90 opacity-0"
          }`}
        >
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z" />
        </svg>
      </span>
    </button>
  );
}
