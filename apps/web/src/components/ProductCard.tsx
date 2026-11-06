import Image from "next/image";
import Link from "next/link";
import { QuickAdd } from "./QuickAdd";
import { StockBadge } from "./StockBadge";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media";
import type { Product } from "@/types/strapi";

/** `eager` is for cards in the first row, whose photos are visible as soon as the page opens. */
export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const img = product.images?.[0];
  const size = product.sizeLabel || product.packSize;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-200 hover:border-brand-600/40 hover:shadow-lg motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
      <div className="relative aspect-square bg-brand-50">
        {img && (
          <Image
            src={mediaUrl(img.url)}
            alt={img.alternativeText || product.name}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4"
          />
        )}
        <div className="absolute left-2 top-2">
          <StockBadge status={product.stockStatus} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        {product.brand?.name && <p className="text-xs font-medium text-brand-600">{product.brand.name}</p>}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        {size && <p className="w-fit rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">{size}</p>}
        <div className="mt-auto space-y-2 pt-3">
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          <QuickAdd
            product={{
              documentId: product.documentId,
              slug: product.slug,
              name: product.name,
              packSize: size,
            }}
          />
        </div>
      </div>
    </article>
  );
}
