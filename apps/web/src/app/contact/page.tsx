import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact HSS Distributors in Nairobi by WhatsApp, phone or email.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const s = await getSiteSettings();
  const wa = whatsappLink(s?.whatsappNumber ?? "", "Hello HSS Distributors, I have a question.");
    const phones = [s?.primaryPhone, s?.secondaryPhone].filter(
    (p): p is string => Boolean(p),
  );
  const hasAny = wa || phones.length > 0 || s?.salesEmail || s?.address || s?.openingHours;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-3 text-neutral-600">
        The fastest way to reach us is WhatsApp. Send your product list or ask a question.
      </p>

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-brand-900 hover:bg-gold-400"
        >
          Chat on WhatsApp
        </a>
      )}

      {hasAny ? (
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {phones.length > 0 && (
            <div className="rounded-xl border border-neutral-200 p-5">
              <dt className="text-sm font-semibold text-brand-700">Phone</dt>
              <dd className="mt-1 space-y-1">
                {phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="block hover:underline">
                    {p}
                  </a>
                ))}
              </dd>
            </div>
          )}
          {s?.salesEmail && (
            <div className="rounded-xl border border-neutral-200 p-5">
              <dt className="text-sm font-semibold text-brand-700">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${s.salesEmail}`} className="hover:underline">
                  {s.salesEmail}
                </a>
              </dd>
            </div>
          )}
          {s?.address && (
            <div className="rounded-xl border border-neutral-200 p-5">
              <dt className="text-sm font-semibold text-brand-700">Address</dt>
              <dd className="mt-1 whitespace-pre-line">{s.address}</dd>
            </div>
          )}
          {s?.openingHours && (
            <div className="rounded-xl border border-neutral-200 p-5">
              <dt className="text-sm font-semibold text-brand-700">Opening hours</dt>
              <dd className="mt-1 whitespace-pre-line">{s.openingHours}</dd>
            </div>
          )}
        </dl>
      ) : (
        <p className="mt-8 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600">
          Our contact details are being added. Please check back soon.
        </p>
      )}

      <p className="mt-8 text-sm text-neutral-600">
        Looking for a location? See our <Link href="/branches" className="font-semibold text-brand-700 underline">branches</Link> or{" "}
        <Link href="/how-to-order" className="font-semibold text-brand-700 underline">how to order</Link>.
      </p>
    </div>
  );
}