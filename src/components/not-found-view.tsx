"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { ArrowRight } from "@/components/icons";

// not-found files get no params, but every URL that reaches one starts with a locale
// (proxy.ts adds it), so the path decides the language.
const copy: Record<Locale, { title: string; label: string; text: string; home: string; projects: string }> = {
  en: {
    title: "Page not found",
    label: "Error 404",
    text: "This page doesn't exist, or it moved. The projects are still where you left them.",
    home: "Back to home",
    projects: "See projects",
  },
  id: {
    title: "Halaman tidak ditemukan",
    label: "Galat 404",
    text: "Halaman ini tidak ada atau sudah dipindahkan. Proyek-proyeknya masih di tempat yang sama.",
    home: "Kembali ke beranda",
    projects: "Lihat proyek",
  },
};

export function NotFoundView() {
  const first = usePathname()?.split("/")[1] ?? "";
  const lang: Locale = hasLocale(first) ? first : defaultLocale;
  const t = copy[lang];

  return (
    <section className="container-page flex min-h-[70dvh] flex-col justify-center py-20">
      {/* React hoists this into <head>; nested not-found files can't export metadata. */}
      <title>{`404 — ${t.title}`}</title>
      <p className="label text-signal-ink">{t.label}</p>
      {/* Display heading is English on every locale. */}
      <h1 lang="en" className="mt-6 font-display text-[clamp(5rem,22vw,16rem)] leading-[0.85] uppercase">
        Lost<span className="text-signal-ink">.</span>
      </h1>
      <p className="mt-8 max-w-[44ch] text-lg leading-snug text-ink-2 sm:text-xl">{t.text}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={`/${lang}`}
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-signal-ink"
        >
          <ArrowRight className="size-4 rotate-180 transition-transform duration-300 ease-out-soft group-hover:-translate-x-0.5" />
          {t.home}
        </Link>
        <Link
          href={`/${lang}#projects`}
          className="inline-flex min-h-12 items-center rounded-full border border-line px-6 text-sm font-medium transition-colors hover:border-ink"
        >
          {t.projects}
        </Link>
      </div>
    </section>
  );
}
