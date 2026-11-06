"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

type Item = { key: string; categorySlug: string; node: ReactNode };

type Props = {
  name: string;
  slug: string;
  filters: { name: string; slug: string }[];
  items: Item[];
};

const chip = (active: boolean) =>
  `inline-flex min-h-11 items-center justify-center rounded-full text-center border px-3.5 text-sm font-medium transition active:scale-95 ${
    active
      ? "border-brand-700 bg-brand-700 text-white"
      : "border-neutral-300 bg-white text-neutral-700 hover:border-brand-600"
  }`;

export function CategoryRow({ name, slug, filters, items }: Props) {
  const [active, setActive] = useState("all");
  const scroller = useRef<HTMLDivElement>(null);
  const shown = active === "all" ? items : items.filter((i) => i.categorySlug === active);

  const scroll = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * 480, behavior: "smooth" });

  return (
    <section id={`row-${slug}`} aria-labelledby={`h-${slug}`} className="scroll-mt-44 sm:scroll-mt-40 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id={`h-${slug}`} className="text-2xl font-bold text-brand-900">
          {name}
        </h2>
        <Link href={`/catalogue/${slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-700 hover:underline">
          View all {name}
        </Link>
      </div>

      {filters.length > 0 && (
        <div role="group" aria-label={`Filter ${name}`} className="mt-3 flex flex-wrap gap-2">
          <button type="button" aria-pressed={active === "all"} onClick={() => setActive("all")} className={chip(active === "all")}>
            All
          </button>
          {filters.map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active === f.slug}
              onClick={() => setActive(f.slug)}
              className={chip(active === f.slug)}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative mt-4">
        <div
          key={active}
          ref={scroller}
          className="rise flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]"
        >
          {shown.map((i) => (
            <div key={i.key} className="w-44 shrink-0 snap-start sm:w-52">
              {i.node}
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label={`Scroll ${name} left`}
          onClick={() => scroll(-1)}
          className={`absolute -left-4 top-1/3 hidden h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-white shadow-md hover:bg-brand-50 ${shown.length > 4 ? "lg:grid" : ""}`}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={`Scroll ${name} right`}
          onClick={() => scroll(1)}
          className={`absolute -right-4 top-1/3 hidden h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-white shadow-md hover:bg-brand-50 ${shown.length > 4 ? "lg:grid" : ""}`}
        >
          ›
        </button>
      </div>
    </section>
  );
}
