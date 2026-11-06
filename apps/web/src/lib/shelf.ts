import { logStrapiError, strapiFetch } from "./strapi";
import type { Brand, Category, Product, StrapiList } from "@/types/strapi";

async function list<T>(path: string, params: Record<string, string>, tags: string[]): Promise<T[]> {
  try {
    const res = await strapiFetch<StrapiList<T>>(path, params, { tags, revalidate: 300 });
    return res.data;
  } catch (err) {
    logStrapiError(path, err);
    return [];
  }
}

const productPopulate = {
  "populate[0]": "images",
  "populate[1]": "brand",
  "populate[2]": "category",
};

const slugFilter = (slugs: string[]) =>
  Object.fromEntries(slugs.map((s, i) => [`filters[category][slug][$in][${i}]`, s]));

export const sortedChildren = (c: Category) =>
  [...(c.children ?? [])].sort(
    (a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || a.name.localeCompare(b.name),
  );

export const categorySlugs = (c: Category) => [c.slug, ...(c.children ?? []).map((k) => k.slug)];

export const getTopCategories = () =>
  list<Category>(
    "categories",
    {
      "filters[parent][$null]": "true",
      sort: "sortOrder:asc",
      "populate[0]": "image",
      "populate[1]": "children",
      "pagination[pageSize]": "30",
    },
    ["categories"],
  );

export async function getCategoryBySlug(slug: string) {
  const rows = await list<Category>(
    "categories",
    {
      "filters[slug][$eq]": slug,
      "populate[0]": "children",
      "populate[1]": "parent",
      "populate[2]": "image",
    },
    ["categories"],
  );
  return rows[0] ?? null;
}

export const getCategoryProducts = (slugs: string[], limit = 24) =>
  list<Product>(
    "products",
    {
      ...slugFilter(slugs),
      ...productPopulate,
      "sort[0]": "stockStatus:asc",
      "sort[1]": "name:asc",
      "pagination[pageSize]": String(limit),
    },
    ["products"],
  );

/** Filters need the whole set to count facets, and Strapi caps a page at 100. */
async function listAll<T>(params: Record<string, string>, maxPages = 10): Promise<T[]> {
  const page = (n: number) =>
    strapiFetch<StrapiList<T>>(
      "products",
      { ...params, "pagination[page]": String(n), "pagination[pageSize]": "100" },
      { tags: ["products"], revalidate: 300 },
    );
  try {
    const head = await page(1);
    const last = Math.min(head.meta.pagination.pageCount, maxPages);
    const rest = await Promise.all(Array.from({ length: Math.max(last - 1, 0) }, (_, i) => page(i + 2)));
    return [head, ...rest].flatMap((r) => r.data);
  } catch (err) {
    logStrapiError("products", err);
    return [];
  }
}

export const getAllCategoryProducts = (slugs: string[]) =>
  listAll<Product>({ ...slugFilter(slugs), ...productPopulate, "sort[0]": "name:asc" });

/** All products, narrowed by a search term when there is one. */
export const searchAllProducts = (q?: string) =>
  listAll<Product>({
    ...(q ? { "filters[$or][0][name][$containsi]": q, "filters[$or][1][sku][$containsi]": q } : {}),
    ...productPopulate,
    "sort[0]": "name:asc",
  });

/** One random product from each top-level category, in stock only unless told otherwise. */
export async function getFeaturedPicks(categories: Category[], inStockOnly = true) {
  const picks = await Promise.all(
    categories.map(async (c) => {
      const items = await list<Product>(
        "products",
        {
          ...slugFilter(categorySlugs(c)),
          ...(inStockOnly ? { "filters[stockStatus][$eq]": "in_stock" } : {}),
          ...productPopulate,
          "pagination[pageSize]": "25",
        },
        ["products"],
      );
      return items.length ? items[Math.floor(Math.random() * items.length)] : null;
    }),
  );
  return picks.filter((p): p is Product => p !== null);
}

/** Products with a photo for the home hero, featured ones first. */
export async function getSlideshowProducts(limit = 6) {
  const rows = await list<Product>(
    "products",
    {
      "filters[images][id][$notNull]": "true",
      ...productPopulate,
      "sort[0]": "isFeatured:desc",
      "sort[1]": "updatedAt:desc",
      "pagination[pageSize]": String(limit),
    },
    ["products"],
  );
  return rows.filter((p) => (p.images?.length ?? 0) > 0);
}

export const getConfirmedBrands = () =>
  list<Brand>(
    "brands",
    { "filters[isConfirmed][$eq]": "true", "populate[0]": "logo", "pagination[pageSize]": "24" },
    ["brands"],
  );

export async function getProductDetail(slug: string) {
  const rows = await list<Product>(
    "products",
    {
      "filters[slug][$eq]": slug,
      "populate[images]": "true",
      "populate[brand]": "true",
      "populate[category][populate][0]": "parent",
    },
    ["products"],
  );
  return rows[0] ?? null;
}

/** Same category first, same brand ahead of others, excluding the product itself. */
export async function getRelatedProducts(product: Product, limit = 4) {
  if (!product.category) return [];
  const pool = await getCategoryProducts([product.category.slug], 24);
  const sameBrand = (p: Product) => p.brand?.documentId === product.brand?.documentId;
  return pool
    .filter((p) => p.documentId !== product.documentId)
    .sort((a, b) => Number(sameBrand(b)) - Number(sameBrand(a)))
    .slice(0, limit);
}