import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { getSiteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the HSS Distributors website and requesting quotes.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "19 October 2026";

export default async function TermsPage() {
  const s = await getSiteSettings();
  const name = s?.legalName || "HSS Distributors";

  return (
    <InfoPage
      title="Terms of use"
      updated={UPDATED}
      intro={`These terms apply when you use the ${name} website and request quotes from us.`}
    >
      <h2>Using this website</h2>
      <p>
        This website is a catalogue and enquiry tool. It does not take online
        payments and does not create customer accounts. By using it, you agree to
        these terms.
      </p>

      <h2>Quotes and orders</h2>
      <p>
        Adding items to your quote list and sending it to us is a request for a
        quote, not an order. An order is confirmed only when we confirm availability,
        price and delivery arrangements with you directly.
      </p>

      <h2>Prices and availability</h2>
      <p>
        Prices, pack sizes and stock status can change without notice. Where a
        product shows “Price on request” or “Out of stock”, please contact us for
        the latest information. We may correct errors on the website at any time.
      </p>

      <h2>Payment</h2>
      <p>
        Pay only to the official payment details published on our{" "}
        <a href="/official-payment-details">official payment details</a> page or
        confirmed to you directly by us. We are not responsible for payments made
        to any other account or number.
      </p>

      <h2>Delivery</h2>
      <p>
        Delivery fees and lead times depend on your location and order size and are
        confirmed in your quote.
      </p>

      <h2>Damaged, missing or incorrect goods</h2>
      <p>
        Please check your goods on delivery and tell us as soon as possible if
        anything is damaged, missing or incorrect. We will review each case in line
        with the terms confirmed in your quote.
      </p>

      <h2>Product information</h2>
      <p>
        Product names, descriptions and images are provided for identification.
        Brand names and logos belong to their owners. We take care to keep
        information accurate, but packaging and specifications may change.
      </p>

      <h2>Our responsibility</h2>
      <p>
        We provide this website “as is”. To the extent the law allows, we are not
        liable for losses arising from your use of the website or from reliance on
        information that is out of date or incorrect.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Kenya.</p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of this
        page shows when they were last changed.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? See our <a href="/contact">contact page</a>.
      </p>
    </InfoPage>
  );
}