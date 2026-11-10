import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow, type Slide } from "@/components/HeroSlideshow";
import { ManufacturerBelt } from "@/components/ManufacturerBelt";
import { ProductCard } from "@/components/ProductCard";
import { jsonLdHtml } from "@/lib/jsonLd";
import { mediaUrl } from "@/lib/media";
import {
  getConfirmedBrands,
  getFeaturedPicks,
  getSlideshowProducts,
  getTopCategories,
} from "@/lib/shelf";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "HSS Distributors | FMCG Wholesale Supplier in Nairobi, Kenya" },
  description:
    "HSS Distributors supplies everyday FMCG products to dukas, hotels, schools and supermarkets from Nairobi. Browse the catalogue and order on WhatsApp.",
  alternates: { canonical: "/" },
};

const d = (i: number) => ({ "--i": i }) as CSSProperties;

const AUDIENCES = [
  { title: "Dukas and retailers", text: "Fast-moving staples for your shelves.", href: "/for/dukas-and-retailers" },
  { title: "Hotels and restaurants", text: "Kitchen staples in bulk packs.", href: "/for/hotels-and-restaurants" },
  { title: "Schools and institutions", text: "Reliable supply for catering needs.", href: "/for/schools-and-institutions" },
  { title: "Supermarkets and wholesalers", text: "Cartons and volume for resale.", href: "/for/supermarkets-and-wholesalers" },
];

const STEPS = [
  { title: "Browse the catalogue", text: "Pick a category, then filter by type, brand and size." },
  { title: "Build your quote list", text: "Tap Add on every product you need." },
  { title: "Send it to us", text: "Share the list on WhatsApp or by form. We confirm availability and price before you pay." },
];

