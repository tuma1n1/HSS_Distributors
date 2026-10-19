import { strapiFetch } from "./strapi";
import type { SiteSetting } from "@/types/strapi";

export async function getSiteSettings(): Promise<SiteSetting | null> {
  try {
    const res = await strapiFetch<{ data: SiteSetting }>(
      "site-setting",
      {},
      { tags: ["site-setting"], revalidate: 300 },
    );
    return res.data;
  } catch {
    return null;
  }
}