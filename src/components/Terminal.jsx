import { useCallback, useEffect, useRef, useState } from "react";
import { commands, commandList, benchRows } from "../data/terminal";

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const PROMPT =
  '<span class="tp">adarsh@portfolio</span><span class="tdim">:</span><span class="tpath">~</span><span class="tdim">$</span>';

export default function Terminal({ open, onClose }) {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const historyRef = useRef([]);
  const hIndexRef = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const bootedRef = useRef(false);

  const push = useCallback((html) => {
    setLines((prev) => [...prev, html]);
  }, []);

  const pushMany = useCallback((arr) => {
    setLines((prev) => [...prev, ...arr, ""]);
  }, []);

  // first open prints a short intro
  useEffect(() => {
    if (!open || bootedRef.current) return;
    bootedRef.current = true;
    setLines([
      '<span class="tdim">adarshOS — type <span class="thl">help</span> to begin</span>',
      "",
      ...commands.whoami(),
      "",
    ]);
  }, [open]);

  // keep scrolled to the bottom and focused
  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    if (!busy) inputRef.current?.focus();
  }, [lines, open, busy]);

  const runBench = useCallback(() => {
    setBusy(true);
    push('<span class="tdim">running: repeat-query latency…</span>');
    push("");

    let row = 0;
    const next = () => {
      if (row >= benchRows.length) {
        pushMany([
          "",
          '  <span class="tok">salarylens</span>  28,040ms → 314ms  <span class="tok">= 89.3× faster</span>',
          '  <span class="tok">premium</span>      1,184ms → 284ms  <span class="tok">=  4.2× faster</span>',
        ]);
        setBusy(false);
        return;
      }
      const [name, ms, color] = benchRows[row];
      row += 1;
      const full = Math.max(1, Math.round((ms / 28040) * 38));
      let k = 0;

      push("");
      const timer = setInterval(() => {
        k += 1;
        const bar = `<span style="color:${color}">${"█".repeat(k)}</span>`;
        const num = `<span class="tdim">  ${Math.round(ms * (k / full)).toLocaleString(
          "en-IN"
        )}ms</span>`;
        setLines((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = `  ${name}  ${bar}${num}`;
          return copy;
        });
        if (k >= full) {
          clearInterval(timer);
          setLines((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] =
              `  ${name}  <span style="color:${color}">${"█".repeat(full)}</span>` +
              `<span class="tdim">  ${ms.toLocaleString("en-IN")}ms</span>`;
            return copy;
          });
          setTimeout(next, 110);
        }
      }, ms > 5000 ? 16 : 36);
    };
    next();
  }, [push, pushMany]);

  const run = useCallback(
    (raw) => {
      const [cmd, ...args] = raw.trim().split(/\s+/);
      if (!cmd) return;

      if (cmd === "clear") {
        setLines([]);
        return;
      }
      if (cmd === "exit" || cmd === "q") {
        onClose();
        return;
      }
      if (cmd === "bench") {
        runBench();
        return;
      }
      if (cmd === "goto") {
        const el = document.getElementById(args[0] || "");
        if (el) {
          onClose();
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          pushMany([
            `<span class="terr">no section "${esc(args[0] || "")}"</span>`,
            '<span class="tdim">try: do · work · projects · skills · learning · contact</span>',
          ]);
        }
        return;
      }

      const alias = { about: "whoami", experience: "exp" }[cmd] || cmd;
      const fn = commands[alias];
      if (fn) {
        pushMany(fn());
      } else {
        pushMany([
          `<span class="terr">command not found: ${esc(cmd)}</span>`,
          '<span class="tdim">type <span class="thl">help</span></span>',
        ]);
      }
    },
    [onClose, pushMany, runBench]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const v = value.trim();
      push(`${PROMPT} <span class="tc">${esc(v)}</span>`);
      if (v) {
        historyRef.current.push(v);
        hIndexRef.current = historyRef.current.length;
      }
      setValue("");
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIndexRef.current > 0) {
        hIndexRef.current -= 1;
        setValue(historyRef.current[hIndexRef.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIndexRef.current < historyRef.current.length - 1) {
        hIndexRef.current += 1;
        setValue(historyRef.current[hIndexRef.current]);
      } else {
        hIndexRef.current = historyRef.current.length;
        setValue("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = commandList.filter((c) => c.startsWith(value));
      if (matches.length === 1) setValue(`${matches[0]} `);
      else if (matches.length > 1) push(`<span class="tdim">${matches.join("   ")}</span>`);
    }
  };

  if (!open) return null;

  return (
    <div
      className="tov"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tw" role="dialog" aria-label="Terminal">
        <div className="tw-h">
          <div className="lt">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </div>
          <span>adarsh@portfolio — zsh</span>
          <span className="esc">esc to close</span>
        </div>

        <div className="tbody" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div className="tln" key={i} dangerouslySetInnerHTML={{ __html: l || "&nbsp;" }} />
          ))}

          {!busy && (
            <div className="tln tin">
              <span dangerouslySetInnerHTML={{ __html: PROMPT }} />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
