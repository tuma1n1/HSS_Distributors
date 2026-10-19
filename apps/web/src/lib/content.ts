import { strapiFetch } from "./strapi";
import type { Branch, DeliveryZone, Faq, SiteSetting, StrapiList } from "@/types/strapi";

async function list<T>(path: string, params: Record<string, string>, tag: string): Promise<T[]> {
  try {
    const res = await strapiFetch<StrapiList<T>>(path, params, { tags: [tag], revalidate: 300 });
    return res.data;
  } catch {
    return [];
  }
}

export const getBranches = () =>
  list<Branch>("branches", { "filters[isActive][$eq]": "true", sort: "sortOrder:asc" }, "branches");

export const getDeliveryZones = () =>
  list<DeliveryZone>(
    "delivery-zones",
    { "filters[isActive][$eq]": "true", sort: "sortOrder:asc" },
    "delivery-zones",
  );

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
  } catch {
    return null;
  }
}

export function money(v: number | string | null | undefined) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? `KES ${n.toLocaleString("en-KE")}` : null;
}