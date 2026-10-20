import type { Metadata, ResolvingMetadata } from "next";
import { MlopsPipeline } from "@/components/mlops-pipeline";
import { RagDemo } from "@/components/rag-demo";
import { ViewTransition, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProject, projects } from "@/content/projects";
import { Showcase } from "@/components/showcase";
import { NeedsConfirmation } from "@/components/needs-confirmation";
import { ArrowRight, ArrowUpRight } from "@/components/icons";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

// Every slug is prerendered (generateStaticParams) and the project links prefetch their
// params, so production navigations are already instant. A <Suspense> fallback here would
// stop the cover from morphing between the card and this page, so opt out of validation.
export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/[lang]/projects/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  const c = project.copy[lang];
  return {
    title: `${c.title} — I Putu Paramaananda Tanaya`,
    description: c.tagline,
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/projects/${slug}`])),
    },
    // Page-level openGraph replaces the layout's, so carry over the portfolio preview image.
    openGraph: {
      images: (await parent).openGraph?.images ?? [],
      type: "article",
      title: c.title,
      description: c.tagline,
      url: `/${lang}/projects/${slug}`,
      locale: lang === "id" ? "id_ID" : "en_US",
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();

  const dict = await getDictionary(lang);
  const t = dict.projects;
  const c = project.copy[lang];
  const roles = project.roles.map((r) => (r === "Team project" ? t.teamProject : r)).join(" · ");
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <article className="pb-20 lg:pb-28">
      <div className="container-page pt-8 lg:pt-12">
        <Link href={`/${lang}#projects`} className="label inline-flex min-h-11 items-center gap-2 text-ink-3 transition-colors hover:text-ink">
          <ArrowRight className="size-3.5 rotate-180" />
          {t.back}
        </Link>

        <header className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label animate-rise text-signal-ink">{project.year ? `${project.year} · ${c.type}` : c.type}</p>
            <h1 className="mt-4 animate-rise font-display text-h2 text-balance uppercase" style={delay(80)}>
              {c.title}
            </h1>
          </div>
          <p className="animate-rise text-xl leading-snug font-medium tracking-tight text-balance text-ink-2 sm:text-2xl lg:col-span-5" style={delay(160)}>
            {c.tagline}
          </p>
        </header>

        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-frame ring-1 ring-line sm:aspect-[16/9] lg:mt-12">
            <Showcase showcase={project.showcase} tint={project.tint} size="hero" />
          </div>
        </ViewTransition>

        <dl className="mt-8 grid animate-rise gap-6 border-b border-line pb-8 sm:grid-cols-3" style={delay(240)}>
          <div>
            <dt className="label text-ink-3">{t.facts.year}</dt>
            <dd className="mt-2 font-medium">
              {project.year ?? "—"}
              {!project.year && <NeedsConfirmation note="Year not stated in the sources" />}
            </dd>
          </div>
          <div>
            <dt className="label text-ink-3">{t.facts.role}</dt>
            <dd className="mt-2 font-medium">{roles}</dd>
          </div>
          <div>
            <dt className="label text-ink-3">{t.facts.type}</dt>
            <dd className="mt-2 font-medium">{c.type}</dd>
          </div>
        </dl>

        {/* Overview */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <aside className="reveal space-y-8 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            {project.links.length > 0 && (
              <div>
                <p className="label text-ink-3">{t.linksLabel}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-12 items-center justify-between rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {t.links[l.kind]}
                        <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium">
                  {tag}
                </li>
              ))}
            </ul>
          </aside>

          <div className="space-y-12 lg:col-span-8">
            <Block title={t.sections.overview} text={c.overview} />
            <Block title={t.sections.role} text={c.role} />
          </div>
        </div>

        {/* Process journey */}
        <section aria-labelledby="process-title" className="mt-20 lg:mt-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <h2 id="process-title" className="reveal-wipe font-display text-h2 uppercase lg:col-span-5">
              {t.process}
            </h2>
            <p className="reveal text-lg text-ink-2 lg:col-span-7 lg:pb-2">{t.processLead}</p>
          </div>

          {/* Stepper: the whole route at a glance; each stop links to its step. */}
          <ol className="relative mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:thin] lg:mt-12">
            <span aria-hidden className="absolute top-[22px] right-6 left-6 h-px bg-line" />
            {project.journey.map((s, i) => (
              <li key={i} className="reveal relative min-w-[9.5rem] flex-1" style={{ "--i": Math.min(i, 4) } as CSSProperties}>
                <a href={`#step-${i + 1}`} className="group flex flex-col items-start gap-3 rounded-card p-1">
                  <span className="relative grid size-11 place-items-center rounded-full border border-line bg-paper text-sm font-semibold tabular-nums transition-colors group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-night">
                    {pad(i + 1)}
                  </span>
                  <span className="text-sm leading-snug font-medium text-ink-2 transition-colors group-hover:text-ink">{s.copy[lang].title}</span>
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
            {project.journey.map((s, i) => {
              const sc = s.copy[lang];
              const flip = i % 2 === 1;
              return (
                <section
                  key={i}
                  id={`step-${i + 1}`}
                  aria-labelledby={`step-${i + 1}-title`}
                  className="grid scroll-mt-24 gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-10"
                >
                  <div className={`reveal lg:col-span-5 ${s.image && flip ? "lg:order-2" : ""}`}>
                    <p className="label text-signal-ink">
                      {t.step} {pad(i + 1)}
                    </p>
                    <h3 id={`step-${i + 1}-title`} className="mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
                      {sc.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-2">{sc.text}</p>
                  </div>
                  {s.image && (
                    <figure className={`reveal lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                      <div className="overflow-hidden rounded-card bg-surface p-3 ring-1 ring-line sm:p-4">
                        <Image
                          src={s.image.src}
                          alt={`${c.title} — ${sc.title}`}
                          width={s.image.width}
                          height={s.image.height}
                          sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
                          className="h-auto w-full rounded-[10px]"
                        />
                      </div>
                    </figure>
                  )}
                </section>
              );
            })}
          </div>
        </section>

        {project.interactive === "mlops-pipeline" && <MlopsPipeline lang={lang} labels={t.pipeline} />}
        {project.interactive === "rag-demo" && <RagDemo lang={lang} labels={t.ragDemo} />}

        {/* Outcome */}
        <section aria-labelledby="outcome-title" className="reveal mt-20 rounded-frame bg-surface p-8 sm:p-12 lg:mt-28 lg:p-16">
          <h2 id="outcome-title" className="label text-signal-ink">
            {t.sections.outcome}
          </h2>
          <p className="mt-5 max-w-[46ch] text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">{c.outcome}</p>
        </section>

        {project.gallery.length > 0 && (
          <section className="mt-16 lg:mt-24" aria-label={t.gallery}>
            <p className="label text-ink-3">{t.gallery}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <li
                  key={g.src}
                  style={{ "--i": i % 2 } as CSSProperties}
                  className={`reveal grid place-items-center overflow-hidden rounded-card bg-surface p-3 sm:p-4 ${g.width / g.height > 2.4 ? "sm:col-span-2" : ""}`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt[lang]}
                    width={g.width}
                    height={g.height}
                    sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full rounded-[10px]"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link
          href={`/${lang}/projects/${next.slug}`}
          prefetch
          className="reveal group mt-20 flex items-end justify-between gap-6 border-t border-line pt-8 lg:mt-28"
        >
          <span>
            <span className="label block text-ink-3">{t.next}</span>
            <span className="mt-3 block font-display text-4xl uppercase transition-colors group-hover:text-signal-ink sm:text-5xl">
              {next.copy[lang].title}
            </span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowRight className="size-5" />
          </span>
        </Link>
      </div>
    </article>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <section className="reveal">
      <h2 className="label text-signal-ink">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-2">{text}</p>
    </section>
  );
}
