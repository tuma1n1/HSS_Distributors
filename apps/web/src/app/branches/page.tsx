import type { Metadata } from "next";
import { getBranches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Branches",
  description: "HSS Distributors branches and opening hours.",
  alternates: { canonical: "/branches" },
};

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">Our branches</h1>

      {branches.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-neutral-300 p-6 text-neutral-600">
          Branch details are being confirmed. For now, please contact us on WhatsApp.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {branches.map((b) => (
            <article key={b.documentId} className="rounded-xl border border-neutral-200 p-5">
              <h2 className="text-lg font-bold">{b.name}</h2>
              {b.isMainBranch && <p className="text-sm text-brand-700">Main branch</p>}
              {b.address && <p className="mt-3 whitespace-pre-line text-sm">{b.address}</p>}
              {b.phone && (
                <a href={`tel:${b.phone.replace(/\s+/g, "")}`} className="mt-3 block text-sm hover:underline">
                  {b.phone}
                </a>
              )}
              {b.email && (
                <a href={`mailto:${b.email}`} className="mt-1 block text-sm hover:underline">
                  {b.email}
                </a>
              )}
              {b.openingHours && (
                <p className="mt-3 whitespace-pre-line text-sm text-neutral-600">{b.openingHours}</p>
              )}
              {b.mapUrl && (
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  Open in Maps →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
