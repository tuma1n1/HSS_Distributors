import { logStrapiError, strapiFetch } from "./strapi";
import type { SiteSetting } from "@/types/strapi";

/** Confirmed company details. Anything filled in on Site Setting in Strapi takes priority. */
const COMPANY: SiteSetting = {
  legalName: "HSS Distributors Limited",
  whatsappNumber: "254711995588",
  primaryPhone: "0711 995 588",
  salesEmail: "sales@hssdistributors.co.ke",
  address: "ICD Business Park, No. 11\nNairobi, Kenya",
};

export async function getSiteSettings(): Promise<SiteSetting> {
  try {
    const res = await strapiFetch<{ data: SiteSetting }>(
      "site-setting",
      {},
      { tags: ["site-setting"], revalidate: 300 },
    );
    const filled = Object.entries(res.data).filter(([, value]) => value !== null && value !== "");
    return { ...COMPANY, ...Object.fromEntries(filled) };
  } catch (err) {
    logStrapiError("site-setting", err);
    return COMPANY;
  }
}
