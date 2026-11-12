/**
 * Single source of truth for every piece of content on the site.
 * Edit anything here and it flows through to the UI: no component changes needed.
 */

export const profile = {
  name: "Vinayak Tripathi",
  firstName: "Vinayak",
  logo: "VINAYAK",
  pronouns: "He/Him",
  headline:
    "CSE (AI & Robotics) Undergraduate at VIT Chennai | Building, Learning, and Growing Through Technology",
  role: "AI & Full Stack Developer",
  location: "Chennai, Tamil Nadu, India",
  // Hero: arcade title screen
  welcome: "WELCOME TO",
  titleTop: "AN ENGINEERED",
  titleBottom: "JOURNEY",
  /** Arcade flavour text. */
  player: "PLAYER 01",
  pressStart: "PRESS START",
  insertCoin: "INSERT COIN TO CONTINUE",
  tagline:
    "CSE (AI & Robotics) undergrad at VIT Chennai, building multi agent AI systems, accessible web tools, and IoT that solves problems people actually have.",
  // Links. `email` is the public address shown on the page; the address the
  // contact form actually delivers to lives in `CONTACT_TO_EMAIL`.
  email: "vinayak02tripathi2006@gmail.com",
  links: {
    github: "https://github.com/CraxCurl",
    linkedin: "https://www.linkedin.com/in/vinayak-trip/",
  },
  avatar: "/avatar.jpg",
} as const;

export type SectionId =
  | "home"
  | "journey"
  | "arsenal"
  | "adventures"
  | "playworld"
  | "contact";

export interface SectionMeta {
  id: SectionId;
  label: string;
  screen: string;
  href: string;
  tag: string;
  summary: string;
  statBadge: string;
}

/** `screen` is the arcade style caption shown above each section heading. */
export const sections: SectionMeta[] = [
  {
    id: "home",
    label: "Home",
    screen: "Title Screen",
    href: "/",
    tag: "HUD // 01",
    summary: "Character sheet, vital meters and mission control.",
    statBadge: "LV. 2 B.TECH",
  },
  {
    id: "journey",
    label: "Journey",
    screen: "Quest Log",
    href: "/journey",
    tag: "LOG // 02",
    summary: "Clubs at VIT Chennai, NIELIT training, and education timeline.",
    statBadge: "6 QUESTS",
  },
  {
    id: "arsenal",
    label: "Arsenal",
    screen: "Skill Tree",
    href: "/arsenal",
    tag: "TECH // 03",
    summary: "Multi agent AI, full stack MERN, Python, and hardware proficiencies.",
    statBadge: "26 NODES",
  },
  {
    id: "adventures",
    label: "Adventures",
    screen: "Save Slots",
    href: "/adventures",
    tag: "BUILDS // 04",
    summary: "9 shipped builds spanning multi agent copilot, IoT SOS, and web tools.",
    statBadge: "9 BUILDS",
  },
  {
    id: "playworld",
    label: "Playworld",
    screen: "Trophy Room",
    href: "/playworld",
    tag: "SCORE // 05",
    summary: "GSSoC'26 selection, Faraway Hackathon Round 2, and achievements.",
    statBadge: "3 TROPHIES",
  },
  {
    id: "contact",
    label: "Contact",
    screen: "Player 2 Join",
    href: "/contact",
    tag: "COMM // 06",
    summary: "Direct transmission terminal, social channels, and collaboration.",
    statBadge: "ONLINE",
  },
];

/** Nav is split around the centre logo, mirroring the reference layout. */
export const navLeft: SectionId[] = ["home", "journey", "arsenal"];
export const navRight: SectionId[] = ["adventures", "playworld", "contact"];

export const about = {
  heading: "The Journey So Far",
  lead: "I build things that sit between AI and the web.",
  paragraphs: [
    "I am a Computer Science (AI & Robotics) undergraduate at Vellore Institute of Technology Chennai. Most of what I build lives where machine learning meets an interface someone actually has to use: multi agent systems, accessibility tooling, graph based fraud detection, and IoT safety devices.",
    "I was selected as a GSSoC'26 Contributor in the Open Source + AI/Agents track from a pool of 35,000+ applicants, trained in full stack MERN development at NIELIT Lucknow, and I currently serve on the web development teams of both the Robotics Club and Android Club at VIT Chennai.",
    "I like problems where the hard part is not the model: it is making the whole thing hold together, stay fast, and degrade gracefully when something upstream fails.",
  ],
} as const;

