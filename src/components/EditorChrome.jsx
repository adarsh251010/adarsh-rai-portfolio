import { useEffect, useMemo, useState } from "react";
import { sections, fileTree } from "../data/sections";

/** Stable pseudo-random so the minimap looks the same on every render. */
function seeded(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const byId = Object.fromEntries(sections.map((s) => [s.id, s]));

function jump(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ───────────────────────── file tree ───────────────────────── */

function TreeNode({ node, depth, active }) {
  if (node.type === "dir") {
    return (
      <div className="ft-dir">
        <div className="ft-row ft-folder" style={{ paddingLeft: 8 + depth * 12 }}>
          <span className="ft-caret">▾</span>
          {node.name}
        </div>
        {node.children.map((c, i) => (
          <TreeNode key={c.id || c.name || i} node={c} depth={depth + 1} active={active} />
        ))}
      </div>
    );
  }
  const s = byId[node.id];
  if (!s) return null;
  return (
    <button
      type="button"
      className={`ft-row ft-file${active === s.id ? " on" : ""}`}
      style={{ paddingLeft: 8 + depth * 12 }}
      onClick={() => jump(s.id)}
    >
      <i className="ft-dot" style={{ background: s.color }} />
      {s.file}
    </button>
  );
}

/* ───────────────────────── minimap ───────────────────────── */

function Minimap({ active, scrollPct, viewportFrac, geometry }) {
  const lines = useMemo(
    () =>
      Object.fromEntries(
        sections.map((s) => {
          const rand = seeded(s.id);
          return [s.id, Array.from({ length: s.density }, () => 18 + rand() * 76)];
        })
      ),
    []
  );

  // Blocks are sized from each section's real share of the page, so the
  // viewport indicator lines up with whatever is actually on screen.
  return (
    <div className="minimap" aria-hidden="true">
      <div className="minimap-inner">
        {sections.map((s) => {
          const share = geometry[s.id] ?? 1 / sections.length;
          return (
            <button
              key={s.id}
              type="button"
              className={`mm-block${active === s.id ? " on" : ""}`}
              style={{ flex: `${share} 0 0` }}
              onClick={() => jump(s.id)}
              title={s.file}
              tabIndex={-1}
            >
              {lines[s.id].map((w, i) => (
                <span
                  key={i}
                  style={{
                    width: `${w}%`,
                    background: active === s.id ? s.color : "#2b3442",
                    opacity: active === s.id ? 0.85 : 0.6,
                  }}
                />
              ))}
            </button>
          );
        })}
      </div>
      <div
        className="mm-view"
        style={{
          top: `${scrollPct * (100 - viewportFrac * 100)}%`,
          height: `${Math.max(5, viewportFrac * 100)}%`,
        }}
      />
    </div>
  );
}

/* ───────────────────────── chrome ───────────────────────── */

export default function EditorChrome() {
  const [active, setActive] = useState("top");
  const [scrollPct, setScrollPct] = useState(0);
  const [viewportFrac, setViewportFrac] = useState(0.2);
  const [ln, setLn] = useState(1);
  const [geometry, setGeometry] = useState({});

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      setScrollPct(pct);
      setViewportFrac(window.innerHeight / doc.scrollHeight);

      // a believable Ln/Col readout driven by real scroll position
      const totalLines = sections.reduce((n, s) => n + s.density, 0) * 8;
      setLn(Math.max(1, Math.round(pct * totalLines)));

      const y = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && y >= el.offsetTop) current = s.id;
      }
      setActive(current);

      // each section's real share of the page, for the minimap
      const heights = {};
      let sum = 0;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        const h = el?.offsetHeight || 0;
        heights[s.id] = h;
        sum += h;
      }
      if (sum > 0) {
        const next = {};
        for (const s of sections) next[s.id] = heights[s.id] / sum;
        setGeometry((prev) => {
          const same = sections.every((s) => Math.abs((prev[s.id] ?? -1) - next[s.id]) < 0.002);
          return same ? prev : next;
        });
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const cur = byId[active] || sections[0];

  return (
    <>
      {/* open editor tabs */}
      <div className="ed-tabs">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`ed-tab${active === s.id ? " on" : ""}`}
            onClick={() => jump(s.id)}
          >
            <i className="ed-dot" style={{ background: s.color }} />
            {s.file}
            <span className="ed-x">×</span>
          </button>
        ))}
        <div className="ed-tabs-sp" />
        <span className="ed-breadcrumb">
          {cur.dir}
          <b>{cur.file}</b>
        </span>
      </div>

      {/* explorer */}
      <aside className="filetree">
        <div className="ft-head">Explorer</div>
        <div className="ft-body">
          {fileTree.map((n, i) => (
            <TreeNode key={n.id || n.name || i} node={n} depth={0} active={active} />
          ))}
        </div>
        <div className="ft-foot">
          <span className="ft-branch">⎇ main</span>
          <span>2 ↑</span>
        </div>
      </aside>

      <Minimap
        active={active}
        scrollPct={scrollPct}
        viewportFrac={viewportFrac}
        geometry={geometry}
      />

      {/* status bar */}
      <div className="statusbar">
        <span className="sb-branch">⎇ main</span>
        <span>↻ 0 ↑ 2</span>
        <span className="sb-ok">⊘ 0 ⚠ 0</span>
        <span className="sb-sp" />
        <span>
          Ln {ln}, Col {((ln * 7) % 60) + 1}
        </span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="sb-lang">{cur.lang}</span>
      </div>
    </>
  );
}
