import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { storeInfo } from "@/lib/sample-data";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  metadataBase: new URL("https://almiaraj.ae"),
  title: {
    default: "Al Miaraj | Bukhoor, Oud, Perfumes and Daily Items in Sharjah UAE",
    template: "%s | Al Miaraj Sharjah UAE"
  },
  description:
    "Al Miaraj is a local Sharjah shop for Bukhoor, Oud, perfumes, cosmetics and everyday items. Send an enquiry on WhatsApp and visit the shop for pickup."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: storeInfo.name,
    telephone: storeInfo.phone,
    sameAs: [storeInfo.googleProfileUrl, storeInfo.googleMapsUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: storeInfo.address,
      addressLocality: "Sharjah",
      addressCountry: "AE"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
