"use client";

/**
 * Inline <head> script that runs before first paint on full page loads. On the client React
 * renders it as inert `text/plain`, so a client-side root layout swap (language switch) no longer
 * logs "Encountered a script tag"; ThemeSync re-applies the state on those navigations.
 * Pattern from node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
