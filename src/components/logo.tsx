/**
 * Brand mark: "P." on an ember tile. The initial plus a full stop, the same signature the
 * Momenia and portfolio decks end their headings with. Mirrors src/app/icon.svg (favicon).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="9" fill="#f2651a" />
      <path
        fill="#141414"
        fillRule="evenodd"
        d="M8 7h9.5a6.5 6.5 0 0 1 0 13H13v5H8zm5 4.5v4h4a2 2 0 0 0 0-4z"
      />
      <rect x="20" y="20.5" width="4.5" height="4.5" rx="1" fill="#141414" />
    </svg>
  );
}
