import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { hasPrice } from "@/lib/format";
import { mediaUrl } from "@/lib/media";
import { getProductDetail, getRelatedProducts } from "@/lib/shelf";
import { getSiteSettings } from "@/lib/site";

type P = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: P }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  if (!product) return {};

  const ready = hasPrice(product.price) && Boolean(product.shortDescription);
  const img = product.images?.[0];

  return {
    title: product.name,
    description:
      product.shortDescription ||
      `${product.name} wholesale from HSS Distributors in Nairobi. Add it to your quote list.`,
    alternates: { canonical: `/product/${product.slug}` },
    robots: ready ? undefined : { index: false, follow: true },
    openGraph: img ? { images: [mediaUrl(img.url)] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: P }) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  if (!product) notFound();

  const [related, settings] = await Promise.all([getRelatedProducts(product), getSiteSettings()]);

  return <ProductDetail product={product} related={related} whatsappNumber={settings?.whatsappNumber} />;
}
