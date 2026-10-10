import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Product } from "@/lib/types";
import { getCategories, getCategoryProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";
import CategoryBrowser from "@/components/CategoryBrowser";

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);
  return { title: category ? `${category.nameBn}` : "ক্যাটাগরি পাওয়া যায়নি" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);

  let products: Product[] = [];
  if (category) {
    try {
      products = await getCategoryProducts(slug);
    } catch {
      products = [];
    }
  }

  // unknown slug, or a category with no items — both show the 404 state
  if (!category || products.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--background)] text-3xl">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{category.nameBn}</h1>
            <p className="text-sm text-[var(--muted)]">
              {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <CategoryBrowser products={products} />
      </div>
    </div>
  );
}
