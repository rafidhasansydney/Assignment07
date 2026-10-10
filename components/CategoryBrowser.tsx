"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { toBnDigits } from "@/lib/bn";
import ProductCard from "./ProductCard";

type SortKey = "default" | "asc" | "desc";

/** Sorts by the numeric price field — display uses Bengali numerals but never affects order */
export default function CategoryBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted =
    sort === "default"
      ? products
      : [...products].sort((a, b) =>
          sort === "asc" ? a.today - b.today : b.today - a.today,
        );

  return (
    <div>
      <div className="flex justify-end">
        <label className="flex items-center gap-2 text-sm font-medium">
          <span>সাজান</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1 pl-3 pr-8 text-sm font-medium outline-none focus:border-[var(--primary)]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)]">
              ▼
            </span>
          </span>
        </label>
      </div>

      <p className="mt-3 text-sm text-[var(--muted)]">
        মোট {toBnDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
