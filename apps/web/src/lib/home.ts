import { strapiFetch } from "./strapi";
import type { Brand, Category, Product, StrapiList } from "@/types/strapi";

async function list<T>(
  path: string,
  params: Record<string, string>,
  tags: string[],
): Promise<T[]> {
  try {
    const res = await strapiFetch<StrapiList<T>>(path, params, { tags, revalidate: 300 });
    return res.data;
  } catch {
    return [];
  }
}

const productPopulate = { "populate[0]": "images", "populate[1]": "brand" };

export async function getHomeData() {
  const [categories, brands, featured] = await Promise.all([
    list<Category>(
      "categories",
      {
        "filters[parent][$null]": "true",
        sort: "sortOrder:asc",
        "populate[0]": "image",
        "pagination[pageSize]": "12",
      },
      ["categories"],
    ),
    list<Brand>(
      "brands",
      {
        "filters[isConfirmed][$eq]": "true",
        "populate[0]": "logo",
        "pagination[pageSize]": "24",
      },
      ["brands"],
    ),
    list<Product>(
      "products",
      {
        "filters[isFeatured][$eq]": "true",
        ...productPopulate,
        "pagination[pageSize]": "8",
      },
      ["products"],
    ),
  ]);

  let products = featured;
  if (products.length < 4) {
    products = await list<Product>(
      "products",
      { sort: "createdAt:desc", ...productPopulate, "pagination[pageSize]": "8" },
      ["products"],
    );
  }

  return { categories, brands, products };
}