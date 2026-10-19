import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { getSiteSettings } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Report a scam",
  description:
    "Report a suspicious message, call or payment request using the name of HSS Distributors.",
  alternates: { canonical: "/report-scam" },
};

export default async function ReportScamPage() {
  const s = await getSiteSettings();
  const wa = whatsappLink(
    s?.whatsappNumber ?? "",
    "Hello HSS Distributors, I want to report a suspicious message or payment request using your name.",
  );

  return (
    <InfoPage
      title="Report a scam"
      intro="If someone is using the name of HSS Distributors to ask for money or personal information, tell us."
    >
      <h2>If you have already paid</h2>
      <p>
        Contact your bank or mobile money provider immediately and ask them to
        stop or trace the payment. Report the matter to the police as well. Then
        tell us.
      </p>

      <h2>What to send us</h2>
      <ul>
        <li>The phone number, email address or social media account involved.</li>
        <li>Screenshots of messages, and any payment details you were given.</li>
        <li>The date and time, and what you were asked to do.</li>
        <li>If you paid: the amount, date and transaction reference.</li>
      </ul>

      <h2>How to report</h2>
      <ul>
        {wa && (
          <li>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Report on WhatsApp
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

      <h2>Stay safe</h2>
      <p>
        Only pay to the details on our{" "}
        <a href="/official-payment-details">official payment details</a> page, and
        read about our <a href="/official-channels">official channels</a>.
      </p>
    </InfoPage>
  );
}