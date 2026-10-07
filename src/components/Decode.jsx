import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/";

/**
 * Scrambles a heading, then resolves it left to right.
 *
 * It owns its own observer and keeps watching, so the effect replays every time
 * the heading scrolls back into view rather than firing once and going dead.
 */
export default function Decode({ text }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setOut(text);
      return undefined;
    }

    let interval = 0;

    const play = () => {
      clearInterval(interval);
      let settled = 0;
      interval = setInterval(() => {
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < settled) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );
        settled += 0.6;
        if (settled >= text.length) {
          clearInterval(interval);
          setOut(text);
        }
      }, 32);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) play();
        });
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => {
      clearInterval(interval);
      io.disconnect();
    };
  }, [text]);

  return <span ref={ref}>{out}</span>;
}