export type TimelineItem = {
  role: string;
  org: string;
  meta: string;
  period: string;
  summary: string;
  current?: boolean;
  kind: "work" | "education";
};

export const timeline: TimelineItem[] = [
  {
    role: "Web Development Member",
    org: "Robotics Club, VIT Chennai",
    meta: "Chennai, Tamil Nadu, India · On site",
    period: "Jul 2026 to Present",
    summary:
      "Selected as a Web Development Member of the Robotics Club, VIT Chennai, contributing to web development initiatives and technical projects.",
    current: true,
    kind: "work",
  },
  {
    role: "Technical Member",
    org: "Android Club, VIT Chennai",
    meta: "Chennai, Tamil Nadu, India · On site",
    period: "Jun 2026 to Present",
    summary:
      "Selected as a Technical Member of the Android Club through the 2026 recruitment cycle. Technical Organising Committee for Zero to First Commit, Agent Arena, and Hacktoberfest Hackaday. Shipped AC Feud and Pixel Heist for campus expos.",
    current: true,
    kind: "work",
  },
  {
    role: "Summer Trainee: Full Stack (MERN)",
    org: "NIELIT, Lucknow",
    meta: "Lucknow, Uttar Pradesh, India · Hybrid · Part time",
    period: "Jun 2026 to Aug 2026",
    summary:
      "6 week, 90 hour summer training in full stack development through MERN stack at NIELIT Lucknow. Frontend and backend development using HTML, CSS, JavaScript, React.js, Node.js and Express.js with hands on REST APIs, JSX, state, routing, MySQL and MongoDB.",
    kind: "work",
  },
  {
    role: "Summer Trainee: Data Analytics",
    org: "NIELIT, Gorakhpur",
    meta: "Gorakhpur, Uttar Pradesh, India · On site",
    period: "Jun 2026 to Jul 2026",
    summary:
      "4 week summer training in data analytics using spreadsheets and Power BI at NIELIT Gorakhpur. Mastered pivot tables, financial arithmetic, data visualization, and interactive dashboards, completing with an S Grade (80% and above).",
    kind: "work",
  },
  {
    role: "Cybersecurity Department Member",
    org: "Robotics Club, VIT Chennai",
    meta: "Chennai, Tamil Nadu, India · On site · Part time",
    period: "Nov 2025 to Mar 2026",
    summary:
      "Active member of the Robotics Club Cybersecurity Department, participating in cybersecurity workshops, technical discussions, and collaborative learning activities while contributing to club initiatives.",
    kind: "work",
  },
  {
    role: "B.Tech, Computer Science (AI & Robotics)",
    org: "Vellore Institute of Technology",
    meta: "Chennai, Tamil Nadu, India",
    period: "Jul 2025 to Present",
    summary:
      "Undergraduate degree specialising in artificial intelligence and robotics.",
    current: true,
    kind: "education",
  },
];

export type Skill = {
  name: string;
  /**
   * Self assessed confidence, 0 to 100, rendered as a segmented XP bar.
   * These are estimates, not measurements: tune them to taste.
   */
  level: number;
};

