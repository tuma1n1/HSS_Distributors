"use client";

import Link from "next/link";
import { useQuote } from "@/lib/quote";

type Props = {
  product: { documentId: string; slug: string; name: string; packSize?: string | null; sizeLabel?: string | null };
};

export function AddToQuoteButton({ product }: Props) {
  const { add, has, ready } = useQuote();
  const added = ready && has(product.documentId);

  return (
    <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={() =>
          add({
            id: product.documentId,
            slug: product.slug,
            name: product.name,
            packSize: product.sizeLabel || product.packSize,
          })
        }
        className="min-h-11 w-full rounded-lg bg-brand-700 sm:w-auto px-5 py-3 font-semibold text-white hover:bg-brand-900"
      >
        {added ? "Add another" : "Add to quote"}
      </button>
      {added && (
        <Link href="/quote" className="inline-flex min-h-11 items-center justify-center text-center text-sm font-semibold text-brand-700 hover:underline">
          ✓ Added. View quote list →
        </Link>
      )}
    </div>
  );
}