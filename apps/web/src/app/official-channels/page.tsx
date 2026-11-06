import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Official channels",
  description:
    "The only official ways to reach HSS Distributors. Check here before you share information or make a payment.",
  alternates: { canonical: "/official-channels" },
};

export default async function OfficialChannelsPage() {
  const s = await getSiteSettings();
  const wa = whatsappLink(s?.whatsappNumber ?? "", "Hello HSS Distributors, I would like to verify a contact.");
  const waDisplay = `+${(s?.whatsappNumber ?? "").replace(/^\+/, "")}`;
  const phones = [s?.primaryPhone, s?.secondaryPhone].filter((p): p is string => Boolean(p));

  return (
    <InfoPage
      title="Official channels"
      intro="Scammers sometimes pretend to be real businesses. These are the only channels HSS Distributors uses."
    >
      <h2>Our official contacts</h2>
      <ul>
        <li>Website: hssdistributors.co.ke</li>
        {s?.whatsappNumber && (
          <li>
            WhatsApp:{" "}
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                {waDisplay}
              </a>
            ) : (
              waDisplay
            )}
          </li>
        )}
        {phones.map((p) => (
          <li key={p}>Phone: {p}</li>
        ))}
        {s?.salesEmail && <li>Email: {s.salesEmail}</li>}
        {!s?.whatsappNumber && phones.length === 0 && !s?.salesEmail && (
          <li>Our contact details are being added.</li>
        )}
      </ul>

      <h2>What we will never do</h2>
      <ul>
        <li>Ask you to pay to a personal number or an account not listed on our official payment details page.</li>
        <li>Ask for your M-Pesa PIN, card PIN or one-time codes.</li>
        <li>Ask you to pay a “release fee” or “registration fee” to receive goods.</li>
        <li>Pressure you to pay immediately without confirming the order first.</li>
      </ul>

      <h2>Check before you pay</h2>
      <p>
        Compare the payment details you were given with those on our{" "}
        <a href="/official-payment-details">official payment details</a> page. If
        anything is different, do not pay, and contact us on one of the channels above.
      </p>

      <h2>Seen something suspicious?</h2>
      <p>
        Please <a href="/report-scam">report it</a> so we can warn others.
      </p>
    </InfoPage>
  );
}