import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka, perUnitBn } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] text-2xl">
            {product.image}
          </span>
          <span className="leading-tight">
            <span className="block font-semibold">{product.nameBn}</span>
            <span className="block text-xs text-[var(--muted)]">
              {perUnitBn(product.unit)}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span className="leading-tight">
          <span className="block text-xs text-[var(--muted)]">আজকের দাম</span>
          <span className="block text-xl font-bold">
            {formatTaka(product.today)} টাকা
          </span>
        </span>
        <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
      </div>
    </Link>
  );
}