export type SkillGroup = {
  title: string;
  blurb: string;
  icon: "ai" | "web" | "data" | "systems";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Architecture",
    blurb: "Multi agent architectures, neural networks, and distributed systems.",
    icon: "ai",
    skills: [
      { name: "Multi Agent Systems", level: 85 },
      { name: "Python", level: 90 },
      { name: "Graph Neural Networks", level: 75 },
      { name: "Agentic Architecture", level: 85 },
      { name: "Distributed Systems", level: 80 },
      { name: "Vector Search & RAG", level: 80 },
    ],
  },
  {
    title: "Frontend",
    blurb: "Interfaces that stay fast and feel considered.",
    icon: "web",
    skills: [
      { name: "React 19", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 Canvas", level: 80 },
      { name: "HTML & CSS", level: 95 },
    ],
  },
  {
    title: "Backend & Systems",
    blurb: "Real time communication, APIs, and persistence.",
    icon: "data",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "Socket.IO & WebSockets", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Hardware & Tools",
    blurb: "Hardware microcontrollers, telemetry, and shipping infrastructure.",
    icon: "systems",
    skills: [
      { name: "ESP32 / IoT", level: 75 },
      { name: "Git & GitHub", level: 90 },
      { name: "Linux", level: 75 },
      { name: "Vercel", level: 85 },
      { name: "Cloudinary APIs", level: 80 },
      { name: "Problem Solving", level: 90 },
    ],
  },
];

export type ProjectCategory = "ai" | "web" | "hardware" | "tools";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  live?: string;
  repo?: string;
  year: string;
  accent: "pink" | "lime" | "sky" | "violet" | "amber";
  featured?: boolean;
  highlight?: string;
};

