import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueFilters } from "@/components/CatalogueFilters";
import { ProductCard } from "@/components/ProductCard";
import { expandCategorySlugs, getBrands, getCategories, getProducts } from "@/lib/catalogue";

type Props = {
  searchParams: Promise<{ q?: string; category?: string; brand?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const filtered = Boolean(sp.q || sp.category || sp.brand || (sp.page && sp.page !== "1"));
  return {
    title: "Wholesale Catalogue",
    description: "Browse the HSS Distributors catalogue and request a quote on WhatsApp.",
    alternates: { canonical: "/catalogue" },
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function CataloguePage({ searchParams }: Props) {
  const { q, category, brand, page } = await searchParams;
  const pageNumber = Math.max(1, Number(page) || 1);
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

  const { data: products, meta } = await getProducts({
    q,
    categorySlugs: category ? expandCategorySlugs(categories, category) : undefined,
    brandSlug: brand,
    page: pageNumber,
  });
  const { pageCount, total } = meta.pagination;

  function pageHref(n: number) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (brand) p.set("brand", brand);
    if (n > 1) p.set("page", String(n));
    const s = p.toString();
    return s ? `/catalogue?${s}` : "/catalogue";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-brand-700">Wholesale catalogue</h1>
      <p className="mt-1 text-sm text-neutral-600">
        {total} {total === 1 ? "product" : "products"}. Prices and stock are confirmed on request.
      </p>

      <div className="mt-6">
        <CatalogueFilters
          categories={categories}
          brands={brands}
          q={q}
          category={category}
          brand={brand}
        />
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-neutral-600">No products match your search.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.documentId} product={p} />
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <nav className="mt-8 flex items-center justify-between text-sm">
          {pageNumber > 1 ? (
            <Link href={pageHref(pageNumber - 1)} className="font-medium text-brand-700">
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-neutral-600">
            Page {pageNumber} of {pageCount}
          </span>
          {pageNumber < pageCount ? (
            <Link href={pageHref(pageNumber + 1)} className="font-medium text-brand-700">
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}