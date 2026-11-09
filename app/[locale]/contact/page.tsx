import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/store/contact-form";
import { getDictionary, type Locale } from "@/lib/i18n";
import { storeInfo } from "@/lib/sample-data";
import { alternatesFor } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale);
  const alternates = alternatesFor(params.locale, "/contact", getBaseUrl());
  return {
    title: { absolute: t.contact.metaTitle },
    description: t.contact.metaDescription,
    alternates,
    openGraph: { title: t.contact.metaTitle, description: t.contact.metaDescription, url: alternates.canonical }
  };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  const row = "flex items-start gap-4 border-b border-hairline py-5";

  return (
    <section className="container-x py-12 md:py-20">
      <p className="label animate-rise text-ink">{t.contact.eyebrow}</p>
      <h1 style={{ animationDelay: "80ms" }} className="heading-display mt-4 animate-rise text-5xl md:text-7xl">{t.contact.title}</h1>
      <p style={{ animationDelay: "180ms" }} className="mt-6 max-w-2xl animate-rise font-display text-xl font-light text-stone md:text-2xl">{t.contact.text}</p>

      <div data-reveal className="mt-14 grid gap-12 lg:grid-cols-2">
        <div>
          <ul className="border-t border-hairline text-lg">
            <li className={row}>
              <MapPin className="mt-1 shrink-0 text-stone" size={20} />
              <div>
                <p className="label text-ash">{t.contact.location}</p>
                <a className="mt-1 block text-ink hover:text-stone" href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer">{t.address}</a>
              </div>
            </li>
            <li className={row}>
              <Phone className="mt-1 shrink-0 text-stone" size={20} />
              <div>
                <p className="label text-ash">{t.contact.phone}</p>
                <a className="mt-1 block text-ink hover:text-stone" dir="ltr" href={`tel:${storeInfo.phone.replace(/\s/g, "")}`}>{storeInfo.phone}</a>
              </div>
            </li>
            <li className={row}>
              <MessageCircle className="mt-1 shrink-0 text-stone" size={20} />
              <div>
                <p className="label text-ash">{t.contact.whatsapp}</p>
                <a className="mt-1 block text-ink hover:text-stone" dir="ltr" href={`https://wa.me/${storeInfo.whatsapp}`}>{storeInfo.phone}</a>
              </div>
            </li>
          </ul>
          <a href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn-stone mt-8">{t.contact.maps}</a>
          <iframe className="mt-8 h-80 w-full rounded-card border-0" src={storeInfo.mapsEmbed} loading="lazy" title={t.contact.mapTitle} />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
