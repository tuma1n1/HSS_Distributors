import type { Metadata } from "next";
import Link from "next/link";
import { ClearQuote } from "@/components/ClearQuote";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default async function QuoteSentPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const reference = ref && /^[A-Z0-9-]{3,20}$/.test(ref) ? ref : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <ClearQuote />
      <p className="text-4xl">✓</p>
      <h1 className="mt-3 text-3xl font-bold">Request received</h1>
      <p className="mt-3 text-neutral-600">
        Thank you. We will confirm availability and price and get back to you.
      </p>
      {reference && (
        <p className="mt-4 text-sm text-neutral-500">
          Your reference: <span className="font-semibold">{reference}</span>
        </p>
      )}
      <Link
        href="/catalogue"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg text-center bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
      >
        Back to catalogue
      </Link>
    </div>
  );
}