export const projects: Project[] = [
  {
    name: "AscendIQ",
    tagline: "Multi agent AI career copilot",
    description:
      "Upload a CV, state your goals, and get a full dashboard of career intelligence: skill gaps against your target role, a personalised roadmap, ATS insights, matched hackathons and internships, plus an interviewer bot that knows your history. Five specialised micro agents run in parallel: resume/ATS, skills, roadmap, opportunities, and interviews, orchestrated by a master agent with a fault tolerant fallback engine so the dashboard reliably renders even if an individual agent fails.",
    stack: ["FastAPI", "React", "MongoDB", "Multi Agent Systems", "Python"],
    category: "ai",
    live: "https://ascend-iq-mu.vercel.app",
    repo: "https://github.com/CraxCurl/AscendIQ",
    year: "2026",
    accent: "pink",
    featured: true,
    highlight: "Round 2 · Faraway Hackathon",
  },
  {
    name: "Pixel Heist",
    tagline: "Interactive real time image trivia engine",
    description:
      "Built for TechnoVIT Expo 2026 at VIT Chennai. A full stack real time image trivia platform featuring dynamic HTML5 canvas pixelation algorithms, live WebSocket synchronization between host and presenter screens, progressive hint reveals, and Cloudinary media pipeline.",
    stack: ["React 19", "Node.js", "Socket.IO", "HTML5 Canvas", "WebSockets"],
    category: "web",
    live: "https://acfeud.vercel.app",
    repo: "https://github.com/CraxCurl",
    year: "2026",
    accent: "lime",
    highlight: "TechnoVIT Expo 2026",
  },
  {
    name: "AC Feud",
    tagline: "Real time multiplayer game show platform",
    description:
      "Built for Club Expo 2026 at VIT Chennai. A full stack live multiplayer game show inspired by Family Feud for campus audiences. Features instant mobile browser buzzers via QR code, real time bidirectional WebSocket synchronization between host and stage screens, programmatic Web Audio sound synthesis, and custom survey management.",
    stack: ["React 19", "Node.js", "Socket.IO", "Web Audio API", "WebSockets"],
    category: "tools",
    live: "https://acfeud.vercel.app",
    repo: "https://github.com/CraxCurl/FamilyFeud",
    year: "2026",
    accent: "amber",
    highlight: "Club Expo 2026",
  },
  {
    name: "GraphGuard AI",
    tagline: "Real time graph fraud detection",
    description:
      "A transaction monitoring system using graph neural networks to surface mule networks, rapid fund flows, and laundering patterns across payment channels, featuring explainable risk scores, cross border analysis, privacy safe intelligence sharing, and automated compliance reporting.",
    stack: ["Graph Neural Networks", "Python", "PyTorch", "NetworkX", "FinTech"],
    category: "ai",
    repo: "https://github.com/CraxCurl/GraphGuard-AI",
    year: "2026",
    accent: "sky",
    highlight: "GNN",
  },
  {
    name: "Sahayak",
    tagline: "Intelligent web accessibility extension",
    description:
      "An intelligent web accessibility extension that adapts website interfaces in real time, simplifying complex workflows, assisting intelligently with multi step forms, and enhancing DOM ergonomics on the fly to make web applications usable for everyone.",
    stack: ["TypeScript", "Browser Extension", "DOM Mutation API", "Python"],
    category: "ai",
    repo: "https://github.com/CraxCurl/Sahayak",
    year: "2026",
    accent: "violet",
    highlight: "Accessibility",
  },
  {
    name: "ResQLink",
    tagline: "IoT emergency alert system",
    description:
      "Connects an ESP32 microcontroller to a responsive web dashboard to fire emergency SOS alerts with live GPS coordinates to registered contacts the moment triggered, built with real time telemetry, cloud relays, and interactive location tracking.",
    stack: ["ESP32", "C++", "IoT Telemetry", "GPS", "WebSockets"],
    category: "hardware",
    repo: "https://github.com/CraxCurl/ResQLink",
    year: "2026",
    accent: "amber",
    highlight: "Hardware",
  },
  {
    name: "Acadly",
    tagline: "Real time classroom ecosystem",
    description:
      "Teachers get QR attendance, Excel registry uploads and doubt resolution with image support; students mark presence and send private queries from mobile. Adds targeted announcements on top of a streamlined UI for both sides of the classroom.",
    stack: ["React", "Node.js", "QR Attendance", "WebSockets", "REST APIs"],
    category: "web",
    live: "https://acadlyfr.vercel.app",
    repo: "https://github.com/CraxCurl/Acadly",
    year: "2026",
    accent: "sky",
  },
  {
    name: "ACMURDLE",
    tagline: "Interactive mystery investigation platform",
    description:
      "Built for the Agent Arena event at Android Club VITC. An interactive murder mystery web application where participants review case files, analyze clues, interrogate logic detectives, and submit crime deductions in real time.",
    stack: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
    category: "web",
    repo: "https://github.com/CraxCurl",
    year: "2026",
    accent: "violet",
    highlight: "Agent Arena 2026",
  },
  {
    name: "devChart",
    tagline: "Visual project orchestration for engineering teams",
    description:
      "A collaboration board built for developers working across multiple projects at once, keeping task state, issue branches, and component ownership legible.",
    stack: ["TypeScript", "React", "State Management", "Tailwind CSS"],
    category: "tools",
    live: "https://dev-chart-five.vercel.app",
    repo: "https://github.com/CraxCurl/devChart",
    year: "2026",
    accent: "lime",
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export type Achievement = {
  title: string;
  org: string;
  period: string;
  description: string;
  stat?: string;
};

export const achievements: Achievement[] = [
  {
    title: "GSSoC'26 Contributor / Mentee",
    org: "GirlScript Summer of Code: Open Source + AI/Agents Track",
    period: "May 2026",
    stat: "35,000+",
    description:
      "Selected from over 35,000 applicants for the Open Source + AI/Agents track, contributing to impactful open source projects across Python, JavaScript, Node.js and Java.",
  },
  {
    title: "Faraway Hackathon: Round 2",
    org: "AscendIQ · Multi agent AI career copilot",
    period: "Aug 2026",
    stat: "Round 2",
    description:
      "Advanced to Round 2 with a five agent career intelligence platform built alongside a team of four, deployed and demo ready.",
  },
  {
    title: "Full Stack Development (MERN)",
    org: "NIELIT, Lucknow",
    period: "Aug 2026",
    stat: "90 hrs",
    description:
      "Completed a six week, 90 hour summer training covering the full MERN stack, REST APIs, and both MySQL and MongoDB.",
  },
];

export const stats = [
  { value: "14+", label: "Public repos" },
  { value: "9", label: "Projects shipped" },
  { value: "5", label: "Live deployments" },
  { value: "2", label: "Campus clubs" },
];

export const contact = {
  heading: "Let us build something",
  lead: "Open to internships, collaborations and interesting problems. Send a message below and it lands straight in my inbox, and you will get a copy back confirming it went through.",
} as const;
