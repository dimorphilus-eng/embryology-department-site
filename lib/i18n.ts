export type Localized = { ru: string; en: string };

export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === "ru" || value === "en";
}

export function localeParams() {
  return locales.map((locale) => ({ locale }));
}

export function l(locale: Locale, value: { ru: string; en: string }) {
  return value[locale];
}

export function href(locale: Locale, path = "/") {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(locale: Locale, iso: string) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toLocaleUpperCase("ru");
}

export function orcidUrl(id: string) {
  return `https://orcid.org/${id}`;
}

export function scopusUrl(id: string) {
  return `https://www.scopus.com/authid/detail.uri?authorId=${id}`;
}

export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("ru").replaceAll("ё", "е").replace(/\s+/g, " ").trim();
}
