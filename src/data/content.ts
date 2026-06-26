export type SectionKey = "about" | "experience" | "skills" | "contact";

export const profile = {
  name: "May Thazin Khaing",
  nickname: "Moon",
  role: "Web Developer",
  location: "Bangkok, Thailand",
  tagline:
    "Computer Science grad · front-end focused · building soft, friendly interfaces ✦",
};

export const about = {
  paragraphs: [
    "I build websites, enjoy quiet moments, and like discovering new things at my own pace.",
    "Most of my work revolves around React and TypeScript, but I'm always open to exploring new tools and technologies whenever a project calls for it. ✦",
    "I may not be the loudest person in the room, but I enjoy working with great people and building things together. ✦",
  ],
  tags: [
    "💻 Front-end focused",
    "🎓 CS degree",
    "🤝 Team player",
    "📍 Bangkok, Thailand",
  ],
  languages: ["Thai", "English", "Burmese"],
};

export interface Job {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  stack?: string[];
}

export const experience: Job[] = [
  {
    role: "Software Developer",
    company: "Humanica Public Company Limited",
    location: "Bangkok, Thailand",
    period: "2024 — Present",
    bullets: [
      "Worked on a large-scale HR platform covering payroll, attendance, leave, and employee development tools, integrating React frontend systems with Golang backend services via GraphQL and REST APIs.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Redux",
      "Ant Design",
      "Golang",
      "Leaflet.js",
      "React DnD",
    ],
  },
  {
    role: "Junior Business Analyst",
    company: "Blue Stone Solution",
    location: "Yangon, Myanmar · Bangkok, Thailand",
    period: "2023 — 2024",
    bullets: [
      "Worked with the Senior Business Analyst to align insurance system features with business requirements and translate them into development tasks. Supported documentation and manual testing, and created UI/UX prototypes to visualize user flows before implementation.",
    ],
    stack: ["Figma", "Excel", "Word", "PowerPoint"],
  },
  {
    role: "Travel Recommendation App",
    company: "University of Computer Studies, Kyaing Tong",
    location: "Kyaing Tong, Myanmar",
    period: "Final Year",
    bullets: [
      "Built a React Native mobile app that recommends travel spots in Kengtung based on user interests.",
      "Used Firebase for authentication and data storage.",
      "Designed and developed the full mobile experience including UI and core features.",
    ],
    stack: ["React Native", "Firebase", "JavaScript"],
  },
];

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "HTML / CSS",
  "Ant Design",
  "Tailwind CSS",
  "Golang (basic)",
];

export type ContactTile = "accent" | "accent2" | "gradient";
export type ContactIcon = "mail" | "linkedin" | "briefcase";

export interface ContactLink {
  kind: string;
  value: string;
  href: string;
  icon: ContactIcon;
  tile: ContactTile;
  external?: boolean;
}

export const contact: ContactLink[] = [
  {
    kind: "Email",
    value: "maythazinkhaingmt@gmail.com",
    href: "mailto:maythazinkhaingmt@gmail.com",
    icon: "mail",
    tile: "accent",
  },
  {
    kind: "LinkedIn",
    value: "may-thazin-khaing",
    href: "https://www.linkedin.com/in/may-thazin-khaing-b9573a240/",
    icon: "linkedin",
    tile: "accent2",
    external: true,
  },
  {
    kind: "Work",
    value: "maythazin.k@humanica.com",
    href: "mailto:maythazin.k@humanica.com",
    icon: "briefcase",
    tile: "gradient",
  },
];

export const tabMeta: Record<SectionKey, { url: string; title: string }> = {
  about: { url: "moon.dev/about", title: "About Me" },
  experience: { url: "moon.dev/experience", title: "Experience" },
  skills: { url: "moon.dev/skills", title: "Skills" },
  contact: { url: "moon.dev/contact", title: "Say Hello" },
};

export const navItems: { key: SectionKey; label: string }[] = [
  { key: "about", label: "About" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "contact", label: "Contact" },
];
