import type { CartItem, Product } from "@/lib/types";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "ar";
}

export function dirFor(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

/** "/products" → "/products" (en) or "/ar/products" (ar). English has no prefix. */
export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Removes a leading /en or /ar from a pathname. */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return stripped || "/";
}

export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-AE-u-nu-latn" : "en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2
  }).format(value);
}

const categoryNamesAr: Record<string, string> = {
  bukhoor: "بخور",
  oud: "عود",
  perfumes: "عطور",
  perfume: "عطور",
  cosmetics: "مستحضرات تجميل",
  "gift sets": "أطقم هدايا",
  "gift set": "أطقم هدايا",
  gifts: "هدايا"
};

export function categoryLabel(category: string | null | undefined, locale: Locale) {
  if (!category) return locale === "ar" ? "منتج" : "Shop item";
  if (locale === "en") return category;
  return categoryNamesAr[category.trim().toLowerCase()] ?? category;
}

export function productName(product: Pick<Product, "name" | "name_ar">, locale: Locale) {
  return locale === "ar" && product.name_ar ? product.name_ar : product.name;
}

export function productDescription(product: Pick<Product, "description" | "description_ar">, locale: Locale) {
  return locale === "ar" && product.description_ar ? product.description_ar : product.description;
}

export function cartItemName(item: Pick<CartItem, "name" | "name_ar">, locale: Locale) {
  return locale === "ar" && item.name_ar ? item.name_ar : item.name;
}

