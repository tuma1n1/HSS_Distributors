export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Price on request";
  return `KES ${price.toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;
}