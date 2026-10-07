export const profile = {
  name: "Adarsh Rai",
  initials: "AR", // fallback if the photo fails to load
  photo: "/adarsh.jpg",
  title: "Backend Engineer",
  // cycles in the hero typewriter
  roles: [
    "Backend Engineer",
    "Java 21 · Spring Boot 3 · AWS",
    "Caching & performance",
    "Moving into AI engineering",
  ],
  location: "Bhopal, India",
  availability: "Open to relocation / remote",
  email: "adarshrai251010@gmail.com",
  phone: "+91 78792 34475",
  phoneHref: "tel:+917879234475",
  github: "https://github.com/adarsh251010",
  githubHandle: "github.com/adarsh251010",
  linkedin: "https://linkedin.com/in/adarsh-rai-151407383",
  resume: "/Adarsh_Rai_Backend_Engineer.pdf",

  pitch: {
    simple:
      "I build the <b>engine behind apps</b> — the part you never see, but nothing works without it. Right now I build the system where people buy life insurance online.",
    tech:
      "I build <b>Java 21 / Spring Boot 3 microservices</b> for a life-insurance digital onboarding platform — premium calculation, 20+ third-party integrations, multi-tier caching and PII-secure API design.",
  },
  sub: {
    simple:
      "2 years of experience. Currently at INADEV, working for Axis Max Life Insurance. Based in Bhopal, open to relocation or remote.",
    tech:
      "2 years professional experience. INADEV → client: Axis Max Life Insurance. Bhopal, India — open to relocation / remote.",
  },
};

export const stats = [
  {
    value: 15,
    suffix: "+",
    simple: "insurance products I moved to a new system",
    tech: "products migrated to a new premium engine",
  },
  {
    value: 20,
    suffix: "+",
    simple: "outside systems connected to the app",
    tech: "third-party integrations via OpenFeign",
  },
  {
    text: "Zero",
    simple: "things broke in production during that migration",
    tech: "production regressions across the rollout",
  },
  {
    value: 90,
    suffix: "×",
    simple: "faster after I added caching — try it below",
    tech: "speedup on cached repeat queries (28.0s → 314ms)",
  },
];

export const whatIDo = [
  {
    icon: "🔌",
    simple: {
      title: "I connect things",
      body: "When you pay for a policy, or verify your ID, the app has to talk to other companies. I write that connection — and make sure the app keeps working even when they go down.",
    },
    tech: {
      title: "Integrations",
      body: "20+ third-party REST integrations via OpenFeign — payments, e-Mandate, eKYC, dedupe, credit bureau, CRM — each with retry, fallback and graceful degradation.",
    },
  },
  {
    icon: "⚡",
    simple: {
      title: "I make things fast",
      body: "If the app already worked something out a minute ago, it shouldn't do all that work again. I teach it to remember. Scroll down — you can run the difference yourself.",
    },
    tech: {
      title: "Performance",
      body: "Two-tier caching: Caffeine L1 with 22 config datasets preloaded in-JVM at startup, plus Redis L2 with 30-day TTL on premium-rate lookups, sparing the slowest downstream call entirely.",
    },
  },
  {
    icon: "🔒",
    simple: {
      title: "I keep data safe",
      body: "Insurance apps hold your PAN, phone number and income. I make sure that data is encrypted, hidden where it should be, and never leaves in readable form.",
    },
    tech: {
      title: "Security",
      body: "AES encryption, SHA-256 hashing and field-level masking on PII flows; SBOM / Defect Dojo remediation; server-to-server analytics events carrying only hashed PII.",
    },
  },
];
