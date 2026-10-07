import { useMemo, useRef, useState } from "react";
import { stages, components, tiers } from "../data/scale";

const HEALTH_COLOR = {
  healthy: "#4ade80",
  strained: "#fbbf24",
  degraded: "#fb923c",
  critical: "#f87171",
  "needs redesign": "#f472b6",
};

export default function ScaleSim() {
  const [i, setI] = useState(0);
  const stage = stages[i];
  const prev = i > 0 ? stages[i - 1] : null;
  const liveRef = useRef(null);

  // which components are new at this step — they get a brief highlight
  const fresh = useMemo(() => {
    if (!prev) return new Set();
    return new Set(Object.keys(stage.active).filter((k) => !prev.active[k]));
  }, [stage, prev]);

  const grouped = useMemo(
    () =>
      tiers
        .map((t) => ({
          ...t,
          items: Object.keys(stage.active)
            .filter((k) => components[k]?.tier === t.id)
            .map((k) => ({ key: k, count: stage.active[k], ...components[k] })),
        }))
        .filter((t) => t.items.length > 0),
    [stage]
  );

  const health = HEALTH_COLOR[stage.health] || "#4ade80";

  return (
    <div className="sim">
      {/* IDE-style chrome: this is a tool, not a decoration */}
      <div className="sim-tabs">
        <span className="sim-tab on">scale-simulator</span>
        <span className="sim-tab">notes.md</span>
        <span className="sim-dot" style={{ background: health, boxShadow: `0 0 10px ${health}` }} />
        <span className="sim-health" style={{ color: health }}>
          {stage.health}
        </span>
      </div>

      <div className="sim-body">
        <div className="sim-head">
          <div className="sim-read">
            <span className="sim-users">{stage.users}</span>
            <span className="sim-unit">{stage.unit}</span>
          </div>
          <div className="sim-kpis">
            <span>
              <i>throughput</i>
              {stage.rps}
            </span>
            <span>
              <i>p99</i>
              <b style={{ color: health }}>{stage.p99}</b>
            </span>
          </div>
        </div>

        <input
          className="sim-slider"
          type="range"
          min="0"
          max={stages.length - 1}
          step="1"
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label="Traffic volume"
          style={{ "--pct": `${(i / (stages.length - 1)) * 100}%`, "--c": health }}
        />
        <div className="sim-ticks">
          {stages.map((s, n) => (
            <button
              key={s.users}
              type="button"
              className={n === i ? "on" : ""}
              onClick={() => setI(n)}
            >
              {s.users}
            </button>
          ))}
        </div>

        <div className="sim-arch">
          {grouped.map((t) => (
            <div className="sim-tier" key={t.id}>
              <span className="sim-tierlabel">{t.label}</span>
              <div className="sim-row">
                {t.items.map((c) => {
                  const isBottleneck = stage.bottleneck === c.key;
                  return (
                    <span
                      key={c.key}
                      className={`sim-node${isBottleneck ? " hot" : ""}${
                        fresh.has(c.key) ? " fresh" : ""
                      }`}
                      style={{ "--c": isBottleneck ? "#f87171" : c.color }}
                    >
                      {c.label}
                      {c.count > 1 && <b className="sim-x">×{c.count}</b>}
                      {isBottleneck && <b className="sim-warn">BOTTLENECK</b>}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="sim-note" ref={liveRef} aria-live="polite">
          <div className="sim-gutter" aria-hidden="true">
            {Array.from({ length: 6 }, (_, n) => (
              <span key={n}>{n + 1}</span>
            ))}
          </div>
          <div className="sim-notebody">
            <h5>{stage.title}</h5>
            <p>{stage.note}</p>
            <div className="sim-nums">
              {stage.numbers.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sim-status">
        <span>main</span>
        <span>{stage.active.app} pods</span>
        <span>p99 {stage.p99}</span>
        <span>{stage.bottleneck ? `⚠ ${components[stage.bottleneck].label}` : "✓ no bottleneck"}</span>
        <span className="sim-status-sp" />
        <span>
          step {i + 1}/{stages.length}
        </span>
      </div>
    </div>
  );
}
