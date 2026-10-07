import { useRef } from "react";

/**
 * Wraps a control so it drifts toward the cursor as the pointer gets close —
 * subtle, but it makes buttons feel physical instead of painted on.
 */
export default function Magnetic({ children, strength = 0.32 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span className="magnetic" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}
