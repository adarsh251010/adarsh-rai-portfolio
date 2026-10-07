import { whatIDo } from "../data/profile";
import { useMode } from "../hooks/useMode";
import { useReveal, revealProps, useScrollParallax } from "../hooks/useReveal";
import TiltCard from "./TiltCard";
import Decode from "./Decode";

export default function WhatIDo() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();
  const [plxRef, offset] = useScrollParallax(18);

  return (
    <section id="do" ref={ref}>
      {tech && <div className="crumb">src/career/responsibilities.md</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>01 — What I actually do</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text={tech ? "Core responsibilities" : "Three things, explained simply"} />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? "Day-to-day ownership across a live insurance onboarding platform."
          : "No jargon. This is the whole job in three sentences."}
      </p>

      <div className="cards" ref={plxRef}>
        {whatIDo.map((item, i) => {
          const copy = tech ? item.tech : item.simple;
          // each card drifts at its own rate as the group crosses the viewport
          const drift = offset * (i - 1) * -1.6;
          return (
            <TiltCard
              key={item.icon}
              {...revealProps(shown, 0.18 + i * 0.07)}
              parallax={drift}
            >
              <span className="ic" aria-hidden="true">
                {item.icon}
              </span>
              <h3>{copy.title}</h3>
              <p>{copy.body}</p>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
