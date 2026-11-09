import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options: CookieOptions };

function isAdminEmail(email: string | undefined | null) {
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && allowed.includes(email.toLowerCase()));
}

async function handleAdmin(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = request.nextUrl.pathname === "/admin/login";

  let email: string | undefined;
  if (url && anonKey) {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list: CookieToSet[]) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    });
    const { data } = await supabase.auth.getUser();
    email = data.user?.email;
  }

  if (!isLogin && !isAdminEmail(email)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

// Paths served outside the language folders (API, metadata files, generated images).
const passthrough = /^\/(api|_next|og|icon|apple-icon|sitemap\.xml|robots\.txt|manifest\.webmanifest|llms\.txt|favicon\.ico)(\/|$)/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return handleAdmin(request);
  if (passthrough.test(pathname) || /\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  // English lives at the root. /en/... is redirected so there is only one URL per page.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return NextResponse.next();

  // Everything else is English: serve it from the /en folder without changing the URL.
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
