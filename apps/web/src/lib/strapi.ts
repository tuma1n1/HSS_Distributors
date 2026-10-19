const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type Options = { tags?: string[]; revalidate?: number | false };

export async function strapiFetch<T>(
  path: string,
  params: Record<string, string> = {},
  options: Options = {},
): Promise<T> {
  const url = new URL(`/api/${path}`, STRAPI_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    headers: STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      : undefined,
    next: { tags: options.tags, revalidate: options.revalidate },
  });

  if (!res.ok) {
    throw new Error(`Strapi ${res.status} for ${url.pathname}`);
  }
  return res.json() as Promise<T>;
}