export const profile = {
  name: "Mayur Kale",
  initials: "MK",
  role: "Full Stack Developer",
  focus: "AI & LLM Applications",
  location: "Mumbai, India",
  email: "mayurkale2207@gmail.com",
  phone: "+91 90969 45267",
  // TODO: replace with your real handles
  linkedin: "https://linkedin.com/in/mayurkale",
  github: "https://github.com/mayurkale",
  resume: "/Mayur_Kale_Resume.pdf",
  portrait: "/portrait.jpg",
};

export const stats: {
  k: string;
  v: string;
  /** When present the hero counts up to this number instead of printing `v`. */
  n?: number;
  suffix?: string;
}[] = [
  { k: "Experience", v: "5 years", n: 5, suffix: " yrs" },
  { k: "Products shipped", v: "8 products", n: 8, suffix: "" },
  { k: "Based in", v: "Mumbai" },
];

export const work = [
  {
    title: "AI Product Training Assistant",
    meta: "Eduvanz · 2024–2026",
    body:
      "A voice-and-text assistant that turns a company's own product documentation into a conversation. Employees learn by asking questions instead of reading PDFs, and the assistant asks them questions back. Deployed to health insurance clients for internal training.",
    points: [
      "RAG pipeline over client-uploaded documentation, with every response grounded in a retrieved passage rather than generic model output",
      "Multilingual voice interaction — speech in, spoken answers out, alongside standard text chat",
      "Adaptive training mode: the assistant leads a Q&A session and adjusts follow-ups based on what the employee gets wrong",
      "A dedicated agent per product, keeping each knowledge base, prompt set and training flow independently scoped",
      "Multi-tenant admin for client onboarding and document upload, auto-indexed into the knowledge base",
    ],
    tags: ["RAG", "OpenAI", "Gemini", "Vector DB", "ElevenLabs", "Sarvam AI", "Next.js", "Node.js", "AWS"],
    keyTags: ["RAG", "OpenAI", "Gemini", "Vector DB"],
  },
  {
    title: "Multi-Tenant Site Builder",
    meta: "Sportz Interactive · 2026–now",
    body:
      "A no-code platform letting sports clients launch and run their own websites from a shared codebase — each with isolated configuration, branding and content.",
    points: [
      "Drag-and-drop page builder backed by a reusable component library, so pages are composed visually without code changes",
      "Admin-side component styling, global theming and font management — design changes ship without a developer or a deployment",
      "Configuration-driven component architecture supporting per-tenant rendering",
    ],
    tags: ["React", "Next.js", "TypeScript", "Fastify", "PostgreSQL"],
    keyTags: ["TypeScript", "Fastify"],
  },
  {
    title: "WIZR — Career & Learning Marketplace",
    meta: "Eduvanz · 2024–2026",
    body:
      "An integrated marketplace where users enrol in partner courses and use career tools alongside them — job search, assessments and AI-driven interview practice.",
    points: [
      "Course marketplace and job portal with advanced search, filtering and application management",
      "AI-driven mock interviews with real-time feedback, plus resume builder, fitment tests and skill assessments",
      "Payment processing, engagement analytics and role-based access control across every module",
    ],
    tags: ["Next.js", "Redux", "Express", "Prisma", "PostgreSQL"],
    keyTags: ["Prisma"],
  },
  {
    title: "Fintech Platforms",
    meta: "Webinfonex · 2022–2024",
    body:
      "Three production platforms delivered end to end: a merchant portal, an EMI marketplace and a lender management system.",
    points: [
      "Merchant portal for inventory and lead management with reporting dashboards",
      "Stride Marketplace — EMI commerce across education, electronics, hostels and two-wheelers",
      "Lender portal for lender data, compliance tracking and inter-entity communication",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Material UI"],
    keyTags: [],
  },
  {
    title: "Arjunai & NavVed",
    meta: "Freelance · 2021–2022",
    body:
      "Two independent products built and shipped solo. Arjunai is a stock market analytics platform with a risk-free simulated trading environment; NavVed is an agricultural marketplace connecting farmers, buyers and government.",
    points: [
      "Arjunai: advanced filtering, watchlists, interactive visualisations and a CSV-driven analysis module",
      "NavVed: real-time chat over Socket.io, live auction bidding, Razorpay payments and a full admin panel",
      "Both deployed to AWS EC2 behind Nginx with custom domains and encrypted auth middleware",
    ],
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AWS EC2"],
    keyTags: ["Socket.io"],
  },
];

export const capabilities = [
  {
    name: "AI & LLM",
    items: [
      "Generative AI", "RAG", "LLM Agents", "Agentic Workflows", "Conversational AI",
      "OpenAI", "Gemini", "Prompt Engineering", "Vector Databases",
      "Speech-to-Text", "Text-to-Speech", "NLP",
    ],
  },
  {
    name: "Frontend",
    items: [
      "React", "Next.js", "TypeScript", "JavaScript", "Redux",
      "Tailwind CSS", "Material UI", "HTML5", "CSS3",
    ],
  },
  {
    name: "Backend",
    items: [
      "Node.js", "Express", "Fastify", "REST APIs", "Prisma", "Socket.io", "JWT / RBAC",
    ],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    name: "Cloud & DevOps",
    items: [
      "AWS EC2", "S3", "Lambda", "RDS", "EventBridge", "AppConfig",
      "Docker", "Jenkins", "CI/CD", "Nginx",
    ],
  },
  {
    name: "Ways of working",
    items: ["Git", "Jira", "Postman", "Agile / Scrum"],
  },
];

export const experience = [
  {
    when: "Mar 2026 — now",
    role: "Full Stack Developer",
    org: "Sportz Interactive",
    note: "Building a multi-tenant no-code site builder for sports clients — visual page composition, per-tenant theming, configuration-driven rendering.",
  },
  {
    when: "Mar 2024 — Mar 2026",
    role: "Full Stack Developer",
    org: "Eduvanz",
    note: "Built the AI product training assistant and the WIZR career marketplace. Owned both from architecture through deployment.",
  },
  {
    when: "Jul 2022 — Mar 2024",
    role: "Full Stack Developer",
    org: "Webinfonex Softwares",
    note: "Delivered three production fintech platforms across merchant operations, EMI commerce and lender management.",
  },
  {
    when: "Jun 2021 — Jun 2022",
    role: "Full Stack Developer",
    org: "Freelance Consultant",
    note: "Designed, built and deployed two products solo — a stock market analytics platform and an agricultural marketplace.",
  },
];

export const education = {
  degree: "B.Tech",
  school: "Sanjivani College of Engineering, Kopargaon",
  when: "2019 — 2023",
  score: "8.8 CGPA",
};

export const about = [
  "I build things that go into production and stay there. Five years across fintech, edtech and sports — mostly as the person who owns a feature from the architecture conversation through to the deploy that ships it.",
  "The work I care most about right now is conversational AI. Building the product training assistant taught me that the model call is the easy part: what actually decides whether an AI product works is everything around it — retrieval quality, grounding, latency, cost, and what happens when the system doesn't know the answer.",
  "Outside of that I'm most useful in the messy middle of a product — the part where the requirement is still vague, the schema isn't settled, and someone needs to make a call and start building.",
];
