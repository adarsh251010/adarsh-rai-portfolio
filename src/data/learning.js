// The AI-engineering track. The current week is derived from `startDate` so the
// page stays truthful on its own — no number to remember to bump by hand.

export const track = {
  name: "Insurance Copilot",
  startDate: "2026-10-12", // week 1 begins
  totalWeeks: 12,
  summary: {
    simple:
      "An app that reads any insurance policy PDF and explains it in plain Hindi or English — what's covered, what isn't, and exactly how to claim.",
    tech:
      "RAG over policy documents with page-level citations, a LangGraph claim agent with human-in-the-loop approval, and a Ragas eval suite reported in the README. FastAPI · PostgreSQL + pgvector · LangGraph · MCP · Langfuse · React.",
  },
  why: {
    simple:
      "I already use AI tools every day at work — I built 8 of them myself. The next step is building AI <i>products</i>, not just using AI tools.",
    tech:
      "Backend fundamentals — caching, async pipelines, API design, security — transfer directly to LLM systems. Target role: Backend Engineer (GenAI).",
  },
  weeks: [
    "Python & FastAPI",
    "LLM basics & prompting",
    "Embeddings & pgvector",
    "RAG with citations",
    "Hybrid search & reranking",
    "Agents & tool calling",
    "LangGraph & MCP",
    "Claim agent (human-in-the-loop)",
    "Evaluations (Ragas)",
    "Production, safety & Hindi",
    "Real users & ML depth",
    "Ship v1",
  ],
};

/**
 * Returns { week, pct, label, started } for today.
 * Before the start date it reads as "Starts 12 Oct" rather than faking progress.
 */
export function trackProgress(now = new Date()) {
  const start = new Date(track.startDate + "T00:00:00");
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const elapsed = now - start;

  if (elapsed < 0) {
    const days = Math.ceil(-elapsed / (24 * 60 * 60 * 1000));
    return {
      week: 0,
      pct: 0,
      started: false,
      label: `Starts ${start.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
      sub: days === 1 ? "tomorrow" : `in ${days} days`,
    };
  }

  const week = Math.min(track.totalWeeks, Math.floor(elapsed / msPerWeek) + 1);
  const pct = Math.min(100, Math.round((elapsed / (track.totalWeeks * msPerWeek)) * 100));

  if (week >= track.totalWeeks && pct >= 100) {
    return { week: track.totalWeeks, pct: 100, started: true, label: "Shipped", sub: "v1 complete" };
  }
  return {
    week,
    pct,
    started: true,
    label: `Week ${week} of ${track.totalWeeks}`,
    sub: `${pct}% through · currently on ${track.weeks[week - 1]}`,
  };
}
