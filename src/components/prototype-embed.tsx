"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/icons";

type Labels = { title: string; lead: string; load: string; hint: string; open: string };

/** Turns a figma.com/proto share link into Figma's embed URL (embed.figma.com, no side panel). */
function embedUrl(proto: string) {
  const u = new URL(proto);
  u.hostname = "embed.figma.com";
  u.searchParams.delete("t");
  u.searchParams.delete("show-proto-sidebar");
  u.searchParams.set("embed-host", "portfolio");
  return u.toString();
}

/**
 * Live Figma prototype. The iframe is several MB of Figma's player, so it only loads on request;
 * until then the frame holds its final size so nothing shifts.
 */
export function PrototypeEmbed({ href, title, tint, labels }: { href: string; title: string; tint: [string, string]; labels: Labels }) {
  const [on, setOn] = useState(false);

  return (
    <section aria-labelledby="prototype-title" className="mt-20 lg:mt-28">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        {/* Display heading is English on every locale. */}
        <h2 id="prototype-title" lang="en" className="reveal-wipe font-display text-h2 uppercase lg:col-span-5">
          {labels.title}
        </h2>
        <p className="reveal text-lg text-ink-2 lg:col-span-7 lg:pb-2">{labels.lead}</p>
      </div>

      <div className="reveal relative mt-10 h-[min(82dvh,780px)] overflow-hidden rounded-frame bg-surface ring-1 ring-line lg:mt-12">
        {on ? (
          <iframe
            src={embedUrl(href)}
            title={`${title} — Figma prototype`}
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setOn(true)}
            className="group grid size-full place-items-center content-center gap-5 p-6 text-center"
            style={{ background: `radial-gradient(120% 90% at 30% 20%, ${tint[0]}66, transparent 60%), radial-gradient(100% 80% at 80% 90%, ${tint[1]}66, transparent 60%)` }}
          >
            <span className="grid size-20 place-items-center rounded-full bg-ink text-paper shadow-lg transition-transform duration-300 ease-out-soft group-hover:scale-105">
              <svg viewBox="0 0 24 24" aria-hidden className="ml-1 size-7 fill-current">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <span className="text-xl font-medium tracking-tight">{labels.load}</span>
            <span className="max-w-[40ch] text-sm text-ink-2">{labels.hint}</span>
          </button>
        )}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="label mt-4 inline-flex min-h-11 items-center gap-1.5 text-ink-3 transition-colors hover:text-ink"
      >
        {labels.open}
        <ArrowUpRight className="size-3.5" />
      </a>
    </section>
  );
}
