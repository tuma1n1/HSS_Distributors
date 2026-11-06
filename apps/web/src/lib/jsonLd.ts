/** Serialize JSON-LD for a <script> tag, so CMS text containing "</script>" can't break out of it. */
export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
