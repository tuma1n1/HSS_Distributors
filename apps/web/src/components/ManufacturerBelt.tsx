import Image from "next/image";
import { MANUFACTURERS } from "@/lib/manufacturers";

function Track({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="belt-track flex min-w-full shrink-0 justify-around gap-4 pr-4">
      {MANUFACTURERS.map((m) => (
        <li key={m.name} className="relative h-24 w-40 shrink-0 rounded-2xl border border-neutral-200 bg-white">
          <Image
            src={m.logo}
            alt={duplicate ? "" : m.name}
            fill
            sizes="160px"
            className="object-contain p-3"
          />
        </li>
      ))}
    </ul>
  );
}

/** Two identical tracks moving together, so the loop has no visible jump at any screen width. */
export function ManufacturerBelt() {
  return (
    <section aria-labelledby="manufacturers-heading" className="border-b border-neutral-200 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="manufacturers-heading" className="text-2xl font-bold text-brand-900">
          Manufacturers we distribute for
        </h2>
        <p className="mt-1 text-neutral-600">We distribute all the products these manufacturers make.</p>
      </div>
      <div className="belt mt-6 flex">
        <Track />
        <Track duplicate />
      </div>
    </section>
  );
}
