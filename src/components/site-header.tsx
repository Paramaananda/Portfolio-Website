import Link from "next/link";
import { SectionLink } from "@/components/section-link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { Logo } from "@/components/logo";
import { profile } from "@/content/profile";
import { LangSwitch } from "./lang-switch";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import { ArrowUpRight } from "./icons";

export const sectionIds = ["about", "skills", "projects", "experience", "contact"] as const;

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items = sectionIds.map((id) => ({ href: `/${lang}#${id}`, label: dict.nav[id] }));

  return (
    <header className="header-elevate sticky top-0 z-50 border-b border-transparent">
      {/* Blur lives on its own layer: backdrop-filter on <header> would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75"
      />
      {/* Reading progress: grows with page scroll (scroll-driven, no JS). */}
      <span
        aria-hidden
        className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-ember-500"
      />
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href={`/${lang}`} className="group flex min-h-11 items-center gap-2.5">
          <Logo className="size-8 shrink-0 transition-transform duration-300 ease-out-soft group-hover:rotate-6" />
          <span className="hidden font-medium tracking-tight min-[400px]:inline sm:hidden">{profile.shortName}</span>
          <span className="hidden font-medium tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label={dict.a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href}
                  className="label group/nav relative inline-flex min-h-11 text-xs items-center text-ink-2 transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-2.5 h-px origin-left scale-x-0 bg-ember-500 transition-transform duration-300 ease-out-soft group-hover/nav:scale-x-100"
                  />
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch current={lang} label={dict.a11y.switchLang} />
          <ThemeToggle labels={{ toDark: dict.a11y.toDark, toLight: dict.a11y.toLight }} />
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="label hidden min-h-11 items-center gap-1 text-ink transition-colors hover:text-signal-ink lg:inline-flex"
          >
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
          <MobileMenu
            items={items}
            linkedin={profile.links.linkedin}
            labels={{ open: dict.a11y.openMenu, close: dict.a11y.closeMenu, nav: dict.a11y.primaryNav }}
          />
        </div>
      </div>
    </header>
  );
}
