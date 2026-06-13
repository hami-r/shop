import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { storeInfo } from "@/lib/sample-data";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

const defaultCategoryImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA0SbkWC3crESEBbVsKUNuBmwYijhCugGOSEF9biRy_T0GQusNg8WbglXxoZ-htHaLhyj69XB6PMMnTmDkufPcQhTO34Tah9KHKcIgqQ2tTx-eesdUoCtFQt84vbSEWHl2zZ8-6QGWw3tPixkAHi2NVNMeY2_sAAt_3IpPMAg6FnU8xO_uqgqRrNp1jbczTTAZBqAy9P6VUHc1SwRjhihjAH3OyZsycn-4T2WQv1uNVq2-_qcNqRn4qGvZwIthZpzmmgiPnFijKytY";

const categoryImages: Record<string, string> = {
  Bukhoor:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA0SbkWC3crESEBbVsKUNuBmwYijhCugGOSEF9biRy_T0GQusNg8WbglXxoZ-htHaLhyj69XB6PMMnTmDkufPcQhTO34Tah9KHKcIgqQ2tTx-eesdUoCtFQt84vbSEWHl2zZ8-6QGWw3tPixkAHi2NVNMeY2_sAAt_3IpPMAg6FnU8xO_uqgqRrNp1jbczTTAZBqAy9P6VUHc1SwRjhihjAH3OyZsycn-4T2WQv1uNVq2-_qcNqRn4qGvZwIthZpzmmgiPnFijKytY",
  Oud:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAUXWIEsbg-yNNbszhwPqi3q1jp-6ok3USOwnwalc_Mwz4ckb0LEWxHaWNTui_EVKXhEqaIQJV0e4JnIGpGbCfQKeWgAF7c6zMF39W0g0coJOuQGbSmtg3lDOZO55U7um7rUCSM-JNIuCG_xfMQW6TFfypwCuKBf2hkJOLacBFd8ODt-cz8PY-Y6V1uYzcbuePY3iESrlxZK5oNn7EFGYRDklIZFTl8P-mpTHsKci_tvjoug0QdsTAvj_xabQ7nbZ8Wc6wc2zvh0FI",
  Perfumes:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2SR5Hu1z0cCWqxsAYCLj6fQZ88_p5GggPblmn9fAAtbUTE3Qr47lKTzevmksnOvsR6TsyjMal1IwneXWjqjSwRydfKTCYYvtWaRHnS8gCv4YozGWnntJbGZ2UnVzSHQOk_LZhLMGlNNnae3fWPrUAvrVFuy_KVmXW4-EVAz9xM88rz3hisgQ9xFvw61V7i-iCZAuanoB7-GPk2m5_KwVI4Nk9WBrZ346lCosO9nxxJa0Kxcyr2TWULN6hAS1MaU-eEu4-gD-V08",
  Cosmetics:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXxEp5KU_5kdsGVWz28N4Mz3qUBb_xEC5oOBcaZgVBFvmXXs91Ut_q2EvRt9iv5eUdCKtGtCHQC_5fe_-QWtcgLefdPr6_BvnNWAJMn61rat2ceVCjtqAa_mp7p3oH9_rrAx6neBpYiB7z9CuwV79u2pGhLMvqXK-BoD-XV9LdharMoIdNFKK-7XZX6ExiDQ2fNa7qA3dqUpqwEQFWkpUmBvkCSCWbAk6lNRSZEbT2WfBG5vXIoHpRXaSN9JexZktsHylwrI84lEA",
  "Gift Sets":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCX2v1pr15K4hLnyHC0gohl61AnEKqAyE1MOfaZqrX1AyIjXn6P01rFHNjvYEHK3W8lLsnQEI6FBGwwCqUQiMw8WOroqq6QKcg2I8t5nbmhrNVcrwykZ5C7ESx_d7BcVyQMycadN9WOebO6tvXUaTcmPJwzbY9VnrunEusIHhLckHiNwUtZNb0t8yCBz3B6voRzYMOAmjHACX9fflH9KGI8Udv8wIEQcD2xn82U-2LsNM_MkbxrpCXVsuBT-gJpT_jl5MMxUpeY6aY"
};

export const metadata: Metadata = {
  title: "Al Miaraj Shop for Bukhoor, Oud and Perfumes in Sharjah UAE",
  description: "Browse Al Miaraj products in Sharjah UAE, send an enquiry on WhatsApp, and visit the shop for pickup."
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <section className="overflow-hidden px-5 pb-16 pt-10 md:px-16 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-boutique items-center gap-12 md:grid-cols-2">
          <div className="order-2 space-y-8 md:order-1">
            <div>
              <p className="label mb-4 text-secondary">Local Sharjah Shop</p>
              <h1 className="font-display text-4xl font-bold leading-tight text-primary md:text-6xl">
                Bukhoor, Oud, Perfumes and <span className="italic text-secondary">Everyday Finds</span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-8 text-on-surface-variant">
                Browse what we have in the shop, send us an enquiry on WhatsApp, and visit us in Sharjah to check or pick up items.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                Browse Products <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Visit the Shop
              </Link>
            </div>
            <p className="text-sm font-semibold text-primary">Call or WhatsApp {storeInfo.phone} before visiting.</p>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative aspect-square w-full max-w-[460px] rounded-full border border-secondary/20 p-8">
              <div className="absolute inset-0 rounded-full bg-primary/5" />
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3jS6O3MowKJDZgEnrKOyOw-J9q5R5GvALHkk1yIIm_a_RjXlUlQyDYNqfsIEtq6-lvgKh5xzazRNWiPG5KFh62tdJ9KWFKL5Z1xURSouNFH5uKIHXtjS-ahARplJ4D_4xajfGYhqBUNpGwEtKA_HojRcFfADoU51vJUsSG02gxMBC1_7EZgkUdP7wWw_suGOi6YlNlYegkApf7rPkwFZMOs1DtqR7dl6CoYrQTHQZiOpFR7rmfvcxv0e6uH2CWHqaXDgSaogZRW4"
                alt="Al Miaraj shop emblem"
                fill
                priority
                className="object-contain p-6 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low px-5 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-boutique">
          <SectionHeading centered title="Browse by Category" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
            {categories.map((category, index) => (
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                key={category}
                className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-boutique ${
                  index === 0 ? "col-span-2 min-h-[260px] md:row-span-2 md:min-h-[460px]" : "min-h-[180px]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                <Image
                  src={categoryImages[category] ?? defaultCategoryImage}
                  alt={`${category} collection in Sharjah UAE`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="label text-secondary-container">Shop Category</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-boutique">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Available in Shop" title="Featured Products" />
            <Link href="/products" className="hidden text-sm font-semibold text-secondary md:block">
              View all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
