import { getArticles, isUpcoming, type ArticleKind } from "@/lib/articles";
import { t } from "@/content/messages";
import { l, type Locale } from "@/lib/i18n";
import { getTelegramPosts } from "@/lib/telegram";

export type FeedItem = {
  key: string;
  path: string;
  date: string;
  title: string;
  excerpt: string;
  place: string;
  kind: ArticleKind;
  upcoming: boolean;
  sort: number;
};

function titleAndExcerpt(text: string, photoLabel: string) {
  const clean = text.trim();
  if (!clean) return { title: photoLabel, excerpt: "" };
  const lines = clean
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const first = lines[0] ?? clean;
  if (first.length <= 140) {
    return {
      title: first,
      excerpt: lines.slice(1).join(" ").slice(0, 280),
    };
  }
  const cut = first.slice(0, 140);
  const space = cut.lastIndexOf(" ");
  const title = (space > 60 ? cut.slice(0, space) : cut).trim();
  return { title, excerpt: clean.slice(title.length).trim().slice(0, 280) };
}

export async function getNewsFeed(locale: Locale): Promise<FeedItem[]> {
  const copy = t(locale);
  const articles: FeedItem[] = getArticles().map((article) => ({
    key: `site-${article.slug}`,
    path: `/news/${article.slug}`,
    date: article.date,
    title: l(locale, article.title),
    excerpt: l(locale, article.excerpt),
    place: l(locale, article.place),
    kind: article.kind,
    upcoming: isUpcoming(article.date),
    sort: Date.parse(`${article.date}T12:00:00Z`) || 0,
  }));
  const posts = await getTelegramPosts();
  const telegram: FeedItem[] = posts.map((post) => {
    const view = titleAndExcerpt(post.text, copy.telegramPhoto);
    return {
      key: `tg-${post.id}`,
      path: `/news/tg/${post.id}`,
      date: post.date,
      title: view.title,
      excerpt: view.excerpt,
      place: `${copy.telegramPlace} · @${post.channel}`,
      kind: "news" as const,
      upcoming: false,
      sort: Date.parse(post.datetime) || 0,
    };
  });
  return [...articles, ...telegram].sort((a, b) => b.sort - a.sort);
}
