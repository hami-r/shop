function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Hand-written intro copy for category landing pages. Unknown categories get a generic intro. */
const categoryCopy: Record<string, { heading: string; intro: string; keywords: string }> = {
  bukhoor: {
    heading: "Bukhoor in Sharjah",
    intro:
      "Shop Bukhoor at Al Miaraj in Hay Mogader, Sharjah. Fragrant bakhoor chips and blends for the home, majlis and special occasions — send us a WhatsApp enquiry and pick up from the shop.",
    keywords: "bukhoor Sharjah, bakhoor UAE, buy bukhoor, bukhoor shop near me"
  },
  oud: {
    heading: "Oud in Sharjah",
    intro:
      "Oud wood, oud oils and oud blends from Al Miaraj, a local fragrance shop in Hay Mogader, Sharjah. Ask about availability on WhatsApp and collect in store.",
    keywords: "oud Sharjah, oud oil UAE, oud wood, buy oud"
  },
  perfumes: {
    heading: "Perfumes in Sharjah",
    intro:
      "Arabic and oriental perfumes from Al Miaraj in Sharjah — attar, perfume oils and sprays. Message us on WhatsApp to check stock and visit the shop for pickup.",
    keywords: "perfume shop Sharjah, Arabic perfume UAE, attar Sharjah"
  },
  cosmetics: {
    heading: "Cosmetics in Sharjah",
    intro: "Everyday cosmetics and beauty items available at Al Miaraj, Hay Mogader, Sharjah. Enquire on WhatsApp and pick up from the shop.",
    keywords: "cosmetics Sharjah, beauty shop Sharjah"
  },
  "gift-sets": {
    heading: "Fragrance Gift Sets in Sharjah",
    intro:
      "Bukhoor, oud and perfume gift sets from Al Miaraj in Sharjah — ready for Eid, Ramadan, weddings and visits. Ask us on WhatsApp and collect from the shop.",
    keywords: "perfume gift set Sharjah, bukhoor gift set UAE, Eid gifts Sharjah"
  }
};

export function categorySlug(category: string) {
  return slugify(category);
}

export function categoryPath(category: string) {
  return `/shop/${categorySlug(category)}`;
}

export function getCategoryCopy(category: string) {
  return (
    categoryCopy[categorySlug(category)] ?? {
      heading: `${category} in Sharjah`,
      intro: `Shop ${category} at Al Miaraj in Hay Mogader, Sharjah. Send an enquiry on WhatsApp and pick up from the shop.`,
      keywords: `${category} Sharjah, ${category} UAE`
    }
  );
}

/** Descriptive alt text for product photos (helps Google Images). */
export function productImageAlt(name: string, category?: string | null, index?: number) {
  const base = category && !name.toLowerCase().includes(category.toLowerCase()) ? `${name} – ${category}` : name;
  return `${base} at Al Miaraj Sharjah${index && index > 1 ? ` (photo ${index})` : ""}`;
}

export function toAbsoluteUrl(url: string, baseUrl: string) {
  return url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function truncate(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
