import { profile } from "./profile";
import { track, trackProgress } from "./learning";


export const commandList = [
  "help",
  "whoami",
  "exp",
  "projects",
  "skills",
  "bench",
  "learn",
  "contact",
  "goto",
  "clear",
  "exit",
];

/**
 * Each command returns an array of HTML line strings. `bench` is special-cased
 * in the component because it animates.
 */
export const commands = {
  help: () => [
    '<span class="tc">commands</span>',
    "",
    '  <span class="thl">whoami</span>    short intro',
    '  <span class="thl">exp</span>       work experience',
    '  <span class="thl">projects</span>  what i built',
    '  <span class="thl">skills</span>    skill tree',
    '  <span class="thl">bench</span>     run the cache benchmark',
    '  <span class="thl">learn</span>     ai track progress',
    '  <span class="thl">contact</span>   how to reach me',
    '  <span class="thl">goto</span>      jump to a section  <span class="tdim">(goto work)</span>',
    '  <span class="thl">clear</span>     clear screen',
    '  <span class="thl">exit</span>      close terminal  <span class="tdim">(or esc)</span>',
  ],

  whoami: () => [
    `<span class="tc">${profile.name}</span> — Backend Engineer`,
    '<span class="tdim">Java · Spring Boot · AWS · Microservices · Bhopal, India</span>',
    "",
    "2 years. Currently building Java 21 / Spring Boot 3 services for",
    "Axis Max Life Insurance's digital onboarding platform.",
    "",
    '<span class="tok">15+</span> products migrated · <span class="tok">20+</span> integrations · <span class="tok">0</span> regressions',
  ],

  exp: () => [
    '<span class="tc">INADEV</span> <span class="tdim">· Associate Software Engineer (Backend)</span>  <span class="tok">Jun 2025 – now</span>',
    '<span class="tdim">client: Axis Max Life Insurance · ULIP, Pension, Term, Savings</span>',
    "",
    '  <span class="tok">▸</span> 15+ insurance products → new premium engine, <span class="thl">0 regressions</span>',
    '  <span class="tok">▸</span> 20+ integrations via OpenFeign, retry + fallback + degrade',
    '  <span class="tok">▸</span> two-tier cache (Caffeine + Redis), 22 datasets, 30-day TTL',
    '  <span class="tok">▸</span> DynamoDB single-table config store, S3-backed fund JSON',
    '  <span class="tok">▸</span> NRI + GIFT City (IFSC) multi-currency flows',
    '  <span class="tok">▸</span> AES / SHA-256 / field masking, SBOM remediation',
    '  <span class="tok">▸</span> 8 AI coding agents on Kiro + Claude Code',
    "",
    '<span class="tc">Tech Mahindra</span> <span class="tdim">· Operations Associate</span>  <span class="tdim">Sep 2024 – Jun 2025</span>',
    '  <span class="tdim">▸</span> Python + SQL automation, API testing, release validation',
  ],

  projects: () => [
    '<span class="tc">SalaryLens</span> <span class="tdim">· AI salary negotiation platform</span>',
    '<span class="tdim">github.com/adarsh251010/salarylens</span>',
    "",
    '  <span class="tok">▸</span> 28s blocking OpenAI call → async pipeline, job id in <span class="thl">500ms</span>',
    '  <span class="tok">▸</span> Redis @Cacheable → <span class="tok">314ms vs 28s (90×)</span>',
    '  <span class="tok">▸</span> 12 endpoints JWT-secured, IDOR blocked',
    "",
    `<span class="tc">${track.name}</span> <span class="tvi">· ${trackProgress().label.toLowerCase()}</span>`,
    '  <span class="tdim">FastAPI · pgvector · LangGraph · MCP · Ragas · Langfuse</span>',
  ],

  skills: () => [
    '<span class="tc">/skills</span>',
    '├── <span class="thl">java 21</span>         <span class="tok">████████████</span>  collections · threads · streams',
    '├── <span class="thl">spring boot 3</span>   <span class="tok">████████████</span>  mvc · security · jpa · redis · feign',
    '├── <span class="thl">redis/caffeine</span>  <span class="tok">███████████</span>   two-tier, 30-day ttl',
    '├── <span class="thl">aws</span>             <span class="tok">█████████</span>     dynamodb · s3 · secrets · ses',
    '├── <span class="thl">security</span>        <span class="tok">█████████</span>     jwt · aes · sha-256 · masking',
    '├── <span class="thl">devops</span>          <span class="tok">████████</span>      docker · jenkins · gitlab · maven',
    '├── <span class="thl">bfsi domain</span>     <span class="tok">██████████</span>    premium calc · ekyc · gift city',
    '└── <span class="tvi">ai</span>              <span class="tok">██████</span><span class="tdim">······</span>    rag · langgraph · mcp <span class="tdim">(building)</span>',
  ],

  learn: () => {
    const p = trackProgress();
    const head = [
      `<span class="tc">${track.name}</span> <span class="tvi">— ${p.label}</span>`,
      '<span class="tdim">policy PDF → plain-language explanation, with citations</span>',
      "",
    ];
    const rows = track.weeks.map((t, i) => {
      const n = i + 1;
      const done = p.started && n < p.week;
      const now = p.started && n === p.week;
      const bar = done
        ? `<span class="tok">${"█".repeat(16)}</span>`
        : now
          ? `<span class="thl">${"█".repeat(9)}</span><span class="tdim">${"░".repeat(7)}</span>`
          : `<span class="tdim">${"░".repeat(16)}</span>`;
      const label = done ? `<span class="tdim">${t}</span>` : t;
      return `  <span class="tdim">w${String(n).padStart(2, "0")}</span> ${bar}  ${label}`;
    });
    return head.concat(rows);
  },

  contact: () => [
    `  <span class="thl">email</span>     ${profile.email}`,
    `  <span class="thl">phone</span>     ${profile.phone}`,
    `  <span class="thl">github</span>    ${profile.githubHandle}`,
    '  <span class="thl">linkedin</span>  linkedin.com/in/adarsh-rai-151407383',
    `  <span class="thl">location</span>  ${profile.location} — ${profile.availability.toLowerCase()}`,
  ],
};

export const benchRows = [
  ["salarylens cold", 28040, "#f87171"],
  ["salarylens warm", 314, "#4ade80"],
  ["premium    cold", 1184, "#fbbf24"],
  ["premium    warm", 284, "#4ade80"],
];
