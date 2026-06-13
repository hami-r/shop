import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { storeInfo } from "@/lib/sample-data";

export function Footer() {
  return (
    <footer className="bg-primary px-5 py-12 text-white md:px-16">
      <div className="mx-auto grid max-w-boutique gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold">Al Miaraj</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
            A local Sharjah shop for Bukhoor, Oud, perfumes, cosmetics and everyday items. Enquire on WhatsApp and visit us for pickup.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-white/80">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Enquire</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="grid gap-3 text-sm text-white/80">
          <a className="flex items-center gap-2" href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={16} /> {storeInfo.address}
          </a>
          <a className="flex items-center gap-2" href={`tel:${storeInfo.phone}`}><Phone size={16} /> {storeInfo.phone}</a>
          <a className="flex items-center gap-2" href={`mailto:${storeInfo.email}`}><Mail size={16} /> {storeInfo.email}</a>
          <a className="flex items-center gap-2" href={`https://www.instagram.com/almiarajshop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==`}><Instagram size={16} /> Instagram</a>
        </div>
      </div>
    </footer>
  );
}
