"use client";

import Image from "next/image";
import { useState } from "react";
import { productImageAlt } from "@/lib/seo";

export function ProductGallery({ images, name, category }: { images: string[]; name: string; category?: string | null }) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface-container-low shadow-boutique md:aspect-[4/5]">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={productImageAlt(name, category, images.indexOf(selectedImage) + 1)}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, index) => (
            <button
              type="button"
              key={image}
              className={`relative aspect-square overflow-hidden rounded-2xl bg-surface-container-high ring-2 ${
                selectedImage === image ? "ring-secondary" : "ring-transparent"
              }`}
              onClick={() => setSelectedImage(image)}
              aria-label={`Show ${name} image ${index + 1}`}
            >
              <Image src={image} alt={productImageAlt(name, category, index + 1)} fill className="object-cover" sizes="25vw" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
