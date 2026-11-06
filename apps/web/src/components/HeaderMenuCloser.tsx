"use client";

import { useEffect } from "react";

// The header lives in the root layout and is not remounted on navigation, so without this the
// mobile menu stays open over the new page and desktop dropdowns stay open while a link has focus.
export function HeaderMenuCloser() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const link = target.closest?.("header a");
      document.querySelectorAll("header details[open]").forEach((d) => {
        if (link || !d.contains(target)) d.removeAttribute("open");
      });
      if (link && document.activeElement instanceof HTMLElement) document.activeElement.blur();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
