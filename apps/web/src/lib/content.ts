import { logStrapiError, strapiFetch } from "./strapi";
import type { Branch, Category, DeliveryZone, Faq, SiteSetting, StrapiList } from "@/types/strapi";

async function list<T>(path: string, params: Record<string, string>, tag: string): Promise<T[]> {
  try {
    const res = await strapiFetch<StrapiList<T>>(path, params, { tags: [tag], revalidate: 300 });
    return res.data;
  } catch (err) {
    logStrapiError(path, err);
    return [];
  }
}

// Branches have no active flag: unpublishing one in Strapi is what hides it.
export const getBranches = () =>
  list<Branch>("branches", { sort: "sortOrder:asc", "pagination[pageSize]": "100" }, "branches");

// isActive can be null on zones saved before it defaulted to true, so only an explicit false hides one.
export const getDeliveryZones = async () =>
  (
    await list<DeliveryZone>(
      "delivery-zones",
      { sort: "sortOrder:asc", "pagination[pageSize]": "100" },
      "delivery-zones",
    )
  ).filter((z) => z.isActive !== false);

export const getFaqs = () =>
  list<Faq>("faqs", { sort: "sortOrder:asc", "pagination[pageSize]": "100" }, "faqs");

export async function getPaymentInfo(): Promise<SiteSetting | null> {
  try {
    const res = await strapiFetch<{ data: SiteSetting }>(
      "site-setting",
      { "populate[0]": "paymentMethods" },
      { tags: ["site-setting"], revalidate: 300 },
    );
    return res.data;
  } catch (err) {
    logStrapiError("site-setting", err);
    return null;
  }
}

export function money(v: number | string | null | undefined) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? `KES ${n.toLocaleString("en-KE")}` : null;
}

export const getNavCategories = () =>
  list<Category>(
    "categories",
    {
      "filters[parent][$null]": "true",
      sort: "sortOrder:asc",
      "fields[0]": "name",
      "fields[1]": "slug",
      "pagination[pageSize]": "12",
    },
    "categories",
  );
