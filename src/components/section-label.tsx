import type { ReactNode } from "react";

/**
 * Eyebrow shared by every section: "—— About". It names the section in the page's language
 * (display headings stay English). `light` is for dark/ember backgrounds.
 */
export function SectionLabel({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <p className={`label flex items-center gap-3 ${light ? "text-white/85" : "text-signal-ink"}`}>
      <span aria-hidden className={`h-px w-8 ${light ? "bg-white/50" : "bg-ember-500/60"}`} />
      <span>{children}</span>
    </p>
  );
}
