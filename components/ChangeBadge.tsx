import type { ChangeDir } from "@/lib/types";
import { formatPct } from "@/lib/bn";

export default function ChangeBadge({
  dir,
  pct,
  className = "",
}: {
  dir: ChangeDir;
  pct: number;
  className?: string;
}) {
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const color =
    dir === "up"
      ? "text-[var(--price-up)]"
      : dir === "down"
        ? "text-[var(--price-down)]"
        : "text-[var(--price-flat)]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-[var(--background)] px-2 py-0.5 text-xs font-semibold ${color} ${className}`}
    >
      <span>{arrow}</span>
      <span>{formatPct(pct)}%</span>
    </span>
  );
}
