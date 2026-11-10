import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";
import { getNavCategories } from "@/lib/content";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const AUDIENCES = [
  { href: "/for/dukas-and-retailers", label: "Dukas and retailers", text: "Stock your shelves" },
  { href: "/for/hotels-and-restaurants", label: "Hotels and restaurants", text: "Bulk kitchen staples" },
  { href: "/for/schools-and-institutions", label: "Schools and institutions", text: "Catering supplies" },
  { href: "/for/supermarkets-and-wholesalers", label: "Supermarkets and wholesalers", text: "Cartons and volume" },
];

const LINKS = [
  { href: "/how-to-order", label: "How to order" },
  { href: "/delivery", label: "Delivery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const navItem =
  "relative whitespace-nowrap py-2 text-sm font-medium text-neutral-800 transition-colors hover:text-brand-700 " +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 " +
  "after:bg-gold-500 after:transition-transform hover:after:scale-x-100";

const panel =
  "invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition duration-150 " +
  "group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100";

function Chevron() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="currentColor" aria-hidden="true">
      <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function Header() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getNavCategories()]);
  const wa = whatsappLink(settings?.whatsappNumber ?? "", "Hello HSS Distributors, I would like to place an order.");
  const phone = settings?.primaryPhone;

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-brand-900 text-xs text-brand-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:py-2">
          <Link href="/official-payment-details" className="inline-flex min-h-11 min-w-0 items-center hover:text-white sm:min-h-0">
            Pay only to our official payment details
          </Link>
          <div className="hidden items-center gap-4 sm:flex">
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white">
                {phone}
              </a>
            )}
            <Link href="/report-scam" className="hover:text-white">
              Report a scam
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="relative border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 sm:gap-6">
          <Link href="/" aria-label="HSS Distributors home" className="flex shrink-0 items-center rounded-lg">
            {/* 52px tall with py-2 keeps the bar at its old height, so the sticky catalogue bar stays aligned. */}
            <Image src="/logo.png" alt="HSS Distributors" width={508} height={277} preload className="h-[52px] w-auto" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            <div className="group relative">
              <button type="button" aria-haspopup="true" className={`${navItem} inline-flex items-center gap-1`}>
                Products <Chevron />
              </button>
              <div className={panel}>
                <div className="w-[34rem] rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl">
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((c) => (
                      <Link
                        key={c.documentId}
                        href={`/catalogue/${c.slug}`}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/catalogue"
                    className="mt-3 block rounded-lg bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative">
              <button type="button" aria-haspopup="true" className={`${navItem} inline-flex items-center gap-1`}>
                Who we serve <Chevron />
              </button>
              <div className={panel}>
                <div className="w-72 rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl">
                  {AUDIENCES.map((a) => (
                    <Link key={a.href} href={a.href} className="block rounded-lg px-3 py-2 hover:bg-brand-50">
                      <span className="block text-sm font-semibold text-neutral-900">{a.label}</span>
                      <span className="block text-xs text-neutral-500">{a.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={navItem}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <form action="/catalogue" role="search" className="hidden 2xl:block">
              <input
                name="q"
                type="search"
                placeholder="Search products"
                aria-label="Search products"
                className="w-40 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm transition-colors focus:border-brand-600 focus:bg-white"
              />
            </form>
            <QuoteLink />
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-gold-500 px-4 text-center text-sm font-semibold text-brand-900 transition hover:bg-gold-400 active:scale-95 xl:inline-flex"
              >
                Order on WhatsApp
              </a>
            )}

            {/* Mobile menu */}
            <details className="group lg:hidden">
              <summary
                aria-label="Menu"
                className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-neutral-300 [&::-webkit-details-marker]:hidden"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
                <svg viewBox="0 0 24 24" className="hidden h-5 w-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b border-neutral-200 bg-white p-4 shadow-xl">
                <form action="/catalogue" role="search" className="mb-4">
                  <input
                    name="q"
                    type="search"
                    placeholder="Search products"
                    aria-label="Search products"
                    className="min-h-11 w-full rounded-full border border-neutral-300 bg-neutral-50 px-4 text-sm"
                  />
                </form>
                <p className="mb-2 text-sm font-semibold text-brand-700">Products</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link key={c.documentId} href={`/catalogue/${c.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full text-center bg-brand-50 px-3 text-sm font-medium">
                      {c.name}
                    </Link>
                  ))}
                </div>
                <p className="mb-2 text-sm font-semibold text-brand-700">Who we serve</p>
                <div className="mb-4 grid gap-1">
                  {AUDIENCES.map((a) => (
                    <Link key={a.href} href={a.href} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-brand-50">
                      {a.label}
                    </Link>
                  ))}
                </div>
                <div className="grid gap-1 border-t border-neutral-200 pt-3">
                  {LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-brand-50">
                      {l.label}
                    </Link>
                  ))}
                </div>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-4 block rounded-full bg-gold-500 px-4 py-3 text-center text-sm font-semibold text-brand-900">
                    Order on WhatsApp
                  </a>
                )}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}