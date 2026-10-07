import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { systemMap, systemDetail } from "../data/systemMap";
import { useMode } from "../hooks/useMode";

function Box({ node, selected, onSelect, hub }) {
  const { tech } = useMode();
  const copy = tech ? node.tech : node.simple;
  return (
    <button
      type="button"
      className={`box${hub ? " hub" : ""}${selected ? " sel" : ""}`}
      style={{ "--c": node.color }}
      data-k={node.key}
      onClick={() => onSelect(node.key)}
      aria-pressed={selected}
    >
      <b className="bt">{copy.label}</b>
      <span className="bs">{copy.meta}</span>
    </button>
  );
}

export default function SystemMap() {
  const { tech } = useMode();
  const [selected, setSelected] = useState("core");
  const [paths, setPaths] = useState([]);
  const wrapRef = useRef(null);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.innerWidth <= 860) {
      setPaths([]);
      return;
    }

    const wr = wrap.getBoundingClientRect();
    const hub = wrap.querySelector(".box.hub");
    if (!hub) return;
    const hr = hub.getBoundingClientRect();
    const hubRight = hr.left - wr.left + hr.width;
    const hubLeft = hr.left - wr.left;
    const hubMid = hr.top - wr.top + hr.height / 2;

    const next = [];

    wrap.querySelectorAll("[data-side='left']").forEach((el) => {
      const r = el.getBoundingClientRect();
      const x = r.left - wr.left + r.width;
      const y = r.top - wr.top + r.height / 2;
      next.push(
        `M ${x} ${y} C ${hubLeft - 30} ${y}, ${hubLeft - 30} ${hubMid}, ${hubLeft} ${hubMid}`
      );
    });

    wrap.querySelectorAll("[data-side='right']").forEach((el) => {
      const r = el.getBoundingClientRect();
      const x = r.left - wr.left;
      const y = r.top - wr.top + r.height / 2;
      next.push(
        `M ${hubRight} ${hubMid} C ${hubRight + 30} ${hubMid}, ${x - 30} ${y}, ${x} ${y}`
      );
    });

    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, tech]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    // fonts settling can shift box heights slightly
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1000);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);

  const detail = systemDetail[selected];
  const copy = detail ? (tech ? detail.tech : detail.simple) : null;

  return (
    <div className="map" ref={wrapRef}>
      <div className="map-h">
        <h3>{tech ? "Platform architecture" : "The system I work on"}</h3>
        <span className="hint">click any box ↓</span>
      </div>
      <p className="map-sub">
        {tech
          ? "Digital onboarding request path — the services I own are highlighted."
          : "Someone buys a policy on their phone. Here is everything that has to happen behind the scenes."}
      </p>

      <svg className="wires" aria-hidden="true">
        {paths.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(167,139,250,.22)" strokeWidth="1.2" />
            <circle r="2.6" fill="#a78bfa" opacity="0.85">
              <animateMotion dur={`${2.4 + i * 0.35}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>

      <div className="grid3">
        <div className="mcol">
          {systemMap.left.map((n) => (
            <div key={n.key} data-side="left">
              <Box node={n} selected={selected === n.key} onSelect={setSelected} />
            </div>
          ))}
        </div>
        <div className="mcol">
          <Box
            node={systemMap.hub}
            hub
            selected={selected === systemMap.hub.key}
            onSelect={setSelected}
          />
        </div>
        <div className="mcol">
          {systemMap.right.map((n) => (
            <div key={n.key} data-side="right">
              <Box node={n} selected={selected === n.key} onSelect={setSelected} />
            </div>
          ))}
        </div>
      </div>

      {copy && (
        <div className="mdetail" aria-live="polite">
          <h4>{copy.title}</h4>
          <p>{copy.body}</p>
          <div className="mt">
            {(detail.tags || []).map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
