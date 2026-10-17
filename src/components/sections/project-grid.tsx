"use client";

import Link from "next/link";
import { useState, ViewTransition, type CSSProperties } from "react";
import type { Category, Showcase as ShowcaseData } from "@/content/projects";
import { Showcase } from "@/components/showcase";
import { siGithub } from "simple-icons";
import { ArrowUpRight } from "@/components/icons";
import { MotionToggle } from "@/components/motion-toggle";

export type CardData = {
  slug: string;
  href: string;
  category: Category;
  meta: string;
  title: string;
  tagline: string;
  tint: [string, string];
  showcase: ShowcaseData;
};

type Filter = "all" | Category;

type Props = {
  cards: CardData[];
  github: string;
  labels: {
    filters: Record<Filter, string>;
    filterLabel: string;
    view: string;
    motion: { pause: string; play: string };
    more: { title: string; text: string; cta: string };
  };
};

// The GitHub card fills whatever is left of the last row, so the grid never ends on a lone card.
const SM_SPAN = ["sm:col-span-2", "sm:col-span-1"] as const; // index: visible % 2
const LG_SPAN = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"] as const; // index: visible % 3

export function ProjectGrid({ cards, github, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const options: Filter[] = ["all", "ai", "design", "web"];
  const count = (f: Filter) => (f === "all" ? cards.length : cards.filter((c) => c.category === f).length);
  const visible = count(filter);

  return (
    <>
      <div className="reveal mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 lg:mt-16">
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
        {options.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                active ? "border-ink bg-ink text-paper" : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
              }`}
            >
              {labels.filters[f]}
              <span className={`text-xs tabular-nums ${active ? "text-paper/70" : "text-ink-3"}`}>{count(f)}</span>
            </button>
          );
        })}
      </div>
      {/* Covers loop while on screen; this lets visitors stop them (HIG: make motion optional). */}
      <MotionToggle labels={labels.motion} />
      </div>

      <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => {
          const shown = filter === "all" || c.category === filter;
          return (
            <li key={c.slug} hidden={!shown} className="reveal" style={{ "--i": i % 3 } as CSSProperties}>
              {/* prefetch: resolves the [slug] params ahead of the click, so the page (and cover morph) is instant. */}
              <Link href={c.href} prefetch className="group block">
                {/* Same name as the project page cover: the showcase morphs between the two. */}
                <ViewTransition name={`project-${c.slug}`} share="morph" default="none">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line transition-transform duration-500 ease-out-soft group-hover:-translate-y-1">
                    <Showcase showcase={c.showcase} tint={c.tint} />
                    <span
                      aria-hidden
                      className="absolute top-3 right-3 grid size-10 translate-y-1 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-sm transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </ViewTransition>
                <p className="label mt-4 text-ink-3">{c.meta}</p>
                <h3 className="mt-1.5 text-xl leading-tight font-medium tracking-tight transition-colors group-hover:text-signal-ink">
                  {c.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-2">{c.tagline}</p>
                <span className="sr-only">{labels.view}</span>
              </Link>
            </li>
          );
        })}
        <li className={`reveal ${SM_SPAN[visible % 2]} ${LG_SPAN[visible % 3]}`}>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-full min-h-48 flex-col justify-between gap-6 overflow-hidden rounded-card border border-dashed border-ink-3/40 p-6 transition-colors hover:border-ink-3 hover:bg-surface lg:p-8"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="absolute -right-6 -bottom-8 size-48 fill-ink/[0.06] transition-transform duration-700 ease-out-soft group-hover:-rotate-6 group-hover:scale-105"
            >
              <path d={siGithub.path} />
            </svg>
            <span className="relative">
              <span className="block text-xl leading-tight font-medium tracking-tight">{labels.more.title}</span>
              <span className="mt-2 block max-w-[40ch] text-sm leading-relaxed text-ink-2">{labels.more.text}</span>
            </span>
            <span className="label relative inline-flex items-center gap-1.5 text-signal-ink">
              {labels.more.cta}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </li>
      </ul>
    </>
  );
}
