"use client";

import { useEffect, useState } from "react";

export function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 1800);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
        } catch {
          // Clipboard blocked (e.g. insecure context): the mailto link still works.
        }
      }}
      className="label inline-flex min-h-11 items-center rounded-full border border-white/40 px-4 text-white transition-colors hover:border-white hover:bg-white hover:text-night"
    >
      <span aria-live="polite">{done ? doneLabel : label}</span>
    </button>
  );
}
