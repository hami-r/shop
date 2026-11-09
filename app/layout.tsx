import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { storeInfo } from "@/lib/sample-data";
import { getBaseUrl } from "@/lib/site-url";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

const baseUrl = getBaseUrl();
const siteName = "Al Miaraj";
const defaultTitle = "Al Miaraj | Bukhoor, Oud, Perfumes and Daily Items in Sharjah UAE";
const defaultDescription =
  "Al Miaraj is a local Sharjah shop for Bukhoor, Oud, perfumes, cosmetics and everyday items. Send an enquiry on WhatsApp and visit the shop for pickup.";
const ogImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD3jS6O3MowKJDZgEnrKOyOw-J9q5R5GvALHkk1yIIm_a_RjXlUlQyDYNqfsIEtq6-lvgKh5xzazRNWiPG5KFh62tdJ9KWFKL5Z1xURSouNFH5uKIHXtjS-ahARplJ4D_4xajfGYhqBUNpGwEtKA_HojRcFfADoU51vJUsSG02gxMBC1_7EZgkUdP7wWw_suGOi6YlNlYegkApf7rPkwFZMOs1DtqR7dl6CoYrQTHQZiOpFR7rmfvcxv0e6uH2CWHqaXDgSaogZRW4";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "./"
  },
  title: {
    default: defaultTitle,
    template: "%s | Al Miaraj Sharjah UAE"
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
    siteName,
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 800,
        height: 800,
        alt: "Al Miaraj Sharjah"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "0d5PVGbkWY-hwQZ6NAU8WwyGwOaMgdruOY1_Yx3LZrI"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": `${baseUrl}/#localbusiness`,
        name: storeInfo.name,
        description: defaultDescription,
        areaServed: ["Sharjah", "Dubai", "Ajman", "United Arab Emirates"],
        url: baseUrl,
        image: ogImage,
        telephone: storeInfo.phone,
        email: storeInfo.email,
        priceRange: "AED 50 - AED 1000",
        currenciesAccepted: "AED",
        paymentAccepted: "Cash, Credit Card",
        hasMap: storeInfo.googleMapsUrl,
        sameAs: [storeInfo.googleProfileUrl, storeInfo.googleMapsUrl],
        address: {
          "@type": "PostalAddress",
          streetAddress: storeInfo.address,
          addressLocality: "Sharjah",
          addressCountry: "AE"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.0581701,
          longitude: 56.3549201
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: siteName,
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/products?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
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
