import { useEffect, useState } from "react";

const SECTIONS = [
  ["top", "intro"],
  ["do", "what i do"],
  ["work", "work"],
  ["projects", "projects"],
  ["skills", "skills"],
  ["learning", "learning"],
  ["contact", "contact"],
];

export default function Rail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = SECTIONS[0][0];
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? "act" : ""} tabIndex={-1}>
          <span>{label}</span>
          <i />
        </a>
      ))}
    </div>
  );
}
