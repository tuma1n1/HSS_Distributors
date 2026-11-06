"use client";

import { useState } from "react";
import { useQuote } from "@/lib/quote";

type Props = {
  product: { documentId: string; slug: string; name: string; packSize?: string | null };
};

export function QuickAdd({ product }: Props) {
  const { add, has, ready } = useQuote();
  const [taps, setTaps] = useState(0);
  const added = ready && has(product.documentId);

  return (
    <button
      type="button"
      aria-label={`Add ${product.name} to quote`}
      onClick={() => {
        add({
          id: product.documentId,
          slug: product.slug,
          name: product.name,
          packSize: product.packSize,
        });
        setTaps((n) => n + 1);
      }}
      className={`relative z-10 min-h-11 w-full rounded-full px-3 text-sm font-semibold transition active:scale-95 motion-reduce:transition-none ${
        added ? "bg-brand-700 text-white" : "bg-gold-500 text-brand-900 hover:bg-gold-400"
      }`}
    >
      <span key={taps} className={taps > 0 ? "bump inline-block" : "inline-block"}>
        {added ? "✓ Added" : "Add to quote"}
      </span>
    </button>
  );
}
