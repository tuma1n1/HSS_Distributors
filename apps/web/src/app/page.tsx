import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getHomeData } from "@/lib/home";
import { mediaUrl } from "@/lib/media";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "HSS Distributors | FMCG Wholesale Supplier in Nairobi, Kenya" },
  description:
    "HSS Distributors supplies everyday FMCG products to dukas, hotels, schools and supermarkets from Nairobi. Browse the catalogue and order on WhatsApp.",
  alternates: { canonical: "/" },
};

const WHY = [
  { title: "Clear stock status", text: "See what is in stock before you ask." },
  { title: "Order in one message", text: "Send your list on WhatsApp and get a quote." },
  { title: "Official payment details only", text: "One verified page, so you never pay the wrong account." },
  { title: "Part of HSS Prime Group", text: "A Nairobi-based group with food and distribution operations." },
];

const AUDIENCES = [
  { title: "Dukas and retailers", text: "Fast-moving staples for your shelves." },
  { title: "Hotels and restaurants", text: "Cooking oil, flour, dairy and more in bulk packs." },
  { title: "Schools and institutions", text: "Reliable supply for catering needs." },
  { title: "Supermarkets and wholesalers", text: "Cartons and bulk supply for resale." },
];

const STEPS = [
  { title: "Browse the catalogue", text: "Find your products by category or brand." },
  { title: "Send your list", text: "Add items to your quote list or message us on WhatsApp." },
  { title: "Confirm and pay", text: "We confirm availability and price. Pay only to our official details." },
];

export default async function HomePage() {
  const [{ categories, brands, products }, settings] = await Promise.all([
    getHomeData(),
    getSiteSettings(),
  ]);

  const wa = whatsappLink(
    settings?.whatsappNumber ?? "",
    "Hello HSS Distributors, I would like to place an order.",
  );
  const orderHref = wa ?? "/contact";
  const collage = products.filter((p) => p.images?.[0]).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HSS Distributors",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    parentOrganization: { "@type": "Organization", name: "HSS Prime Group" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-block rounded-full bg-gold-400/20 px-3 py-1 text-xs font-medium text-gold-400">
              FMCG wholesale · Nairobi, Kenya
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Everyday essentials, supplied in bulk.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-brand-100">
              Browse our catalogue, see stock status, and order on WhatsApp.
              Supplying dukas, hotels, schools and supermarkets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogue"
                className="rounded-lg bg-gold-500 px-5 py-3 font-semibold text-brand-900 hover:bg-gold-400"
              >
                Browse catalogue
              </Link>
              <a
                href={orderHref}
                className="rounded-lg border border-white/40 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {collage.length > 0
              ? collage.map((p) => (
                  <div
                    key={p.documentId}
                    className="relative aspect-square overflow-hidden rounded-xl bg-white"
                  >
                    <Image
                      src={mediaUrl(p.images![0].url)}
                      alt={p.images![0].alternativeText || p.name}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-contain p-3"
                      priority
                    />
                  </div>
                ))
              : [0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-white/10" />
                ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.documentId}
                href={`/catalogue/${c.slug}`}
                className="group overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-brand-600 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-brand-50">
                  {c.image ? (
                    <Image
                      src={mediaUrl(c.image.url)}
                      alt={c.image.alternativeText || c.name}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl font-bold text-brand-600/30">
                      {c.name.charAt(0)}
                    </div>
                  )}
                </div>
                <p className="p-3 font-semibold group-hover:text-brand-700">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      {products.length > 0 && (
        <section className="bg-brand-50 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold">Featured products</h2>
              <Link href="/catalogue" className="text-sm font-semibold text-brand-700 hover:underline">
                View all products →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.documentId} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why HSS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">Why order from HSS Distributors</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-xl border border-neutral-200 p-5">
              <h3 className="font-semibold text-brand-700">{w.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold">Who we are</h2>
          <p className="mt-4 text-brand-100">
            HSS Distributors is the FMCG distribution arm of HSS Prime Group, based
            in Nairobi. We supply everyday food and household products to
            retailers, hospitality businesses and institutions.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block font-semibold text-gold-400 hover:underline"
          >
            Learn more about us →
          </Link>
        </div>
      </section>

      {/* Brands (confirmed only) */}
      {brands.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold">Brands we supply</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b.documentId}
                href={`/catalogue?brand=${b.slug}`}
                className="flex h-24 items-center justify-center rounded-xl border border-neutral-200 bg-white p-3 hover:border-brand-600"
              >
                {b.logo ? (
                  <Image
                    src={mediaUrl(b.logo.url)}
                    alt={b.name}
                    width={120}
                    height={60}
                    className="max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-center text-sm font-semibold">{b.name}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Who we serve */}
      <section className="bg-brand-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Who we serve</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold">How to order</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-neutral-200 p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing CTA */}
      <section className="bg-gold-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xl font-bold text-brand-900">
            Ready to stock up? Send us your list.
          </p>
          <a
            href={orderHref}
            className="rounded-lg bg-brand-900 px-6 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Order on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}