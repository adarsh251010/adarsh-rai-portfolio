// Design note: there is deliberately no "strong vs weak" split here.
// Everything listed is something Adarsh has shipped with, so every chip reads
// with the same confidence. Depth is communicated by the hover context, not by
// dimming half the list. Things still being learned live in their own clearly
// labelled group at the end, framed as momentum rather than as a gap.

export const skillGroups = [
  {
    title: "Languages",
    color: "#22d3ee",
    items: [
      { name: "Java 21", where: "Primary language. The entire Axis Max Life onboarding platform — 1,600+ files — is Java 21. Collections, multithreading, streams and lambdas daily." },
      { name: "SQL", where: "Query optimisation, joins, indexing and window functions across PostgreSQL and MySQL." },
      { name: "Python", where: "Automated reporting and reconciliation at Tech Mahindra; now FastAPI services on the AI track." },
      { name: "JavaScript (ES6+)", where: "React front-ends for SalaryLens and this portfolio." },
    ],
  },
  {
    title: "Backend & Frameworks",
    color: "#a78bfa",
    items: [
      { name: "Spring Boot 3.3", where: "Every service I ship. Multi-module production platform serving a live insurance onboarding journey." },
      { name: "Spring MVC", where: "REST controllers across the onboarding journey, with bean validation at the boundary." },
      { name: "Spring Security", where: "12 JWT-secured endpoints on SalaryLens, plus PII-safe filters in the insurance platform." },
      { name: "Spring Data JPA", where: "Entity modelling and repositories across the onboarding platform." },
      { name: "Spring Data Redis", where: "The L2 cache layer — 30-day TTL on premium-rate lookups." },
      { name: "Spring Cloud OpenFeign", where: "20+ third-party clients: PayU, Paytm, TechProcess e-Mandate, eKYC, dedupe, credit bureau, CRM." },
      { name: "Spring Retry", where: "Retry with backoff on every flaky downstream integration, paired with fallbacks." },
      { name: "Hibernate", where: "ORM layer underneath Spring Data JPA on the production platform." },
      { name: "MapStruct", where: "DTO ↔ entity mapping across a 1,600+ file multi-module codebase." },
      { name: "Drools", where: "Eligibility and product-variant rules kept outside the code, so rule changes ship without a release." },
      { name: "Microservices", where: "Multi-module, service-boundary driven design on a live production platform." },
      { name: "REST API design", where: "Contract-first APIs consumed by web and mobile clients, versioned and backward-compatible." },
    ],
  },
  {
    title: "Cloud & Data",
    color: "#60a5fa",
    items: [
      { name: "AWS DynamoDB", where: "Single-table configuration store with composite-key lookups: GST rates, funds, rate-change dates, product/rider and pincode masters." },
      { name: "AWS S3", where: "Moved fund content from Strapi CMS to S3-backed JSON, so monthly fund launches ship without a code release." },
      { name: "AWS Secrets Manager", where: "Credential management for production services across four environments." },
      { name: "AWS SES", where: "Transactional email on the onboarding journey." },
      { name: "Redis (Redisson)", where: "L2 distributed cache, 30-day TTL on premium rates. On SalaryLens it turned a 28-second call into 314ms." },
      { name: "Caffeine", where: "L1 in-JVM cache — 22 config datasets preloaded at startup for sub-millisecond lookups." },
      { name: "PostgreSQL", where: "Primary store for SalaryLens, with pgvector on the AI track." },
      { name: "MySQL", where: "Relational modelling and query work across earlier projects." },
      { name: "NoSQL data modelling", where: "Single-table design, access-pattern-first key schemas on DynamoDB." },
    ],
  },
  {
    title: "Security",
    color: "#f472b6",
    items: [
      { name: "JWT", where: "Stateless auth via a custom OncePerRequestFilter, HS256, across 12 endpoints." },
      { name: "BCrypt", where: "Password hashing on SalaryLens." },
      { name: "AES encryption", where: "Applied to PII-sensitive insurance flows end to end." },
      { name: "SHA-256 hashing", where: "Hashed identifiers in server-to-server analytics events, so raw PII never leaves." },
      { name: "PII masking", where: "Field-level masking so PAN, phone and income never leave in the clear." },
      { name: "OWASP input validation", where: "Validation and sanitisation across public-facing endpoints." },
      { name: "SBOM / Defect Dojo", where: "Remediated dependency and scan findings on the production platform." },
      { name: "IDOR prevention", where: "Scoped every async job and query to its owner on SalaryLens, closing a broken object-level authorization gap." },
    ],
  },
  {
    title: "DevOps & Quality",
    color: "#fbbf24",
    items: [
      { name: "Docker", where: "Multi-stage builds for SalaryLens, deployed on Render." },
      { name: "Jenkins", where: "Build and deploy pipelines at INADEV." },
      { name: "GitLab CI/CD", where: "Pipelines and monthly release-branch merges across DEV/QA/UAT/PROD." },
      { name: "Git", where: "Daily. Owned the monthly release-branch merge across four environments." },
      { name: "Maven", where: "Dependency and build management on a 1,600+ file multi-module project — daily." },
      { name: "SonarQube", where: "Static analysis gates before merge on the production platform." },
      { name: "JUnit 5", where: "Unit tests across service and mapping layers." },
      { name: "Postman", where: "API testing across all 20+ third-party integrations." },
      { name: "JIRA · Agile/Scrum", where: "Sprint delivery, story ownership and release planning." },
    ],
  },
  {
    title: "AI Engineering",
    color: "#4ade80",
    items: [
      { name: "Claude Code", where: "Built 8 coding agents with scoped write permissions that automate monthly config updates and merge-conflict resolution." },
      { name: "Kiro (custom agents)", where: "Custom agents for navigating a 1,600+ file codebase, with safety guardrails." },
      { name: "OpenAI API", where: "Powers SalaryLens analysis — structured output, retries, timeouts and token cost control." },
      { name: "LLM integration", where: "Prompt design, structured JSON output, rate-limit and timeout handling in a production app." },
      { name: "Async LLM pipelines", where: "Re-architected a blocking 28s model call into a CompletableFuture job pipeline returning a job ID in 500ms." },
      { name: "Semantic caching", where: "Composite-key Redis caching on LLM responses — 90× faster repeats and a large drop in token spend." },
    ],
  },
  {
    title: "Domain Expertise",
    color: "#fb923c",
    note: "Two years inside life insurance — this is the context most backend engineers don't have.",
    items: [
      { name: "Life Insurance / BFSI", where: "ULIP, Pension, Term and Savings products on a live onboarding platform." },
      { name: "Premium calculation", where: "Owned contract mapping and benefit illustration flows for 15+ migrated products." },
      { name: "Benefit illustration", where: "Year-by-year projection flows, including multi-scenario outputs." },
      { name: "Payments & e-Mandate", where: "PayU, Paytm and TechProcess e-Mandate integrations end to end." },
      { name: "eKYC & dedupe", where: "Identity verification and duplicate detection on the onboarding journey." },
      { name: "Credit bureau", where: "Bureau pull integration with masking applied at the boundary." },
      { name: "GIFT City (IFSC)", where: "NRI and IFSC international flows with multi-currency and FX-rate handling." },
      { name: "Regulatory PII compliance", where: "Encryption, masking and hashed-PII analytics built for privacy compliance." },
    ],
  },
];

// Framed as momentum, not as a gap.
export const learningSkills = {
  title: "Currently building with",
  color: "#c084fc",
  note: "Shipped as part of Insurance Copilot — see the section below.",
  items: [
    { name: "FastAPI", where: "Async Python services for the Copilot backend." },
    { name: "RAG", where: "Chunking strategies, grounding, and page-level citations over policy documents." },
    { name: "pgvector", where: "Vector storage and HNSW search with per-user metadata isolation." },
    { name: "Hybrid search (BM25 + RRF)", where: "Keyword and vector retrieval fused with reciprocal rank fusion, then reranked." },
    { name: "LangGraph", where: "State machines, Postgres checkpointing and human-in-the-loop interrupts." },
    { name: "MCP", where: "A Model Context Protocol server exposing policy_lookup and claim_checklist tools." },
    { name: "Ragas / evals", where: "Faithfulness and context-precision scoring, with prompt regression tests in CI." },
    { name: "Langfuse", where: "Tracing, per-query cost and latency tracking." },
  ],
};
