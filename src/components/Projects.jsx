import { projects } from "../data/projects";
import { useMode, Html } from "../hooks/useMode";
import { useReveal, revealProps } from "../hooks/useReveal";
import CacheDemo from "./CacheDemo";
import Decode from "./Decode";
import Gutter from "./Gutter";

export default function Projects() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();

  return (
    <section id="projects" ref={ref}>
      {tech && <div className="crumb">src/career/projects/salarylens.java</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>03 — Projects</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text="What I built on my own" />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? "Personally architected and shipped, end to end."
          : "Side projects where I made every decision myself."}
      </p>

      {projects.map((p, i) => (
        <div key={p.name} {...revealProps(shown, 0.18 + i * 0.06, "job")}>
          {tech && <Gutter />}
          <div className="job-h">
            <h3>{p.name}</h3>
            <span
              className="badge"
              style={{
                color: p.statusColor,
                borderColor: `${p.statusColor}55`,
                background: `${p.statusColor}16`,
              }}
            >
              ● {p.status}
            </span>
            <a
              className="job-when"
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              github ↗
            </a>
          </div>
          <div className="job-m">{p.tagline}</div>

          <Html as="p" className="job-w" html={tech ? p.summary.tech : p.summary.simple} />

          {p.hasDemo && <CacheDemo />}

          <ul className="pts">
            {(tech ? p.points.tech : p.points.simple).map((pt, j) => (
              <Html as="li" key={j} html={pt} />
            ))}
          </ul>

          <div className="tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
