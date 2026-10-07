import { useEffect, useRef, useState } from "react";

const reducedMotion = () =>
  typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reports when an element is in view.
 *
 * `repeat: true` keeps watching, so the element re-animates every time it comes
 * back — that is what stops long pages feeling like a static document.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const {
    threshold = 0.14,
    rootMargin = "0px 0px -60px 0px",
    repeat = false,
    once = !repeat,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, shown];
}

/**
 * Spreads the fade-up state onto an element while PRESERVING its own classes.
 * Always pass the element's base class here rather than as a separate
 * `className`, or the spread silently wins and the styling disappears.
 */
export function revealProps(shown, delay = 0, base = "") {
  return {
    className: `${base} rv${shown ? " in" : ""}`.trim(),
    style: delay ? { transitionDelay: `${delay}s` } : undefined,
  };
}

/**
 * Normalised scroll position of an element through the viewport: 0 as it enters
 * from the bottom, 1 as it leaves past the top. Used for scroll-linked motion.
 */
export function useScrollParallax(strength = 1) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = (vh - r.top) / (vh + r.height); // 0 → 1
      setOffset((Math.min(1, Math.max(0, progress)) - 0.5) * 2 * strength);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return [ref, offset];
}
