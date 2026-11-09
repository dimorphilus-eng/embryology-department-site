import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Localized, Locale } from "@/lib/i18n";

export type ArticleKind = "news" | "conference" | "seminar" | "defense";

export type Article = {
  slug: string;
  date: string;
  kind: ArticleKind;
  title: Localized;
  excerpt: Localized;
  place: Localized;
  body: Localized;
};

type Frontmatter = {
  slug: string;
  date: string | Date;
  kind: ArticleKind;
  title: Localized;
  excerpt: Localized;
  place: Localized;
};

function splitBody(content: string): Localized {
  const normalized = content.trim();
  const [ruPart = "", enPart = ""] = normalized.split(/\n:::en\n/);
  return {
    ru: ruPart.replace(/^:::ru\s*/, "").trim(),
    en: enPart.trim(),
  };
}

export const getArticles = cache((): Article[] => {
  const dir = path.join(process.cwd(), "content/articles");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = matter(raw);
      const data = parsed.data as Frontmatter;
      return {
        slug: data.slug,
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
        kind: data.kind,
        title: data.title,
        excerpt: data.excerpt,
        place: data.place,
        body: splitBody(parsed.content),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getArticle(slug: string) {
  return getArticles().find((article) => article.slug === slug);
}

export function isUpcoming(date: string) {
  return new Date(`${date}T23:59:59Z`).getTime() >= Date.now();
}

export function articlePath(locale: Locale, slug: string) {
  return `/${locale}/news/${slug}`;
}
