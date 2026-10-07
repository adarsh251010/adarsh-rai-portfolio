import { useEffect, useRef, useState } from "react";

const LINES = [
  ["dim", "adarshOS 2.1.0 — booting career/"],
  ["", ""],
  ["ok", "mount  /career ............................ ok"],
  ["ok", "load   java21 · spring-boot-3.3 .......... ok"],
  ["ok", "load   aws · dynamodb · s3 · redis ....... ok"],
  ["ok", "load   openfeign · 20 integrations ....... ok"],
  ["warn", "load   langgraph · agents ............ queued"],
  ["", ""],
  ["ok", "15+ products migrated · 0 regressions"],
  ["white", "login: adarsh — welcome."],
];

const KEY = "ar.booted";

/**
 * A two-second cold boot before the page appears. Shown once per browser
 * session, skippable with any key or click — a first impression, not a toll gate.
 */
export default function BootIntro() {
  const [active, setActive] = useState(() => {
    try {
      if (sessionStorage.getItem(KEY)) return false;
    } catch {
      /* private mode — just show it */
    }
    return !(
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) return undefined;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      setLeaving(true);
      setTimeout(() => setActive(false), 420);
    };

    document.body.style.overflow = "hidden";

    let i = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i >= LINES.length) {
        setTimeout(finish, 420);
        return;
      }
      timer = setTimeout(tick, LINES[i - 1][1] === "" ? 45 : 130);
    };
    let timer = setTimeout(tick, 160);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("mousedown", skip);
    window.addEventListener("touchstart", skip);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", skip);
      window.removeEventListener("mousedown", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className={`boot${leaving ? " out" : ""}`} aria-hidden="true">
      <div className="boot-inner">
        {LINES.slice(0, count).map(([kind, text], i) => (
          <div className={`boot-l ${kind}`} key={i}>
            {text || " "}
          </div>
        ))}
      </div>
      <div className="boot-skip">press any key to skip</div>
    </div>
  );
}
