import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ModeContext = createContext({ tech: false, setTech: () => {} });

const KEY = "ar.mode";

export function ModeProvider({ children }) {
  const [tech, setTech] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "tech";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.body.classList.toggle("tech", tech);
    try {
      localStorage.setItem(KEY, tech ? "tech" : "simple");
    } catch {
      /* private mode — the toggle still works for this visit */
    }
  }, [tech]);

  const value = useMemo(() => ({ tech, setTech }), [tech]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);

/** Picks the right half of a { simple, tech } pair. */
export function useDual(pair) {
  const { tech } = useMode();
  if (pair == null) return null;
  return tech ? pair.tech : pair.simple;
}

/** Renders trusted authored HTML from the data files. */
export function Html({ html, as: Tag = "span", ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
}
