import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/lib/types";
import { getProducts, getProduct } from "@/lib/api";
import { formatTaka, formatPct, perUnitBn, unitBn } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export async function generateStaticParams() {
  const products = await getProducts().catch(() => []);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product: Product | null = null;
  try {
    product = await getProduct(slug);
  } catch {
    product = null;
  }
  return { title: product ? product.nameBn : "পণ্য পাওয়া যায়নি" };
}

function changeLine(product: Product): string {
  const diff = product.today - product.yesterday;
  const dir =
    diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত রয়েছে";
  const amount = diff === 0 ? "" : ` · ${formatTaka(Math.abs(diff))} টাকা`;
  return `গতকালের তুলনায় আজ দাম ${dir}${amount}`;
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const marketRows = product.markets.map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));
  const minRow = marketRows.reduce((a, b) => (b.min < a.min ? b : a));
  const maxRow = marketRows.reduce((a, b) => (b.max > a.max ? b : a));
  const overallAvg =
    marketRows.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
    (marketRows.length || 1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--primary)]">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-[var(--primary)]"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-[var(--foreground)]">{product.nameBn}</span>
      </nav>

      {/* Header */}
      <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--background)] text-4xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {perUnitBn(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm">
                <span
                  className={
                    product.change.dir === "up"
                      ? "text-[var(--price-up)]"
                      : product.change.dir === "down"
                        ? "text-[var(--price-down)]"
                        : "text-[var(--price-flat)]"
                  }
                >
                  {changeLine(product)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center rounded-xl bg-[var(--background)] px-6 py-4 text-center">
            <span className="text-sm text-[var(--muted)]">আজকের দাম</span>
            <span className="text-4xl font-bold">{formatTaka(product.today)}</span>
            <span className="text-sm text-[var(--muted)]">
              টাকা / {unitBn(product.unit)}
            </span>
            <ChangeBadge
              dir={product.change.dir}
              pct={product.change.pct}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Price summary */}
      <section className="mt-6">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm text-[var(--muted)]">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-[var(--price-up)]">
              {formatTaka(minRow.min)} টাকা
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">{minRow.market}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm text-[var(--muted)]">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-[var(--price-down)]">
              {formatTaka(maxRow.max)} টাকা
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">{maxRow.market}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-sm text-[var(--muted)]">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold">
              {formatTaka(overallAvg)} টাকা
            </p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              সব বাজারের গড়, {perUnitBn(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </section>

      {/* Market-wise prices */}
      <section className="mt-8 pb-12">
        <h2 className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left">
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                <th className="px-4 py-3 font-semibold">সর্বাধিক</th>
                <th className="px-4 py-3 font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {marketRows.map((m, i) => (
                <tr
                  key={m.market}
                  className={`border-b border-[var(--border)] last:border-0 ${
                    i % 2 === 1 ? "bg-[var(--background)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {m.division}
                  </td>
                  <td className="px-4 py-3 text-[var(--price-up)]">
                    {formatTaka(m.min)} টাকা
                  </td>
                  <td className="px-4 py-3 text-[var(--price-down)]">
                    {formatTaka(m.max)} টাকা
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatTaka(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
