import Image from "next/image";
import Link from "next/link";
import { StockBadge } from "./StockBadge";
import { formatPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media";
import type { Product } from "@/types/strapi";

export function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-brand-600 hover:shadow-md"
    >
      <div className="relative aspect-square bg-brand-50">
        {img ? (
          <Image
            src={mediaUrl(img.url)}
            alt={img.alternativeText || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-3"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            Photo coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.brand?.name && (
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
            {product.brand.name}
          </p>
        )}
        <h3 className="font-semibold leading-snug group-hover:text-brand-700">
          {product.name}
        </h3>
        {product.packSize && (
          <p className="text-sm text-neutral-500">{product.packSize}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          <StockBadge status={product.stockStatus} />
        </div>
      </div>
    </Link>
  );
}