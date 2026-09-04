import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="px-5 py-20 md:px-16 md:py-32">
      <div className="mx-auto max-w-2xl rounded-3xl bg-surface-container-low p-8 text-center shadow-boutique md:p-12">
        <p className="label text-secondary">404 Not Found</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-primary md:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base leading-7 text-on-surface-variant">
          The product or page you are looking for may have moved or is no longer available. Explore our latest fragrances and Bukhoor catalog.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/products" className="btn-primary">
            <Search size={16} /> Browse Catalog
          </Link>
          <Link href="/" className="btn-secondary">
            Return Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
