export const experience = [
  {
    company: "INADEV",
    role: "Associate Software Engineer (Backend)",
    client: "Axis Max Life Insurance",
    period: "Jun 2025 — present",
    current: true,
    summary: {
      simple:
        "In plain words: <b>I build the engine behind the website where people buy life insurance.</b> You fill in a form, it works out your premium, takes your payment, verifies who you are, and issues the policy. I own the parts that make all of that actually happen.",
      tech:
        "Digital onboarding platform for life insurance — <b>ULIP, Pension, Term and Savings</b>. Java 21, Spring Boot 3.3, OpenFeign, AWS (DynamoDB, S3, Secrets Manager, SES), Redis, Drools, MapStruct, Jenkins, GitLab.",
    },
    points: {
      simple: [
        "Moved <b>15+ types of insurance policy</b> onto a brand-new premium calculation system — and not one of them broke in production.",
        "Connected <b>20+ outside companies</b> to the app: payment gateways, ID verification, credit checks. If one of them goes down, the app degrades gracefully instead of failing.",
        "Made the app <b>remember</b> the things it looks up constantly, so pages return in a fraction of the time instead of waiting on the slowest system in the chain.",
        "Set it up so <b>new funds and rate changes go live without a code release</b> — the business team updates them directly, with no downtime.",
        "Built the journeys for <b>customers living abroad</b> (NRI and GIFT City), handling multiple currencies and live exchange rates.",
        "Locked down <b>personal data</b> — PAN, phone, income — with encryption and masking, so it never leaves in readable form, not even in analytics.",
        "Built myself a toolkit of <b>8 AI coding agents</b> that automate the repetitive monthly work, with strict limits on what they're allowed to change.",
        "Debugged production-critical defects across four environments and ran the monthly release-branch merges.",
      ],
      tech: [
        "Migrated <b>15+ insurance products</b> onto a new premium-calculation engine, owning contract mapping, benefit illustration flows and product-variant rules — backward-compatible rollout with <b>zero production regressions</b>.",
        "Built and consumed REST APIs for <b>20+ third-party integrations</b> via OpenFeign (PayU, Paytm, TechProcess e-Mandate, eKYC, dedupe, credit bureau, CRM) with retry, fallback and graceful degradation.",
        "Extended a <b>two-tier cache (Caffeine + Redis)</b>: 22 config datasets preloaded in-JVM at startup and 30-day-TTL Redis caching of premium-rate lookups, sparing the slowest downstream call; added Redis caching for NFO fund config and fixed cross-environment eviction, so config updates apply without pod restarts.",
        "Delivered config-driven features on a <b>DynamoDB single-table configuration store</b> (GST rates, funds, rate-change dates, product/rider and pincode masters) via composite-key AWS SDK lookups, and moved fund content from Strapi CMS to S3-backed JSON (incl. the <code>/nfo-fund-benefits</code> API), so monthly fund launches ship without code releases.",
        "Developed onboarding journeys on a <b>1,600+ file multi-module Spring Boot platform</b>, including <b>NRI and GIFT City (IFSC)</b> international flows with multi-currency and FX-rate handling.",
        "Hardened PII-sensitive flows with <b>AES encryption, SHA-256 hashing and field-level masking</b>, remediated SBOM / Defect Dojo vulnerabilities, and built server-to-server analytics events carrying hashed PII for privacy compliance.",
        "Created a personal toolkit of <b>8 AI coding agents</b> on Kiro and Claude Code with scoped write permissions and safety guardrails, automating monthly configuration updates, merge-conflict resolution and codebase navigation.",
        "Debugged production-critical defects across DEV/QA/UAT/PROD and managed monthly release-branch merges.",
      ],
    },
    tags: [
      "Java 21",
      "Spring Boot 3.3",
      "OpenFeign",
      "AWS DynamoDB",
      "AWS S3",
      "Redis",
      "Caffeine",
      "Drools",
      "MapStruct",
      "Jenkins",
      "GitLab CI",
    ],
  },
  {
    company: "Tech Mahindra",
    role: "Operations Associate (tech-enabled role)",
    period: "Sep 2024 — Jun 2025",
    current: false,
    summary: {
      simple:
        "Wrote scripts that produced the repetitive daily reports automatically, and helped test new releases before they went live.",
      tech:
        "Automated reporting and reconciliation workflows with Python and SQL; supported API testing and release validation.",
    },
    points: { simple: [], tech: [] },
    tags: [],
  },
];

export const education = [
  { degree: "Master of Computer Applications (MCA)", school: "Chandigarh University", year: "2024" },
  { degree: "Data Science Program", school: "Masai School", year: "2025" },
];
