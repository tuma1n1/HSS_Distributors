import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const TAGS: Record<string, string> = {
  product: "products",
  category: "categories",
  brand: "brands",
  branch: "branches",
  "delivery-zone": "delivery-zones",
  faq: "faqs",
  "site-setting": "site-setting",
};

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let model = "";
  try {
    const body = await req.json();
    model = String(body?.model ?? "");
  } catch {
    // no body: refresh everything
  }

  const tags = TAGS[model] ? [TAGS[model]] : Object.values(TAGS);
  for (const t of tags) revalidateTag(t, "max");

  return NextResponse.json({ ok: true, revalidated: tags });
}