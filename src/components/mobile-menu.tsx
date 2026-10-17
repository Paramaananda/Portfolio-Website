"use client";

import { SectionLink } from "@/components/section-link";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./icons";

type Props = {
  items: { href: string; label: string }[];
  linkedin: string;
  labels: { open: string; close: string; nav: string };
};

export function MobileMenu({ items, linkedin, labels }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink-3"
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper"
      >
        <nav aria-label={labels.nav} className="container-page flex min-h-full flex-col py-6">
          <ol className="divide-y divide-line border-y border-line">
            {items.map((item, i) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-4xl leading-none"
                >
                  <span className="label w-6 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </SectionLink>
              </li>
            ))}
          </ol>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-medium text-paper"
          >
            LinkedIn
            <ArrowUpRight className="size-4" />
          </a>
        </nav>
      </div>
    </div>
  );
}
