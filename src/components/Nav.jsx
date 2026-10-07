import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useMode } from "../hooks/useMode";

export default function Nav({ onOpenTerminal }) {
  const { tech, setTech } = useMode();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`topbar${stuck ? " stuck" : ""}`}>
      <a className="nlogo" href="#top">
        <i className="pulse" aria-hidden="true" />
        {profile.name}
      </a>

      <span className="nsp" />

      <button className="kbtn" onClick={onOpenTerminal} aria-label="Open terminal">
        <span className="klabel">terminal</span>
        <kbd>`</kbd>
      </button>

      <div className="mode">
        <span className="lab">explain for:</span>
        <div className="switch" role="group" aria-label="Explanation depth">
          <button
            className={tech ? "" : "on"}
            onClick={() => setTech(false)}
            aria-pressed={!tech}
          >
            Recruiter
          </button>
          <button className={tech ? "on" : ""} onClick={() => setTech(true)} aria-pressed={tech}>
            Engineer
          </button>
        </div>
      </div>
    </nav>
  );
}
