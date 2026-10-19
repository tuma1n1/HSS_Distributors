import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Become a supplier partner",
  description:
    "Manufacturers and brand owners: talk to HSS Distributors about supplying and distributing your products in Nairobi.",
  alternates: { canonical: "/become-a-supplier" },
};

export default async function BecomeSupplierPage() {
  const s = await getSiteSettings();
  const wa = whatsappLink(
    s?.whatsappNumber ?? "",
    "Hello HSS Distributors, I represent a manufacturer / brand and would like to discuss supplying your business.",
  );

  return (
    <InfoPage
      title="Become a supplier partner"
      intro="Are you a manufacturer or brand owner looking for a distribution partner in Nairobi? We would like to hear from you."
    >
      <h2>What to send us</h2>
      <ul>
        <li>Your company name, contact person and a short company profile.</li>
        <li>Your product list with pack sizes and carton quantities.</li>
        <li>Relevant certifications (for example KEBS marks).</li>
        <li>Your price list and proposed distribution terms.</li>
        <li>The areas and customer types you want to reach.</li>
      </ul>

      <h2>Get in touch</h2>
      <ul>
        {wa && (
          <li>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </li>
        )}
        {s?.salesEmail && (
          <li>
            Email <a href={`mailto:${s.salesEmail}`}>{s.salesEmail}</a>
          </li>
        )}
        {!wa && !s?.salesEmail && (
          <li>
            Use our <a href="/contact">contact page</a>.
          </li>
        )}
      </ul>

      <p>We review every enquiry and reply to those that fit our current range.</p>
    </InfoPage>
  );
}