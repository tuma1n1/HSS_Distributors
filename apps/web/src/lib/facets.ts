import type { Product } from "@/types/strapi";
import { humanize } from "./format";

export type Sort = "recommended" | "name" | "size";
export type RawParams = Record<string, string | string[] | undefined>;

export type Filters = {
  type?: string;
  brands: string[];
  size?: string;
  stock: boolean;
  unit?: string;
  storage?: string;
  isNew: boolean;
  featured: boolean;
  sort: Sort;
};

export type Option = { value: string; label: string; count: number; active: boolean; href: string };
export type Toggle = { label: string; count: number; active: boolean; href: string };

export type Facets = {
  types: Option[];
  brands: Option[];
  sizes: Option[];
  units: Option[];
  storages: Option[];
  toggles: Toggle[];
  sorts: { label: string; active: boolean; href: string }[];
  activeChips: { label: string; href: string }[];
  clearHref: string;
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const all = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]).filter(Boolean);
const isOn = (v: string | string[] | undefined) => first(v) === "1";

export function parseFilters(sp: RawParams): Filters {
  const sort = first(sp.sort);
  return {
    type: first(sp.type),
    brands: [...new Set(all(sp.brand))],
    size: first(sp.size),
    stock: isOn(sp.stock),
    unit: first(sp.unit),
    storage: first(sp.storage),
    isNew: isOn(sp.new),
    featured: isOn(sp.featured),
    sort: sort === "name" || sort === "size" ? sort : "recommended",
  };
}

export function activeFilterCount(f: Filters) {
  return (
    (f.type ? 1 : 0) +
    f.brands.length +
    (f.size ? 1 : 0) +
    (f.stock ? 1 : 0) +
    (f.unit ? 1 : 0) +
    (f.storage ? 1 : 0) +
    (f.isNew ? 1 : 0) +
    (f.featured ? 1 : 0)
  );
}

/** Any URL state that changes what the page shows, so it should not be indexed. */
export const hasUrlState = (f: Filters) => activeFilterCount(f) > 0 || f.sort !== "recommended";

const inStock = (p: Product) => p.stockStatus === "in_stock" || p.stockStatus === "low_stock";

type FacetKey = "type" | "brands" | "size" | "stock" | "unit" | "storage" | "isNew" | "featured";

/** `skip` leaves one facet out, so its own options still count what selecting them would show. */
function matches(p: Product, f: Filters, skip?: FacetKey) {
  if (skip !== "type" && f.type && p.category?.slug !== f.type) return false;
  if (skip !== "brands" && f.brands.length && !f.brands.includes(p.brand?.slug ?? "")) return false;
  if (skip !== "size" && f.size && p.sizeLabel !== f.size) return false;
  if (skip !== "stock" && f.stock && !inStock(p)) return false;
  if (skip !== "unit" && f.unit && p.unitOfSale !== f.unit) return false;
  if (skip !== "storage" && f.storage && p.storageType !== f.storage) return false;
  if (skip !== "isNew" && f.isNew && !p.isNew) return false;
  if (skip !== "featured" && f.featured && !p.isFeatured) return false;
  return true;
}

const STOCK_RANK: Record<string, number> = { in_stock: 0, low_stock: 1, call_to_confirm: 2, out_of_stock: 3 };
const byName = (a: Product, b: Product) => a.name.localeCompare(b.name);
const sizeOf = (p: Product) =>
  p.sizeSort === null || p.sizeSort === undefined || p.sizeSort === "" ? Infinity : Number(p.sizeSort);

export function sortProducts(products: Product[], sort: Sort) {
  const compare: Record<Sort, (a: Product, b: Product) => number> = {
    recommended: (a, b) =>
      (STOCK_RANK[a.stockStatus] ?? 9) - (STOCK_RANK[b.stockStatus] ?? 9) ||
      Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) ||
      byName(a, b),
    name: byName,
    size: (a, b) => {
      const [x, y] = [sizeOf(a), sizeOf(b)];
      return x === y ? byName(a, b) : x < y ? -1 : 1;
    },
  };
  return [...products].sort(compare[sort]);
}

export const applyFilters = (products: Product[], f: Filters) =>
  sortProducts(products.filter((p) => matches(p, f)), f.sort);

export function filterHref(basePath: string, q: string | undefined, f: Filters) {
  const s = new URLSearchParams();
  if (q) s.set("q", q);
  if (f.type) s.set("type", f.type);
  f.brands.forEach((b) => s.append("brand", b));
  if (f.size) s.set("size", f.size);
  if (f.stock) s.set("stock", "1");
  if (f.unit) s.set("unit", f.unit);
  if (f.storage) s.set("storage", f.storage);
  if (f.isNew) s.set("new", "1");
  if (f.featured) s.set("featured", "1");
  if (f.sort !== "recommended") s.set("sort", f.sort);
  const query = s.toString();
  return query ? `${basePath}?${query}` : basePath;
}

