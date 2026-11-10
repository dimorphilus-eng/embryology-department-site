import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { people } from "@/content/people";
import { site } from "@/content/site";
import { href, locales } from "@/lib/i18n";
import { getStore } from "@/lib/store";
import { getTelegramPosts } from "@/lib/telegram";

export const dynamic = "force-dynamic";

const paths = [
  "/",
  "/about",
  "/people",
  "/research",
  "/research/projects",
  "/research/labs",
  "/research/publications",
  "/research/dissertations",
  "/education",
  "/education/courses",
  "/education/schedule",
  "/education/materials",
  "/education/internships",
  "/students",
  "/news",
  "/resources",
  "/contacts",
  "/search",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const articles = getArticles().map((article) => `/news/${article.slug}`);
  const telegram = (await getTelegramPosts()).map((post) => `/news/tg/${post.id}`);
  const profiles = people.map((person) => `/people/${person.slug}`);
  const custom = getStore().pages.map((page) => `/p/${page.slug}`);
  const all = [...paths, ...articles, ...telegram, ...profiles, ...custom];

  return locales.flatMap((locale) =>
    all.map((path) => ({
      url: new URL(href(locale, path), site.url).toString(),
      lastModified: now,
      alternates: {
        languages: {
          ru: new URL(href("ru", path), site.url).toString(),
          en: new URL(href("en", path), site.url).toString(),
        },
      },
    })),
  );
}
