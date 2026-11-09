"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image with a soft shimmer placeholder while the photo loads, then a fade-in.
 * Priority images (above the fold) are shown immediately so they are never delayed.
 */
export function FadeImage({ className = "", priority, alt, onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const visible = priority || loaded;

  return (
    <>
      {!loaded ? <span aria-hidden className="skeleton pointer-events-none absolute inset-0" /> : null}
      <Image
        {...props}
        alt={alt}
        priority={priority}
        className={`${className} transition-[opacity,transform] duration-700 ease-calm ${visible ? "opacity-100" : "opacity-0"}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoaded(true);
          onError?.(event);
        }}
      />
    </>
  );
}
