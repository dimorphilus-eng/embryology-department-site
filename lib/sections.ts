import type { Locale } from "@/lib/i18n";
import { getStore, type ManagedSection, type SectionKey } from "@/lib/store";

export const siteSections: { key: SectionKey; path: string; label: string; hint: string }[] = [
  {
    key: "about",
    path: "/about",
    label: "О кафедре",
    hint: "Кнопка «О кафедре» на главной открывает /about.",
  },
  {
    key: "students",
    path: "/students",
    label: "Абитуриентам и студентам",
    hint: "Кнопка «Абитуриентам» на главной открывает /students.",
  },
  {
    key: "education",
    path: "/education",
    label: "Образование",
    hint: "Кнопка «Образование» на главной открывает /education.",
  },
  {
    key: "people",
    path: "/people",
    label: "Сотрудники",
    hint: "Кнопка «Сотрудники» открывает /people. Карточки сотрудников остаются, текст над ними можно заменить.",
  },
  {
    key: "news",
    path: "/news",
    label: "Новости",
    hint: "Кнопка «Новости» открывает /news. Здесь меняется вступление. Сами сообщения добавляются в разделе «Новости».",
  },
];

export function isSectionKey(value: string): value is SectionKey {
  return siteSections.some((item) => item.key === value);
}

export function getSection(key: SectionKey): ManagedSection | undefined {
  return getStore().sections.find((item) => item.key === key);
}

function shown(locale: Locale, value: { ru: string; en: string } | undefined) {
  if (!value) return "";
  const text = locale === "en" ? value.en || value.ru : value.ru || value.en;
  return text.trim();
}

export function sectionText(
  key: SectionKey,
  locale: Locale,
  fallback: { title: string; lead?: string },
) {
  const saved = getSection(key);
  const title = shown(locale, saved?.title) || fallback.title;
  const lead = shown(locale, saved?.lead) || fallback.lead;
  const body = shown(locale, saved?.body);
  return { title, lead, body };
}

export function sectionHasText(section: ManagedSection | undefined) {
  if (!section) return false;
  return [section.title, section.lead, section.body].some((field) => field.ru.trim() || field.en.trim());
}
