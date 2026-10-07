import { useEffect, useState } from "react";
import { track, trackProgress } from "../data/learning";
import { education } from "../data/experience";
import { useMode, Html } from "../hooks/useMode";
import { useReveal, revealProps } from "../hooks/useReveal";
import TiltCard from "./TiltCard";
import Decode from "./Decode";

export default function Learning() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();
  const [width, setWidth] = useState(0);
  const progress = trackProgress();

  useEffect(() => {
    if (!shown) return undefined;
    const t = setTimeout(() => setWidth(progress.pct), 120);
    return () => clearTimeout(t);
  }, [shown, progress.pct]);

  return (
    <section id="learning" ref={ref}>
      {tech && <div className="crumb">src/now_building/insurance-copilot.py</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>05 — Right now</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text="What I'm learning" />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? "Transitioning to Backend Engineer (GenAI) through a 12-week track built around one shipped product rather than tutorials."
          : "I'm moving into AI engineering. Rather than collecting course certificates, I'm building one real product and shipping a piece of it every week."}
      </p>

      <div {...revealProps(shown, 0.18, "track")}>
        <div className="tr-h">
          <h3>{track.name}</h3>
          <span className="wk">{progress.label}</span>
        </div>

        <Html as="p" className="tr-body" html={tech ? track.summary.tech : track.summary.simple} />

        <div className="tr-bar">
          <div className="tr-fill" style={{ width: `${width}%` }} />
        </div>
        <div className="tr-sub">{progress.sub}</div>

        <div className="wks">
          {track.weeks.map((w, i) => {
            const n = i + 1;
            const state =
              progress.started && n < progress.week
                ? "done"
                : progress.started && n === progress.week
                  ? "now"
                  : "";
            return (
              <div className={`wk-i ${state}`.trim()} key={w}>
                <i aria-hidden="true">{state === "done" ? "✓" : state === "now" ? "▸" : "·"}</i>
                {w}
              </div>
            );
          })}
        </div>
      </div>

      <div className="cards" style={{ marginTop: 16 }}>
        <TiltCard {...revealProps(shown, 0.24)}>
          <h3>Education</h3>
          {education.map((e) => (
            <p key={e.degree} style={{ marginBottom: 10 }}>
              <b style={{ color: "var(--fg)" }}>{e.degree}</b>
              <br />
              {e.school} · {e.year}
            </p>
          ))}
        </TiltCard>

        <TiltCard {...revealProps(shown, 0.3)}>
          <h3>{tech ? "Positioning" : "Why AI, why now"}</h3>
          <Html as="p" html={tech ? track.why.tech : track.why.simple} />
        </TiltCard>
      </div>
    </section>
  );
}
