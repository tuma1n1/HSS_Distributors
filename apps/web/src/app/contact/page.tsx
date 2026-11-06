import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact HSS Distributors at ICD Business Park, Nairobi. Call or WhatsApp 0711 995 588, or email sales@hssdistributors.co.ke.",
  alternates: { canonical: "/contact" },
};

const card = "rounded-xl border border-neutral-200 p-5";
const label = "text-sm font-semibold text-brand-700";
const contactLink = "flex min-h-11 items-center [overflow-wrap:anywhere] hover:underline";

export default async function ContactPage() {
  const s = await getSiteSettings();
  const wa = whatsappLink(s.whatsappNumber ?? "", "Hello HSS Distributors, I have a question.");
  const phones = [s.primaryPhone, s.secondaryPhone].filter((p): p is string => Boolean(p));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Get in touch</h1>
      <p className="mt-3 text-neutral-600">Call, WhatsApp or email our sales team, or send us a message below.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg text-center bg-gold-500 px-6 sm:w-auto py-3 font-semibold text-brand-900 hover:bg-gold-400"
            >
              Chat on WhatsApp
            </a>
          )}

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {phones.length > 0 && (
              <div className={card}>
                <dt className={label}>Calls and WhatsApp</dt>
                <dd className="mt-1">
                  {phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className={contactLink}>
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
            )}
            {s.salesEmail && (
              <div className={card}>
                <dt className={label}>Sales email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${s.salesEmail}`} className={contactLink}>
                    {s.salesEmail}
                  </a>
                </dd>
              </div>
            )}
            {s.address && (
              <div className={card}>
                <dt className={label}>Office</dt>
                <dd className="mt-1 whitespace-pre-line">{s.address}</dd>
              </div>
            )}
            {s.openingHours && (
              <div className={card}>
                <dt className={label}>Opening hours</dt>
                <dd className="mt-1 whitespace-pre-line">{s.openingHours}</dd>
              </div>
            )}
          </dl>

          <p className="mt-6 text-sm text-neutral-600">
            Ready to order? See{" "}
            <Link href="/how-to-order" className="font-semibold text-brand-700 underline">how to order</Link>.
          </p>
        </div>

        <section aria-labelledby="message-heading" className="rounded-2xl bg-brand-50 p-5 sm:p-6">
          <h2 id="message-heading" className="mb-4 text-xl font-bold text-brand-900">Send us a message</h2>
          <ContactForm email={s.salesEmail ?? "sales@hssdistributors.co.ke"} />
        </section>
      </div>
    </div>
  );
}
