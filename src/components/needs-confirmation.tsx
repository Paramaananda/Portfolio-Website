/**
 * Marks a fact that is unclear or conflicting across sources.
 * Visible only in development so the live site stays clean; the full list
 * lives in content/PERLU-KONFIRMASI.md.
 */
export function NeedsConfirmation({ note }: { note: string }) {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <mark
      title={note}
      className="ml-1 rounded bg-ember-500/15 px-1.5 py-0.5 align-middle text-[0.7rem] font-semibold text-signal-ink"
    >
      [PERLU KONFIRMASI]
    </mark>
  );
}
