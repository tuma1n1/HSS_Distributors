import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HSS Distributors Limited collects, uses, discloses and safeguards your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" effective="4 November 2026">
      <p>
        Welcome to hssdistributors.co.ke. We respect your privacy and we are committed to protecting your personal
        data. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you
        visit our website hssdistributors.co.ke, use our services or interact with us.
      </p>
      <p>
        Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
        do not access the Site or use our services.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        We may collect and process the following information about you in a variety of ways. The information
        collected on the Site may include:
      </p>
      <ol>
        <li>
          <strong>Personal data:</strong> this includes personally identifiable information such as your name,
          shipping address, email address and telephone number (including mobile money details if applicable) and
          billing information that you voluntarily share with us during your registration with the Site, sign up for
          a newsletter, create an account or make a purchase.
        </li>
        <li>
          <strong>Automated information:</strong> when you access the Site, we automatically collect certain
          technical information sent by your browser or mobile device. This includes your IP address, browser type,
          operating system, referring URLs, pages viewed, time spent on the Site and any other diagnostic data
          collected via cookies, web beacons and analytical tracking tools.
        </li>
        <li>
          <strong>Financial data:</strong> financial information such as data related to your payment method (e.g.,
          valid credit card number, card brand, expiration date) that we may collect when you purchase, order,
          return, exchange or request information about our services from the Site.
        </li>
      </ol>
      <p>
        Note: we only store very limited, if any, financial information that we collect. Otherwise all financial
        information is stored by our payment processor.
      </p>

      <h2>2. Legal basis and how we use your information</h2>
      <p>
        In accordance with Section 30 of the Data Protection Act, 2019 we process your personal data under a valid
        legal basis (including consent, contractual necessity or legitimate interest) for various operational
        purposes, including to:
      </p>
      <ol>
        <li>Provide, operate, maintain and optimize our website and services;</li>
        <li>Process transactions, manage user accounts and fulfill your orders or requests;</li>
        <li>Respond to your comments, questions and inquiries and provide customer support;</li>
        <li>Send you technical notices, updates, security alerts and administrative messages;</li>
        <li>Deliver promotional newsletters, marketing updates or special offers and alerts (which you can opt out of at any time via the “unsubscribe” link in the email);</li>
        <li>Monitor, analyze and evaluate website usage trends to improve user experience and functionality;</li>
        <li>Detect, prevent and address technical issues, fraud or unauthorized activities.</li>
      </ol>

      <h2>3. Disclosure of your information</h2>
      <p>
        We do not sell, rent or trade your personal data to third parties. We may, however, share your information
        under the following circumstances:
      </p>
      <ol>
        <li>
          <strong>Service providers:</strong> we share data with trusted third-party service providers who assist us
          in operating our website, conducting our business or serving our users, such as cloud hosting providers,
          email delivery platforms, payment processors and analytics utilities. These providers are contractually
          bound to keep your data confidential and only use it for the tasks assigned to them.
        </li>
        <li>
          <strong>Legal requirements:</strong> we may disclose your information if required to do so by law or in
          response to valid requests by public authorities, including the Office of the Data Protection Commissioner
          (ODPC) or law enforcement agencies.
        </li>
        <li>
          <strong>Business transfers:</strong> if we are involved in a merger, acquisition, asset sale or
          restructuring, your personal information may be transferred as part of that transaction.
        </li>
        <li>
          <strong>Cross-border data transfers:</strong> if your data is transferred outside of Kenya for processing
          or storage (e.g., to international cloud hosting servers), we ensure that appropriate safeguards are in
          place as required under Section 48 of the Data Protection Act, 2019 to guarantee an adequate level of data
          protection.
        </li>
      </ol>

      <h2>4. Data security</h2>
      <p>
        We implement appropriate industry-standard technical and organizational security measures to protect your
        personal data against unauthorized access, alteration, disclosure, accidental loss or destruction. However,
        please be aware that no method of transmission over the internet or electronic storage is 100% secure and we
        cannot guarantee absolute security.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We will only retain your personal data for as long as necessary to fulfill the purposes of satisfying any
        legal, accounting or reporting requirements. When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize your data.
      </p>

      <h2>6. Data protection rights</h2>
      <p>
        Under the Data Protection Act, 2019, Kenyan citizens and residents hold specific rights regarding their
        personal information:
      </p>
      <ul>
        <li><strong>Right to be informed:</strong> to know how your personal data is being used.</li>
        <li><strong>Right of access:</strong> to request confirmation of whether we hold your data and receive a copy of it.</li>
        <li><strong>Right to object:</strong> to object to the processing of all or part of your personal data (including processing for direct marketing).</li>
        <li><strong>Right of correction:</strong> to request the correction of false, misleading, incomplete or inaccurate personal data.</li>
        <li><strong>Right of deletion:</strong> to request the erasure or destruction of personal data that we are no longer in legitimate business with.</li>
      </ul>

      <h2>7. Contact us</h2>
      <p>If you have any questions or comments about this Privacy Policy, please contact us at:</p>
      <address className="mt-3 not-italic">
        HSS DISTRIBUTORS LIMITED
        <br />
        ICD Business Park
        <br />
        No. 11
        <br />
        P.O. Box 3030-00100
        <br />
        Nairobi, Kenya
        <br />
        <a href="mailto:sales@hssdistributors.co.ke">sales@hssdistributors.co.ke</a>
      </address>
    </InfoPage>
  );
}
