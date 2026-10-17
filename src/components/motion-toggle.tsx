"use client";

import { useSyncExternalStore } from "react";
import { Pause, Play } from "@/components/icons";

const isPaused = () => document.documentElement.getAttribute("data-motion") === "paused";

const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => mo.disconnect();
};

/**
 * Pauses or resumes every showcase cover on the site. The choice lives on <html data-motion>
 * (CSS pauses `.sc` animations) and is remembered in localStorage. Hidden under reduced motion,
 * where covers are already still.
 */
export function MotionToggle({ labels }: { labels: { pause: string; play: string } }) {
  const paused = useSyncExternalStore(subscribe, isPaused, () => false);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isPaused();
    if (next) root.setAttribute("data-motion", "paused");
    else root.removeAttribute("data-motion");
    try {
      if (next) localStorage.setItem("motion", "paused");
      else localStorage.removeItem("motion");
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-medium text-ink-2 transition-colors hover:text-ink motion-reduce:hidden"
    >
      <span className="grid size-8 place-items-center rounded-full border border-line">
        {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
      </span>
      {paused ? labels.play : labels.pause}
    </button>
  );
}
