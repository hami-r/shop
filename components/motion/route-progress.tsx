"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const ROUTE_START_EVENT = "almiaraj:route-start";

/** Call before a programmatic navigation (router.push) to show the progress bar. */
export function startRouteProgress() {
  window.dispatchEvent(new Event(ROUTE_START_EVENT));
}

function isInternalNavigation(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  // Same page (or only a #hash change): nothing to wait for.
  return url.pathname !== window.location.pathname || url.search !== window.location.search;
}

/**
 * Thin bar at the top of the page that starts the moment a link is clicked or a
 * search is submitted, and finishes when the new page is on screen.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();
  const safety = useRef<number>();

  const start = useCallback(() => {
    window.clearInterval(timer.current);
    window.clearTimeout(safety.current);
    setVisible(true);
    setProgress(8);
    // Ease towards 90% while waiting; the last 10% happens when the page arrives.
    timer.current = window.setInterval(() => setProgress((value) => (value < 90 ? value + (90 - value) * 0.08 : value)), 120);
    safety.current = window.setTimeout(() => done(), 12000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = useCallback(() => {
    window.clearInterval(timer.current);
    window.clearTimeout(safety.current);
    setProgress(100);
    window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => setProgress(0), 250);
    }, 220);
    document.documentElement.classList.remove("page-leaving");
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (anchor && isInternalNavigation(anchor, event)) start();
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      if ((form.method || "get").toLowerCase() === "get" && !event.defaultPrevented) start();
    };
    window.addEventListener("click", onClick, true);
    window.addEventListener("submit", onSubmit);
    window.addEventListener(ROUTE_START_EVENT, start);
    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("submit", onSubmit);
      window.removeEventListener(ROUTE_START_EVENT, start);
    };
  }, [start]);

  // The URL changed: the new page is rendered.
  useEffect(() => {
    done();
  }, [pathname, searchParams, done]);

  return (
    <div aria-hidden className="route-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px]">
      <div
        className="h-full origin-left bg-gold transition-[transform,opacity] duration-300 ease-calm rtl:origin-right"
        style={{ transform: `scaleX(${progress / 100})`, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
