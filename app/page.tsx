import Image from "next/image";
import type { Product } from "@/lib/types";
import { getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";
import ProductCard from "@/components/ProductCard";
import TodayChip from "@/components/TodayChip";

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    // both API hosts unreachable — the sections below simply render nothing
  }

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="my-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <TodayChip />
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-3 max-w-xl text-[var(--muted)] sm:text-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              সর্বনিম্ন, সর্বাধিক ও গড় দামসহ এক জায়গায়।
            </p>
            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex h-11 items-center rounded-lg bg-[var(--primary)] px-5 font-semibold text-white transition-colors hover:bg-[var(--primary-active)]"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          <Image
            src="/bazar-hero.png"
            alt="বাজারের নিত্যপণ্যের চিত্র"
            width={315}
            height={263}
            priority
            className="h-auto w-64 sm:w-72 lg:w-80"
          />
        </div>
      </section>

      {/* Risers */}
      {risers.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-bold">
            <span className="text-[var(--price-up)]">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Fallers */}
      {fallers.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">
            <span className="text-[var(--price-down)]">▼</span> আজ দাম কমেছে
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* All products */}
      <section id="সব-পণ্য" className="mt-10 scroll-mt-28 pb-12">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        {products.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-[var(--muted)]">
              মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        ) : (
          <p className="mt-3 text-[var(--muted)]">
            দুঃখিত, এই মুহূর্তে দামের তথ্য আনা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা
            করুন।
          </p>
        )}
      </section>
    </div>
  );
}
