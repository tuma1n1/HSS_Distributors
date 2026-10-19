"use server";

import { redirect } from "next/navigation";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export type EnquiryState = {
  ok: boolean;
  error?: string;
  values?: Record<string, string>;
};

type Item = { id: string; name: string; packSize: string | null; qty: number };

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

function parseItems(raw: FormDataEntryValue | null): Item[] {
  try {
    const arr = JSON.parse(String(raw ?? "[]"));
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, 100).map((i) => ({
      id: String(i.id ?? "").slice(0, 60),
      name: String(i.name ?? "").slice(0, 200),
      packSize: i.packSize ? String(i.packSize).slice(0, 100) : null,
      qty: Math.max(1, Math.min(9999, Math.floor(Number(i.qty)) || 1)),
    }));
  } catch {
    return [];
  }
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real people never see or fill this field
  if (formData.get("website")) redirect("/quote/sent");

  const values = {
    name: clean(formData.get("name"), 100),
    businessName: clean(formData.get("businessName"), 150),
    phone: clean(formData.get("phone"), 25),
    email: clean(formData.get("email"), 150),
    location: clean(formData.get("location"), 200),
    message: String(formData.get("message") ?? "").trim().slice(0, 1000),
  };
  const items = parseItems(formData.get("items"));

  const fail = (error: string): EnquiryState => ({ ok: false, error, values });

  if (values.name.length < 2) return fail("Please enter your name.");
  if (!/^[+\d][\d\s()-]{6,24}$/.test(values.phone))
    return fail("Please enter a valid phone number.");
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    return fail("That email address doesn't look right.");
  if (items.length === 0) return fail("Your quote list is empty.");

  const token = process.env.STRAPI_ENQUIRY_TOKEN;
  if (!token) {
    console.error("STRAPI_ENQUIRY_TOKEN is not set");
    return fail("We couldn't send your request. Please use WhatsApp instead.");
  }

  let reference = "";
  try {
    const res = await fetch(`${STRAPI_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: { ...values, items } }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Strapi responded ${res.status}`);
    const json = (await res.json()) as { data: { id: number } };
    reference = `ENQ-${String(json.data.id).padStart(5, "0")}`;
  } catch (err) {
    console.error("Enquiry save failed:", err);
    return fail("We couldn't send your request. Please use WhatsApp instead.");
  }

  // Email notification: best effort, never blocks the customer
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFICATION_EMAIL;
  if (apiKey && to) {
    const text = [
      `New quote request ${reference}`,
      "",
      `Name: ${values.name}`,
      `Business: ${values.businessName || "-"}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email || "-"}`,
      `Location: ${values.location || "-"}`,
      "",
      "Items:",
      ...items.map((i, n) => `${n + 1}. ${i.name}${i.packSize ? ` (${i.packSize})` : ""} x ${i.qty}`),
      "",
      `Message: ${values.message || "-"}`,
    ].join("\n");

    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: process.env.MAIL_FROM ?? "HSS Distributors <onboarding@resend.dev>",
          to: [to],
          reply_to: values.email || undefined,
          subject: `Quote request ${reference}: ${values.name}`,
          text,
        }),
      });
    } catch (err) {
      console.error("Enquiry email failed:", err);
    }
  }

  redirect(`/quote/sent?ref=${reference}`);
}