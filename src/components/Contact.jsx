import { profile } from "../data/profile";
import { useMode } from "../hooks/useMode";
import { useReveal, revealProps } from "../hooks/useReveal";
import Decode from "./Decode";

export default function Contact() {
  const { tech } = useMode();
  const [ref, shown] = useReveal();

  return (
    <section id="contact" className="contact" ref={ref}>
      {tech && <div className="crumb">src/career/contact.json</div>}
      <div {...revealProps(shown, 0, "eyebrow")}>06 — Contact</div>
      <h2 {...revealProps(shown, 0.06)}>
        <Decode text="Let's talk" />
      </h2>
      <p {...revealProps(shown, 0.12, "lede")}>
        {tech
          ? `Open to Backend Engineer and Backend Engineer (GenAI) roles. ${profile.location} — ${profile.availability.toLowerCase()}.`
          : `Open to Backend Engineer roles — Bhopal, remote, or relocation. I usually reply the same day.`}
      </p>

      <a {...revealProps(shown, 0.18, "cmail")} href={`mailto:${profile.email}`}>
        {profile.email}
      </a>

      <div {...revealProps(shown, 0.24, "clinks")}>
        <a className="btn" href={profile.phoneHref}>
          {profile.phone}
        </a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn primary" href={profile.resume} download>
          ↓ Résumé
        </a>
      </div>
    </section>
  );
}
