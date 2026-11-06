import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for hssdistributors.co.ke and the services of HSS Distributors Limited.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms of Service" effective="4 November 2026">
      <h2>Preamble</h2>
      <p>
        Please read these Terms of Service (“Terms”) carefully before using hssdistributors.co.ke (“the Site”)
        operated by HSS Company. These Terms of Service govern your use of our services, website, WhatsApp
        Business, social media pages, offices and all platforms operated by HSS Distributors Limited.
      </p>
      <p>
        By accessing or using the Site, instructing us and/or providing your personal data, you agree to be bound
        by these Terms and <Link href="/privacy">Privacy Policy</Link>. If you do not agree with the Terms, please
        do not access the Site or use our services.
      </p>
      <p>This document is governed by the Laws of Kenya.</p>

      <h2>Definitions</h2>
      <ul>
        <li>“Client” means any person who instructs the Firm.</li>
        <li>“User” means any visitor to the website or social media.</li>
        <li>“Personal Data” has the meaning under Section 2, Data Protection Act No. 24 of 2019.</li>
      </ul>

      <h2>1. Intellectual Property</h2>
      <p>
        All content on this Site, including text, graphics, logos, images, design elements, digital downloads,
        audio clips and underlying code, is the property of hssdistributors.co.ke and its content suppliers and is
        protected by the Trademarks Act (Cap. 506), the Copyright Act (Cap. 130, Laws of Kenya) and intellectual
        property laws. You may not copy, reproduce, modify, display, distribute or create derivative works from any
        content on this Site without our express prior written consent.
      </p>

      <h2>2. Acceptable Use</h2>
      <p>
        You agree to use the Site only for lawful purposes and in compliance with the Computer Misuse and
        Cybercrimes Act, 2018, in a manner that does not infringe, restrict the rights of, or inhibit anyone else’s
        use and enjoyment of the Site. You are strictly prohibited from:
      </p>
      <ul>
        <li>Using the Site in a manner that damages, disables, overburdens or disrupts its performance;</li>
        <li>Engaging in any automated data collection, including mining, scraping or harvesting data;</li>
        <li>Using the Site to transmit or distribute malicious software, spam or offensive content;</li>
        <li>Using the Site to send unsolicited commercial communications, spam or offensive material;</li>
        <li>Attempting to gain unauthorized access to any portion of the Site, user accounts or computer systems connected to the Site.</li>
      </ul>

      <h2>3. Limitation of Liability</h2>
      <p>
        The information on this Site is provided on an “as is” and “as available” basis. While we strive for
        accuracy, we make no warranties or representations about the completeness or reliability of the content,
        either express or implied. To the fullest extent permitted by law, hssdistributors.co.ke and its
        affiliates, directors, officers and employees will not be held liable for any direct, indirect, incidental,
        special or consequential damages resulting from your use or inability to use this Site, including but not
        limited to loss of profits, data or business interruptions.
      </p>

      <h2>4. Third-party Links</h2>
      <p>
        Our Site may contain links to external websites, services and/or advertisements that are not operated, owned
        or controlled by us. We have no control over and assume no responsibility for the content, privacy policies
        and/or practices of any third-party websites. By using this Site, you acknowledge that we are not responsible
        or liable for any damage or loss caused by your use of a third-party platform.
      </p>

      <h2>5. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes
        and/or legal actions arising under these Terms shall be subject to the exclusive jurisdiction of the
        competent Courts within Kenya.
      </p>

      <h2>6. Changes to These Terms</h2>
      <p>
        We reserve the right to modify and/or replace these Terms at any time, at our sole discretion. Any changes
        will be posted on this page with an updated effective date. Continued use of this Site after changes are
        made constitutes acceptance of the new Terms.
      </p>
    </InfoPage>
  );
}
