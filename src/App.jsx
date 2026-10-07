import { useCallback, useEffect, useState } from "react";
import { ModeProvider, useMode } from "./hooks/useMode";
import Background from "./components/Background";
import BootIntro from "./components/BootIntro";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Rail from "./components/Rail";
import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Learning from "./components/Learning";
import Contact from "./components/Contact";
import Terminal from "./components/Terminal";
import EditorChrome from "./components/EditorChrome";
import { profile } from "./data/profile";

/** For whoever opens DevTools — they are exactly the audience worth greeting. */
function greetTheCurious() {
  const brand = "color:#a78bfa;font:600 13px ui-monospace,monospace";
  const body = "color:#9aa6b7;font:13px ui-monospace,monospace";
  const hl = "color:#4ade80;font:13px ui-monospace,monospace";
  /* eslint-disable no-console */
  console.log(
    `%c\n  adarsh@portfolio\n%c  ────────────────────────────────────────\n` +
      `  You opened DevTools. Good instinct.\n\n` +
      `  This page has no UI framework and no animation\n` +
      `  library — the canvas field, the tilt, the decode\n` +
      `  effect and the terminal are all hand-written.\n\n` +
      `%c  Press \` anywhere for a real terminal.\n` +
      `%c  Hiring? ${profile.email}\n`,
    brand,
    body,
    hl,
    body
  );
  /* eslint-enable no-console */
}

function Shell() {
  const { tech } = useMode();
  const [termOpen, setTermOpen] = useState(false);

  const closeTerm = useCallback(() => setTermOpen(false), []);
  const openTerm = useCallback(() => setTermOpen(true), []);

  useEffect(() => {
    greetTheCurious();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setTermOpen(false);
        return;
      }
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName || "");
      if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        setTermOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <BootIntro />

      <a className="skip" href="#do">
        Skip to content
      </a>

      <Background />
      <ScrollProgress />
      <Nav onOpenTerminal={openTerm} />
      {tech ? <EditorChrome /> : <Rail />}

      <div className="page">
        <main>
          <Hero />
          <WhatIDo />
          <Experience />
          <Projects />
          <Skills />
          <Learning />
          <Contact />

          <footer>
            {profile.location} · built by hand · press{" "}
            <button type="button" onClick={openTerm}>
              `
            </button>{" "}
            for the terminal
          </footer>
        </main>
      </div>

      <Terminal open={termOpen} onClose={closeTerm} />
    </>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <Shell />
    </ModeProvider>
  );
}
