import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const nav = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/how-to-order", label: "How to order" },
  { href: "/delivery", label: "Delivery" },
  { href: "/branches", label: "Branches" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export async function Header() {
  const settings = await getSiteSettings();
  const wa = whatsappLink(
    settings?.whatsappNumber,
    "Hello HSS Distributors, I would like to make an enquiry.",
  );

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-brand-700">
          HSS <span className="text-gold-500">Distributors</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <QuoteLink />
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900 sm:inline-block"
            >
              WhatsApp
            </a>
          )}
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-md border border-neutral-300 px-3 py-2 text-sm">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-neutral-200 bg-white p-2 shadow-lg">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}