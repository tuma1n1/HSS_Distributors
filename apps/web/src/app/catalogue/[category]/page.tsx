import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { expandCategorySlugs, getCategories, getProducts } from "@/lib/catalogue";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const found = categories.find((c) => c.slug === category);
  if (!found) return {};
  return {
    title: `${found.name} Wholesale`,
    description: `Browse ${found.name} at HSS Distributors and request a quote on WhatsApp.`,
    alternates: { canonical: `/catalogue/${found.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = await getCategories();
  const found = categories.find((c) => c.slug === category);
  if (!found) notFound();

  const { data: products } = await getProducts({
    categorySlugs: expandCategorySlugs(categories, found.slug),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-sm text-neutral-500">
        <Link href="/catalogue" className="hover:text-brand-700">
          Catalogue
        </Link>
        {found.parent && (
          <>
            {" / "}
            <Link href={`/catalogue/${found.parent.slug}`} className="hover:text-brand-700">
              {found.parent.name}
            </Link>
          </>
        )}
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-brand-700">{found.name}</h1>

      {(found.children?.length ?? 0) > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {found.children!.map((child) => (
            <Link
              key={child.slug}
              href={`/catalogue/${child.slug}`}
              className="rounded-full border border-brand-600 px-3 py-1 text-sm text-brand-700 hover:bg-brand-50"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-10 text-neutral-600">No products in this category yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.documentId} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}