"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { locales, localeLabel, type Locale } from "@/i18n/config";

/**
 * Switching language swaps the root layout, so the browser lands at the top of the page.
 * Before navigating we remember which section (an element with an id inside <main>) is under
 * the header and how far into it the reader is, as a fraction because the other language's
 * text has a different length. The new page's LangSwitch restores it on mount.
 */
const KEY = "lang-switch-anchor";
const HEADER = 80; // px: sticky header plus a little air

type Anchor = { path: string; id: string; frac: number };

function rememberPosition(path: string) {
  try {
    const els = [...document.querySelectorAll<HTMLElement>("main [id]")].filter((el) => el.offsetHeight > 0 && /^[a-z][\w-]*$/i.test(el.id)); // skip React useId ids
    let anchor: HTMLElement | undefined;
    // Deepest element that spans the line just under the header.
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top <= HEADER && r.bottom > HEADER) anchor = el;
    }
    if (!anchor || window.scrollY < 1) {
      sessionStorage.removeItem(KEY);
      return;
    }
    const r = anchor.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (HEADER - r.top) / r.height));
    sessionStorage.setItem(KEY, JSON.stringify({ path, id: anchor.id, frac } satisfies Anchor));
  } catch {
    // Storage blocked: the new page simply opens at the top.
  }
}

export function LangSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  // Restore the reader's place after a language switch.
  useLayoutEffect(() => {
    let saved: Anchor | null = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
      sessionStorage.removeItem(KEY);
    } catch {
      return;
    }
    if (!saved || saved.path !== pathname) return;
    const el = document.getElementById(saved.id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top + saved.frac * r.height - HEADER, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-line bg-paper p-0.5"
    >
      {locales.map((locale) => {
        const active = locale === current;
        const href = `/${locale}${rest ? `/${rest}` : ""}`;
        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            lang={locale}
            scroll={false}
            onClick={() => {
              if (!active) rememberPosition(href);
            }}
            aria-current={active ? "true" : undefined}
            title={localeLabel[locale]}
            className={`label grid h-11 min-w-11 sm:h-9 sm:min-w-10 place-items-center rounded-full px-2.5 transition-colors ${
              active ? "bg-ink text-paper" : "text-ink-3 hover:text-ink"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
