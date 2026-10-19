"use client";

import { useEffect } from "react";
import { useQuote } from "@/lib/quote";

export function ClearQuote() {
  const { clear } = useQuote();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}