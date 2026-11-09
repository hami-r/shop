"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]";

/**
 * Elements marked with data-reveal fade up as they scroll into view.
 *
 * Safety rules, so content can never get stuck invisible:
 * - an element is only hidden (class "reveal-pending") once it is actually being watched;
 * - anything already on screen is shown immediately;
 * - content added later (page navigation, streaming, loading skeletons swapping out)
 *   is picked up by a MutationObserver;
 * - "reduce motion" or no IntersectionObserver → everything is simply shown.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // No motion wanted, no observer support, or no real viewport (some previews/renderers): just show it all.
    if (reduce || !("IntersectionObserver" in window) || window.innerHeight === 0) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const show = (el: Element) => {
      el.classList.remove("reveal-pending");
      el.classList.add("is-visible");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px", threshold: 0 }
    );

    const register = (el: Element) => {
      if (el.classList.contains("is-visible") || el.classList.contains("reveal-pending")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show(el); // already on screen: no hiding, no flash
        return;
      }
      el.classList.add("reveal-pending");
      io.observe(el);
    };

    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.matches(SELECTOR)) register(root);
      root.querySelectorAll?.(SELECTOR).forEach(register);
    };

    scan(document);

    // New content (after navigation) is checked once layout has settled, so sections
    // that are actually on screen are never hidden by mistake.
    let queued: Element[] = [];
    let frame = 0;
    const flush = () => {
      frame = 0;
      const nodes = queued;
      queued = [];
      nodes.forEach((node) => node.isConnected && scan(node));
    };
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => node instanceof Element && queued.push(node)));
      if (queued.length && !frame) frame = requestAnimationFrame(() => (frame = requestAnimationFrame(flush)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
