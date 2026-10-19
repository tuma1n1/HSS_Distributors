import type { Metadata } from "next";
import { getPaymentInfo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getPaymentInfo();
  const has = (info?.paymentMethods?.length ?? 0) > 0;
  return {
    title: "Official payment details",
    description:
      "The only payment details HSS Distributors uses. Check here before you pay.",
    alternates: { canonical: "/official-payment-details" },
    robots: has ? undefined : { index: false, follow: true },
  };
}

const DEFAULT_NOTICE =
  "HSS Distributors will only ask you to pay to the details on this page, or details we confirm with you directly. If someone asks you to pay anywhere else, do not pay, and contact us.";

export default async function PaymentDetailsPage() {
  const info = await getPaymentInfo();
  const methods = info?.paymentMethods ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Official payment details</h1>

      <div className="mt-6 rounded-xl border border-gold-500 bg-gold-400/10 p-5 text-sm">
        <p className="font-semibold">Beware of fraud</p>
        <p className="mt-1 whitespace-pre-line text-neutral-700">
          {info?.fraudNotice || DEFAULT_NOTICE}
        </p>
      </div>

      {methods.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600">
          Our payment details will be published here once confirmed. Until then, only pay
          using details we confirm to you directly.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {methods.map((m) => (
            <article key={m.id} className="rounded-xl border border-neutral-200 p-5">
              <h2 className="text-lg font-bold">
                {m.label || (m.type === "bank" ? "Bank transfer" : m.type === "paybill" ? "M-Pesa Paybill" : "M-Pesa Till")}
              </h2>
              <dl className="mt-3 space-y-2 text-sm">
                {m.accountName && (
                  <div>
                    <dt className="text-neutral-500">Account name</dt>
                    <dd className="font-medium">{m.accountName}</dd>
                  </div>
                )}
                {m.bankName && (
                  <div>
                    <dt className="text-neutral-500">Bank</dt>
                    <dd className="font-medium">
                      {m.bankName}
                      {m.branchName ? `, ${m.branchName}` : ""}
                    </dd>
                  </div>
                )}
                {m.accountNumber && (
                  <div>
                    <dt className="text-neutral-500">Account number</dt>
                    <dd className="font-medium">{m.accountNumber}</dd>
                  </div>
                )}
                {m.paybillNumber && (
                  <div>
                    <dt className="text-neutral-500">Paybill number</dt>
                    <dd className="font-medium">{m.paybillNumber}</dd>
                  </div>
                )}
                {m.tillNumber && (
                  <div>
                    <dt className="text-neutral-500">Till number</dt>
                    <dd className="font-medium">{m.tillNumber}</dd>
                  </div>
                )}
              </dl>
              {m.instructions && (
                <p className="mt-3 whitespace-pre-line text-sm text-neutral-600">{m.instructions}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}