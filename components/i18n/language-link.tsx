"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startRouteProgress } from "@/components/motion/route-progress";

/**
 * Switches language with a short fade: the page fades to cream, the new language
 * (and reading direction) loads, then it fades back in — no sudden left/right flip.
 */
export function LanguageLink({ href, locale, className, children, ...rest }: React.ComponentProps<typeof Link> & { href: string; locale: string }) {
  const router = useRouter();

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }
    document.documentElement.classList.add("page-leaving");
    startRouteProgress();
    window.setTimeout(() => router.push(href), 220);
  }

  return (
    <Link {...rest} href={href} hrefLang={locale} lang={locale} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
