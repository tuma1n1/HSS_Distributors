import Link from "next/link";
import type { ReactNode } from "react";
import { FilterSheet } from "@/components/FilterSheet";
import { ProductCard } from "@/components/ProductCard";
import { activeFilterCount, applyFilters, buildFacets, type Facets, type Filters } from "@/lib/facets";
import type { Product } from "@/types/strapi";

function Chip({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full text-center border px-3.5 text-sm font-medium transition active:scale-95 motion-reduce:transition-none ${
        active
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-neutral-300 bg-white text-neutral-700 hover:border-brand-600"
      }`}
    >
      {children}
    </Link>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-neutral-700">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Panel({ facets }: { facets: Facets }) {
  const groups = [
    { title: "Subcategory", options: facets.types },
    { title: "Brand", options: facets.brands },
    { title: "Size", options: facets.sizes },
    { title: "Unit of sale", options: facets.units },
    { title: "Storage", options: facets.storages },
  ];

  return (
    <div className="space-y-5">
      <Group title="Sort">
        {facets.sorts.map((s) => (
          <Chip key={s.label} href={s.href} active={s.active}>
            {s.label}
          </Chip>
        ))}
      </Group>
      {facets.toggles.length > 0 && (
        <Group title="Show">
          {facets.toggles.map((t) => (
            <Chip key={t.label} href={t.href} active={t.active}>
              {t.label} ({t.count})
            </Chip>
          ))}
        </Group>
      )}
      {groups
        .filter((g) => g.options.length > 0)
        .map((g) => (
          <Group key={g.title} title={g.title}>
            {g.options.map((o) => (
              <Chip key={o.value} href={o.href} active={o.active}>
                {o.label} ({o.count})
              </Chip>
            ))}
          </Group>
        ))}
    </div>
  );
}

type Props = {
  /** Every product on this page before filtering; facets are counted from these. */
  products: Product[];
  filters: Filters;
  basePath: string;
  q?: string;
};

export function FilteredProducts({ products, filters, basePath, q }: Props) {
  const facets = buildFacets(products, filters, basePath, q);
  const shown = applyFilters(products, filters);
  const panel = <Panel facets={facets} />;

  return (
    <div className="mt-6 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
      <aside aria-label="Filters" className="hidden lg:block">
        {panel}
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-600" aria-live="polite">
            {shown.length} {shown.length === 1 ? "product" : "products"}
          </p>
          <FilterSheet count={activeFilterCount(filters)} shown={shown.length}>
            {panel}
          </FilterSheet>
        </div>

        {facets.activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {facets.activeChips.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                scroll={false}
                aria-label={`Remove filter: ${c.label}`}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full text-center bg-brand-100 px-3.5 text-sm font-medium text-brand-900"
              >
                {c.label} <span aria-hidden="true">×</span>
              </Link>
            ))}
            <Link
              href={facets.clearHref}
              scroll={false}
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-700 underline"
            >
              Clear all
            </Link>
          </div>
        )}

        {shown.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-neutral-300 p-8 text-neutral-600">
            No products match these filters. Remove a filter to see more.
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {shown.map((p, i) => (
              <ProductCard key={p.documentId} product={p} eager={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
