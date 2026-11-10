import { getNewsFeed } from "@/lib/news-feed";
import { courses } from "@/content/education";
import { people } from "@/content/people";
import { publications } from "@/content/research";
import { t } from "@/content/messages";
import { href, l, normalizeSearch, type Locale } from "@/lib/i18n";
import { siteSections } from "@/lib/sections";
import { getStore } from "@/lib/store";

export type SearchKind = "person" | "publication" | "course" | "news" | "page";

export type SearchHit = {
  kind: SearchKind;
  title: string;
  text: string;
  href: string;
};

const pages: { path: string; title: keyof ReturnType<typeof t>["pages"]; text: { ru: string; en: string } }[] = [
  { path: "/about", title: "about", text: { ru: "история миссия заведующий структура", en: "history mission head structure" } },
  { path: "/people", title: "people", text: { ru: "сотрудники преподаватели", en: "staff faculty people" } },
  { path: "/research", title: "research", text: { ru: "направления наука эмбриология", en: "research themes embryology" } },
  { path: "/research/projects", title: "projects", text: { ru: "гранты проекты", en: "grants projects" } },
  { path: "/research/labs", title: "labs", text: { ru: "лаборатории", en: "laboratories labs" } },
  { path: "/research/publications", title: "publications", text: { ru: "статьи публикации", en: "papers publications" } },
  { path: "/research/dissertations", title: "dissertations", text: { ru: "диссертации защиты", en: "theses dissertations defence" } },
  { path: "/education", title: "education", text: { ru: "бакалавриат магистратура аспирантура", en: "bachelor master doctoral programme" } },
  { path: "/education/courses", title: "courses", text: { ru: "курсы дисциплины", en: "courses classes" } },
  { path: "/education/schedule", title: "schedule", text: { ru: "расписание пары", en: "timetable schedule" } },
  { path: "/education/materials", title: "materials", text: { ru: "программы pdf материалы", en: "syllabus pdf materials" } },
  { path: "/education/internships", title: "internships", text: { ru: "практика стажировка", en: "placement internship" } },
  { path: "/students", title: "students", text: { ru: "поступление абитуриенты общество", en: "admissions applicants society" } },
  { path: "/news", title: "news", text: { ru: "новости семинар конференция", en: "news seminar conference" } },
  { path: "/resources", title: "resources", text: { ru: "базы xenbase библиотека", en: "databases xenbase library" } },
  { path: "/contacts", title: "contacts", text: { ru: "адрес телефон почта карта", en: "address phone email map" } },
];

export async function searchSite(locale: Locale, query: string): Promise<SearchHit[]> {
  const tokens = normalizeSearch(query)
    .split(" ")
    .filter((token) => token.length > 1);
  if (tokens.length === 0) return [];

  const copy = t(locale);
  const docs: SearchHit[] = [
    ...people.map((person) => ({
      kind: "person" as const,
      title: l(locale, person.name),
      text: `${l(locale, person.position)} ${l(locale, person.interests)} ${l(locale, person.degree)}`,
      href: href(locale, `/people/${person.slug}`),
    })),
    ...publications.map((item) => ({
      kind: "publication" as const,
      title: l(locale, item.title),
      text: `${l(locale, item.authors)} ${item.year} ${l(locale, item.venue)}`,
      href: href(locale, "/research/publications"),
    })),
    ...courses.map((course) => ({
      kind: "course" as const,
      title: l(locale, course.title),
      text: `${l(locale, course.summary)} ${l(locale, course.semester)}`,
      href: href(locale, "/education/courses"),
    })),
    ...(await getNewsFeed(locale)).map((item) => ({
      kind: "news" as const,
      title: item.title,
      text: `${item.excerpt} ${item.place}`,
      href: href(locale, item.path),
    })),
    ...pages.map((page) => ({
      kind: "page" as const,
      title: copy.pages[page.title],
      text: l(locale, page.text),
      href: href(locale, page.path),
    })),
    ...getStore().pages.map((page) => ({
      kind: "page" as const,
      title: l(locale, page.title),
      text: `${l(locale, page.lead)} ${l(locale, page.body).slice(0, 500)}`,
      href: href(locale, `/p/${page.slug}`),
    })),
  ];

  for (const section of getStore().sections) {
    const meta = siteSections.find((item) => item.key === section.key);
    if (!meta) continue;
    const hit = docs.find((item) => item.kind === "page" && item.href === href(locale, meta.path));
    if (!hit) continue;
    hit.text = `${hit.text} ${l(locale, section.title)} ${l(locale, section.lead)} ${l(locale, section.body).slice(0, 500)}`;
  }

  return docs
    .filter((doc) => {
      const haystack = normalizeSearch(`${doc.title} ${doc.text}`);
      return tokens.every((token) => haystack.includes(token));
    })
    .slice(0, 40);
}
