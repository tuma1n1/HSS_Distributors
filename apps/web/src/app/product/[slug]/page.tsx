import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StockBadge } from "@/components/StockBadge";
import { AddToQuoteButton } from "@/components/AddToQuoteButton";
import { getProductBySlug } from "@/lib/catalogue";
import { formatPrice } from "@/lib/format";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  // Placeholder products stay out of search results until they have a price and a description.
  const ready = product.price != null && Boolean(product.shortDescription);
  return {
    title: product.name,
    description:
      product.shortDescription ??
      `${product.name}: ask HSS Distributors to confirm availability and price.`,
    alternates: { canonical: `/product/${product.slug}` },
    robots: ready ? undefined : { index: false, follow: true },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!product) notFound();

  const wa = whatsappLink(
    settings?.whatsappNumber,
    `Hello HSS Distributors, please confirm availability and price of ${product.name} (SKU ${product.sku}).`,
  );

  const details: [string, string | null | undefined][] = [
    ["SKU", product.sku],
    ["Pack size", product.packSize],
    ["Unit of sale", product.unitOfSale],
    ["Storage", product.storageType],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-neutral-500">
        <Link href="/catalogue" className="hover:text-brand-700">
          Catalogue
        </Link>
        {product.category && (
          <>
            {" / "}
            <Link href={`/catalogue/${product.category.slug}`} className="hover:text-brand-700">
              {product.category.name}
            </Link>
          </>
        )}
      </p>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-brand-50 text-sm text-brand-600">
          Photo coming soon
        </div>

        <div>
          {product.brand && (
            <p className="text-sm uppercase tracking-wide text-neutral-500">{product.brand.name}</p>
          )}
          <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
            <StockBadge status={product.stockStatus} />
          </div>
          {product.shortDescription && (
            <p className="mt-4 text-neutral-700">{product.shortDescription}</p>
          )}

          <dl className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200 text-sm">
            {details
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div key={label} className="flex justify-between py-2">
                  <dt className="text-neutral-500">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
          </dl>
          <AddToQuoteButton product={product} />
          <div className="mt-6 flex flex-wrap gap-3">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Ask on WhatsApp
              </a>
            ) : (
              <Link
                href="/contact"
                className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Contact us for price
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}