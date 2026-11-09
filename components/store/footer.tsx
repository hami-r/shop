import Link from "next/link";
import { LanguageLink } from "@/components/i18n/language-link";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";
import { categories, storeInfo } from "@/lib/sample-data";
import { categoryPath, getCategoryCopy } from "@/lib/seo";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-band-soft text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <p className="font-display text-3xl font-light tracking-[0.18em] rtl:tracking-normal">{locale === "ar" ? t.storeName : "AL MIARAJ"}</p>
          <p className="mt-5 max-w-sm text-base leading-7 text-mute">{t.footer.about}</p>
        </div>

        <div>
          <p className="label text-mute">{t.footer.shop}</p>
          <ul className="mt-5 grid gap-3 text-base">
            {categories.map((category) => (
              <li key={category}>
                <Link className="text-white/85 hover:text-white" href={categoryPath(category, locale)}>
                  {getCategoryCopy(category, locale).heading}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-white/85 hover:text-white" href={localePath(locale, "/products")}>
                {t.nav.shop}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label text-mute">{t.footer.help}</p>
          <ul className="mt-5 grid gap-3 text-base">
            <li><Link className="text-white/85 hover:text-white" href={localePath(locale, "/cart")}>{t.footer.enquiryList}</Link></li>
            <li><Link className="text-white/85 hover:text-white" href={localePath(locale, "/contact")}>{t.footer.visit}</Link></li>
          </ul>
        </div>

        <div>
          <p className="label text-mute">{t.footer.contact}</p>
          <ul className="mt-5 grid gap-3 text-base">
            <li>
              <a className="flex items-start gap-2 text-white/85 hover:text-white" href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer">
                <MapPin size={17} className="mt-1 shrink-0" /> {t.address}
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-white/85 hover:text-white" href={`tel:${storeInfo.phone.replace(/\s/g, "")}`}>
                <Phone size={17} /> <span dir="ltr">{storeInfo.phone}</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-white/85 hover:text-white" href={`https://wa.me/${storeInfo.whatsapp}`}>
                <MessageCircle size={17} /> WhatsApp
              </a>
            </li>
            <li>
              <a className="flex items-center gap-2 text-white/85 hover:text-white" href={storeInfo.instagramUrl} target="_blank" rel="noreferrer">
                <Instagram size={17} /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-mute">
          <p>© {year} {t.storeName}. {t.footer.rights}</p>
          <div className="flex items-center gap-2">
            <span>{t.footer.language}:</span>
            <LanguageLink href="/" locale="en" className={`rounded-full px-3 py-1 ${locale === "en" ? "bg-white/10 text-white" : "hover:text-white"}`}>English</LanguageLink>
            <LanguageLink href="/ar" locale="ar" className={`rounded-full px-3 py-1 ${locale === "ar" ? "bg-white/10 text-white" : "hover:text-white"}`}>العربية</LanguageLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
