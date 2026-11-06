type Money = number | string | null | undefined;

/** Strapi can hold 0 or nothing for a product with no agreed price: neither is a real price. */
export const hasPrice = (price: Money) => Number(price) > 0;

export function formatPrice(price: Money): string {
  if (!hasPrice(price)) return "Request price";
  return `KES ${Number(price).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;
}

/** "zero_rated" -> "Zero rated" */
export function humanize(value: string): string {
  const text = value.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
