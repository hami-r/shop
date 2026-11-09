import type { Product } from "@/lib/types";

export const storeInfo = {
  name: "Al Miaraj",
  phone: "+971 56 3757435",
  whatsapp: "971563757435",
  email: "hello@almiaraj.ae",
  address: "Hay Mogader - Sharjah, UAE",
  instagramUrl: "https://www.instagram.com/almiarajshop",
  googleProfileUrl: "https://share.google/7RZb0oynrOwgib4jD",
  googleMapsUrl:
    "https://www.google.com/maps/place/Al+Miaraj/@25.058407,56.3547859,20.22z/data=!4m6!3m5!1s0x3ef4fb99d3e9e3ab:0x92de29b70930459a!8m2!3d25.0581701!4d56.3549201!16s%2Fg%2F11vylh1hq2?entry=ttu",
  mapsEmbed:
    "https://www.google.com/maps?q=Al%20Miaraj%4025.0581701,56.3549201&z=19&output=embed"
};

export const categories = ["Bukhoor", "Oud", "Perfumes", "Cosmetics", "Gift Sets"];

export const sampleProducts: Product[] = [
  {
    id: "demo-royal-amber-rose",
    name: "Amber Rose Bukhoor",
    slug: "amber-rose-bukhoor",
    description:
      "Bukhoor with oud, rose, and amber notes for everyday home use.",
    price: 450,
    compare_price: 520,
    category: "Bukhoor",
    stock: 18,
    is_active: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0SbkWC3crESEBbVsKUNuBmwYijhCugGOSEF9biRy_T0GQusNg8WbglXxoZ-htHaLhyj69XB6PMMnTmDkufPcQhTO34Tah9KHKcIgqQ2tTx-eesdUoCtFQt84vbSEWHl2zZ8-6QGWw3tPixkAHi2NVNMeY2_sAAt_3IpPMAg6FnU8xO_uqgqRrNp1jbczTTAZBqAy9P6VUHc1SwRjhihjAH3OyZsycn-4T2WQv1uNVq2-_qcNqRn4qGvZwIthZpzmmgiPnFijKytY",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCX2v1pr15K4hLnyHC0gohl61AnEKqAyE1MOfaZqrX1AyIjXn6P01rFHNjvYEHK3W8lLsnQEI6FBGwwCqUQiMw8WOroqq6QKcg2I8t5nbmhrNVcrwykZ5C7ESx_d7BcVyQMycadN9WOebO6tvXUaTcmPJwzbY9VnrunEusIHhLckHiNwUtZNb0t8yCBz3B6voRzYMOAmjHACX9fflH9KGI8Udv8wIEQcD2xn82U-2LsNM_MkbxrpCXVsuBT-gJpT_jl5MMxUpeY6aY"
    ]
  },
  {
    id: "demo-emerald-oud",
    name: "Oud Perfume",
    slug: "oud-perfume",
    description:
      "A simple oud perfume with warm fragrance notes. Contact us to check availability.",
    price: 390,
    compare_price: null,
    category: "Perfumes",
    stock: 24,
    is_active: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDf2SR5Hu1z0cCWqxsAYCLj6fQZ88_p5GggPblmn9fAAtbUTE3Qr47lKTzevmksnOvsR6TsyjMal1IwneXWjqjSwRydfKTCYYvtWaRHnS8gCv4YozGWnntJbGZ2UnVzSHQOk_LZhLMGlNNnae3fWPrUAvrVFuy_KVmXW4-EVAz9xM88rz3hisgQ9xFvw61V7i-iCZAuanoB7-GPk2m5_KwVI4Nk9WBrZ346lCosO9nxxJa0Kxcyr2TWULN6hAS1MaU-eEu4-gD-V08"
    ]
  },
  {
    id: "demo-golden-majlis",
    name: "Oud Chips",
    slug: "oud-chips",
    description:
      "Oud chips for home fragrance. Ask us on WhatsApp for current stock.",
    price: 620,
    compare_price: 700,
    category: "Oud",
    stock: 11,
    is_active: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUXWIEsbg-yNNbszhwPqi3q1jp-6ok3USOwnwalc_Mwz4ckb0LEWxHaWNTui_EVKXhEqaIQJV0e4JnIGpGbCfQKeWgAF7c6zMF39W0g0coJOuQGbSmtg3lDOZO55U7um7rUCSM-JNIuCG_xfMQW6TFfypwCuKBf2hkJOLacBFd8ODt-cz8PY-Y6V1uYzcbuePY3iESrlxZK5oNn7EFGYRDklIZFTl8P-mpTHsKci_tvjoug0QdsTAvj_xabQ7nbZ8Wc6wc2zvh0FI"
    ]
  },
  {
    id: "demo-silk-rose-cream",
    name: "Rose Beauty Cream",
    slug: "rose-beauty-cream",
    description:
      "A daily-use cosmetic cream with rose extract.",
    price: 180,
    compare_price: null,
    category: "Cosmetics",
    stock: 36,
    is_active: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXxEp5KU_5kdsGVWz28N4Mz3qUBb_xEC5oOBcaZgVBFvmXXs91Ut_q2EvRt9iv5eUdCKtGtCHQC_5fe_-QWtcgLefdPr6_BvnNWAJMn61rat2ceVCjtqAa_mp7p3oH9_rrAx6neBpYiB7z9CuwV79u2pGhLMvqXK-BoD-XV9LdharMoIdNFKK-7XZX6ExiDQ2fNa7qA3dqUpqwEQFWkpUmBvkCSCWbAk6lNRSZEbT2WfBG5vXIoHpRXaSN9JexZktsHylwrI84lEA"
    ]
  }
];
