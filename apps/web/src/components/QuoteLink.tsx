"use client";

import Link from "next/link";
import { useQuote } from "@/lib/quote";

export function QuoteLink() {
  const { count, ready } = useQuote();
  return (
    <Link href="/quote" className="font-medium hover:text-brand-700">
      Quote list
      {ready && count > 0 && (
        <span className="ml-1.5 rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-brand-900">
          {count}
        </span>
      )}
    </Link>
  );
}