export default async function HomePage() {
  const [categories, brands, settings, slideProducts] = await Promise.all([
    getTopCategories(),
    getConfirmedBrands(),
    getSiteSettings(),
    getSlideshowProducts(),
  ]);

  let picks = await getFeaturedPicks(categories, true);
  const inStock = picks.length > 0;
  if (!inStock) picks = await getFeaturedPicks(categories, false);

  const slides: Slide[] = slideProducts.map((p) => ({
    key: p.documentId,
    href: `/product/${p.slug}`,
    name: p.name,
    brand: p.brand?.name ?? null,
    size: p.sizeLabel || p.packSize || null,
    image: mediaUrl(p.images![0].url),
    alt: p.images![0].alternativeText || p.name,
  }));

  const wa = whatsappLink(settings?.whatsappNumber ?? "", "Hello HSS Distributors, I would like to place an order.");
  const orderHref = wa ?? "/contact";

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HSS Distributors",
    url: siteUrl,
    logo: `${siteUrl}/web-logo.png`,
    parentOrganization: { "@type": "Organization", name: "HSS Prime Group" },
    telephone: settings.primaryPhone || undefined,
    email: settings.salesEmail || undefined,
    address: settings.address || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      {/* Tells Google the site name to show above organic results. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml({ "@context": "https://schema.org", "@type": "WebSite", name: "HSS Distributors", url: siteUrl }),
        }}
      />

      {/* Hero */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="rise text-sm font-medium text-gold-400" style={d(0)}>
              FMCG wholesale in Nairobi
            </p>
            <h1 className="rise mt-3 text-[2rem] font-extrabold leading-[1.05] sm:text-5xl md:text-[2.5rem] lg:text-5xl xl:text-6xl" style={d(1)}>
              Everyday essentials, supplied in bulk.
            </h1>
            <p className="rise mt-5 max-w-lg text-lg text-brand-100" style={d(2)}>
              We distribute all the products made by Bidco, Unga Group, Kapa Oil Refinery, Pembe and more. Build one list and send it to us. We confirm availability and price before you pay.
            </p>
            <form action="/catalogue" role="search" className="rise mt-7 flex max-w-lg overflow-hidden rounded-full bg-white p-1.5 shadow-lg focus-within:ring-2 focus-within:ring-gold-400" style={d(3)}>
              <input
                name="q"
                type="search"
                placeholder="Oil, flour, soap…"
                aria-label="Search products"
                className="min-h-11 min-w-0 flex-1 bg-transparent px-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <button type="submit" className="min-h-11 rounded-full bg-gold-500 px-5 font-semibold text-brand-900 transition hover:bg-gold-400 active:scale-95">
                Search
              </button>
            </form>
            <div className="rise mt-6 grid max-w-lg gap-3 min-[480px]:grid-cols-2 md:grid-cols-1 lg:grid-cols-2" style={d(4)}>
              <Link href="/catalogue" className="inline-flex min-h-11 items-center justify-center rounded-full text-center border border-white/40 px-4 font-semibold transition hover:bg-white/10">
                Browse catalogue
              </Link>
              <a href={orderHref} className="inline-flex min-h-11 items-center justify-center rounded-full text-center border border-white/40 px-4 font-semibold transition hover:bg-white/10">
                Order on WhatsApp
              </a>
            </div>
            {settings.primaryPhone && (
              <p className="rise mt-4 text-sm text-brand-100" style={d(5)}>
                Calls and WhatsApp:{" "}
                <a href={`tel:${settings.primaryPhone.replace(/\s+/g, "")}`} className="inline-flex min-h-11 items-center font-semibold text-white underline">
                  {settings.primaryPhone}
                </a>
              </p>
            )}
          </div>

          <div className="rise" style={d(2)}>
            {slides.length > 0 ? (
              <HeroSlideshow slides={slides} />
            ) : (
              <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
                <p className="font-display text-xl font-bold">Browse by category</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.documentId}
                      href={`/catalogue/${c.slug}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-full text-center bg-white px-4 text-sm font-semibold text-brand-900 transition hover:bg-gold-400"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
                <p className="mt-5 text-sm text-brand-100">Product photos are on the way.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ManufacturerBelt />

      {/* Shop by category */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-900">Shop by category</h2>
            <Link href="/catalogue" className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-brand-700 hover:underline">
              View catalogue
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link key={c.documentId} href={`/catalogue/${c.slug}`} className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                  {c.image ? (
                    <Image
                      src={mediaUrl(c.image.url)}
                      alt={c.image.alternativeText || c.name}
                      fill
                      sizes="(min-width: 1024px) 16vw, 33vw"
                      className="object-contain p-4 transition duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span className="grid h-full place-items-center text-5xl font-black text-brand-600/25">
                      {c.name.charAt(0)}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-bold text-brand-700 group-hover:text-brand-900">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured: one pick per category */}
      {picks.length > 0 && (
        <section className="bg-brand-50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-brand-900">Featured products</h2>
            <p className="mt-2 text-neutral-600">
              {inStock
                ? "A pick from each category that is in stock today."
                : "A selection from each category. Ask us for current availability."}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {picks.map((p) => (
                <ProductCard key={p.documentId} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Who we serve */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-3xl font-bold text-brand-900">Who we serve</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((a) => (
            <Link key={a.title} href={a.href} className="group rounded-2xl border border-neutral-200 p-6 transition hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-lg">
              <h3 className="font-bold text-brand-900 group-hover:text-brand-700">{a.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{a.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How to order */}
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-3xl font-bold">How to order</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white/5 p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-500 font-bold text-brand-900">{i + 1}</span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-brand-100">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Brands (confirmed only) */}
      {brands.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-3xl font-bold text-brand-900">Brands we supply</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {brands.map((b) => (
              <div key={b.documentId} className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-3">
                {b.logo ? (
                  <Image src={mediaUrl(b.logo.url)} alt={b.name} width={120} height={60} className="max-h-14 w-auto object-contain" />
                ) : (
                  <span className="text-center text-sm font-semibold">{b.name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fraud notice */}
      <section className="mx-auto max-w-7xl px-4 pt-14">
        <div className="rounded-2xl border border-gold-500 bg-gold-400/10 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-lg font-bold text-brand-900">Pay only to our official details</h2>
            <p className="mt-1 text-sm text-neutral-700">Check the payment details we publish before you pay anyone.</p>
          </div>
          <Link href="/official-payment-details" className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center rounded-full text-center bg-brand-900 px-5 text-sm font-semibold text-white hover:bg-brand-700 sm:mt-0">
            See official payment details
          </Link>
        </div>
      </section>
    </>
  );
}