import { useEffect, useState } from "react";
import { stats } from "../data/profile";
import { useMode } from "../hooks/useMode";

function Counter({ value, suffix = "", text, go }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!go || text) return undefined;
    const reduced =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(value);
      return undefined;
    }
    const start = performance.now();
    const dur = 1150;
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go, value, text]);

  if (text) return <>{text}</>;
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function Stats({ shown }) {
  const { tech } = useMode();
  return (
    <div className={`stats rv${shown ? " in" : ""}`}>
      {stats.map((s, i) => (
        <div className="stat" key={i}>
          <div className="n">
            <Counter value={s.value} suffix={s.suffix} text={s.text} go={shown} />
          </div>
          <div className="l">{tech ? s.tech : s.simple}</div>
        </div>
      ))}
    </div>
  );
}
