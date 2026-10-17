"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Switching language re-renders the root layout, and React recreates <html> without the
 * data-theme attribute that the inline <head> script set on first load (that script does not
 * run again on client navigation). Re-apply the saved theme (and paused cover animations) before
 * paint on every route change.
 */
export function ThemeSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
      if (localStorage.getItem("motion") === "paused") document.documentElement.setAttribute("data-motion", "paused");
    } catch {
      // Storage blocked: the page follows the system theme.
    }
  }, [pathname]);

  return null;
}
