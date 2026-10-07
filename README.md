# Adarsh Rai — Portfolio

Personal portfolio for a backend engineer. React + Vite, no UI framework and no
animation library — the canvas field, the tilt, the decode effect, the minimap
and the terminal are all hand-written.

**Live:** https://adarsh-rai-portfolio.vercel.app

---

## The idea

Most engineering portfolios pick one audience and lose the other: either a
recruiter can't tell what the work was, or an engineer can't tell whether it was
hard. This one ships both.

**A toggle in the nav — `Recruiter` / `Engineer` — changes the page, not just
the wording.** The choice is remembered in `localStorage`.

### Recruiter

Plain language, clean reading column, zero jargon.

> "When you pay for a policy, or verify your ID, the app has to talk to other
> companies. I write that connection — and make sure the app keeps working even
> when they go down."

### Engineer

Résumé-level detail, plus the page turns into an editor: open file tabs that
follow your scroll, a file-tree explorer, a working minimap with a viewport
indicator, line-number gutters on every card, and a status bar whose `Ln`
readout tracks real scroll position.

> "20+ third-party REST integrations via OpenFeign — payments, e-Mandate, eKYC,
> dedupe, credit bureau, CRM — each with retry, fallback and graceful
> degradation."

---

## Two things worth opening

### The cache demo — *Projects*

A working simulation of SalaryLens' biggest win. Press the button and you wait.
Press it again and the answer is instant: 28,040 ms → 314 ms, the real numbers.
Reading "90× faster" on a résumé does nothing; waiting for it, then not waiting
for it, lands. The cold run is compressed to 3.6 real seconds and the UI says so
on screen.

### The scale simulator — *Experience, Engineer mode*

The system design round, playable. Drag a slider from 10K to 25M users per day
and the architecture rebuilds itself: components appear and multiply, whatever
saturates first lights up, and the note explains what breaks and what I'd do
about it — tied to real work, not textbook theory.

| Traffic | First thing to break |
| --- | --- |
| 10K / day | nothing — current state, p99 284 ms |
| 100K | premium-rate engine, 842 ms synchronous |
| 1M | Redis as a single point of failure, thundering herd |
| 5M | DynamoDB hot partition on the shared config keys |
| 25M | stop scaling — precompute rate cards to the edge |

---

## Everything interactive

Every one is optional — the page reads completely on a plain scroll.

| What | Where |
| --- | --- |
| Recruiter / Engineer toggle | nav, top right |
| Cache demo | Projects |
| Scale simulator | Experience, Engineer mode |
| Editor chrome: tabs, explorer, minimap, status bar | Engineer mode |
| Clickable architecture map | Experience |
| Hidden terminal | press `` ` `` or the nav button |
| Per-skill production context | hover any skill chip |
| Boot sequence | first visit each session, any key skips |
| Console greeting | open DevTools |
| Constellation, cursor spotlight, magnetic buttons, decode headings | throughout |

All of it respects `prefers-reduced-motion`.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview
```

---

## Deployment

Vercel, from `main`. Settings are pinned in `vercel.json` rather than left to
auto-detection — this repo used to be Create React App, which built to `build/`,
and Vite builds to `dist/`.

```jsonc
"framework": "vite",
"buildCommand": "npm run build",
"outputDirectory": "dist"
```

Hashed assets under `/assets/` are served `immutable`; the PDF and images get a
one-day cache so a replaced résumé goes live the next day.

---

## Editing content

All copy lives in `src/data/`. No component needs touching to update the page.

| File | Holds |
| --- | --- |
| `profile.js` | name, photo, contact, hero pitch, headline stats, "what I do" cards |
| `experience.js` | jobs, bullet points, education |
| `projects.js` | projects, plus the numbers the cache demo animates |
| `skills.js` | skill groups and the hover context for each chip |
| `systemMap.js` | the clickable architecture diagram |
| `scale.js` | the scale simulator's stages and reasoning |
| `learning.js` | the AI-engineering track |
| `sections.js` | section order, file names and colours for tabs / tree / minimap |
| `terminal.js` | terminal commands |

Anything written as `{ simple, tech }` is a toggle pair — fill in both halves.

**The learning track dates itself.** `learning.js` holds a `startDate`; the
current week, the progress bar and the terminal's `learn` output are all derived
from it. Before that date the page reads "Starts 12 Oct 2026" rather than
claiming progress that hasn't happened. Change `startDate` if the plan moves —
there is no week number to remember to bump.

### A note on the skills section

There is deliberately no strong/weak split. An earlier version dimmed anything
that wasn't daily-use, which made two-thirds of a genuine skill set read as
weakness — and left the Domain group, the rarest thing on the page, looking like
filler. Every chip now carries equal weight, groups are distinguished by colour,
and depth is communicated through the hover context. Things still being learned
sit in their own clearly-labelled group, framed as momentum.

---

## Stack

React 19 · Vite 7 · plain CSS. Two runtime dependencies.
Bundle: ~94 kB gzipped.

## Structure

```
index.html            SEO, Open Graph, JSON-LD
vercel.json           build + cache headers
static/               served at the site root (résumé PDF, photo, favicon)
src/
  data/               all content
  components/         one per section, plus the editor chrome and terminal
  hooks/              useMode (the toggle), useReveal (scroll animation)
  styles/globals.css
```

`public/` is left over from the Create React App version. Vite ignores it
(`publicDir` points at `static/`), so nothing in it ships — it can be deleted
whenever.
