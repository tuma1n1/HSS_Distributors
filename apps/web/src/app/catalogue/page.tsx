import type { Metadata } from "next";
import Link from "next/link";
import { CategoryRow } from "@/components/CategoryRow";
import { FilteredProducts } from "@/components/FilteredProducts";
import { ProductCard } from "@/components/ProductCard";
import {
  categorySlugs,
  getCategoryProducts,
  getTopCategories,
  searchAllProducts,
  sortedChildren,
} from "@/lib/shelf";
import { hasUrlState, parseFilters, sortProducts, type RawParams } from "@/lib/facets";

type SP = Promise<RawParams>;
const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: { searchParams: SP }): Promise<Metadata> {
  const sp = await searchParams;
  return {
    title: "Catalogue",
    description:
      "Browse the HSS Distributors catalogue by category: cooking oil, flour, dairy, snacks, soaps and more.",
    alternates: { canonical: "/catalogue" },
    robots: first(sp.q) || hasUrlState(parseFilters(sp)) ? { index: false, follow: true } : undefined,
  };
}

export default async function CataloguePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const q = first(sp.q)?.trim().slice(0, 80) || undefined;
  const filters = parseFilters(sp);

  const header = (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h1 className="text-3xl font-bold text-brand-900">{q ? `Results for “${q}”` : hasUrlState(filters) ? "Products" : "Catalogue"}</h1>
      <form action="/catalogue" role="search" className="flex w-full max-w-sm overflow-hidden rounded-full border border-neutral-300 bg-white focus-within:border-brand-700 focus-within:ring-2 focus-within:ring-gold-500 sm:w-auto">
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search products"
          aria-label="Search products"
          className="min-h-11 min-w-0 flex-1 px-4 text-sm focus:outline-none"
        />
        <button type="submit" className="min-h-11 bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-900">
          Search
        </button>
      </form>
    </div>
  );

  if (q || hasUrlState(filters)) {
    const results = await searchAllProducts(q);
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        {header}
        {results.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-neutral-300 p-8 text-neutral-600">
            No products match{q ? ` “${q}”` : ""}. Try a shorter word, or browse the{" "}
            <Link href="/catalogue" className="font-semibold text-brand-700 underline">full catalogue</Link>.
          </p>
        ) : (
          <FilteredProducts products={results} filters={filters} basePath="/catalogue" q={q} />
        )}
      </div>
    );
  }

  const categories = await getTopCategories();
  const rows = (
    await Promise.all(
      categories.map(async (c) => ({ c, products: await getCategoryProducts(categorySlugs(c), 24) })),
    )
  ).filter((r) => r.products.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {header}

      {rows.length > 0 && (
        <nav aria-label="Jump to category" className="sticky top-[113px] z-30 sm:top-[101px] -mx-4 mt-6 overflow-x-auto border-y border-neutral-200 bg-white/90 px-4 py-2 backdrop-blur">
          <ul className="flex gap-2 whitespace-nowrap">
            {rows.map(({ c }) => (
              <li key={c.documentId}>
                <a href={`#row-${c.slug}`} className="inline-flex min-h-11 items-center justify-center rounded-full text-center px-3 text-sm font-medium text-neutral-700 hover:bg-brand-50 hover:text-brand-700">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-neutral-300 p-8 text-neutral-600">
          Our catalogue is being added. Please check back soon, or message us on WhatsApp.
        </p>
      ) : (
        <div className="divide-y divide-neutral-100">
          {rows.map(({ c, products }, rowIndex) => {
            const items = sortProducts(products, "recommended").map((p, i) => ({
              key: p.documentId,
              categorySlug: p.category?.slug ?? c.slug,
              node: <ProductCard product={p} eager={rowIndex === 0 && i < 4} />,
            }));
            const filters = sortedChildren(c)
              .filter((k) => items.some((i) => i.categorySlug === k.slug))
              .map((k) => ({ name: k.name, slug: k.slug }));
            return <CategoryRow key={c.documentId} name={c.name} slug={c.slug} filters={filters} items={items} />;
          })}
        </div>
      )}
    </div>
  );
}