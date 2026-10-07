import { experience } from "../data/experience";
import { useMode, Html } from "../hooks/useMode";
import { useReveal, revealProps } from "../hooks/useReveal";
import Stats from "./Stats";
import SystemMap from "./SystemMap";
import ScaleSim from "./ScaleSim";
import Decode from "./Decode";
import Gutter from "./Gutter";

function Job({ job, shown, delay }) {
  const { tech } = useMode();
  const points = tech ? job.points.tech : job.points.simple;
  const summary = tech ? job.summary.tech : job.summary.simple;
  const hasPoints = points && points.length > 0;

  return (
    <div {...revealProps(shown, delay, "job")}>
      {tech && <Gutter />}
      <div className="job-h">
        <h3>{job.company}</h3>
        {job.current && <span className="badge">● CURRENT</span>}
        <span className="job-when">{job.period}</span>
      </div>
      <div className="job-m">
        {job.role}
        {job.client ? ` · Client: ${job.client}` : ""}
      </div>

      <Html as="p" className={`job-w${hasPoints ? "" : " bare"}`} html={summary} />

      {hasPoints && (
        <ul className="pts">
          {points.map((p, i) => (
            <Html as="li" key={i} html={p} />
          ))}
        </ul>
      )}

      {job.tags.length > 0 && (
        <div className="tags">
          {job.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();

  return (
    <section id="work" ref={ref}>
      {tech && <div className="crumb">src/career/experience.java</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>02 — Experience</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text="Where I work" />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? "Production ownership on a 1,600+ file multi-module Spring Boot platform serving a live insurance onboarding journey."
          : "Two years, two companies. The current one is where the real engineering happens."}
      </p>

      <Stats shown={shown} />

      <div
        className={revealProps(shown, 0.2).className}
        style={{ ...revealProps(shown, 0.2).style, marginTop: 38 }}
      >
        <SystemMap />
        {/* Engineer mode unlocks the system-design round as something playable */}
        {tech && (
          <>
            <div className="sim-intro">
              <span className="sim-intro-k">system design</span>
              Drag the slider. The architecture rebuilds itself, whatever breaks first lights up,
              and the note says why — and what I would do about it.
            </div>
            <ScaleSim />
          </>
        )}
      </div>

      {experience.map((job, i) => (
        <Job key={job.company} job={job} shown={shown} delay={0.26 + i * 0.06} />
      ))}
    </section>
  );
}
