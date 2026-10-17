"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/config";

export function LangSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center rounded-full border border-line bg-paper p-0.5"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest ? `/${rest}` : ""}`}
            hrefLang={locale}
            lang={locale}
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
