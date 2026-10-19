import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold">We couldn’t find that page</h1>
      <p className="mt-3 text-neutral-600">
        The page may have moved, or the product may no longer be listed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/catalogue"
          className="rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
        >
          Browse catalogue
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-brand-700 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}