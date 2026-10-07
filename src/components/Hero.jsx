import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useMode, Html } from "../hooks/useMode";
import { revealProps } from "../hooks/useReveal";
import Magnetic from "./Magnetic";

/** Types each role out, pauses, deletes, moves on. */
function useTypewriter(words, { type = 62, erase = 34, hold = 1900, gap = 320 } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    const reduced =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(words[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const step = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? erase : type;
      if (!deleting && charIndex === word.length) {
        delay = hold;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = gap;
      }
      timer = setTimeout(step, delay);
    };

    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [words, type, erase, hold, gap]);

  return text;
}

export default function Hero() {
  const { tech } = useMode();
  const role = useTypewriter(profile.roles);
  const [shown, setShown] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="top">
      <div {...revealProps(shown, 0, "ava")}>
        {broken ? (
          <span aria-hidden="true">{profile.initials}</span>
        ) : (
          <img
            src={profile.photo}
            alt={`${profile.name}, ${profile.title}`}
            width="96"
            height="96"
            onError={() => setBroken(true)}
          />
        )}
      </div>

      <h1 {...revealProps(shown, 0.08)}>
        {[...profile.name].map((ch, i) => (
          <span key={i}>{ch === " " ? " " : ch}</span>
        ))}
      </h1>

      <div {...revealProps(shown, 0.16, "role")}>
        {role}
        <i className="caret" aria-hidden="true" />
      </div>

      <Html
        as="p"
        {...revealProps(shown, 0.24, "pitch")}
        html={tech ? profile.pitch.tech : profile.pitch.simple}
      />

      <p {...revealProps(shown, 0.32, "sub2")}>{tech ? profile.sub.tech : profile.sub.simple}</p>

      <div {...revealProps(shown, 0.4, "cta")}>
        <Magnetic>
          <a className="btn primary" href="#contact">
            Get in touch
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn" href={profile.resume} download>
            ↓ Download résumé
          </a>
        </Magnetic>
        <Magnetic>
          <a className="btn" href="#projects">
            Try the 90× demo →
          </a>
        </Magnetic>
      </div>

      <div className="scrollcue" aria-hidden="true">
        SCROLL
      </div>
    </section>
  );
}
