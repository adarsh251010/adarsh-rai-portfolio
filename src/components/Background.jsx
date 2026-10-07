import { useEffect, useRef } from "react";

/**
 * Ambient constellation + cursor spotlight.
 * Purely decorative: the page reads identically with this removed, and it
 * disables itself for visitors who prefer reduced motion.
 */
export default function Background() {
  const canvasRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spot = spotRef.current;
    if (!canvas) return undefined;

    const reduced =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let points = [];
    let raf = 0;

    // target vs eased cursor position
    let tx = -1e4;
    let ty = -1e4;
    let mx = -1e4;
    let my = -1e4;

    // scroll drives a slow vertical drift so the field never feels pinned
    let scrollTarget = 0;
    let scrollEased = 0;

    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(110, Math.round((w * h) / 14000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.6 + 0.7,
        d: Math.random() * 0.55 + 0.45,
      }));
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onScroll = () => {
      scrollTarget = window.scrollY * 0.06;
    };

    const frame = () => {
      mx += (tx - mx) * 0.12;
      my += (ty - my) * 0.12;
      scrollEased += (scrollTarget - scrollEased) * 0.08;
      if (spot) {
        spot.style.left = `${mx}px`;
        spot.style.top = `${my}px`;
      }

      ctx.clearRect(0, 0, w, h);

      // on-screen y for a point, wrapped so the field scrolls forever
      const span = h + 60;
      const py = (p) => {
        let y = (p.y - scrollEased) % span;
        if (y < -30) y += span;
        return y;
      };

      for (const p of points) {
        // gentle repulsion makes the field feel alive under the cursor
        const dx = p.x - mx;
        const dy = py(p) - my;
        const d = Math.hypot(dx, dy);
        if (d < 160 && d > 0.1) {
          const f = (1 - d / 160) * 0.55;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const ay = py(a);
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const by = py(b);
          const dx = a.x - b.x;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;
          if (d2 < 20000) {
            ctx.strokeStyle = `rgba(167,139,250,${(1 - d2 / 20000) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const y = py(p);
        const near = Math.hypot(mx - p.x, my - y);
        const boost = near < 170 ? 1 - near / 170 : 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${(167 + boost * 60) | 0},${(139 + boost * 72) | 0},250,${(
          p.d * 0.5 +
          boost * 0.5
        ).toFixed(3)})`;
        ctx.shadowBlur = boost * 16;
        ctx.shadowColor = "#a78bfa";
        ctx.arc(p.x, y, p.r * (1 + boost), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    size();
    window.addEventListener("resize", size);

    if (reduced) {
      // draw one still frame, no loop, no cursor tracking
      mx = -1e4;
      my = -1e4;
      frame();
      cancelAnimationFrame(raf);
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
      <div className="veil" aria-hidden="true" />
      <div ref={spotRef} className="spot" aria-hidden="true" />
    </>
  );
}
