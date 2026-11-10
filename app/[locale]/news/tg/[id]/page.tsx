import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { site } from "@/content/site";
import { getNewsFeed } from "@/lib/news-feed";
import { formatDate, href, l } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { getTelegramPost } from "@/lib/telegram";

export const dynamic = "force-dynamic";

function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.startsWith("https://") || part.startsWith("http://") ? (
          <a key={index} href={part} target="_blank" rel="noreferrer" className="text-pine underline underline-offset-4">
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </p>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await resolveLocale(params);
  const post = await getTelegramPost(id);
  const item = (await getNewsFeed(locale)).find((entry) => entry.path === `/news/tg/${id}`);
  if (!post || !item) return {};
  return pageMetadata(locale, {
    title: item.title,
    description: item.excerpt || item.title,
    path: item.path,
  });
}

export default async function TelegramPostPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const locale = await resolveLocale(params);
  const post = await getTelegramPost(id);
  const item = (await getNewsFeed(locale)).find((entry) => entry.path === `/news/tg/${id}`);
  if (!post || !item) notFound();
  const copy = t(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: post.datetime,
    description: item.excerpt || item.title,
    url: post.url,
    author: { "@type": "Organization", name: l(locale, site.name) },
    publisher: { "@type": "Organization", name: l(locale, site.university) },
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        locale={locale}
        path={item.path}
        title={item.title}
        crumbs={[{ label: copy.pages.news, path: "/news" }]}
      />
      <Container className="py-12">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <time dateTime={post.datetime}>{formatDate(locale, post.date)}</time>
          <Badge>{copy.kindNewsItem}</Badge>
          <span>{item.place}</span>
        </div>
        <article className="prose-academic mt-8 max-w-3xl text-lg leading-relaxed">
          {post.text.trim() !== item.title ? <Linkified text={post.text} /> : null}
          {post.image ? <img src={post.image} alt={copy.telegramPhoto} /> : null}
        </article>
        <a href={post.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4">
          {copy.telegramOpen}
        </a>
        <div>
          <Link href={href(locale, "/news")} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4">
            {copy.backToNews}
          </Link>
        </div>
      </Container>
    </>
  );
}
