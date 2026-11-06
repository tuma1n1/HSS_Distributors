import Link from "next/link";
import { getSiteSettings } from "@/lib/site";
import { getTopCategories } from "@/lib/shelf";
import { whatsappLink } from "@/lib/whatsapp";

const AUDIENCES = [
  { slug: "dukas-and-retailers", label: "Dukas and retailers" },
  { slug: "hotels-and-restaurants", label: "Hotels and restaurants" },
  { slug: "schools-and-institutions", label: "Schools and institutions" },
  { slug: "supermarkets-and-wholesalers", label: "Supermarkets and wholesalers" },
];

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/branches", label: "Branches" },
  { href: "/become-a-supplier", label: "Become a supplier" },
  { href: "/contact", label: "Contact" },
];

const HELP = [
  { href: "/how-to-order", label: "How to order" },
  { href: "/delivery", label: "Delivery" },
  { href: "/faq", label: "FAQ" },
  { href: "/official-payment-details", label: "Official payment details" },
  { href: "/official-channels", label: "Official channels" },
  { href: "/report-scam", label: "Report a scam" },
];

const linkCls =
  "inline-flex min-h-11 min-w-11 items-center text-sm text-brand-100/80 transition hover:text-white hover:underline underline-offset-4 sm:min-h-0";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold-400">
        {title}
      </h3>
      <ul className="sm:space-y-2">{children}</ul>
    </div>
  );
}

export async function Footer() {
  const [s, cats] = await Promise.all([getSiteSettings(), getTopCategories()]);
  const wa = s?.whatsappNumber
    ? whatsappLink(s.whatsappNumber, "Hello HSS Distributors, I would like to make an enquiry.")
    : null;

  return (
    <footer className="mt-20 bg-brand-900 text-brand-100">
      {/* CTA band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              Ready to stock up?
            </p>
            <p className="text-sm text-brand-100/80">
              Browse the catalogue or send us your list — we reply fast.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className="inline-flex min-h-11 items-center justify-center rounded-full text-center bg-gold-400 px-5 text-sm font-semibold text-brand-900 transition hover:bg-gold-500"
            >
              View catalogue
            </Link>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full text-center border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-xl font-semibold text-white">
            HSS Distributors
          </p>
          <p className="mt-2 text-sm text-brand-100/80">
            Wholesale FMCG distribution in Nairobi. A member of{" "}
            <a
              href="https://hssprimegroupltd.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white underline underline-offset-4 hover:text-gold-400"
            >
              HSS Prime Group ↗
            </a>
            .
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-brand-100/80">
            {s?.address && <li className="whitespace-pre-line">{s.address}</li>}
            {s?.primaryPhone && (
              <li>
                <a href={`tel:${s.primaryPhone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0">
                  {s.primaryPhone}
                </a>
              </li>
            )}
            {s?.salesEmail && (
              <li>
                <a href={`mailto:${s.salesEmail}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:text-white sm:min-h-0">
                  {s.salesEmail}
                </a>
              </li>
            )}
            {s?.openingHours && <li>{s.openingHours}</li>}
          </ul>
        </div>

        <Col title="Catalogue">
          {cats.slice(0, 8).map((c) => (
            <li key={c.documentId}>
              <Link href={`/catalogue/${c.slug}`} className={linkCls}>
                {c.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/catalogue" className={`${linkCls} font-medium text-white`}>
              View all →
            </Link>
          </li>
        </Col>

        <Col title="Who we serve">
          {AUDIENCES.map((a) => (
            <li key={a.slug}>
              <Link href={`/for/${a.slug}`} className={linkCls}>
                {a.label}
              </Link>
            </li>
          ))}
        </Col>

        <Col title="Company">
          {COMPANY.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </Col>

        <Col title="Help">
          {HELP.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </Col>
      </div>

      {/* Fraud reminder + legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-6 text-xs text-brand-100/70">
          <p>
            <strong className="text-gold-400">Pay safely:</strong> only pay to the
            details on our{" "}
            <Link href="/official-payment-details" className="underline underline-offset-2 hover:text-white">
              official payment details
            </Link>{" "}
            page. We never change payment details over WhatsApp or phone.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {s?.legalName ?? "HSS Distributors Limited"}.
              All rights reserved.
              {s?.kraPin ? ` KRA PIN: ${s.kraPin}.` : ""}
            </p>
            <p className="flex gap-4">
              <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0">Privacy Policy</Link>
              <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-white sm:min-h-0">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}