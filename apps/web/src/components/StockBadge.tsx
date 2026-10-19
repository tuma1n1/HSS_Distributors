import type { StockStatus } from "@/types/strapi";

const styles: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: "In stock", className: "bg-green-100 text-green-800" },
  low_stock: { label: "Low stock", className: "bg-amber-100 text-amber-800" },
  call_to_confirm: { label: "Call to confirm", className: "bg-sky-100 text-sky-800" },
  out_of_stock: { label: "Out of stock", className: "bg-neutral-200 text-neutral-700" },
};

export function StockBadge({ status }: { status: StockStatus }) {
  const s = styles[status] ?? styles.out_of_stock;
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${s.className}`}>
      {s.label}
    </span>
  );
}