"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/quote/actions";
import type { QuoteItem } from "@/lib/quote";

const initial: EnquiryState = { ok: false };
const input = "w-full rounded-lg border border-neutral-300 px-3 py-2";

export function EnquiryForm({ items }: { items: QuoteItem[] }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const v = state.values ?? {};

  return (
    <form action={action} className="mt-4 space-y-3">
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(
          items.map(({ id, name, packSize, qty }) => ({ id, name, packSize, qty })),
        )}
      />
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <input name="name" required placeholder="Your name *" defaultValue={v.name} className={input} />
      <input name="businessName" placeholder="Business name" defaultValue={v.businessName} className={input} />
      <input name="phone" type="tel" required placeholder="Phone number *" defaultValue={v.phone} className={input} />
      <input name="email" type="email" placeholder="Email (optional)" defaultValue={v.email} className={input} />
      <input name="location" placeholder="Delivery location" defaultValue={v.location} className={input} />
      <textarea name="message" rows={3} placeholder="Anything else we should know?" defaultValue={v.message} className={input} />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}