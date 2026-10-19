"use client";

import Link from "next/link";
import { useQuote } from "@/lib/quote";

type Props = {
  product: { documentId: string; slug: string; name: string; packSize?: string | null };
};

export function AddToQuoteButton({ product }: Props) {
  const { add, has, ready } = useQuote();
  const added = ready && has(product.documentId);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() =>
          add({
            id: product.documentId,
            slug: product.slug,
            name: product.name,
            packSize: product.packSize,
          })
        }
        className="rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
      >
        {added ? "Add one more" : "Add to quote list"}
      </button>
      {added && (
        <Link href="/quote" className="text-sm font-semibold text-brand-700 hover:underline">
          ✓ Added. View quote list →
        </Link>
      )}
    </div>
  );
}