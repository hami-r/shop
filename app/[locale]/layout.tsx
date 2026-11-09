import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { RouteProgress } from "@/components/motion/route-progress";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { CartDrawer } from "@/components/store/cart-drawer";
import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { WhatsAppButton } from "@/components/store/whatsapp-button";
import { fontVariables } from "@/lib/fonts";
import { dirFor, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { storeInfo } from "@/lib/sample-data";
import { alternatesFor } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const t = getDictionary(locale);
  const baseUrl = getBaseUrl();
  const ogImage = `${baseUrl}/og`;

  return {
    metadataBase: new URL(baseUrl),
    title: { default: t.home.metaTitle, template: `%s | ${t.storeName}` },
    description: t.home.metaDescription,
    alternates: alternatesFor(locale, "/", baseUrl),
    openGraph: {
      title: t.home.metaTitle,
      description: t.home.metaDescription,
      url: alternatesFor(locale, "/", baseUrl).canonical,
      siteName: t.storeName,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      alternateLocale: locale === "ar" ? ["en_AE"] : ["ar_AE"],
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: t.home.metaTitle }]
    },
    twitter: { card: "summary_large_image", title: t.home.metaTitle, description: t.home.metaDescription, images: [ogImage] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    },
    verification: { google: "0d5PVGbkWY-hwQZ6NAU8WwyGwOaMgdruOY1_Yx3LZrI" }
  };
}

export default function StoreLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const t = getDictionary(locale);
  const baseUrl = getBaseUrl();
  const homeUrl = alternatesFor(locale, "/", baseUrl).canonical;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": `${baseUrl}/#localbusiness`,
        name: storeInfo.name,
        alternateName: "المعراج",
        description: t.home.metaDescription,
        url: baseUrl,
        image: `${baseUrl}/og`,
        telephone: storeInfo.phone,
        email: storeInfo.email,
        priceRange: "AED 50 - AED 1000",
        currenciesAccepted: "AED",
        paymentAccepted: "Cash, Credit Card",
        hasMap: storeInfo.googleMapsUrl,
        sameAs: [storeInfo.googleProfileUrl, storeInfo.googleMapsUrl, storeInfo.instagramUrl],
        areaServed: ["Sharjah", "Dubai", "Ajman", "United Arab Emirates"],
        knowsLanguage: ["en", "ar"],
        address: {
          "@type": "PostalAddress",
          streetAddress: t.address,
          addressLocality: locale === "ar" ? "الشارقة" : "Sharjah",
          addressCountry: "AE"
        },
        geo: { "@type": "GeoCoordinates", latitude: 25.0581701, longitude: 56.3549201 }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        name: t.storeName,
        url: homeUrl,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${homeUrl.replace(/\/$/, "")}/products?q={search_term_string}` },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang={locale} dir={dirFor(locale)} className={fontVariables}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LocaleProvider locale={locale}>
          <div className="page-shell">
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
          </div>
          <CartDrawer />
          <WhatsAppButton />
          <RevealObserver />
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
        </LocaleProvider>
      </body>
    </html>
  );
}
