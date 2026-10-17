"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

/**
 * Link to a section of the home page ("/id#projects"). Next's <Link> updates the URL but does not
 * scroll when the target is on the page already, so same-page clicks scroll here; from another
 * page it navigates normally.
 */
export function SectionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const [path, id] = href.split("#");
    if (!id || path !== window.location.pathname) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
