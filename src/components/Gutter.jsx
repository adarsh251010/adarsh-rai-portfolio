import { useEffect, useRef, useState } from "react";

const LINE = 26; // px per gutter line — matches the card's text rhythm

/**
 * Line numbers down the left edge of a card, sized to the card's real height.
 * The previous version hardcoded 24 numbers in CSS, so they ran out on long
 * cards and drifted out of step with the text.
 */
export default function Gutter() {
  const ref = useRef(null);
  const [count, setCount] = useState(12);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return undefined;

    const measure = () => setCount(Math.max(4, Math.floor(parent.offsetHeight / LINE)));
    measure();

    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="gutter" ref={ref} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
  );
}
