import type { Metadata } from "next";
import { site } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";

const indexable = process.env.SITE_INDEXABLE !== "false";

export function pageMetadata(
  locale: Locale,
  {
    title,
    description,
    path,
  }: {
    title: string;
    description: string;
    path: string;
  },
): Metadata {
  const canonical = new URL(href(locale, path), site.url).toString();
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ru: new URL(href("ru", path), site.url).toString(),
        en: new URL(href("en", path), site.url).toString(),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: locale === "ru" ? site.name.ru : site.name.en,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? ["en_US"] : ["ru_RU"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}
