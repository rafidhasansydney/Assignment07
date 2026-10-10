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

async function apiFetch<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${base}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("API unreachable");
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export function getCategoryProducts(slug: string): Promise<Product[]> {
  return apiFetch<Product[]>(`/products?category=${encodeURIComponent(slug)}`);
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
