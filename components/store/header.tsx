"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageLink } from "@/components/i18n/language-link";
import { useI18n } from "@/components/i18n/locale-provider";
import { localePath, stripLocale } from "@/lib/i18n";
import { useCartStore } from "@/lib/store";

export function Header() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const switchHref = localePath(otherLocale, stripLocale(pathname ?? "/"));

  const links: Array<[string, string]> = [
    [t.nav.bukhoor, localePath(locale, "/shop/bukhoor")],
    [t.nav.oud, localePath(locale, "/shop/oud")],
    [t.nav.perfumes, localePath(locale, "/shop/perfumes")],
    [t.nav.shop, localePath(locale, "/products")],
    [t.nav.contact, localePath(locale, "/contact")]
  ];

  return (
    <header className={`sticky top-0 z-50 bg-canvas/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-canvas/85 ${scrolled ? "shadow-[0_1px_0_#e1dcd3,0_8px_24px_-18px_rgba(57,34,30,0.35)]" : ""}`}>
      <p className="border-b border-hairline px-4 py-2 text-center text-xs font-semibold text-ink">{t.announcement}</p>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-3 lg:w-1/3">
          <button className="icon-btn border-transparent bg-transparent lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? t.nav.closeMenu : t.nav.menu} aria-expanded={open}>
            <span key={open ? "x" : "menu"} className="animate-fade-in">{open ? <X size={20} /> : <Menu size={20} />}</span>
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label={t.nav.menu}>
            {links.slice(0, 4).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="relative text-sm text-stone after:absolute after:-bottom-1 after:start-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-calm hover:text-ink hover:after:scale-x-100 rtl:after:origin-right"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href={localePath(locale, "/")} className="text-center font-display text-2xl font-light tracking-[0.18em] text-stone md:text-[1.75rem] rtl:tracking-normal">
          {locale === "ar" ? t.storeName : "AL MIARAJ"}
        </Link>

        <div className="flex items-center justify-end gap-2 lg:w-1/3 lg:gap-5">
          <Link href={localePath(locale, "/contact")} className="hidden text-sm text-stone hover:text-ink lg:inline">
            {t.nav.contact}
          </Link>
          <LanguageLink
            href={switchHref}
            locale={otherLocale}
            aria-label={t.nav.switchLanguageLabel}
            className="rounded-full border border-silver px-3 py-1.5 text-sm text-stone hover:border-stone"
          >
            {t.nav.switchLanguage}
          </LanguageLink>
          <button className="relative grid h-11 w-11 place-items-center text-stone" onClick={openCart} aria-label={t.nav.openCart}>
            <ShoppingBag size={21} strokeWidth={1.6} />
            {mounted && count ? (
              <span key={count} className="absolute end-1 top-1 grid animate-pop h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="animate-slide-down border-t border-hairline bg-canvas lg:hidden" aria-label={t.nav.menu}>
          <div className="container-x grid py-3">
            {links.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                style={{ animationDelay: `${index * 40}ms` }}
                className="animate-slide-down border-b border-hairline py-4 text-lg text-ink last:border-0"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
