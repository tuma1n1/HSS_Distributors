import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description:
    "HSS Distributors is the FMCG distribution business of HSS Prime Group, based in Nairobi, Kenya.",
  alternates: { canonical: "/about" },
};

const SERVES = [
  "Dukas and retailers",
  "Hotels and restaurants",
  "Schools and institutions",
  "Supermarkets and wholesalers",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About HSS Distributors</h1>

      <section className="mt-6 space-y-4 text-neutral-700">
        <p>
          HSS Distributors is the FMCG distribution business of HSS Prime Group,
          based in Nairobi, Kenya. We supply everyday food and household
          products in bulk to businesses that need dependable stock.
        </p>
        <p>
          We built this website so you can see our products, check stock status
          and send us your list without calling around.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Who we serve</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {SERVES.map((s) => (
            <li key={s} className="rounded-xl border border-neutral-200 p-4 font-medium">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Part of HSS Prime Group</h2>
        <p className="mt-3 text-neutral-700">
          HSS Distributors is part of{" "}
          <a
            href="https://hssprimegroupltd.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 underline"
          >
            HSS Prime Group
          </a>
          , a Nairobi-based group of businesses.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/catalogue"
          className="rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
        >
          Browse catalogue
        </Link>
        <Link
          href="/how-to-order"
          className="rounded-lg border border-brand-700 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
        >
          How to order
        </Link>
      </div>
    </div>
  );
}