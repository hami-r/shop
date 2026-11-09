"use client";

import { FadeImage } from "@/components/motion/fade-image";
import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";

export function ProductGallery({ images, name, category }: { images: string[]; name: string; category: string }) {
  const { t } = useI18n();
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-card bg-surface-grey md:aspect-[4/5] md:rounded-media">
        {current ? (
          <FadeImage key={current} src={current} className="object-cover" alt={t.product.imageAlt(name, category, selected + 1)} fill priority={selected === 0} sizes="(min-width: 1024px) 50vw, 100vw" />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, index) => (
            <button
              type="button"
              key={image}
              className={`relative aspect-square overflow-hidden rounded-2xl bg-surface-grey ring-2 ring-offset-2 ring-offset-canvas ${
                selected === index ? "ring-stone" : "ring-transparent"
              }`}
              onClick={() => setSelected(index)}
              aria-label={t.product.showImage(name, index + 1)}
              aria-pressed={selected === index}
            >
              <FadeImage src={image} alt={t.product.imageAlt(name, category, index + 1)} fill className="object-cover transition-transform duration-500 ease-calm hover:scale-105" sizes="25vw" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
