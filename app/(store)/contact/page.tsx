import type { Metadata } from "next";
import { ContactForm } from "@/components/store/contact-form";
import { storeInfo } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Contact Al Miaraj Sharjah UAE",
  description: "Contact Al Miaraj in Sharjah by phone, WhatsApp or message form before visiting the shop.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact Al Miaraj Sharjah UAE",
    description: "Contact Al Miaraj in Sharjah by phone, WhatsApp or message form before visiting the shop.",
    url: "/contact"
  }
};

export default function ContactPage() {
  return (
    <section className="px-5 py-10 md:px-16">
      <div className="mx-auto grid max-w-boutique gap-10 lg:grid-cols-2">
        <div>
          <p className="label text-secondary">Sharjah Shop</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-primary">Contact Al Miaraj</h1>
          <div className="mt-6 grid gap-2 text-on-surface-variant">
            <a href={`tel:${storeInfo.phone}`}>{storeInfo.phone}</a>
            <a href={`https://wa.me/${storeInfo.whatsapp}`}>WhatsApp {storeInfo.phone}</a>
            <a href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer">
              Open Google Maps
            </a>
            <p>{storeInfo.address}</p>
          </div>
          <iframe className="mt-8 h-80 w-full rounded-3xl border-0 shadow-boutique" src={storeInfo.mapsEmbed} loading="lazy" title="Al Miaraj Sharjah map" />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
