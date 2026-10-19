import Link from "next/link";
import { getSiteSettings } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/catalogue", label: "Catalogue" },
      { href: "/quote", label: "Quote list" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/how-to-order", label: "How to order" },
      { href: "/delivery", label: "Delivery" },
      { href: "/branches", label: "Branches" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Trust and safety",
    links: [
      { href: "/official-payment-details", label: "Official payment details" },
      { href: "/official-channels", label: "Official channels" },
      { href: "/report-scam", label: "Report a scam" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "https://hssprimegroupltd.co.ke", label: "HSS Prime Group" },
      { href: "/become-a-supplier", label: "Become a supplier partner" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export async function Footer() {
  const s = await getSiteSettings();
  const details = [
    s?.legalName,
    s?.address,
    s?.primaryPhone,
    s?.kraPin ? `KRA PIN ${s.kraPin}` : null,
    s?.companyRegNumber ? `Reg. ${s.companyRegNumber}` : null,
  ].filter(Boolean);

  return (
    <footer className="mt-16 bg-brand-900 text-neutral-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold text-gold-400">{col.title}</h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      {l.label} ↗
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-neutral-400">
        {details.length > 0 && <p className="mb-2">{details.join(" · ")}</p>}
        <p className="mb-2 flex justify-center gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
        </p>
        <p>© {new Date().getFullYear()} HSS Distributors. All rights reserved.</p>
      </div>
    </footer>
  );
}