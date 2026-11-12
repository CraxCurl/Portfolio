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
  avatar: "https://avatars.githubusercontent.com/u/264704848?v=4",
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
    statBadge: "5 QUESTS",
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
    meta: "Chennai, India · On site",
    period: "Jul 2026 to Present",
    summary:
      "Selected to the club web development team, shipping web initiatives and internal tooling for technical projects and events.",
    current: true,
    kind: "work",
  },
  {
    role: "Web Development Member",
    org: "Android Club, VIT Chennai",
    meta: "Chennai, India · On site",
    period: "Jun 2026 to Present",
    summary:
      "Joined as a technical member through the 2026 recruitment cycle, contributing to club projects, workshops and developer initiatives.",
    current: true,
    kind: "work",
  },
  {
    role: "Summer Trainee: Full Stack (MERN)",
    org: "NIELIT, Lucknow",
    meta: "Lucknow, India · Hybrid · Part time",
    period: "Jun 2026 to Aug 2026",
    summary:
      "90 hour summer training in full stack development: React.js, Node.js, Express.js, REST APIs, JSX, state and routing, plus hands on MySQL and MongoDB.",
    kind: "work",
  },
  {
    role: "Cybersecurity Department Member",
    org: "Robotics Club, VIT Chennai",
    meta: "Chennai, India · On site · Part time",
    period: "Nov 2025 to Mar 2026",
    summary:
      "Active member of the cybersecurity department: workshops, technical deep dives, and collaborative security learning alongside club initiatives.",
    kind: "work",
  },
  {
    role: "B.Tech, Computer Science (AI & Robotics)",
    org: "Vellore Institute of Technology",
    meta: "Chennai, India",
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
    title: "AI & Agents",
    blurb: "Multi agent orchestration, LLM pipelines, and graph learning.",
    icon: "ai",
    skills: [
      { name: "Multi Agent Systems", level: 85 },
      { name: "Gemini 2.5 Flash", level: 80 },
      { name: "Google Gemma", level: 70 },
      { name: "Graph Neural Networks", level: 65 },
      { name: "Prompt Engineering", level: 85 },
      { name: "Python", level: 85 },
    ],
  },
  {
    title: "Frontend",
    blurb: "Interfaces that stay fast and feel considered.",
    icon: "web",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Three.js", level: 60 },
      { name: "HTML & CSS", level: 95 },
    ],
  },
  {
    title: "Backend & Data",
    blurb: "APIs, persistence and the plumbing in between.",
    icon: "data",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "FastAPI", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 70 },
      { name: "Java", level: 65 },
    ],
  },
  {
    title: "Systems & Tools",
    blurb: "Hardware, security, and everything shipping adjacent.",
    icon: "systems",
    skills: [
      { name: "ESP32 / IoT", level: 75 },
      { name: "Cybersecurity", level: 65 },
      { name: "Git & GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "Linux", level: 70 },
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
      "Upload a CV, state your goals, and get a full dashboard of career intelligence: skill gaps against your target role, a personalised roadmap, ATS insights, matched hackathons and internships, plus an interviewer bot that knows your history. Five specialised agents run in parallel: resume/ATS, skills, roadmap, opportunities, and interviews, orchestrated by a master agent with a fallback engine so the dashboard still renders when an individual agent returns bad output.",
    stack: ["FastAPI", "React", "MongoDB", "Gemini 2.5 Flash", "Multi Agent"],
    category: "ai",
    live: "https://ascend-iq-mu.vercel.app",
    repo: "https://github.com/CraxCurl/AscendIQ",
    year: "2026",
    accent: "pink",
    featured: true,
    highlight: "Round 2 · Faraway Hackathon",
  },
  {
    name: "Sahayak",
    tagline: "AI browser extension for a more accessible web",
    description:
      "Built on Google Gemma, Sahayak adapts website interfaces in real time, simplifying complex workflows, assisting intelligently with forms, and enhancing UI on the fly to make the web usable for more people.",
    stack: ["TypeScript", "Google Gemma", "Browser Extension", "Python"],
    category: "ai",
    repo: "https://github.com/CraxCurl/Sahayak",
    year: "2026",
    accent: "violet",
    highlight: "Accessibility",
  },
  {
    name: "GraphGuard AI",
    tagline: "Real time graph fraud detection",
    description:
      "A transaction monitoring system using graph neural networks to surface mule networks, rapid fund flows and laundering patterns across payment channels, featuring explainable risk scores, cross border analysis, privacy safe intelligence sharing and automated compliance reporting.",
    stack: ["Graph Neural Networks", "Python", "FinTech", "Explainable AI"],
    category: "ai",
    repo: "https://github.com/CraxCurl/GraphGuard-AI",
    year: "2026",
    accent: "sky",
    highlight: "GNN",
  },
  {
    name: "ResQLink",
    tagline: "IoT emergency alert system",
    description:
      "Connects an ESP32 device to a web platform to fire SOS messages with live GPS location to registered contacts the moment they are needed, built around smart automation, secure cloud integration and interactive tracking for rapid response.",
    stack: ["ESP32", "JavaScript", "IoT", "GPS", "Realtime"],
    category: "hardware",
    repo: "https://github.com/CraxCurl/ResQLink",
    year: "2026",
    accent: "amber",
    highlight: "Hardware",
  },
  {
    name: "AgriX",
    tagline: "AI farming assistant, Bauhaus styled",
    description:
      "A smart farming assistant that helps farmers make better decisions with AI driven guidance, wrapped in a deliberately bold Bauhaus constructivist interface.",
    stack: ["JavaScript", "AI", "Data Viz"],
    category: "web",
    live: "https://agri-x-ten.vercel.app",
    repo: "https://github.com/CraxCurl/AgriX",
    year: "2026",
    accent: "lime",
  },
  {
    name: "Acadly",
    tagline: "Real time classroom ecosystem",
    description:
      "Teachers get QR attendance, Excel registry uploads and doubt resolution with image support; students mark presence and send private queries from mobile. Adds targeted announcements on top of a streamlined UI for both sides of the classroom.",
    stack: ["Web + Mobile", "QR Attendance", "Realtime"],
    category: "web",
    live: "https://acadlyfr.vercel.app",
    repo: "https://github.com/CraxCurl/Acadly",
    year: "2026",
    accent: "sky",
  },
  {
    name: "devChart",
    tagline: "Trello for developer collaboration",
    description:
      "A collaboration board built for developers working across multiple projects at once, keeping task state and ownership legible.",
    stack: ["TypeScript", "React", "Collaboration"],
    category: "web",
    live: "https://dev-chart-five.vercel.app",
    repo: "https://github.com/CraxCurl/devChart",
    year: "2026",
    accent: "violet",
  },
  {
    name: "EventHub Scrapper",
    tagline: "Event aggregation, automated",
    description:
      "Scrapes and consolidates event listings into one searchable hub so opportunities do not get lost across a dozen different sites.",
    stack: ["JavaScript", "Web Scraping", "Node.js"],
    category: "tools",
    live: "https://event-hub-scrapper.vercel.app",
    repo: "https://github.com/CraxCurl/EventHubScrapper",
    year: "2026",
    accent: "lime",
  },
  {
    name: "Family Feud",
    tagline: "Live quiz game for campus events",
    description:
      "A browser based Family Feud clone built to run real audience games at club events: scoreboards, reveals and round control included.",
    stack: ["JavaScript", "Game", "Realtime"],
    category: "tools",
    live: "https://acfeud.vercel.app",
    repo: "https://github.com/CraxCurl/FamilyFeud",
    year: "2026",
    accent: "amber",
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
