export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // Netlify automatically sets URL to the primary site URL
  if (process.env.URL) {
    return process.env.URL.replace(/\/$/, "");
  }
  return "https://almiaraj-shop.netlify.app";
}
