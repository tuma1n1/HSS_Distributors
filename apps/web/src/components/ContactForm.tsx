"use client";

import { useRef, useState } from "react";

const field = "mt-1 block min-h-11 w-full rounded-lg border border-neutral-300 px-3 py-2";

/** No server involved: the button hands a ready-written email to the visitor's own mail app. */
export function ContactForm({ email }: { email: string }) {
  const form = useRef<HTMLFormElement>(null);
  const [opened, setOpened] = useState(false);

  const draft = () => {
    const f = form.current;
    if (!f?.reportValidity()) return null;
    const value = (name: string) => String(new FormData(f).get(name) ?? "").trim();
    const business = value("business");
    const replyTo = value("email");
    return {
      subject: `Website enquiry from ${value("name")}${business ? ` (${business})` : ""}`,
      body: [
        value("message"),
        "",
        `Name: ${value("name")}`,
        ...(business ? [`Business: ${business}`] : []),
        `Phone: ${value("phone")}`,
        ...(replyTo ? [`Email: ${replyTo}`] : []),
      ].join("\n"),
    };
  };

  const openMailApp = () => {
    const d = draft();
    if (!d) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.body)}`;
    setOpened(true);
  };

  const openGmail = () => {
    const d = draft();
    if (!d) return;
    const query = new URLSearchParams({ view: "cm", fs: "1", to: email, su: d.subject, body: d.body });
    window.open(`https://mail.google.com/mail/?${query}`, "_blank", "noopener,noreferrer");
    setOpened(true);
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        openMailApp();
      }}
      className="space-y-4"
    >
      <label className="block text-sm font-medium">
        Your name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Business name (optional)
        <input name="business" autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Phone number
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Email (optional)
        <input name="email" type="email" autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Your message
        <textarea name="message" required rows={5} className={field} />
      </label>

      <button
        type="submit"
        className="min-h-11 w-full rounded-lg bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-900"
      >
        Send email
      </button>
      <button
        type="button"
        onClick={openGmail}
        className="min-h-11 w-full rounded-lg border border-brand-700 px-5 py-3 font-semibold text-brand-700 hover:bg-brand-50"
      >
        Use Gmail instead
      </button>

      <p aria-live="polite" className="text-sm text-neutral-600">
        {opened
          ? "Your message is ready in your email. Press send there to reach us."
          : `Your message opens in your own email, addressed to ${email}.`}
      </p>
    </form>
  );
}
