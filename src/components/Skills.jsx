import { skillGroups, learningSkills } from "../data/skills";
import { useMode } from "../hooks/useMode";
import { useReveal, revealProps } from "../hooks/useReveal";
import Decode from "./Decode";

function Group({ group, building }) {
  return (
    <div className={`skgroup${building ? " building" : ""}`} style={{ "--c": group.color }}>
      <h4>
        <i aria-hidden="true" />
        {group.title}
      </h4>
      {group.note && <p className="gnote">{group.note}</p>}
      <div className="chips">
        {group.items.map((item) => (
          <span className="chip" key={item.name} tabIndex={0}>
            {item.name}
            <span className="ctx" role="tooltip">
              {item.where}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();

  return (
    <section id="skills" ref={ref}>
      {tech && <div className="crumb">src/career/skills.yaml</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>04 — Skills</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text="What I know" />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? "Everything here is something I have shipped with in production or in a deployed project. Hover any one for the specific context."
          : "Everything here is something I have actually built with — not a list of things I once read about. Hover any one to see exactly where I used it."}
      </p>

      <div {...revealProps(shown, 0.18)}>
        {skillGroups.map((g) => (
          <Group key={g.title} group={g} />
        ))}
        <Group group={learningSkills} building />
      </div>
    </section>
  );
}
