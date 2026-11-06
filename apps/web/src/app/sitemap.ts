import type { MetadataRoute } from "next";
import { hasPrice } from "@/lib/format";
import { strapiFetch } from "@/lib/strapi";
import type { StrapiList } from "@/types/strapi";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

type Row = {
  slug: string;
  updatedAt?: string;
  price?: number | null;
  shortDescription?: string | null;
};

async function all(path: string, fields: string[], tag: string): Promise<Row[]> {
  const out: Row[] = [];
  const fieldParams = Object.fromEntries(fields.map((f, i) => [`fields[${i}]`, f]));
  try {
    for (let page = 1; page <= 50; page++) {
      const res = await strapiFetch<StrapiList<Row>>(
        path,
        { ...fieldParams, "pagination[page]": String(page), "pagination[pageSize]": "100" },
        { tags: [tag], revalidate: 3600 },
      );
      out.push(...res.data);
      if (page >= res.meta.pagination.pageCount) break;
    }
  } catch {
    // Strapi unreachable: return what we have
  }
  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    all("products", ["slug", "price", "shortDescription", "updatedAt"], "products"),
    all("categories", ["slug", "updatedAt"], "categories"),
  ]);

  const staticPaths = [
    "",
    "/catalogue",
    "/how-to-order",
    "/delivery",
    "/branches",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/official-channels",
    "/official-payment-details",
    "/for/dukas-and-retailers",
    "/for/hotels-and-restaurants",
    "/for/schools-and-institutions",
    "/for/supermarkets-and-wholesalers",
    "/report-scam",
    "/become-a-supplier",
  ];

  const now = new Date();

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: now,
      priority: p === "" ? 1 : 0.7,
    })),
    ...categories.map((c) => ({
      url: `${BASE}/catalogue/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      priority: 0.8,
    })),
    ...products
      .filter((p) => hasPrice(p.price) && p.shortDescription)
      .map((p) => ({
        url: `${BASE}/product/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        priority: 0.6,
      })),
  ];
}