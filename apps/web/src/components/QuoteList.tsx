"use client";

import Link from "next/link";
import { useState } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { useQuote } from "@/lib/quote";
import { whatsappLink } from "@/lib/whatsapp";

export function QuoteList({ whatsappNumber }: { whatsappNumber: string | null }) {
  const { items, ready, setQty, remove, clear } = useQuote();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");

  if (!ready) return <p className="text-neutral-500">Loading your list…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-10 text-center">
        <p className="font-semibold">Your quote list is empty.</p>
        <p className="mt-1 text-sm text-neutral-600">
          Add products from the catalogue and send us the list in one message.
        </p>
        <Link
          href="/catalogue"
          className="mt-5 inline-block rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
        >
          Browse catalogue
        </Link>
      </div>
    );
  }

    const lines = items.map(
    (i, n) => `${n + 1}. ${i.name}${i.packSize ? ` (${i.packSize})` : ""} x ${i.qty}`,
  );

  const details = [
    name && `Name: ${name}`,
    business && `Business: ${business}`,
    location && `Delivery location: ${location}`,
  ].filter(Boolean);

  const message = [
    "Hello HSS Distributors, I would like a quote for:",
    "",
    ...lines,
    ...(details.length > 0 ? ["", ...details] : []),
  ].join("\n");

  const href = whatsappLink(whatsappNumber ?? "", message);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          {items.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <Link href={`/product/${i.slug}`} className="font-semibold hover:text-brand-700">
                  {i.name}
                </Link>
                {i.packSize && <p className="text-sm text-neutral-500">{i.packSize}</p>}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Decrease ${i.name}`}
                  onClick={() => setQty(i.id, i.qty - 1)}
                  className="h-9 w-9 rounded-lg border border-neutral-300 hover:bg-neutral-100"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={i.qty}
                  aria-label={`Quantity for ${i.name}`}
                  onChange={(e) => setQty(i.id, Number(e.target.value))}
                  className="h-9 w-16 rounded-lg border border-neutral-300 text-center"
                />
                <button
                  type="button"
                  aria-label={`Increase ${i.name}`}
                  onClick={() => setQty(i.id, i.qty + 1)}
                  className="h-9 w-9 rounded-lg border border-neutral-300 hover:bg-neutral-100"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(i.id)}
                className="text-sm text-neutral-500 underline hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={clear}
          className="mt-3 text-sm text-neutral-500 underline hover:text-red-600"
        >
          Clear list
        </button>
      </div>

      <aside className="h-fit rounded-xl border border-neutral-200 bg-brand-50 p-5">
        <h2 className="font-bold">Send your list</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Optional details help us respond faster.
        </p>
        <div className="mt-4 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
          <input
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Business name"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Delivery location"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-lg bg-gold-500 px-5 py-3 text-center font-semibold text-brand-900 hover:bg-gold-400"
          >
            Send on WhatsApp
          </a>
        ) : (
          <p className="mt-5 rounded-lg bg-white p-3 text-sm text-neutral-600">
            WhatsApp ordering will be available soon. Please use the{" "}
            <Link href="/contact" className="font-semibold text-brand-700 underline">
              contact page
            </Link>
            .
          </p>
        )}
        <details className="mt-6 border-t border-neutral-200 pt-4">
          <summary className="cursor-pointer font-semibold">
            Prefer to send a form instead?
          </summary>
          <EnquiryForm items={items} />
        </details>
        <p className="mt-4 text-xs text-neutral-500">
          This is a quote request, not an order. We confirm availability and
          price before you pay. Pay only to our official payment details.
        </p>
      </aside>
    </div>
  );
}