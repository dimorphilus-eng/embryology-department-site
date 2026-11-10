import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { NewsBrowser, type NewsCardModel } from "@/components/news/news-browser";
import { t } from "@/content/messages";
import { formatDate, href, localeParams } from "@/lib/i18n";
import { getNewsFeed } from "@/lib/news-feed";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.news, description: copy.newsLead, path: "/news" });
}

export default async function NewsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const kindLabel = {
    news: copy.kindNewsItem,
    seminar: copy.kindSeminar,
    conference: copy.kindConference,
    defense: copy.kindDefense,
  };
  const items: NewsCardModel[] = (await getNewsFeed(locale)).map((item) => ({
    href: href(locale, item.path),
    title: item.title,
    excerpt: item.excerpt,
    date: formatDate(locale, item.date),
    place: item.place,
    kind: item.kind,
    kindLabel: kindLabel[item.kind],
    upcoming: item.upcoming,
  }));

  return (
    <>
      <PageHeader locale={locale} path="/news" title={copy.pages.news} lead={copy.newsLead} />
      <Container className="py-12">
        <NewsBrowser locale={locale} items={items} />
      </Container>
    </>
  );
}
