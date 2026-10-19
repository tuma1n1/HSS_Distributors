import type { Metadata } from "next";
import { QuoteList } from "@/components/QuoteList";
import { getSiteSettings } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your quote list",
  robots: { index: false, follow: true },
};

export default async function QuotePage() {
  const settings = await getSiteSettings();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Your quote list</h1>
      <p className="mb-8 mt-2 text-neutral-600">
        Review your items, then send the list to us on WhatsApp.
      </p>
      <QuoteList whatsappNumber={settings?.whatsappNumber ?? null} />
    </div>
  );
}