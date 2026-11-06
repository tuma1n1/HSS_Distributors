import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeData } from "@/lib/home";
import { mediaUrl } from "@/lib/media";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

type Audience = {
  name: string;
  metaTitle: string;
  description: string;
  heading: string;
  intro: string;
  points: { title: string; text: string }[];
  waMessage: string;
};

const AUDIENCES: Record<string, Audience> = {
  "dukas-and-retailers": {
    name: "Dukas and retailers",
    metaTitle: "Wholesale Supplies for Dukas and Retailers in Nairobi",
    description:
      "Everyday FMCG products in wholesale packs for dukas and retailers. See stock status and send your list on WhatsApp.",
    heading: "Wholesale supplies for dukas and retailers",
    intro:
      "Keep your shelves stocked with fast-moving everyday products. Browse the catalogue, build your list, and send it to us in one message.",
    points: [
      { title: "See stock status first", text: "Every product shows whether it is in stock, so you don’t waste time asking." },
      { title: "One list, one message", text: "Add everything you need to your quote list and send it on WhatsApp." },
      { title: "The pack sizes you sell", text: "Choose the pack sizes and cartons that suit your shop." },
    ],
    waMessage: "Hello HSS Distributors, I run a duka/retail shop and would like a quote.",
  },
  "hotels-and-restaurants": {
    name: "Hotels and restaurants",
    metaTitle: "Bulk Food and Kitchen Supplies for Hotels and Restaurants in Nairobi",
    description:
      "Bulk cooking oil, flour, dairy and more for hotels and restaurants. Build your list and request a quote.",
    heading: "Bulk supplies for hotels and restaurants",
    intro:
      "Plan your kitchen’s stock from one list. Request a quote for the staples you use every week.",
    points: [
      { title: "Kitchen staples in bulk", text: "Cooking oil, flour, dairy and other everyday ingredients in larger pack sizes." },
      { title: "Plan the week in one go", text: "Put your whole weekly need on one quote list instead of calling around." },
      { title: "Clear quotes", text: "We confirm availability, price and delivery arrangements before you pay." },
    ],
    waMessage: "Hello HSS Distributors, I would like a quote for our hotel/restaurant.",
  },
  "schools-and-institutions": {
    name: "Schools and institutions",
    metaTitle: "Catering and Household Supplies for Schools and Institutions in Nairobi",
    description:
      "Reliable supply of catering and household staples for schools and institutions. Request a quote.",
    heading: "Supplies for schools and institutions",
    intro:
      "Request a quote for the catering and household items your institution needs, and share it with whoever approves your purchases.",
    points: [
      { title: "Catering staples", text: "Everyday foods and household items for feeding and running a school or institution." },
      { title: "Quotes for planning", text: "Send us your list and we confirm availability and price, so you can plan your purchase." },
      { title: "Official payment details only", text: "Pay only to details published on our official payment page." },
    ],
    waMessage: "Hello HSS Distributors, I would like a quote for our school/institution.",
  },
  "supermarkets-and-wholesalers": {
    name: "Supermarkets and wholesalers",
    metaTitle: "Bulk FMCG Supply for Supermarkets and Wholesalers in Nairobi",
    description:
      "Bulk and carton supply of FMCG products for supermarkets and wholesalers. Browse the range and request a quote.",
    heading: "Bulk supply for supermarkets and wholesalers",
    intro:
      "Browse our range and request a quote for cartons and larger volumes for resale.",
    points: [
      { title: "Carton and bulk packs", text: "See the pack sizes available and ask for the volumes you need." },
      { title: "A growing range", text: "We are adding more brands and products. Tell us what you are looking for." },
      { title: "Straightforward quotes", text: "Send your list, and we confirm availability, price and delivery." },
    ],
    waMessage: "Hello HSS Distributors, I run a supermarket/wholesale business and would like a quote.",
  },
};

export function generateStaticParams() {
  return Object.keys(AUDIENCES).map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const a = AUDIENCES[audience];
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.description,
    alternates: { canonical: `/for/${audience}` },
  };
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const a = AUDIENCES[audience];
  if (!a) notFound();

  const [{ categories }, settings] = await Promise.all([getHomeData(), getSiteSettings()]);
  const wa = whatsappLink(settings?.whatsappNumber ?? "", a.waMessage);

  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <p className="text-sm font-medium text-gold-400">{a.name}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{a.heading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">{a.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className="inline-flex min-h-11 items-center justify-center rounded-lg text-center bg-gold-500 px-5 py-3 font-semibold text-brand-900 hover:bg-gold-400"
            >
              Browse catalogue
            </Link>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg text-center border border-white/40 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Ask for a quote on WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {a.points.map((p) => (
            <div key={p.title} className="rounded-xl border border-neutral-200 p-5">
              <h2 className="font-semibold text-brand-700">{p.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-12">
          <h2 className="text-xl font-bold">Browse by category</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c.documentId}
                href={`/catalogue/${c.slug}`}
                className="overflow-hidden rounded-xl border border-neutral-200 hover:border-brand-600"
              >
                <div className="relative aspect-[4/3] bg-brand-50">
                  {c.image && (
                    <Image
                      src={mediaUrl(c.image.url)}
                      alt={c.image.alternativeText || c.name}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="p-3 text-sm font-semibold">{c.name}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <p className="rounded-xl bg-brand-50 p-5 text-sm text-neutral-700">
          Prices and availability are confirmed when we send your quote. See{" "}
          <Link href="/how-to-order" className="font-semibold text-brand-700 underline">
            how to order
          </Link>{" "}
          or{" "}
          <Link href="/delivery" className="font-semibold text-brand-700 underline">
            delivery
          </Link>
          .
        </p>
      </section>
    </>
  );
}