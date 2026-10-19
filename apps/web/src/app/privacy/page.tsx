import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { getSiteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How HSS Distributors collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "19 October 2026";

export default async function PrivacyPage() {
  const s = await getSiteSettings();
  const name = s?.legalName || "HSS Distributors";

  return (
    <InfoPage
      title="Privacy policy"
      updated={UPDATED}
      intro={`This policy explains how ${name} handles personal information when you use this website or contact us.`}
    >
      <h2>Who we are</h2>
      <p>
        {name} (“we”, “us”) is a distributor of fast-moving consumer goods based
        in Nairobi, Kenya, and part of HSS Prime Group. We handle personal data in
        line with the Data Protection Act, 2019 of Kenya.
        {s?.odpcRegNumber ? ` Our ODPC registration number is ${s.odpcRegNumber}.` : ""}
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          Information you give us when you contact us by WhatsApp, phone or email:
          for example your name, business name, phone number, delivery location and
          the products you ask about.
        </li>
        <li>
          Your quote list. It is stored only in your own browser, on your device,
          until you send it to us or clear it. We do not receive it unless you send it.
        </li>
        <li>
          Details you enter in our quote request form: your name, business name,
          phone number, optional email, delivery location, message and the products
          you ask about. We store these in our system and email them to our sales team.
        </li>
        <li>
          Basic technical data that our hosting providers record when you visit,
          such as your IP address and browser type, for security and reliability.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your questions and prepare quotes.</li>
        <li>To process and deliver orders and to keep business, tax and accounting records.</li>
        <li>To protect our website and prevent fraud.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your personal data. We share it only with service providers
        who help us run the business (for example website hosting and messaging
        platforms such as WhatsApp when you choose to message us), with delivery
        partners where needed to deliver your order, and with authorities when the
        law requires it.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website does not currently use advertising cookies. If we add analytics
        or other cookies, we will update this page and ask for consent where required.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep personal data only as long as we need it for the purposes above, or
        as the law requires for business, tax and accounting records.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to ask us what personal data we hold about you, to have
        it corrected or deleted where the law allows, and to object to certain uses.
        To make a request, contact us using the details below.
      </p>

      <h2>Complaints</h2>
      <p>
        If you are not satisfied with how we handle your data, you can complain to
        the Office of the Data Protection Commissioner (ODPC) in Kenya.
      </p>

      <h2>Contact us</h2>
      <p>
        {s?.salesEmail ? (
          <>
            Email <a href={`mailto:${s.salesEmail}`}>{s.salesEmail}</a>
            {s?.whatsappNumber ? ", or message us on WhatsApp." : "."}
          </>
        ) : (
          <>See our <a href="/contact">contact page</a>.</>
        )}
      </p>
    </InfoPage>
  );
}