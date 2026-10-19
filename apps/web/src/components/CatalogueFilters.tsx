import Link from "next/link";
import type { Brand, Category } from "@/types/strapi";

type Props = {
  categories: Category[];
  brands: Brand[];
  q?: string;
  category?: string;
  brand?: string;
};

export function CatalogueFilters({ categories, brands, q, category, brand }: Props) {
  const top = categories.filter((c) => !c.parent);
  const field = "rounded-md border border-neutral-300 px-3 py-2 text-sm";

  return (
    <form
      action="/catalogue"
      method="get"
      className="grid gap-3 rounded-lg border border-neutral-200 p-4 sm:grid-cols-4"
    >
      <input
        name="q"
        defaultValue={q}
        placeholder="Search by name or SKU"
        className={`${field} sm:col-span-2`}
      />
      <select name="category" defaultValue={category ?? ""} className={field}>
        <option value="">All categories</option>
        {top.map((c) => (
          <optgroup key={c.slug} label={c.name}>
            <option value={c.slug}>All {c.name}</option>
            {(c.children ?? []).map((child) => (
              <option key={child.slug} value={child.slug}>
                {child.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <select name="brand" defaultValue={brand ?? ""} className={field}>
        <option value="">All brands</option>
        {brands.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2 sm:col-span-4">
        <button
          type="submit"
          className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
        >
          Search
        </button>
        <Link href="/catalogue" className="rounded-md border border-neutral-300 px-4 py-2 text-sm">
          Clear
        </Link>
      </div>
    </form>
  );
}