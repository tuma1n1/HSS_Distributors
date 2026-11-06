"use client";

import Link from "next/link";
import { useQuote } from "@/lib/quote";

export function QuoteLink() {
  const { count, ready } = useQuote();
  return (
    <Link
      href="/quote"
      aria-label="Quote list"
      className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full text-center border border-brand-700/30 px-3 text-sm sm:px-4 font-semibold text-brand-900 transition hover:border-brand-700 hover:bg-brand-50"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round" />
      </svg>
      <span className="whitespace-nowrap max-[374px]:hidden">
        Quote<span className="hidden sm:inline"> list</span>
      </span>
      {ready && count > 0 && (
        <span
          key={count}
          className="bump grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1.5 text-xs font-bold text-brand-900"
        >
          {count}
        </span>
      )}
    </Link>
  );
}