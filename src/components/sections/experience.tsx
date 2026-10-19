import type { CSSProperties } from "react";
import { OrgLogo } from "@/components/org-logo";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { SectionLabel } from "@/components/section-label";
import { NeedsConfirmation } from "@/components/needs-confirmation";
import { ExperienceList } from "./experience-list";

export function Experience({ dict }: { dict: Dictionary }) {
  const t = dict.experience;

  const renderGroup = (group: "work" | "org", spacing: string) => {
    const entries = t.entries.filter((e) => e.group === group);
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:gap-16 ${spacing}`}>
        <h3 className="reveal label flex items-center gap-2 self-start text-ink-3 lg:col-span-3 lg:pt-8">
          {t.groups[group]}
          <span className="tabular-nums text-ink-3">{String(entries.length).padStart(2, "0")}</span>
        </h3>
        <div className="lg:col-span-9">
          <ExperienceList entries={entries} now={t.now} />
        </div>
      </div>
    );
  };

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{t.label}</SectionLabel>
            {/* Display heading is English on every locale. */}
            <h2 id="experience-title" lang="en" className="reveal-wipe mt-6 font-display text-h2 uppercase">
              {t.heading}
            </h2>
          </div>
          <p className="reveal text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:col-span-7 lg:pt-12">
            {t.lead}
          </p>
        </div>

        {/* Work, then Education, then Organizations, each as its own block. */}
        {renderGroup("work", "mt-14 lg:mt-20")}

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <h3 className="reveal label text-ink-3 lg:col-span-3 lg:pt-6">{t.education.label}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
            {t.education.items.map((item, i) => (
              <li
                key={item.school}
                className="reveal group relative isolate flex flex-col overflow-hidden rounded-card bg-surface p-6 transition-colors duration-500 hover:text-night lg:p-8"
                style={{ "--i": i } as CSSProperties}
              >
                {/* Ember fill fades in on hover; the end year sits behind as a watermark. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,var(--color-ember-300)_0%,var(--color-ember-400)_45%,var(--color-ember-500)_100%)] opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-7 -z-10 font-display text-[7.5rem] leading-none text-ink/[0.05] transition-all duration-700 ease-out-soft group-hover:-translate-y-2 group-hover:text-night/15 lg:text-[9rem]"
                >
                  {item.period.match(/\d{4}/g)?.pop()}
                </span>
                <div className="flex items-start justify-between gap-3">
                  <p className="label min-h-[1.4em] text-ink-3 transition-colors duration-500 group-hover:text-night">
                    {item.period}
                    {item.confirm && <NeedsConfirmation note={item.confirm} />}
                  </p>
                  <OrgLogo name={item.school} className="size-12" />
                </div>
                <p className="mt-6 text-xl leading-snug font-medium tracking-tight">{item.school}</p>
                <p className="mt-1 text-ink-2 transition-colors duration-500 group-hover:text-night/85">{item.program}</p>
                <p className="mt-1 text-sm text-ink-3 transition-colors duration-500 group-hover:text-night">{item.meta}</p>
              </li>
            ))}
          </ul>
        </div>

        {renderGroup("org", "mt-16 lg:mt-24")}
      </div>
    </section>
  );
}
