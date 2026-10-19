import type { Metadata } from "next";
import { getDeliveryZones, money } from "@/lib/content";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Delivery",
  description: "HSS Distributors delivery areas, fees and lead times in and around Nairobi.",
  alternates: { canonical: "/delivery" },
};

export default async function DeliveryPage() {
  const [zones, settings] = await Promise.all([getDeliveryZones(), getSiteSettings()]);
  const wa = whatsappLink(
    settings?.whatsappNumber ?? "",
    "Hello HSS Distributors, do you deliver to my location?",
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Delivery</h1>
      <p className="mt-3 text-neutral-600">
        Delivery fees and lead times depend on your location and order size. We confirm both
        when we send your quote.
      </p>

      {zones.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600">
          Delivery areas and fees are being confirmed. Message us with your location and we
          will tell you what is possible.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {zones.map((z) => (
            <article key={z.documentId} className="rounded-xl border border-neutral-200 p-5">
              <h2 className="text-lg font-bold">{z.name}</h2>
              {z.description && <p className="mt-2 text-sm text-neutral-600">{z.description}</p>}
              {z.areas && <p className="mt-3 whitespace-pre-line text-sm">{z.areas}</p>}
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Delivery fee</dt>
                  <dd className="font-medium">{money(z.deliveryFee) ?? "Confirmed on quote"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Minimum order</dt>
                  <dd className="font-medium">{money(z.minimumOrder) ?? "Confirmed on quote"}</dd>
                </div>
                {z.leadTime && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-neutral-500">Lead time</dt>
                    <dd className="font-medium">{z.leadTime}</dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      )}

      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-brand-900 hover:bg-gold-400"
        >
          Ask about your location
        </a>
      )}
    </div>
  );
}