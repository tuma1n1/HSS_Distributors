import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MANUFACTURERS } from "@/lib/manufacturers";
import { getSiteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "HSS Distributors is the FMCG distribution business of HSS Prime Group, based at ICD Business Park, Nairobi. We distribute the full ranges of Bidco, Unga Group, Kapa and more.",
  alternates: { canonical: "/about" },
};

const d = (i: number) => ({ "--i": i }) as CSSProperties;

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold-400/20 text-gold-600">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

const PROMISES = [
  {
    title: "Full manufacturer ranges",
    text: "We distribute all the products our partner manufacturers make, so one supplier covers most of your shelf.",
    icon: <path d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" />,
  },
  {
    title: "Bulk packs and cartons",
    text: "Wholesale sizes for shops, kitchens and institutions that need dependable stock.",
    icon: <path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8" />,
  },
  {
    title: "Price confirmed before you pay",
    text: "Send us your list and we confirm availability and price first. No surprises.",
    icon: <path d="M9 12l2 2 4-4M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />,
  },
  {
    title: "Delivery across Nairobi",
    text: "We bring your order to your business. See our delivery zones for details.",
    icon: <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />,
  },
];

const SERVES = [
  { title: "Dukas and retailers", text: "Fast-moving staples for your shelves.", href: "/for/dukas-and-retailers" },
  { title: "Hotels and restaurants", text: "Kitchen staples in bulk packs.", href: "/for/hotels-and-restaurants" },
  { title: "Schools and institutions", text: "Reliable supply for catering needs.", href: "/for/schools-and-institutions" },
  { title: "Supermarkets and wholesalers", text: "Cartons and volume for resale.", href: "/for/supermarkets-and-wholesalers" },
];

export default async function AboutPage() {
  const s = await getSiteSettings();

  const facts = [
    { value: String(MANUFACTURERS.length), label: "manufacturers we distribute for" },
    { value: String(SERVES.length), label: "kinds of business we supply" },
    { value: "1", label: "list, sent in one message" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(40rem_25rem_at_85%_0%,rgba(224,185,60,0.22),transparent_70%),radial-gradient(30rem_20rem_at_0%_100%,rgba(91,107,42,0.6),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <p className="rise text-sm font-medium text-gold-400" style={d(0)}>About us</p>
          <h1 className="rise mt-3 max-w-3xl text-[2rem] font-extrabold leading-[1.05] sm:text-5xl" style={d(1)}>
            Dependable bulk supply for Kenyan businesses.
          </h1>
          <p className="rise mt-5 max-w-2xl text-lg text-brand-100" style={d(2)}>
            HSS Distributors is the FMCG distribution business of HSS Prime Group, based at ICD Business Park in
            Nairobi. We supply everyday food and household products in bulk, and this website lets you see our
            range, check stock and send us your list without calling around.
          </p>

          <dl className="rise mt-10 grid max-w-3xl gap-3 sm:grid-cols-3 sm:gap-4" style={d(3)}>
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 sm:p-5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="flex items-center gap-4 sm:block">
                  <span className="block w-8 shrink-0 font-display text-3xl font-extrabold text-gold-400 sm:w-auto sm:text-4xl">{f.value}</span>
                  <span className="block text-sm text-brand-100 sm:mt-1">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="rise mt-8 grid max-w-lg gap-3 min-[480px]:grid-cols-2" style={d(4)}>
            <Link
              href="/catalogue"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-gold-500 px-4 text-center font-semibold text-brand-900 transition hover:bg-gold-400 active:scale-95"
            >
              Browse catalogue
            </Link>
            <Link
              href="/how-to-order"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-4 text-center font-semibold transition hover:bg-white/10"
            >
              How to order
            </Link>
          </div>
        </div>
      </section>

      {/* What you can expect */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-brand-900">What you can expect from us</h2>
          <p className="mt-2 text-neutral-600">Simple, honest wholesale supply, built around how businesses actually order.</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <li key={p.title} className="rounded-2xl border border-neutral-200 bg-white p-5 transition sm:p-6 duration-200 hover:border-brand-600/40 hover:shadow-lg motion-safe:hover:-translate-y-1">
              <Icon>{p.icon}</Icon>
              <h3 className="mt-4 font-bold text-brand-900">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Manufacturers */}
      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-brand-900">Manufacturers we distribute for</h2>
            <p className="mt-2 text-neutral-600">We distribute all the products these manufacturers make.</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MANUFACTURERS.map((m) => (
              <li key={m.name} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="relative h-28 sm:h-36">
                  <Image src={m.logo} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-contain p-3 sm:p-4" />
                </div>
                <p className="mt-auto border-t border-neutral-100 px-3 py-2.5 text-center text-sm font-semibold text-brand-900">
                  {m.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we serve */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-3xl font-bold text-brand-900">Who we serve</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col rounded-2xl border border-neutral-200 p-6 transition duration-200 hover:border-brand-600/40 hover:shadow-lg motion-safe:hover:-translate-y-1"
            >
              <h3 className="font-bold text-brand-900 group-hover:text-brand-700">{a.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{a.text}</p>
              <span className="mt-4 text-sm font-semibold text-brand-700">
                Learn more <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Group + office */}
      <section className="mx-auto grid max-w-7xl gap-4 px-4 lg:grid-cols-2">
        <div className="flex flex-col rounded-3xl bg-brand-900 p-6 text-white sm:p-8">
          <p className="text-sm font-medium text-gold-400">Our group</p>
          <h2 className="mt-2 text-2xl font-bold">Part of HSS Prime Group</h2>
          <p className="mt-3 text-brand-100">
            HSS Distributors is part of HSS Prime Group, a Nairobi-based group of businesses.
          </p>
          <div className="mt-auto pt-6">
          <a
            href="https://hssprimegroupltd.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/40 px-5 text-center font-semibold transition hover:bg-white/10 sm:w-fit"
          >
            Visit HSS Prime Group <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-gold-500 bg-gold-400/10 p-6 sm:p-8">
          <p className="text-sm font-medium text-gold-600">Visit or call us</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-900">Find us</h2>
          <ul className="mt-3 space-y-1 text-neutral-700">
            {s.address && <li className="whitespace-pre-line">{s.address}</li>}
            {s.primaryPhone && (
              <li>
                Calls and WhatsApp:{" "}
                <a href={`tel:${s.primaryPhone.replace(/\s+/g, "")}`} className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline">
                  {s.primaryPhone}
                </a>
              </li>
            )}
            {s.salesEmail && (
              <li>
                <a href={`mailto:${s.salesEmail}`} className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline [overflow-wrap:anywhere]">
                  {s.salesEmail}
                </a>
              </li>
            )}
          </ul>
          <div className="mt-auto pt-6">
          <Link
            href="/contact"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-900 px-5 text-center font-semibold text-white transition hover:bg-brand-700 sm:w-fit"
          >
            Contact us and see the map
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
