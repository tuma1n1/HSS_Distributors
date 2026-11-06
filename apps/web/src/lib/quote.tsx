"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type QuoteItem = {
  id: string; // Strapi documentId
  slug: string;
  name: string;
  packSize?: string | null;
  qty: number;
};

const KEY = "hss-quote-list";
const EMPTY: QuoteItem[] = [];
const clampQty = (qty: number) => Math.max(1, Math.min(9999, Math.floor(qty) || 1));

const isItem = (v: unknown): v is QuoteItem => {
  const i = v as Partial<QuoteItem> | null;
  return (
    typeof i?.id === "string" &&
    typeof i.slug === "string" &&
    typeof i.name === "string" &&
    typeof i.qty === "number"
  );
};

function load(): QuoteItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isItem) : EMPTY;
  } catch {
    return EMPTY; // storage blocked or corrupted: start with an empty list
  }
}

// The list lives outside React so a child effect (ClearQuote) can't run before it has loaded,
// and so other open tabs stay in sync.
let snapshot: QuoteItem[] | null = null;
const listeners = new Set<() => void>();

const getSnapshot = () => (snapshot ??= load());
const getServerSnapshot = () => EMPTY;

function subscribe(listener: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    snapshot = load();
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function update(next: (prev: QuoteItem[]) => QuoteItem[]) {
  snapshot = next(getSnapshot());
  try {
    localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    // ignore: the list still works for this visit
  }
  listeners.forEach((l) => l());
}

function add(item: Omit<QuoteItem, "qty">, qty = 1) {
  update((prev) =>
    prev.some((i) => i.id === item.id)
      ? prev.map((i) => (i.id === item.id ? { ...i, qty: clampQty(i.qty + qty) } : i))
      : [...prev, { ...item, qty: clampQty(qty) }],
  );
}

const setQty = (id: string, qty: number) =>
  update((prev) => prev.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i)));
const remove = (id: string) => update((prev) => prev.filter((i) => i.id !== id));
const clear = () => update(() => EMPTY);

const noSubscribe = () => () => {};

type QuoteContext = {
  items: QuoteItem[];
  count: number;
  ready: boolean;
  add: typeof add;
  setQty: typeof setQty;
  remove: typeof remove;
  clear: typeof clear;
  has: (id: string) => boolean;
};

const Ctx = createContext<QuoteContext | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);

  const value = useMemo<QuoteContext>(
    () => ({
      items,
      count: items.length,
      ready,
      add,
      setQty,
      remove,
      clear,
      has: (id) => items.some((i) => i.id === id),
    }),
    [items, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}
