import { useRef } from "react";

/**
 * A card that tilts in 3D under the cursor.
 * `parallax` nudges it vertically as the page scrolls, so a row of cards drifts
 * apart slightly instead of moving as one rigid block.
 */
export default function TiltCard({ children, className = "", style, parallax = 0, ...rest }) {
  const ref = useRef(null);
  const hoveringRef = useRef(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    hoveringRef.current = true;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${
      (x - 0.5) * 9
    }deg) translateY(-4px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    hoveringRef.current = false;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={`card ${className}`.trim()}
      style={{ ...style, "--plx": `${parallax}px` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
