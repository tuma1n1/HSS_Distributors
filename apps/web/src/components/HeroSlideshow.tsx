"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type Slide = {
  key: string;
  href: string;
  name: string;
  brand: string | null;
  size: string | null;
  image: string;
  alt: string;
};

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((step: number) => setIndex((i) => (i + step + n) % n), [n]);

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => go(1), 4500);
    return () => window.clearInterval(id);
  }, [paused, n, go]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <div className="relative aspect-[5/4]">
        {slides.map((s, i) => (
          <Link
            key={s.key}
            href={s.href}
            tabIndex={i === index ? 0 : -1}
            aria-hidden={i !== index}
            className={`absolute inset-0 block transition-all duration-700 ${
              i === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.03] opacity-0"
            }`}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              preload={i === 0}
              className="object-contain p-8 pb-28"
            />
            <div className="absolute inset-x-0 bottom-0 bg-brand-900 px-5 py-4 text-white">
              {s.brand && <p className="text-xs font-medium text-gold-400">{s.brand}</p>}
              <p className="font-display text-lg font-bold leading-tight">{s.name}</p>
              {s.size && <p className="text-sm text-brand-100">{s.size}</p>}
            </div>
          </Link>
        ))}
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous product"
            onClick={() => go(-1)}
            className="absolute left-3 top-[38%] grid h-11 w-11 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next product"
            onClick={() => go(1)}
            className="absolute right-3 top-[38%] grid h-11 w-11 place-items-center rounded-full bg-white/90 text-lg shadow hover:bg-white"
          >
            ›
          </button>
          <div className="absolute bottom-4 right-4 z-10 hidden sm:flex">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Show product ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="p-1.5"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-500" : "w-2 bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}