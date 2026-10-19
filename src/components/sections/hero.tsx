import Image from "next/image";
import { OrgLogo } from "@/components/org-logo";
import { TiltCard } from "@/components/tilt-card";
import { SectionLink } from "@/components/section-link";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { profile } from "@/content/profile";
import { ArrowUpRight } from "@/components/icons";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section aria-labelledby="hero-title" className="container-page pt-2 pb-12 lg:pb-16">
      <div className="relative">
        {/* Frame: ember panel (+ inset white panel on desktop) */}
        <div className="relative isolate h-[620px] overflow-hidden rounded-frame bg-ember-600 sm:h-[700px] lg:h-[min(760px,calc(100dvh-5.5rem))] lg:min-h-[640px]">
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-[radial-gradient(85%_75%_at_62%_32%,var(--color-ember-300)_0%,var(--color-ember-500)_30%,var(--color-ember-600)_60%,var(--color-ember-800)_85%,var(--color-ember-950)_100%)]"
          />
          <div
            aria-hidden
            className="absolute top-[-18%] left-[30%] -z-20 aspect-square w-[70%] animate-drift rounded-full bg-ember-400/30 blur-3xl lg:left-[22%] lg:w-[45%]"
          />
          {/* Keeps small white copy on the left at ≥ 5.7:1 */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(61_20_5/0.55)_0%,rgb(61_20_5/0.2)_35%,transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute top-2 right-2 bottom-2 -z-10 hidden w-[44%] rounded-card bg-paper lg:block"
          />

          {/* Portrait */}
          <div
            className="absolute top-[50%] right-[-4%] z-0 w-[62%] sm:top-[40%] sm:right-[2%] sm:w-[44%] lg:top-auto lg:right-auto lg:bottom-0 lg:left-[54%] lg:w-[clamp(240px,24vw,280px)] lg:-translate-x-1/2 xl:top-[12%] xl:bottom-auto xl:w-[clamp(300px,24vw,360px)]"
          >
            {/* Inner wrapper carries the scroll parallax so it doesn't fight the -translate-x-1/2 above. */}
            <div className="parallax-up">
            <Image
              src={profile.portrait.src}
              alt={t.portraitAlt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1280px) 360px, (min-width: 1024px) 280px, (min-width: 640px) 44vw, 62vw"
              className="h-auto w-full select-none"
            />
            </div>
          </div>

          {/* Ember-side copy */}
          <div className="@container relative z-10 flex h-full flex-col p-6 sm:p-10 lg:w-[56%] lg:justify-center lg:p-14">
            <h1
              id="hero-title"
              className="font-display text-mega text-white uppercase"
              style={{
                // Anton averages ~0.48em per uppercase glyph: cap the size so the word
                // never runs past the ember column into the white panel.
                fontSize: `min(var(--text-mega), ${(100 / (t.word.length * 0.5)).toFixed(1)}cqw)`,
              }}
            >
              <span className="sr-only">{profile.name} — </span>
              {/* The display word is English on every locale. */}
              <span lang="en" className="sr-only">
                {t.word}
              </span>
              {/* Letters slide up one by one out of a clipped line. */}
              <span aria-hidden className="-mt-[0.1em] inline-flex overflow-hidden pt-[0.1em] pb-[0.04em]">
                {Array.from(t.word).map((ch, i) => (
                  <span key={i} className="inline-block animate-letter" style={delay(120 + i * 70)}>
                    {ch}
                  </span>
                ))}
              </span>
            </h1>

            <p
              className="mt-5 max-w-xs animate-rise text-lg leading-snug text-white/90 sm:text-xl lg:mt-6"
              style={delay(200)}
            >
              {t.tagline[0]}
              <br />
              {t.tagline[1]}
            </p>

            <SectionLink
              href={`/${lang}#projects`}
              className="group mt-7 inline-flex min-h-12 w-fit animate-rise items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold tracking-wide text-night uppercase shadow-[0_10px_40px_-8px_rgb(255_255_255/0.55)] transition-transform duration-300 ease-out-soft hover:-translate-y-0.5"
              style={delay(300)}
            >
              {t.cta}
              <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </SectionLink>
          </div>
        </div>

        {/* White-side copy: inside the white panel on desktop, below the frame on mobile */}
        <aside className="mt-4 grid gap-4 sm:grid-cols-2 lg:absolute lg:inset-y-2 lg:right-2 lg:mt-0 lg:flex lg:w-[44%] lg:flex-col lg:items-end lg:justify-between lg:p-8 xl:p-10">
          <div className="animate-rise rounded-card bg-surface p-6 lg:mt-[22%] lg:w-[min(220px,100%)] lg:bg-transparent lg:p-0 xl:w-[min(240px,100%)]" style={delay(350)}>
            <div className="flex items-start justify-between gap-3">
              <p className="label flex items-center gap-2 text-signal-ink">
                {t.statusLabel}
                <span aria-hidden className="size-1.5 rounded-full bg-ember-500" />
              </p>
              <OrgLogo name={t.status[1]} className="size-10" />
            </div>
            <p className="mt-3 text-2xl leading-tight font-medium tracking-tight">
              {t.status[0]}
              <br />
              {t.status[1]}
            </p>
            <p className="mt-3 text-sm text-ink-3">{t.statusDetail}</p>
          </div>

          {/* Outer div runs the entrance animation; TiltCard owns the hover transform. */}
          <div className="animate-rise lg:w-[min(230px,100%)] xl:w-[min(260px,100%)]" style={delay(450)}>
            <TiltCard className="rounded-card bg-surface p-6 hover:text-night lg:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="label text-ink-3 transition-colors duration-500 group-hover:text-night">{t.eduLabel}</p>
                <OrgLogo name={t.eduSchool} className="size-10" />
              </div>
              <p className="mt-3 text-xl leading-tight font-medium tracking-tight">{t.eduMajor}</p>
              <p className="mt-1 text-sm leading-snug text-ink-2 transition-colors duration-500 group-hover:text-night/85">{t.eduSchool}</p>
              <p className="label mt-4 text-ink-3 transition-colors duration-500 group-hover:text-night">{t.eduPeriod}</p>
            </TiltCard>
          </div>
        </aside>
      </div>
    </section>
  );
}
