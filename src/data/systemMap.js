// The clickable architecture diagram in the Experience section.
// `left` → `hub` → `right`, with animated packets along the wires.

export const systemMap = {
  hub: {
    key: "core",
    color: "#a78bfa",
    simple: { label: "The app I build", meta: "Java 21 · Spring Boot 3.3" },
    tech: { label: "onboarding-svc", meta: "Java 21 · Spring Boot 3.3" },
  },
  left: [
    {
      key: "user",
      color: "#64748b",
      simple: { label: "You, on your phone", meta: "entry" },
      tech: { label: "Client", meta: "entry" },
    },
  ],
  right: [
    {
      key: "price",
      color: "#22d3ee",
      simple: { label: "Price calculator", meta: "15+ products" },
      tech: { label: "premium-engine", meta: "15+ products" },
    },
    {
      key: "cache",
      color: "#4ade80",
      simple: { label: "Memory", meta: "2-tier cache" },
      tech: { label: "Caffeine + Redis", meta: "L1 + L2" },
    },
    {
      key: "pay",
      color: "#fbbf24",
      simple: { label: "Payments & ID checks", meta: "20+ systems" },
      tech: { label: "OpenFeign clients", meta: "20+ systems" },
    },
    {
      key: "config",
      color: "#a78bfa",
      simple: { label: "Settings store", meta: "config-driven" },
      tech: { label: "DynamoDB + S3", meta: "single-table" },
    },
    {
      key: "sec",
      color: "#f472b6",
      simple: { label: "Data protection", meta: "AES · SHA-256" },
      tech: { label: "PII hardening", meta: "AES · SHA-256" },
    },
  ],
};

export const systemDetail = {
  user: {
    simple: {
      title: "Someone on their phone",
      body: "They open the app, pick a policy, fill in their details and pay. Everything that happens after this point is my job.",
    },
    tech: {
      title: "Client",
      body: "React / mobile client initiating the onboarding journey — quote, KYC, payment, issuance.",
    },
    tags: ["entry point"],
  },
  core: {
    simple: {
      title: "The app I build",
      body: "This is the centre of everything. It takes the request, asks every other system what it needs to know, assembles the answer, and sends it back — usually in under a third of a second.",
    },
    tech: {
      title: "onboarding-svc",
      body: "Java 21 / Spring Boot 3.3 on a 1,600+ file multi-module platform. Orchestrates the full quote-to-issue path for ULIP, Pension, Term and Savings, including NRI and GIFT City (IFSC) flows.",
    },
    tags: ["Java 21", "Spring Boot 3.3", "MapStruct", "1,600+ files"],
  },
  price: {
    simple: {
      title: "Price calculator",
      body: "Works out what your premium should be from your age, the policy type, how long you want it for, and any add-ons. I moved 15+ policy types onto this new calculator without breaking a single one.",
    },
    tech: {
      title: "Premium-calculation engine",
      body: "Migrated 15+ insurance products: contract mapping, benefit illustration flows and product-variant rules. Backward-compatible rollout, zero production regressions. Drools keeps eligibility rules outside the code.",
    },
    tags: ["15+ products", "0 regressions", "Drools", "benefit illustration"],
  },
  cache: {
    simple: {
      title: "Memory",
      body: "The slowest step in the chain used to run on every single request. Now the app remembers the answer, so the next person gets it instantly. This is the single biggest speed win I've shipped.",
    },
    tech: {
      title: "Two-tier cache",
      body: "Caffeine L1: 22 config datasets preloaded in-JVM at startup. Redis L2: 30-day TTL on premium-rate lookups, sparing the slowest downstream call. Fixed cross-environment eviction so config updates apply without pod restarts.",
    },
    tags: ["Caffeine L1", "Redis L2", "30-day TTL", "Redisson"],
  },
  pay: {
    simple: {
      title: "Payments & ID checks",
      body: "To issue a policy the app has to talk to banks, payment companies, ID verification services and credit bureaus — more than 20 of them. If any one is down, the journey degrades gracefully instead of failing.",
    },
    tech: {
      title: "20+ OpenFeign clients",
      body: "PayU, Paytm, TechProcess e-Mandate, eKYC, dedupe, credit bureau and CRM — each with retry, fallback and graceful degradation.",
    },
    tags: ["OpenFeign", "Spring Retry", "PayU", "Paytm", "eKYC", "credit bureau"],
  },
  config: {
    simple: {
      title: "Settings store",
      body: "Tax rates, fund lists, rate-change dates, pincode data — everything that changes month to month. I set it up so the business team updates these themselves, with no code release and no downtime.",
    },
    tech: {
      title: "DynamoDB + S3",
      body: "Single-table configuration store with composite-key AWS SDK lookups (GST rates, funds, rate-change dates, product/rider and pincode masters). Fund content moved from Strapi CMS to S3-backed JSON, including the /nfo-fund-benefits API.",
    },
    tags: ["DynamoDB", "single-table", "S3", "config-driven"],
  },
  sec: {
    simple: {
      title: "Data protection",
      body: "The app holds PAN numbers, phone numbers and income figures. All of it is encrypted, masked where it should be, and never leaves in readable form — not even in the analytics data.",
    },
    tech: {
      title: "PII hardening",
      body: "AES encryption, SHA-256 hashing and field-level masking on PII-sensitive flows. SBOM / Defect Dojo remediation. Server-to-server analytics events carry only hashed PII for privacy compliance.",
    },
    tags: ["AES", "SHA-256", "field masking", "SBOM", "hashed PII"],
  },
};
