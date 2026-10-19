import { strapiFetch } from "./strapi";
import type { Brand, Category, Product, StrapiList } from "@/types/strapi";

export const PAGE_SIZE = 24;

export async function getCategories(): Promise<Category[]> {
  const res = await strapiFetch<StrapiList<Category>>(
    "categories",
    {
      "populate[0]": "parent",
      "populate[1]": "children",
      sort: "sortOrder:asc",
      "pagination[pageSize]": "100",
    },
    { tags: ["categories"], revalidate: 300 },
  );
  return res.data;
}

export async function getBrands(): Promise<Brand[]> {
  const res = await strapiFetch<StrapiList<Brand>>(
    "brands",
    { sort: "name:asc", "pagination[pageSize]": "100" },
    { tags: ["brands"], revalidate: 300 },
  );
  return res.data;
}

// A parent category includes the products of its children.
export function expandCategorySlugs(categories: Category[], slug: string): string[] {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return ["__none__"];
  return [category.slug, ...(category.children ?? []).map((c) => c.slug)];
}

type ProductQuery = {
  q?: string;
  categorySlugs?: string[];
  brandSlug?: string;
  page?: number;
};

export async function getProducts({ q, categorySlugs, brandSlug, page = 1 }: ProductQuery) {
  const params: Record<string, string> = {
    "populate[0]": "category",
    "populate[1]": "brand",
    sort: "name:asc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(PAGE_SIZE),
  };
  if (q) {
    params["filters[$or][0][name][$containsi]"] = q;
    params["filters[$or][1][sku][$containsi]"] = q;
  }
  categorySlugs?.forEach((slug, i) => {
    params[`filters[category][slug][$in][${i}]`] = slug;
  });
  if (brandSlug) params["filters[brand][slug][$eq]"] = brandSlug;

  return strapiFetch<StrapiList<Product>>("products", params, {
    tags: ["products"],
    revalidate: 60,
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await strapiFetch<StrapiList<Product>>(
    "products",
    {
      "filters[slug][$eq]": slug,
      "populate[0]": "category",
      "populate[1]": "brand",
    },
    { tags: ["products", `product:${slug}`], revalidate: 60 },
  );
  return res.data[0] ?? null;
}