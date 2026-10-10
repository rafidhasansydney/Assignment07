import { cacheLife } from "next/cache";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // alternative
];

/** Used when both API hosts are unreachable, so the site never renders broken */
const FALLBACK_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

/** Raw fetch with host fallback; prices change daily so 5-minute freshness is plenty */
async function rawFetch<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${base}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("API unreachable");
}

const PRICE_CACHE = { stale: 300, revalidate: 300, expire: 3600 };

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife(PRICE_CACHE);
  return rawFetch<Category[]>("/categories");
}

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife(PRICE_CACHE);
  return rawFetch<Product[]>("/products");
}

/**
 * Resolved from the cached product list rather than /products/:slug —
 * the list carries full market data, and it avoids one request per product
 * during prerendering (the API rate-limits bursts with 429).
 */
export async function getProduct(slugOrId: string): Promise<Product> {
  "use cache";
  cacheLife(PRICE_CACHE);
  const products = await rawFetch<Product[]>("/products");
  const product = products.find(
    (p) => p.slug === slugOrId || String(p.id) === slugOrId,
  );
  if (!product) throw new Error(`Product not found: ${slugOrId}`);
  return product;
}

export async function getCategoryProducts(slug: string): Promise<Product[]> {
  "use cache";
  cacheLife(PRICE_CACHE);
  return rawFetch<Product[]>(`/products?category=${encodeURIComponent(slug)}`);
}

/** Never throws — falls back to the built-in category list */
export async function getCategoriesSafe(): Promise<Category[]> {
  try {
    return await getCategories();
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

/** Never throws — ticker is simply hidden when the API is unreachable */
export async function getTickerProductsSafe(): Promise<Product[]> {
  try {
    return (await getProducts()).slice(0, 12);
  } catch {
    return [];
  }
}
