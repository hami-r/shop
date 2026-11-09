import { categoryLabel, localePath, type Locale } from "@/lib/i18n";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CategoryCopy = { heading: string; intro: string; keywords: string };

/** Hand-written intro copy for category landing pages, in both languages. */
const categoryCopy: Record<string, Record<Locale, CategoryCopy>> = {
  bukhoor: {
    en: {
      heading: "Bukhoor in Sharjah",
      intro:
        "Shop bukhoor at Al Miaraj in Hay Mogader, Sharjah. Fragrant bakhoor chips and blends for the home, majlis and special occasions — send us a WhatsApp enquiry and pick up from the shop.",
      keywords: "bukhoor Sharjah, bakhoor UAE, buy bukhoor, bukhoor shop near me"
    },
    ar: {
      heading: "بخور في الشارقة",
      intro:
        "تسوّق البخور من محل المعراج في حي مغيدر بالشارقة. بخور برائحة فاخرة للبيت والمجلس والمناسبات — أرسل لنا استفسارك عبر واتساب واستلم طلبك من المحل.",
      keywords: "بخور الشارقة, بخور الإمارات, شراء بخور, محل بخور قريب مني, بخور"
    }
  },
  oud: {
    en: {
      heading: "Oud in Sharjah",
      intro:
        "Oud wood, oud oils and oud blends from Al Miaraj, a local fragrance shop in Hay Mogader, Sharjah. Ask about availability on WhatsApp and collect in store.",
      keywords: "oud Sharjah, oud oil UAE, oud wood, buy oud"
    },
    ar: {
      heading: "عود في الشارقة",
      intro:
        "خشب العود ودهن العود وخلطات العود من محل المعراج في حي مغيدر بالشارقة. اسأل عن التوفر عبر واتساب واستلم من المحل.",
      keywords: "عود الشارقة, دهن عود, خشب عود, شراء عود, عود"
    }
  },
  perfumes: {
    en: {
      heading: "Perfumes in Sharjah",
      intro:
        "Arabic and oriental perfumes from Al Miaraj in Sharjah — attar, perfume oils and sprays. Message us on WhatsApp to check stock and visit the shop for pickup.",
      keywords: "perfume shop Sharjah, Arabic perfume UAE, attar Sharjah"
    },
    ar: {
      heading: "عطور في الشارقة",
      intro:
        "عطور عربية وشرقية من المعراج في الشارقة — دهن عطر وعطور بخاخ. راسلنا على واتساب لمعرفة المتوفر وزرنا في المحل للاستلام.",
      keywords: "محل عطور الشارقة, عطور عربية, دهن عطر, عطور"
    }
  },
  cosmetics: {
    en: {
      heading: "Cosmetics in Sharjah",
      intro: "Everyday cosmetics and beauty items available at Al Miaraj, Hay Mogader, Sharjah. Enquire on WhatsApp and pick up from the shop.",
      keywords: "cosmetics Sharjah, beauty shop Sharjah"
    },
    ar: {
      heading: "مستحضرات تجميل في الشارقة",
      intro: "مستحضرات تجميل ومنتجات عناية يومية متوفرة في المعراج، حي مغيدر، الشارقة. استفسر عبر واتساب واستلم من المحل.",
      keywords: "مستحضرات تجميل الشارقة, محل تجميل الشارقة"
    }
  },
  "gift-sets": {
    en: {
      heading: "Fragrance Gift Sets in Sharjah",
      intro:
        "Bukhoor, oud and perfume gift sets from Al Miaraj in Sharjah — ready for Eid, Ramadan, weddings and visits. Ask us on WhatsApp and collect from the shop.",
      keywords: "perfume gift set Sharjah, bukhoor gift set UAE, Eid gifts Sharjah"
    },
    ar: {
      heading: "أطقم هدايا عطور في الشارقة",
      intro:
        "أطقم هدايا من البخور والعود والعطور من المعراج في الشارقة — جاهزة للعيد ورمضان والأعراس والزيارات. اسألنا على واتساب واستلم من المحل.",
      keywords: "طقم هدايا عطور الشارقة, هدايا بخور, هدايا العيد الشارقة"
    }
  }
};

export function categorySlug(category: string) {
  return slugify(category);
}

export function categoryPath(category: string, locale: Locale = "en") {
  return localePath(locale, `/shop/${categorySlug(category)}`);
}

export function getCategoryCopy(category: string, locale: Locale = "en"): CategoryCopy {
  const known = categoryCopy[categorySlug(category)]?.[locale];
  if (known) return known;
  const label = categoryLabel(category, locale);
  return locale === "ar"
    ? {
        heading: `${label} في الشارقة`,
        intro: `تسوّق ${label} من المعراج في حي مغيدر بالشارقة. أرسل استفسارك عبر واتساب واستلم من المحل.`,
        keywords: `${label} الشارقة, ${label} الإمارات`
      }
    : {
        heading: `${category} in Sharjah`,
        intro: `Shop ${category} at Al Miaraj in Hay Mogader, Sharjah. Send an enquiry on WhatsApp and pick up from the shop.`,
        keywords: `${category} Sharjah, ${category} UAE`
      };
}

export function toAbsoluteUrl(url: string, baseUrl: string) {
  return url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function truncate(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

/**
 * canonical + hreflang links for a page that exists in both languages.
 * `path` is the English path, e.g. "/products/oud-chips".
 */
export function alternatesFor(locale: Locale, path: string, baseUrl: string) {
  const en = `${baseUrl}${localePath("en", path)}`;
  const ar = `${baseUrl}${localePath("ar", path)}`;
  return {
    canonical: locale === "ar" ? ar : en,
    languages: { en, ar, "x-default": en }
  };
}
