"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { Locale } from "@/i18n/config";
import { pipelinePlatform, pipelineStages, type PipelineTool } from "@/content/mlops-pipeline";

export type PipelineLabels = {
  title: string;
  lead: string;
  tablist: string;
  stage: string;
  mine: string;
  team: string;
  tools: string;
  platform: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function ToolChip({ tool }: { tool: PipelineTool }) {
  return (
    <li className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-paper px-3 text-sm font-medium">
      {tool.icon && (
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-ink">
          <path d={tool.icon.path} />
        </svg>
      )}
      {tool.name}
    </li>
  );
}

/**
 * Interactive diagram of the MBG MLOps loop. A packet travels along the track (decorative,
 * pauses with the cover-motion toggle and under reduced motion); each stage is a tab that
 * opens what runs there, how often, and with which tools.
 */
export function MlopsPipeline({ lang, labels }: { lang: Locale; labels: PipelineLabels }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = pipelineStages[active];
  const c = stage.copy[lang];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = pipelineStages.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i === last ? 0 : i + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i === 0 ? last : i - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="pipeline-title" className="mt-20 lg:mt-28">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
        <h2 id="pipeline-title" lang="en" className="reveal-wipe font-display text-h2 uppercase lg:col-span-5">
          {labels.title}
        </h2>
        <p className="reveal text-lg text-ink-2 lg:col-span-7 lg:pb-2">{labels.lead}</p>
      </div>

      <div className="reveal relative mt-10 lg:mt-12">
        {/* Track and travelling packet (desktop): runs behind the stage numbers. */}
        <div aria-hidden className="absolute top-[34px] right-[8%] left-[8%] hidden h-px bg-line lg:block">
          <span className="pipe-packet absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500 shadow-[0_0_0_5px_rgb(242_101_26/0.2)]" />
        </div>

        <div role="tablist" aria-label={labels.tablist} className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {pipelineStages.map((s, i) => {
            const selected = i === active;
            const sc = s.copy[lang];
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`pipe-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="pipe-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group flex flex-col items-start gap-3 rounded-card p-3 text-left transition-colors lg:items-center lg:text-center ${
                  selected ? "bg-surface" : "hover:bg-surface/60"
                }`}
              >
                <span
                  className={`relative grid size-11 place-items-center rounded-full border text-sm font-semibold tabular-nums transition-colors ${
                    selected
                      ? "border-ember-500 bg-ember-500 text-night"
                      : "border-line bg-paper text-ink group-hover:border-ember-500"
                  }`}
                >
                  {pad(i + 1)}
                  {s.mine && (
                    <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-paper bg-signal-ink" />
                  )}
                </span>
                <span>
                  <span className={`block font-medium tracking-tight ${selected ? "text-ink" : "text-ink-2 group-hover:text-ink"}`}>
                    {sc.name}
                  </span>
                  <span className="label mt-1 block text-ink-3">{sc.cadence}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="pipe-panel"
        role="tabpanel"
        aria-labelledby={`pipe-tab-${stage.id}`}
        className="mt-4 grid gap-8 rounded-frame bg-surface p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-12"
      >
        <div className="lg:col-span-7">
          <p className="label text-signal-ink">
            {labels.stage} {pad(active + 1)} · {c.cadence}
          </p>
          <h3 className="mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">{c.name}</h3>
          <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pretty text-ink-2">{c.text}</p>
        </div>
        <div className="lg:col-span-5">
          <p className="label text-ink-3">{labels.tools}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stage.tools.map((tool) => (
              <ToolChip key={tool.name} tool={tool} />
            ))}
          </ul>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-ink-2">
            <span aria-hidden className={`size-2 rounded-full ${stage.mine ? "bg-signal-ink" : "bg-ink-3"}`} />
            {stage.mine ? labels.mine : labels.team}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink-2">
        <span>{labels.platform}</span>
        <ul className="flex flex-wrap gap-2">
          {pipelinePlatform.map((tool) => (
            <ToolChip key={tool.name} tool={tool} />
          ))}
        </ul>
      </div>
    </section>
  );
}
