"use client";

import { useEffect, useId, useRef, useState } from "react";
import { OrgLogo } from "@/components/org-logo";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { NeedsConfirmation } from "@/components/needs-confirmation";

type Entry = Dictionary["experience"]["entries"][number];
type Props = { entries: Entry[]; now: string };

/**
 * Collapsed timeline. On a mouse/trackpad a row opens on hover (after a short
 * intent delay so scrolling past doesn't trigger it); on touch and keyboard it
 * opens on click/Enter. A clicked row stays open until clicked again.
 */
export function ExperienceList({ entries, now }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const hoverOpen = (i: number) => {
    if (!canHover || pinned) return;
    clearTimer();
    timer.current = setTimeout(() => setOpen(i), 140);
  };

  const hoverCloseAll = () => {
    clearTimer();
    if (canHover && !pinned) setOpen(null);
  };

  const toggle = (i: number) => {
    clearTimer();
    if (open === i && (pinned || !canHover)) {
      setOpen(null);
      setPinned(false);
    } else {
      setOpen(i);
      setPinned(true);
    }
  };

  return (
    <ol className="reveal border-b border-line" onMouseLeave={hoverCloseAll}>
      {entries.map((e, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const hasDetail = e.points.length > 0 || Boolean(e.meta);

        return (
          <li key={`${e.org}-${e.period}`} className="border-t border-line" onMouseEnter={() => hoverOpen(i)}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={!hasDetail}
              onClick={() => toggle(i)}
              className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-6 text-left lg:grid-cols-12 lg:gap-x-10 lg:py-7"
            >
              <span className="col-span-2 lg:col-span-4">
                {e.current ? (
                  <span className="label inline-flex items-center gap-2 rounded-full bg-ember-500/10 px-3 py-1.5 text-signal-ink">
                    <span aria-hidden className="size-1.5 rounded-full bg-ember-500" />
                    {now}
                  </span>
                ) : (
                  <span className="label text-ink-3">{e.period}</span>
                )}
                {e.confirm && <NeedsConfirmation note={e.confirm} />}
              </span>

              <span className="lg:col-span-7">
                <span className="block text-lg leading-snug font-medium tracking-tight transition-colors group-hover:text-signal-ink sm:text-xl">
                  {e.role}
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm text-ink-2 sm:text-base">
                  <OrgLogo name={e.org} className="size-6 rounded-md p-0.5" />
                  {e.org}
                </span>
              </span>

              <span className="flex items-center justify-end lg:col-span-1">
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out-soft ${
                    isOpen ? "rotate-45 border-ink bg-ink text-paper" : "border-line text-ink group-hover:border-ink-3"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-label={`${e.role}, ${e.org}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out-soft ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="grid pb-7 lg:grid-cols-12 lg:gap-x-10">
                  <div className="lg:col-span-7 lg:col-start-5">
                    <p className="text-sm text-ink-3">{e.meta}</p>
                    {e.points.length > 0 && (
                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-2">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ember-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
