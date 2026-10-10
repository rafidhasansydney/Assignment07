import type { Product } from "@/lib/types";
import { formatTaka, formatPct, unitBn } from "@/lib/bn";

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const loop = [...products, ...products]; // duplicated for a seamless marquee

  return (
    <div
      className="overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]"
      aria-label="আজকের বাজার দর টিকার"
    >
      <div className="animate-marquee flex w-max items-center gap-8 py-1.5">
        {loop.map((p, i) => {
          const arrow =
            p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
          const color =
            p.change.dir === "up"
              ? "text-[var(--price-up)]"
              : p.change.dir === "down"
                ? "text-[var(--price-down)]"
                : "text-[var(--price-flat)]";
          return (
            <span
              key={`${p.slug}-${i}`}
              className="flex items-center gap-1.5 whitespace-nowrap text-sm"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-[var(--muted)]">
                {formatTaka(p.today)} টাকা/{unitBn(p.unit)}
              </span>
              <span className={`font-semibold ${color}`}>
                {arrow} {formatPct(p.change.pct)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
