import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "How to order",
  description:
    "How to order from HSS Distributors: browse the catalogue, send your list on WhatsApp, confirm availability and price, then pay to our official details only.",
  alternates: { canonical: "/how-to-order" },
};

const STEPS = [
  {
    title: "Browse the catalogue",
    text: "Find products by category or brand, or search by name. Each product shows its pack size and stock status.",
  },
  {
    title: "Build your quote list",
    text: "Click “Add to quote list” on every product you need and set the quantities.",
  },
  {
    title: "Send it to us on WhatsApp",
    text: "Open your quote list and send it. Your list arrives as one clear message, ready for us to price.",
  },
  {
    title: "We confirm availability and price",
    text: "We reply with what is available, the price and the delivery arrangements for your location.",
  },
  {
    title: "Pay to our official details only",
    text: "Once you agree, pay using the official payment details we share with you. Never pay to any other number or account.",
  },
];

export default async function HowToOrderPage() {
  const settings = await getSiteSettings();
  const wa = whatsappLink(
    settings?.whatsappNumber ?? "",
    "Hello HSS Distributors, I would like to place an order.",
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">How to order</h1>
      <p className="mt-3 text-neutral-600">
        Ordering from HSS Distributors takes a few minutes. There are no accounts
        to create and no online payment.
      </p>

      <ol className="mt-8 space-y-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4 rounded-xl border border-neutral-200 p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{s.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-xl border border-gold-500 bg-gold-400/10 p-5 text-sm">
        <p className="font-semibold">Protect yourself from fraud</p>
        <p className="mt-1 text-neutral-700">
          HSS Distributors will only ask you to pay to the official payment
          details we confirm with you directly. If someone asks you to pay
          elsewhere, do not pay, and contact us.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/catalogue"
          className="rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
        >
          Browse catalogue
        </Link>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gold-500 px-5 py-3 font-semibold text-brand-900 hover:bg-gold-400"
          >
            Order on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}