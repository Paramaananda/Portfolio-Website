import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { tools } from "@/content/skills";
import { SectionLabel } from "@/components/section-label";

/** Brand hover colour; near-black brands (GitHub, Maze) fall back to the accent so they stay visible in dark mode. */
function brandColor(hex?: string) {
  if (!hex) return "var(--color-signal-ink)";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60 ? "var(--color-signal-ink)" : `#${hex}`;
}

export function Skills({ dict }: { dict: Dictionary }) {
  const t = dict.skills;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{t.label}</SectionLabel>
            {/* Display heading is English on every locale. */}
            <h2 id="skills-title" lang="en" className="reveal-wipe mt-6 font-display text-h2 uppercase">
              {t.heading}
            </h2>
          </div>
          <p className="reveal max-w-[44ch] text-lg leading-snug text-ink-2 lg:col-span-7 lg:pb-2">{t.lead}</p>
        </div>

        <ul className="reveal mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3 lg:mt-14 lg:grid-cols-9">
          {tools.map((tool) => (
            <li
              key={tool.name}
              style={{ "--brand": brandColor(tool.icon?.hex) } as CSSProperties}
              className="group flex min-h-22 flex-col items-center justify-center gap-2 rounded-[14px] border border-line px-1.5 py-3 text-center transition-colors hover:border-ink-3 sm:aspect-square sm:gap-3 sm:rounded-card sm:p-3"
            >
              {tool.icon ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-6 fill-ink transition-colors duration-300 group-hover:fill-[var(--brand)] sm:size-8"
                >
                  <path d={tool.icon.path} />
                </svg>
              ) : (
                <span
                  aria-hidden
                  className="grid h-6 min-w-6 place-items-center font-display text-lg leading-none text-ink transition-colors duration-300 group-hover:text-[var(--brand)] sm:h-8 sm:text-2xl"
                >
                  {tool.mono}
                </span>
              )}
              <span className="text-[0.6875rem] leading-tight text-ink-2 sm:text-xs">{tool.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
