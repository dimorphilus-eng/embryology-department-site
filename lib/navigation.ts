export type NavItem = {
  href: string;
  key: "about" | "people" | "research" | "education" | "students" | "news" | "resources" | "contacts";
  children?: { href: string; key: ChildKey }[];
};

export type ChildKey =
  | "directions"
  | "projects"
  | "labs"
  | "publications"
  | "dissertations"
  | "programs"
  | "courses"
  | "schedule"
  | "materials"
  | "internships";

export const mainNav: NavItem[] = [
  { href: "/about", key: "about" },
  { href: "/people", key: "people" },
  {
    href: "/research",
    key: "research",
    children: [
      { href: "/research", key: "directions" },
      { href: "/research/projects", key: "projects" },
      { href: "/research/labs", key: "labs" },
      { href: "/research/publications", key: "publications" },
      { href: "/research/dissertations", key: "dissertations" },
    ],
  },
  {
    href: "/education",
    key: "education",
    children: [
      { href: "/education#programs", key: "programs" },
      { href: "/education/courses", key: "courses" },
      { href: "/education/schedule", key: "schedule" },
      { href: "/education/materials", key: "materials" },
      { href: "/education/internships", key: "internships" },
    ],
  },
  { href: "/students", key: "students" },
  { href: "/news", key: "news" },
  { href: "/resources", key: "resources" },
  { href: "/contacts", key: "contacts" },
];
