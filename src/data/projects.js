export const projects = [
  {
    name: "SalaryLens",
    status: "LIVE",
    statusColor: "#22d3ee",
    tagline: "AI-powered salary negotiation platform",
    repo: "https://github.com/adarsh251010/salarylens",
    summary: {
      simple:
        "It tells you what your salary <b>should</b> be for your role and city, then writes you a script for the negotiation conversation. The first version made you stare at a spinner for <b>28 seconds</b>. Try the difference below.",
      tech:
        "LLM-generated salary analysis and negotiation scripts for the Indian job market. <b>Java 17, Spring Boot, Spring Security, PostgreSQL, Redis, OpenAI API, React 19, Tailwind CSS, Docker (multi-stage), Render.</b>",
    },
    hasDemo: true,
    points: {
      simple: [
        "Instead of making you wait, it now <b>replies instantly with a ticket number</b> and shows live progress while it works in the background.",
        "It <b>remembers</b> answers it has already worked out, so asking the same thing again is near-instant — and costs almost nothing to run.",
        "Every account can only ever see <b>its own data</b> — I found and closed the hole where one user could have read another's results.",
      ],
      tech: [
        "Re-architected a blocking 28s OpenAI call into an <b>asynchronous job pipeline</b> using CompletableFuture and a thread-safe ConcurrentHashMap job store, returning a job ID in 500ms while the React client polls for live progress.",
        "Added a <b>Redis caching layer</b> (Spring @Cacheable, composite key on job title, location and experience, 1-hour TTL), serving repeat queries in <b>314ms vs 28s — nearly 90× faster</b> — and cutting OpenAI token cost.",
        "Secured <b>12 REST endpoints</b> with stateless JWT authentication (custom OncePerRequestFilter, HS256, BCrypt) and prevented <b>IDOR / broken object-level authorization</b> by scoping every async job and query to its owner.",
      ],
    },
    tags: [
      "Java 17",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
      "React 19",
      "Tailwind",
      "Docker",
    ],
  },
];

// Numbers used by the interactive cache demo.
export const demoNumbers = {
  coldMs: 28040,
  warmMs: 314,
  coldRealMs: 3600, // 28s compressed to a 3.6s real wait, labelled honestly in the UI
  speedup: "89×",
  band: "₹ 14.5 – 19 LPA",
  role: "Backend Engineer",
  city: "Bengaluru",
  exp: "2 years",
  verdict: "Backend Engineer · Bengaluru · 2 years · you're currently below the median",
  script:
    "Based on my work on production Java and Spring Boot systems, and the market range for this role in Bengaluru, I'd like to discuss a base of ₹17 LPA.",
  waitMessages: [
    [0, "Sending your details…"],
    [12, "Asking the AI model…"],
    [32, "Still thinking…"],
    [55, "Analysing market data for Bengaluru…"],
    [74, "Still thinking…"],
    [90, "Writing your negotiation script…"],
  ],
};
