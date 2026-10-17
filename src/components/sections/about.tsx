import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionLabel } from "@/components/section-label";

export function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{t.label}</SectionLabel>
            {/* The display heading is English on every locale, like the hero word. */}
            <h2 id="about-title" lang="en" className="reveal-wipe mt-6 font-display text-h2 uppercase">
              {t.heading[0]}
              <br />
              <span aria-hidden className="text-ember-500">
                ×{" "}
              </span>
              <span className="sr-only">and </span>
              {t.heading[1]}
            </h2>
          </div>

          <div className="reveal lg:col-span-7 lg:pt-12">
            <p className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
              {t.lead}
            </p>
            <div className="mt-8 max-w-[60ch] space-y-4 text-lg leading-relaxed text-pretty text-ink-2">
              {t.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <ol className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => (
            <li key={pillar.title} className="reveal flex flex-col rounded-card bg-surface p-6 lg:p-8" style={{ "--i": i } as CSSProperties}>
              <span className="label text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-medium tracking-tight">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{pillar.text}</p>
              <div className="mt-auto pt-8">
                <p className="flex items-start gap-2 border-t border-line pt-5 text-sm text-ink">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember-500" />
                  {pillar.proof}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
