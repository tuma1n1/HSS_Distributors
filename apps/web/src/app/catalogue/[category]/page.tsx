import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FilteredProducts } from "@/components/FilteredProducts";
import { hasUrlState, parseFilters, type RawParams } from "@/lib/facets";
import { categorySlugs, getAllCategoryProducts, getCategoryBySlug } from "@/lib/shelf";

type P = Promise<{ category: string }>;
type SP = Promise<RawParams>;

const crumb = "inline-flex min-h-11 items-center hover:text-brand-700";

export async function generateMetadata({ params, searchParams }: { params: P; searchParams: SP }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} wholesale in Nairobi`,
    description: `Browse ${category.name} by brand and size at HSS Distributors. Add items to your quote list and send it on WhatsApp.`,
    alternates: { canonical: `/catalogue/${category.slug}` },
    robots: hasUrlState(parseFilters(await searchParams)) ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryPage({ params, searchParams }: { params: P; searchParams: SP }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getAllCategoryProducts(categorySlugs(category));
  const filters = parseFilters(await searchParams);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-500">
        <Link href="/catalogue" className={crumb}>Catalogue</Link>
        {category.parent && (
          <>
            <span aria-hidden="true">›</span>
            <Link href={`/catalogue/${category.parent.slug}`} className={crumb}>{category.parent.name}</Link>
          </>
        )}
        <span aria-hidden="true">›</span>
        <span className="text-neutral-800">{category.name}</span>
      </nav>

      <h1 className="mt-2 text-3xl font-bold text-brand-900 sm:text-4xl">{category.name}</h1>

      {products.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-neutral-300 p-8 text-neutral-600">
          Nothing is listed here yet. Message us on WhatsApp and we will check availability for you.
        </p>
      ) : (
        <FilteredProducts products={products} filters={filters} basePath={`/catalogue/${category.slug}`} />
      )}
    </div>
  );
}
