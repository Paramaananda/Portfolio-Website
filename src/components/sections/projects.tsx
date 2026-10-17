import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { SectionLabel } from "@/components/section-label";
import { ProjectGrid, type CardData } from "./project-grid";

export function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.projects;
  // Only the fields a card needs, in the current language, cross into the client component.
  const cards: CardData[] = projects.map((p) => {
    const c = p.copy[lang];
    return {
      slug: p.slug,
      href: `/${lang}/projects/${p.slug}`,
      category: p.category,
      meta: p.year ? `${p.year} · ${c.type}` : c.type,
      title: c.title,
      tagline: c.tagline,
      tint: p.tint,
      showcase: p.showcase,
    };
  });

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y border-t border-line">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{t.label}</SectionLabel>
            {/* Display heading is English on every locale. */}
            <h2 id="projects-title" lang="en" className="reveal-wipe mt-6 font-display text-h2 uppercase">
              {t.heading}
            </h2>
          </div>
          <p className="reveal text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl lg:col-span-7 lg:pt-12">
            {t.lead}
          </p>
        </div>

        <ProjectGrid
          cards={cards}
          github={profile.links.github}
          labels={{ filters: t.filters, filterLabel: t.filterLabel, view: t.view, motion: t.motion, more: t.more }}
        />
      </div>
    </section>
  );
}
