const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export class StrapiError extends Error {
  constructor(
    readonly status: number,
    path: string,
  ) {
    super(`Strapi ${status} for ${path}`);
  }
}

/** Log a failed read. A 404 only means the entry isn't published yet, so it stays quiet. */
export function logStrapiError(path: string, err: unknown) {
  if (err instanceof StrapiError && err.status === 404) return;
  console.error(`[strapi] ${path} failed:`, err instanceof Error ? err.message : err);
}

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
    throw new StrapiError(res.status, url.pathname);
  }
  return res.json() as Promise<T>;
}