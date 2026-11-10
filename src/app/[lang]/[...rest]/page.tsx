import { notFound } from "next/navigation";

/**
 * Catches every unmatched path under a locale (e.g. /id/abc) and hands it to ../not-found.tsx,
 * so the 404 keeps the site header, footer, and theme instead of Next's bare default page.
 */
// Always throws notFound(), so there is no page to validate for instant navigation.
export const instant = false;

export default function CatchAll() {
  notFound();
}
