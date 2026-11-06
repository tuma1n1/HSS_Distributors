import Link from "next/link";
import { AddToQuoteButton } from "@/components/AddToQuoteButton";
import { Blocks } from "@/components/Blocks";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { StockBadge } from "@/components/StockBadge";
import { formatPrice, hasPrice, humanize } from "@/lib/format";
import { jsonLdHtml } from "@/lib/jsonLd";
import { mediaUrl } from "@/lib/media";
import { whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/types/strapi";

const AVAILABILITY: Record<string, string> = {
  in_stock: "https://schema.org/InStock",
  low_stock: "https://schema.org/LimitedAvailability",
  out_of_stock: "https://schema.org/OutOfStock",
};

const VAT_LABEL: Record<string, string> = {
  standard: "Standard rated",
  zero_rated: "Zero rated",
  exempt: "Exempt",
};

const crumb = "inline-flex min-h-11 items-center hover:text-brand-700";

type Props = { product: Product; related: Product[]; whatsappNumber?: string | null };

export function ProductDetail({ product, related, whatsappNumber }: Props) {
  const size = product.sizeLabel || product.packSize;
  const { category, brand } = product;
  const images = (product.images ?? []).map((m) => ({
    src: mediaUrl(m.url),
    alt: m.alternativeText || product.name,
  }));

  const wa = whatsappLink(
    whatsappNumber ?? "",
    `Hello HSS Distributors, I would like to order ${product.name}${size ? ` (${size})` : ""}${
      product.sku ? ` [SKU ${product.sku}]` : ""
    }.`,
  );

  const specs = [
    ["SKU", product.sku],
    ["Brand", brand?.name],
    ["Category", category?.name],
    ["Pack size", product.packSize],
    ["Unit of sale", product.unitOfSale && humanize(product.unitOfSale)],
    ["Storage", product.storageType && humanize(product.storageType)],
    ["Shelf life", product.shelfLifeDays ? `${product.shelfLifeDays} days` : null],
    ["VAT", product.vatTreatment ? VAT_LABEL[product.vatTreatment] : null],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku || undefined,
    description: product.shortDescription || undefined,
    image: images.map((i) => i.src),
    brand: brand ? { "@type": "Brand", name: brand.name } : undefined,
  };
  if (hasPrice(product.price)) {
    jsonLd.offers = {
      "@type": "Offer",
      priceCurrency: "KES",
      price: Number(product.price),
      availability: AVAILABILITY[product.stockStatus],
    };
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-500">
        <Link href="/catalogue" className={crumb}>Catalogue</Link>
        {category?.parent && (
          <>
            <span aria-hidden="true">›</span>
            <Link href={`/catalogue/${category.parent.slug}`} className={crumb}>{category.parent.name}</Link>
          </>
        )}
        {category && (
          <>
            <span aria-hidden="true">›</span>
            <Link href={`/catalogue/${category.slug}`} className={crumb}>{category.name}</Link>
          </>
        )}
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <ProductGallery images={images} name={product.name} />

        <div>
          {brand?.name && (
            <Link
              href={`/catalogue?brand=${encodeURIComponent(brand.slug)}`}
              className="inline-flex min-h-11 min-w-11 items-center text-sm font-semibold text-brand-600 hover:underline"
            >
              {brand.name}
            </Link>
          )}
          <h1 className="text-3xl font-extrabold leading-tight text-brand-900 sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {size && <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm text-neutral-700">{size}</span>}
            <StockBadge status={product.stockStatus} />
          </div>

          <p className="mt-5 text-2xl font-bold">{formatPrice(product.price)}</p>

          {product.shortDescription && (
            <p className="mt-4 max-w-prose text-neutral-700">{product.shortDescription}</p>
          )}

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <AddToQuoteButton product={product} />
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-lg text-center border border-brand-700 px-5 py-3 sm:w-auto font-semibold text-brand-700 transition hover:bg-brand-50 active:scale-95 motion-reduce:transition-none"
              >
                Order on WhatsApp
              </a>
            )}
          </div>

          {specs.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200">
              <table className="w-full text-sm">
                <caption className="sr-only">Specification</caption>
                <tbody className="divide-y divide-neutral-200">
                  {specs.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row" className="px-4 py-3 text-left font-normal text-neutral-500">{k}</th>
                      <td className="break-words px-4 py-3 text-right font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <ul className="mt-6 grid gap-3 rounded-2xl bg-brand-50 p-4 text-sm text-neutral-700 sm:grid-cols-2">
            <li>
              Delivery across Nairobi.{" "}
              <Link href="/delivery" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline sm:min-h-0">
                See delivery
              </Link>
            </li>
            <li>
              Pay to official details only.{" "}
              <Link href="/official-payment-details" className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline sm:min-h-0">
                See payment details
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {Array.isArray(product.description) && product.description.length > 0 && (
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-900">About this product</h2>
          <div className="mt-4">
            <Blocks content={product.description} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-brand-900">Related products</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.documentId} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
