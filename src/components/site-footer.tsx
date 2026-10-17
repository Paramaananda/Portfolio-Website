import type { Dictionary } from "@/i18n/dictionaries/en";
import { profile } from "@/content/profile";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: profile.links.linkedin, label: "LinkedIn", external: true },
    { href: profile.links.github, label: "GitHub", external: true },
    { href: profile.links.instagram, label: "Instagram", external: true },
  ];

  return (
    <footer className="border-t border-white/10 bg-night text-white">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          © {profile.name}. {dict.footer.rights}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex min-h-11 items-center underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-ember-500"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
