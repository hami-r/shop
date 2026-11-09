/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product photos never change at the same URL (each upload gets a new name),
    // so keep resized copies for a year instead of re-fetching from Supabase.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "res.cloudinary.com" }
    ]
  }
};

export default nextConfig;
