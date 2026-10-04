export const profile = {
  name: "Mayur Kale",
  initials: "MK",
  role: "Full Stack Developer",
  focus: "React · Next.js · Node.js",
  location: "Mumbai, India",
  email: "mayurkale2207@gmail.com",
  // TODO: replace with your real handles
  linkedin: "https://linkedin.com/in/mayurkale",
  github: "https://github.com/mayurkale",
  resume: "/Mayur_Kale_Resume.pdf",
  portrait: "/mayur.jpeg",
};

export const stats: {
  k: string;
  v: string;
  /** When present the hero counts up to this number instead of printing `v`. */
  n?: number;
  suffix?: string;
}[] = [
  { k: "Experience", v: "5 years", n: 5, suffix: " yrs" },
  { k: "Industries", v: "3 sectors", n: 3, suffix: "" },
  { k: "Based in", v: "Mumbai" },
];

export const work = [
  {
    title: "Multi-Tenant Site Builder",
    meta: "Sportz Interactive · 2026–now",
    body: "A visual website builder for sports clients, with reusable components, custom branding and content management.",
    tags: ["React", "Next.js", "TypeScript", "Fastify"],
  },
  {
    title: "Product Learning & Assessment",
    meta: "Eduvanz · 2024–2026",
    body: "A learning platform combining video lessons, a document-based voice assistant and role-play assessments to help teams learn and practise product knowledge.",
    tags: ["Next.js", "Node.js", "AI & Voice", "WebSockets"],
  },
  {
    title: "WIZR — Career & Learning",
    meta: "Eduvanz · 2024–2026",
    body: "A marketplace bringing courses, job search, career assessments and interview practice together in one application.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL"],
  },
  {
    title: "Fintech Platforms",
    meta: "Webinfonex · 2022–2024",
    body: "Merchant, EMI commerce and lender portals supporting day-to-day operations, transactions and reporting.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Arjunai & NavVed",
    meta: "Independent work · 2021–2022",
    body: "A stock analytics platform and an agricultural marketplace, built with real-time features, payments and AWS deployment.",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
  },
];

export const capabilities = [
  { name: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS"] },
  { name: "Backend & Data", items: ["Node.js", "Express", "Fastify", "PostgreSQL", "MongoDB", "REST APIs"] },
  {
    name: "Cloud & Deployment",
    items: ["AWS ECS", "EC2", "Lambda", "S3", "RDS", "Aurora", "RDS Proxy", "Docker", "CI/CD"],
  },
  { name: "Integrations", items: ["Payments", "WebSockets", "Document Retrieval", "Speech-to-Text", "Text-to-Speech"] },
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
    note: "Worked on the WIZR career marketplace and a product learning and assessment platform, including document retrieval, streaming voice conversations and role-play assessments.",
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
