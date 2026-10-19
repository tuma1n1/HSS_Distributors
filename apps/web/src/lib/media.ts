const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export function mediaUrl(url: string) {
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}