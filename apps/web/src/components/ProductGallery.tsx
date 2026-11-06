"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";

type Img = { src: string; alt: string };

export function ProductGallery({ images, name }: { images: Img[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  if (images.length === 0) {
    return <div className="aspect-square rounded-3xl bg-brand-50" />;
  }

  const current = images[active];

  const follow = (e: PointerEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - box.left) / box.width) * 100}% ${((e.clientY - box.top) / box.height) * 100}%`);
  };

  return (
    <div>
      <button
        type="button"
        aria-pressed={zoomed}
        aria-label={`${zoomed ? "Zoom out of" : "Zoom in on"} photo of ${name}`}
        onClick={(e) => {
          follow(e as unknown as PointerEvent<HTMLButtonElement>);
          setZoomed((z) => !z);
        }}
        onPointerMove={(e) => {
          if (zoomed) follow(e);
        }}
        onMouseLeave={() => setZoomed(false)}
        className={`relative block aspect-square w-full overflow-hidden rounded-3xl bg-brand-50 ${
          zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"
        }`}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt || name}
          fill
          preload
          sizes="(min-width: 1024px) 60vw, 100vw"
          style={{ transformOrigin: origin }}
          className={`object-contain p-8 transition-[scale] duration-200 motion-reduce:transition-none ${
            zoomed ? "scale-[2.2]" : "scale-100"
          }`}
        />
      </button>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto p-1">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => {
                setActive(i);
                setZoomed(false);
              }}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-brand-50 transition motion-reduce:transition-none ${
                i === active ? "border-brand-700" : "border-transparent hover:border-brand-600/40"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
