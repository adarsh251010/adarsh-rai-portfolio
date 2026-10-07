import { useEffect, useRef, useState } from "react";
import { demoNumbers as D } from "../data/projects";
import { useMode } from "../hooks/useMode";

const fmt = (ms) => ms.toLocaleString("en-IN");

export default function CacheDemo() {
  const { tech } = useMode();
  // "idle" → "cold" → "cold-done" → "warm" → "warm-done"
  const [phase, setPhase] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [message, setMessage] = useState("");
  const rafRef = useRef(0);
  const timerRef = useRef(0);

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    },
    []
  );

  const runCold = () => {
    setPhase("cold");
    setElapsed(0);
    setMessage(D.waitMessages[0][1]);
    const start = performance.now();

    const step = (now) => {
      const p = Math.min((now - start) / D.coldRealMs, 1);
      setElapsed(D.coldMs * p);
      const hit = D.waitMessages.filter(([at]) => p * 100 >= at).pop();
      if (hit) setMessage(hit[1]);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPhase("cold-done");
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const runWarm = () => {
    setPhase("warm");
    timerRef.current = setTimeout(() => setPhase("warm-done"), 310);
  };

  const reset = () => {
    setPhase("idle");
    setElapsed(0);
  };

  const buttonFor = () => {
    switch (phase) {
      case "idle":
        return { label: "Get my salary analysis", cls: "", onClick: runCold, disabled: false };
      case "cold":
        return { label: "Working…", cls: "", onClick: () => {}, disabled: true };
      case "cold-done":
        return {
          label: "Ask the exact same thing again",
          cls: " again",
          onClick: runWarm,
          disabled: false,
        };
      case "warm":
        return { label: "Working…", cls: " again", onClick: () => {}, disabled: true };
      default:
        return { label: "Reset (clear the cache)", cls: " reset", onClick: reset, disabled: false };
    }
  };

  const btn = buttonFor();

  return (
    <div className="demo" id="demo">
      <div className="demo-h">
        <span className="pill">TRY IT</span>
        <span className="dh">
          {tech
            ? "Live cache simulation — cold path vs warm path"
            : "Press the button. Then press it again."}
        </span>
      </div>

      <div className="demo-b">
        <div className="fakeapp">
          <div className="fa-row">
            <div className="fa-f">
              <label>ROLE</label>
              <div>{D.role}</div>
            </div>
            <div className="fa-f">
              <label>CITY</label>
              <div>{D.city}</div>
            </div>
            <div className="fa-f">
              <label>EXPERIENCE</label>
              <div>{D.exp}</div>
            </div>
          </div>
          <button
            className={`askbtn${btn.cls}`}
            onClick={btn.onClick}
            disabled={btn.disabled}
            type="button"
          >
            {btn.label}
          </button>
        </div>

        <div className="stage" aria-live="polite">
          {phase === "idle" && (
            <div className="idle">
              {tech ? "Idle. Cache is empty." : "Nothing has run yet — press the button above."}
            </div>
          )}

          {phase === "cold" && (
            <div className="waiting">
              <div className="spin" />
              <div className="clock" style={{ color: "var(--amber)" }}>
                {(elapsed / 1000).toFixed(2)} s
              </div>
              <div className="wmsg">{message}</div>
              <div className="wnote">the real wait was 28 seconds — shown here at 8× speed</div>
            </div>
          )}

          {phase === "warm" && (
            <div className="waiting">
              <div className="clock" style={{ color: "var(--green)" }}>
                0.31 s
              </div>
            </div>
          )}

          {(phase === "cold-done" || phase === "warm-done") && (
            <Result hit={phase === "warm-done"} tech={tech} />
          )}
        </div>
      </div>
    </div>
  );
}

function Result({ hit, tech }) {
  return (
    <div className="result">
      <div className="rh">
        <span className={`rt ${hit ? "hit" : "miss"}`}>
          {hit ? "⚡ FROM MEMORY" : "CALCULATED FRESH"}
        </span>
        <span className="rtime">{hit ? `${D.warmMs} ms` : `${fmt(D.coldMs)} ms`}</span>
      </div>

      <div className="rband">{D.band}</div>
      <p className="rsub">{D.verdict}</p>
      <div className="quote">“{D.script}”</div>

      {hit ? (
        <>
          <div className="cmpline">
            <span>
              {tech
                ? "Redis @Cacheable HIT on the composite key (title : location : experience), 1-hour TTL."
                : "Same question, same answer — but this time it remembered it."}
            </span>
          </div>
          <div className="cmpline tight">
            <b style={{ color: "var(--red)" }}>{fmt(D.coldMs)} ms</b>
            <span style={{ color: "var(--dim)" }}>→</span>
            <b style={{ color: "var(--green)" }}>{D.warmMs} ms</b>
            <b style={{ color: "var(--green)", marginLeft: "auto" }}>{D.speedup} faster</b>
          </div>
        </>
      ) : (
        <div className="cmpline">
          <span>
            {tech
              ? "Cold path: a blocking OpenAI call accounting for 27.9s of the 28.0s total. Press again for the cached path."
              : "That was the slow path. Now press the button again and watch what happens."}
          </span>
        </div>
      )}
    </div>
  );
}
