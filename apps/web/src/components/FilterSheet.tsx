"use client";

import { useRef, type ReactNode } from "react";

/** Mobile bottom sheet. Filter links keep it open so several can be chosen in a row. */
export function FilterSheet({ count, shown, children }: { count: number; shown: number; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="inline-flex min-h-11 items-center justify-center rounded-full text-center border border-brand-700 px-5 text-sm font-semibold text-brand-700"
      >
        Filters ({count})
      </button>
      <dialog
        ref={ref}
        aria-label="Filters"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[85dvh] w-full max-w-none rounded-t-3xl bg-white p-0 backdrop:bg-black/50 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2">
          <h2 className="text-lg font-bold text-brand-900">Filters</h2>
          <button type="button" onClick={close} className="min-h-11 min-w-11 px-2 text-sm font-semibold text-brand-700">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        <div className="border-t border-neutral-200 p-3">
          <button
            type="button"
            onClick={close}
            className="min-h-11 w-full rounded-full bg-brand-700 px-5 text-sm font-semibold text-white"
          >
            Show {shown} {shown === 1 ? "product" : "products"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
