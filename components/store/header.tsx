"use client";

import Link from "next/link";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { storeInfo } from "@/lib/sample-data";
import { useCartStore } from "@/lib/store";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Contact", "/contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="glass-nav fixed top-0 z-50 w-full bg-surface/75 shadow-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-16">
        <button className="text-primary md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} className="label text-primary hover:text-secondary" href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl">
          Al Miaraj
        </Link>
        <div className="flex items-center gap-4">
          <a className="hidden items-center gap-2 text-sm font-semibold text-primary md:flex" href={`tel:${storeInfo.phone}`}>
            <Phone size={16} />
            {storeInfo.phone}
          </a>
          <button className="relative text-primary" onClick={openCart} aria-label="Open cart">
            <ShoppingBag />
            {count ? (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-outline-variant bg-surface px-5 py-4 md:hidden">
          <div className="grid gap-3">
            {links.map(([label, href]) => (
              <Link key={href} onClick={() => setOpen(false)} className="label text-primary" href={href}>
                {label}
              </Link>
            ))}
            <a className="text-sm font-semibold text-secondary" href={`tel:${storeInfo.phone}`}>
              {storeInfo.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
