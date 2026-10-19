import type { Metadata } from "next";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Answers about ordering, delivery, payment and products at HSS Distributors.",
  alternates: { canonical: "/faq" },
};

const LABELS: Record<string, string> = {
  ordering: "Ordering",
  delivery: "Delivery",
  payment: "Payment",
  products: "Products",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const groups = new Map<string, typeof faqs>();
  for (const f of faqs) {
    const key = f.category ?? "other";
    groups.set(key, [...(groups.get(key) ?? []), f]);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <h1 className="text-3xl font-bold">Frequently asked questions</h1>

      {faqs.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600">
          Questions and answers are being added.
        </p>
      ) : (
        [...groups.entries()].map(([key, items]) => (
          <section key={key} className="mt-8">
            <h2 className="text-xl font-bold">{LABELS[key] ?? "General"}</h2>
            <div className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
              {items.map((f) => (
                <details key={f.documentId} className="group p-4">
                  <summary className="cursor-pointer font-semibold marker:text-brand-600">
                    {f.question}
                  </summary>
                  <p className="mt-2 whitespace-pre-line text-neutral-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}