type Counted = { label: string; count: number; order: number };

function tally(
  products: Product[],
  read: (p: Product) => { value: string; label: string; order?: number } | null,
) {
  const out = new Map<string, Counted>();
  for (const p of products) {
    const hit = read(p);
    if (!hit) continue;
    const seen = out.get(hit.value);
    out.set(hit.value, { label: hit.label, count: (seen?.count ?? 0) + 1, order: hit.order ?? 0 });
  }
  return [...out.entries()].sort(
    ([, a], [, b]) => a.order - b.order || a.label.localeCompare(b.label),
  );
}

export function buildFacets(products: Product[], f: Filters, basePath: string, q?: string): Facets {
  const href = (patch: Partial<Filters>) => filterHref(basePath, q, { ...f, ...patch });

  const single = (
    key: "type" | "size" | "unit" | "storage",
    read: Parameters<typeof tally>[1],
  ): Option[] =>
    tally(products.filter((p) => matches(p, f, key)), read).map(([value, c]) => ({
      value,
      label: c.label,
      count: c.count,
      active: f[key] === value,
      href: href({ [key]: f[key] === value ? undefined : value }),
    }));

  const types = single("type", (p) =>
    p.category
      ? { value: p.category.slug, label: p.category.name, order: p.category.sortOrder ?? 999 }
      : null,
  );
  const brands: Option[] = tally(products.filter((p) => matches(p, f, "brands")), (p) =>
    p.brand ? { value: p.brand.slug, label: p.brand.name } : null,
  ).map(([value, c]) => {
    const active = f.brands.includes(value);
    return {
      value,
      label: c.label,
      count: c.count,
      active,
      href: href({ brands: active ? f.brands.filter((b) => b !== value) : [...f.brands, value] }),
    };
  });
  const sizes = single("size", (p) =>
    p.sizeLabel ? { value: p.sizeLabel, label: p.sizeLabel, order: Number(p.sizeSort) || 0 } : null,
  );
  const units = single("unit", (p) =>
    p.unitOfSale ? { value: p.unitOfSale, label: humanize(p.unitOfSale) } : null,
  );
  const storages = single("storage", (p) =>
    p.storageType ? { value: p.storageType, label: humanize(p.storageType) } : null,
  );

  const toggle = (label: string, key: "stock" | "isNew" | "featured", test: (p: Product) => boolean): Toggle => ({
    label,
    count: products.filter((p) => matches(p, f, key) && test(p)).length,
    active: f[key],
    href: href({ [key]: !f[key] }),
  });

  const nameOf = (options: Option[], value: string) => options.find((o) => o.value === value)?.label ?? value;
  const activeChips = [
    ...(f.type ? [{ label: nameOf(types, f.type), href: href({ type: undefined }) }] : []),
    ...f.brands.map((b) => ({
      label: nameOf(brands, b),
      href: href({ brands: f.brands.filter((x) => x !== b) }),
    })),
    ...(f.size ? [{ label: f.size, href: href({ size: undefined }) }] : []),
    ...(f.stock ? [{ label: "In stock only", href: href({ stock: false }) }] : []),
    ...(f.unit ? [{ label: humanize(f.unit), href: href({ unit: undefined }) }] : []),
    ...(f.storage ? [{ label: humanize(f.storage), href: href({ storage: undefined }) }] : []),
    ...(f.isNew ? [{ label: "New", href: href({ isNew: false }) }] : []),
    ...(f.featured ? [{ label: "Featured", href: href({ featured: false }) }] : []),
  ];

  const moreThanOne = (options: Option[]) => (options.length > 1 ? options : []);

  return {
    types: moreThanOne(types),
    brands: moreThanOne(brands),
    sizes: moreThanOne(sizes),
    units: moreThanOne(units),
    storages: moreThanOne(storages),
    toggles: [
      toggle("In stock only", "stock", inStock),
      toggle("New", "isNew", (p) => Boolean(p.isNew)),
      toggle("Featured", "featured", (p) => Boolean(p.isFeatured)),
    ].filter((t) => t.count > 0),
    sorts: (
      [
        ["recommended", "Recommended"],
        ["name", "Name A-Z"],
        ["size", "Size"],
      ] as const
    ).map(([sort, label]) => ({ label, active: f.sort === sort, href: href({ sort }) })),
    activeChips,
    clearHref: filterHref(basePath, q, parseFilters({ sort: f.sort })),
  };
}
