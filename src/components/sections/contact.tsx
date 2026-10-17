import type { Dictionary } from "@/i18n/dictionaries/en";
import { profile } from "@/content/profile";
import { SectionLabel } from "@/components/section-label";
import { CopyButton } from "@/components/copy-button";
import { ArrowUpRight } from "@/components/icons";

export function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const links = [
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "GitHub", href: profile.links.github },
    { label: "Instagram", href: profile.links.instagram },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pb-16 lg:pb-24">
      {/* Same ember frame as the hero, so the page opens and closes on it. */}
      <div className="reveal relative isolate overflow-hidden rounded-frame bg-ember-600 px-6 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(70%_90%_at_85%_10%,var(--color-ember-300)_0%,var(--color-ember-500)_30%,var(--color-ember-600)_60%,var(--color-ember-800)_85%,var(--color-ember-950)_100%)]"
        />
        {/* Keeps the white copy on the left at ≥ 5.7:1 */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(61_20_5/0.6)_0%,rgb(61_20_5/0.25)_45%,transparent_70%)]"
        />

        <SectionLabel tone="light">
          {t.label}
        </SectionLabel>
        <h2 id="contact-title" lang="en" className="reveal-wipe mt-6 font-display text-mega text-white uppercase">
          {t.heading}
        </h2>
        <p className="mt-6 max-w-[34ch] text-lg leading-snug text-white/90 sm:text-xl">{t.lead}</p>

        <div className="mt-12 grid gap-10 border-t border-white/25 pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label text-white/75">{t.emailLabel}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="text-2xl font-medium tracking-tight break-all text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white sm:text-3xl lg:text-4xl"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} label={t.copy} doneLabel={t.copied} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="label text-white/75">{t.elsewhere}</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold tracking-wide text-night uppercase transition-transform duration-300 ease-out-soft hover:-translate-y-0.5"
                  >
                    {l.label}
                    <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