const en = {
  storeName: "Al Miaraj",
  address: "Hay Mogader, Sharjah, UAE",
  area: "Hay Mogader · Sharjah",
  announcement: "Pickup from our shop in Hay Mogader, Sharjah · WhatsApp us to check stock",
  nav: {
    home: "Home",
    shop: "Shop all",
    bukhoor: "Bukhoor",
    oud: "Oud",
    perfumes: "Perfumes",
    contact: "Visit us",
    menu: "Menu",
    closeMenu: "Close menu",
    openCart: "Open enquiry list",
    switchLanguage: "العربية",
    switchLanguageLabel: "Switch to Arabic"
  },
  home: {
    metaTitle: "Al Miaraj | Bukhoor, Oud & Perfumes in Sharjah",
    metaDescription:
      "Al Miaraj is a local shop in Hay Mogader, Sharjah for bukhoor, oud, perfumes, cosmetics and gift sets. Browse online, enquire on WhatsApp and pick up in store.",
    eyebrow: "Local fragrance shop · Sharjah",
    title: "Bukhoor, oud and perfume, chosen by hand in Sharjah.",
    lead: "Browse what is on our shelves, send us your list on WhatsApp, and collect it from the shop in Hay Mogader.",
    shopBukhoor: "Shop bukhoor",
    whatsappUs: "WhatsApp us",
    categoriesEyebrow: "Browse the shop",
    categoriesTitle: "What we carry",
    featuredEyebrow: "On the shelves now",
    featuredTitle: "Featured products",
    viewAll: "View all products",
    howEyebrow: "How it works",
    howTitle: "No checkout, no delivery fees. Just ask and pick up.",
    steps: [
      { title: "Choose", text: "Add the bukhoor, oud or perfumes you like to your enquiry list." },
      { title: "Send on WhatsApp", text: "We receive your list with names and quantities and confirm what is in stock." },
      { title: "Pick up in Sharjah", text: "Visit the shop in Hay Mogader, smell it in person and pay in store." }
    ],
    visitEyebrow: "Visit the shop",
    visitTitle: "Come and smell it in person.",
    visitText: "Call or WhatsApp before you visit and we will keep your items ready.",
    openMaps: "Open in Google Maps"
  },
  products: {
    metaTitle: "Shop Bukhoor, Oud & Perfumes in Sharjah | Al Miaraj",
    metaDescription:
      "Browse all Al Miaraj products — bukhoor, oud, perfumes, cosmetics and gift sets. Enquire on WhatsApp and pick up from our Sharjah shop.",
    eyebrow: "All products",
    title: "The shop",
    searchPlaceholder: "Search bukhoor, oud, perfume…",
    allCategories: "All",
    apply: "Search",
    empty: "No products found. Try another word or category.",
    count: (n: number) => `${n} ${n === 1 ? "product" : "products"}`
  },
  product: {
    addToList: "Add to enquiry list",
    added: "Added",
    inStock: (n: number) => `${n} in stock`,
    askAvailability: "Ask us about availability",
    pickup: "Pick up from our shop in Hay Mogader, Sharjah",
    whatsappNote: "Send your list on WhatsApp — no online payment needed",
    alsoLike: "You may also like",
    shopItem: "Shop item",
    metaTitle: (name: string, price: string) => `${name} – ${price} | Al Miaraj Sharjah`,
    metaDescription: (name: string, category: string) =>
      `Buy ${name}${category ? ` (${category})` : ""} at Al Miaraj, Hay Mogader, Sharjah. Enquire on WhatsApp, pick up in store.`,
    imageAlt: (name: string, category: string, index?: number) =>
      `${category && !name.toLowerCase().includes(category.toLowerCase()) ? `${name} – ${category}` : name} at Al Miaraj Sharjah${
        index && index > 1 ? ` (photo ${index})` : ""
      }`,
    showImage: (name: string, n: number) => `Show ${name} photo ${n}`,
    addAria: (name: string) => `Add ${name} to enquiry list`
  },
  category: {
    moreFrom: "More from Al Miaraj",
    comingSoon: (category: string) => `New ${category} is coming soon.`,
    askUs: "Ask us what is in the shop today.",
    metaTitle: (heading: string, category: string) => `${heading} – Buy ${category} | Al Miaraj`
  },
  breadcrumb: { home: "Home", products: "Products" },
  cart: {
    title: "Your enquiry list",
    drawerTitle: "Enquiry list",
    empty: "Your enquiry list is empty.",
    emptyHint: "Add products here, then send the list to us on WhatsApp.",
    total: "Estimated total",
    summary: "Summary",
    summaryText: "We will confirm stock and the final price on WhatsApp. Pay when you pick up.",
    send: "Send on WhatsApp",
    preparing: "Preparing…",
    viewList: "View enquiry list",
    remove: (name: string) => `Remove ${name}`,
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    closeOverlay: "Close enquiry list",
    error: "Could not prepare the WhatsApp message. Please try again.",
    metaTitle: "Your Enquiry List | Al Miaraj",
    browse: "Browse products"
  },
  checkout: {
    metaTitle: "Send Enquiry | Al Miaraj",
    title: "Send your enquiry",
    text: "We do not deliver at the moment. Send us your list on WhatsApp and collect it from the shop.",
    opening: "Opening WhatsApp",
    openingText: "Your message is ready with product names and quantities.",
    emptyTitle: "Your enquiry list is empty",
    emptyText: "Add products to your list before sending a message."
  },
  confirmation: {
    metaTitle: "Enquiry Sent | Al Miaraj",
    eyebrow: "Enquiry sent",
    title: "Thank you for contacting Al Miaraj.",
    text: (id: string) => `Your enquiry reference is ${id}. We will contact you soon.`
  },
  shared: {
    metaTitle: "Shared Enquiry | Al Miaraj",
    editable: "Editable enquiry",
    shared: "Shared enquiry",
    title: "Enquiry list",
    save: "Save changes",
    saving: "Saving…",
    saved: "Enquiry list updated.",
    saveError: "Could not update the enquiry list.",
    quantity: (n: number) => `Quantity: ${n}`,
    editNote: "Only this private link can change quantities.",
    viewNote: "This shared list is view-only."
  },
  contact: {
    metaTitle: "Visit Al Miaraj in Hay Mogader, Sharjah",
    metaDescription: "Find Al Miaraj in Hay Mogader, Sharjah. Call, WhatsApp or send a message before you visit the shop.",
    eyebrow: "Visit us",
    title: "Find the shop",
    text: "Call or WhatsApp before you visit so we can keep your items ready.",
    phone: "Phone",
    whatsapp: "WhatsApp",
    location: "Location",
    maps: "Open in Google Maps",
    mapTitle: "Map to Al Miaraj, Sharjah",
    formTitle: "Send us a message",
    name: "Name",
    email: "Email (optional)",
    phoneField: "Phone",
    message: "Message",
    sendMessage: "Send message",
    sent: "Message sent. We will reply soon.",
    sendError: "Could not send the message. Please try again.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email or leave it empty.",
      phone: "Please enter a valid UAE phone number.",
      message: "Please write at least 10 characters."
    }
  },
  notFound: {
    eyebrow: "Page not found",
    title: "We could not find that page.",
    text: "The product may have moved or is no longer available. Have a look at what is in the shop today.",
    browse: "Browse products",
    home: "Back to home"
  },
  footer: {
    about: "A local shop in Sharjah for bukhoor, oud, perfumes, cosmetics and gift sets. Enquire on WhatsApp, pick up in store.",
    shop: "Shop",
    help: "Help",
    contact: "Contact",
    enquiryList: "Enquiry list",
    visit: "Visit the shop",
    language: "Language",
    rights: "All rights reserved."
  },
  whatsapp: {
    chat: "Chat on WhatsApp",
    greeting: "Hello Al Miaraj, I would like to ask about:",
    cartLink: "My list:"
  }
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  storeName: "المعراج",
  address: "حي مغيدر، الشارقة، الإمارات",
  area: "حي مغيدر · الشارقة",
  announcement: "الاستلام من محلنا في حي مغيدر بالشارقة · راسلنا على واتساب للتأكد من التوفر",
  nav: {
    home: "الرئيسية",
    shop: "كل المنتجات",
    bukhoor: "بخور",
    oud: "عود",
    perfumes: "عطور",
    contact: "زورونا",
    menu: "القائمة",
    closeMenu: "إغلاق القائمة",
    openCart: "فتح قائمة الاستفسار",
    switchLanguage: "English",
    switchLanguageLabel: "التبديل إلى الإنجليزية"
  },
  home: {
    metaTitle: "المعراج | بخور وعود وعطور في الشارقة",
    metaDescription:
      "المعراج محل محلي في حي مغيدر بالشارقة للبخور والعود والعطور ومستحضرات التجميل وأطقم الهدايا. تصفّح المنتجات، استفسر عبر واتساب، واستلم من المحل.",
    eyebrow: "محل عطور وبخور · الشارقة",
    title: "بخور وعود وعطور، مختارة بعناية في الشارقة.",
    lead: "تصفّح ما لدينا في المحل، أرسل لنا قائمتك عبر واتساب، واستلمها من محلنا في حي مغيدر.",
    shopBukhoor: "تسوّق البخور",
    whatsappUs: "راسلنا على واتساب",
    categoriesEyebrow: "تصفّح المحل",
    categoriesTitle: "ماذا نقدّم",
    featuredEyebrow: "متوفر الآن",
    featuredTitle: "منتجات مختارة",
    viewAll: "عرض كل المنتجات",
    howEyebrow: "كيف تطلب",
    howTitle: "بدون دفع إلكتروني وبدون رسوم توصيل. فقط اسأل واستلم.",
    steps: [
      { title: "اختر", text: "أضف البخور أو العود أو العطور التي تعجبك إلى قائمة الاستفسار." },
      { title: "أرسل عبر واتساب", text: "تصلنا قائمتك بالأسماء والكميات ونؤكد لك المتوفر." },
      { title: "استلم في الشارقة", text: "زر المحل في حي مغيدر، جرّب الرائحة بنفسك وادفع في المحل." }
    ],
    visitEyebrow: "زورونا",
    visitTitle: "تعال وجرّب الرائحة بنفسك.",
    visitText: "اتصل أو راسلنا على واتساب قبل زيارتك وسنجهّز لك طلبك.",
    openMaps: "افتح في خرائط جوجل"
  },
  products: {
    metaTitle: "تسوّق البخور والعود والعطور في الشارقة | المعراج",
    metaDescription:
      "تصفّح كل منتجات المعراج — بخور، عود، عطور، مستحضرات تجميل وأطقم هدايا. استفسر عبر واتساب واستلم من محلنا في الشارقة.",
    eyebrow: "كل المنتجات",
    title: "المحل",
    searchPlaceholder: "ابحث عن بخور، عود، عطر…",
    allCategories: "الكل",
    apply: "بحث",
    empty: "لا توجد منتجات مطابقة. جرّب كلمة أو فئة أخرى.",
    count: (n: number) => `${n} ${n === 1 ? "منتج" : "منتجات"}`
  },
  product: {
    addToList: "أضف إلى قائمة الاستفسار",
    added: "تمت الإضافة",
    inStock: (n: number) => `متوفر: ${n}`,
    askAvailability: "اسألنا عن التوفر",
    pickup: "الاستلام من محلنا في حي مغيدر، الشارقة",
    whatsappNote: "أرسل قائمتك عبر واتساب — لا حاجة للدفع الإلكتروني",
    alsoLike: "قد يعجبك أيضاً",
    shopItem: "منتج",
    metaTitle: (name: string, price: string) => `${name} – ${price} | المعراج الشارقة`,
    metaDescription: (name: string, category: string) =>
      `اشترِ ${name}${category ? ` (${category})` : ""} من المعراج، حي مغيدر، الشارقة. استفسر عبر واتساب واستلم من المحل.`,
    imageAlt: (name: string, category: string, index?: number) =>
      `${category && !name.includes(category) ? `${name} – ${category}` : name} من المعراج الشارقة${index && index > 1 ? ` (صورة ${index})` : ""}`,
    showImage: (name: string, n: number) => `عرض صورة ${n} من ${name}`,
    addAria: (name: string) => `أضف ${name} إلى قائمة الاستفسار`
  },
  category: {
    moreFrom: "المزيد من المعراج",
    comingSoon: (category: string) => `منتجات ${category} جديدة قريباً.`,
    askUs: "اسألنا عن المتوفر في المحل اليوم.",
    metaTitle: (heading: string, category: string) => `${heading} – اشترِ ${category} | المعراج`
  },
  breadcrumb: { home: "الرئيسية", products: "المنتجات" },
  cart: {
    title: "قائمة الاستفسار",
    drawerTitle: "قائمة الاستفسار",
    empty: "قائمة الاستفسار فارغة.",
    emptyHint: "أضف المنتجات هنا، ثم أرسل القائمة إلينا عبر واتساب.",
    total: "المجموع التقريبي",
    summary: "الملخص",
    summaryText: "سنؤكد لك التوفر والسعر النهائي عبر واتساب. الدفع عند الاستلام.",
    send: "أرسل عبر واتساب",
    preparing: "جارٍ التحضير…",
    viewList: "عرض قائمة الاستفسار",
    remove: (name: string) => `إزالة ${name}`,
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    closeOverlay: "إغلاق قائمة الاستفسار",
    error: "تعذّر تجهيز رسالة واتساب. حاول مرة أخرى.",
    metaTitle: "قائمة الاستفسار | المعراج",
    browse: "تصفّح المنتجات"
  },
  checkout: {
    metaTitle: "إرسال الاستفسار | المعراج",
    title: "أرسل استفسارك",
    text: "لا نوفر التوصيل حالياً. أرسل لنا قائمتك عبر واتساب واستلمها من المحل.",
    opening: "جارٍ فتح واتساب",
    openingText: "رسالتك جاهزة بأسماء المنتجات والكميات.",
    emptyTitle: "قائمة الاستفسار فارغة",
    emptyText: "أضف منتجات إلى قائمتك قبل إرسال الرسالة."
  },
  confirmation: {
    metaTitle: "تم إرسال الاستفسار | المعراج",
    eyebrow: "تم الإرسال",
    title: "شكراً لتواصلك مع المعراج.",
    text: (id: string) => `رقم استفسارك هو ${id}. سنتواصل معك قريباً.`
  },
  shared: {
    metaTitle: "استفسار مشترك | المعراج",
    editable: "استفسار قابل للتعديل",
    shared: "استفسار مشترك",
    title: "قائمة الاستفسار",
    save: "حفظ التغييرات",
    saving: "جارٍ الحفظ…",
    saved: "تم تحديث القائمة.",
    saveError: "تعذّر تحديث القائمة.",
    quantity: (n: number) => `الكمية: ${n}`,
    editNote: "هذا الرابط الخاص فقط يمكنه تعديل الكميات.",
    viewNote: "هذه القائمة المشتركة للعرض فقط."
  },
  contact: {
    metaTitle: "زوروا المعراج في حي مغيدر، الشارقة",
    metaDescription: "موقع محل المعراج في حي مغيدر بالشارقة. اتصل أو راسلنا على واتساب أو أرسل رسالة قبل زيارتك.",
    eyebrow: "زورونا",
    title: "موقع المحل",
    text: "اتصل أو راسلنا على واتساب قبل زيارتك لنجهّز لك طلبك.",
    phone: "الهاتف",
    whatsapp: "واتساب",
    location: "الموقع",
    maps: "افتح في خرائط جوجل",
    mapTitle: "خريطة محل المعراج، الشارقة",
    formTitle: "أرسل لنا رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني (اختياري)",
    phoneField: "رقم الهاتف",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    sent: "تم إرسال رسالتك. سنرد عليك قريباً.",
    sendError: "تعذّر إرسال الرسالة. حاول مرة أخرى.",
    errors: {
      name: "يرجى كتابة اسمك.",
      email: "يرجى إدخال بريد إلكتروني صحيح أو تركه فارغاً.",
      phone: "يرجى إدخال رقم هاتف إماراتي صحيح.",
      message: "يرجى كتابة 10 أحرف على الأقل."
    }
  },
  notFound: {
    eyebrow: "الصفحة غير موجودة",
    title: "لم نتمكن من العثور على هذه الصفحة.",
    text: "ربما نُقل المنتج أو لم يعد متوفراً. تصفّح المتوفر في المحل اليوم.",
    browse: "تصفّح المنتجات",
    home: "العودة للرئيسية"
  },
  footer: {
    about: "محل محلي في الشارقة للبخور والعود والعطور ومستحضرات التجميل وأطقم الهدايا. استفسر عبر واتساب واستلم من المحل.",
    shop: "المحل",
    help: "مساعدة",
    contact: "تواصل معنا",
    enquiryList: "قائمة الاستفسار",
    visit: "زورونا",
    language: "اللغة",
    rights: "جميع الحقوق محفوظة."
  },
  whatsapp: {
    chat: "تواصل عبر واتساب",
    greeting: "مرحباً المعراج، أود الاستفسار عن:",
    cartLink: "قائمتي:"
  }
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
