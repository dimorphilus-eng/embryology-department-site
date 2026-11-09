import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { site } from "@/content/site";
import { getArticle, getArticles, isUpcoming } from "@/lib/articles";
import { formatDate, href, l, localeParams } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { mdxComponents } from "@/lib/mdx";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams().flatMap(({ locale }) => getArticles().map((article) => ({ locale, slug: article.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata(locale, {
    title: l(locale, article.title),
    description: l(locale, article.excerpt),
    path: `/news/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const article = getArticle(slug);
  if (!article) notFound();
  const copy = t(locale);
  const kindLabel = {
    news: copy.kindNewsItem,
    seminar: copy.kindSeminar,
    conference: copy.kindConference,
    defense: copy.kindDefense,
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: l(locale, article.title),
    datePublished: article.date,
    description: l(locale, article.excerpt),
    author: { "@type": "Organization", name: l(locale, site.name) },
    publisher: { "@type": "Organization", name: l(locale, site.university) },
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        locale={locale}
        path={`/news/${article.slug}`}
        title={l(locale, article.title)}
        lead={l(locale, article.excerpt)}
        crumbs={[{ label: copy.pages.news, path: "/news" }]}
      />
      <Container className="py-12">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <time dateTime={article.date}>{formatDate(locale, article.date)}</time>
          <Badge>{kindLabel[article.kind]}</Badge>
          {isUpcoming(article.date) ? <Badge>{copy.upcoming}</Badge> : null}
          <span>{l(locale, article.place)}</span>
        </div>
        <article className="prose-academic mt-8 max-w-3xl text-lg leading-relaxed">
          <MDXRemote source={l(locale, article.body)} components={mdxComponents} />
        </article>
        <Link href={href(locale, "/news")} className="mt-10 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4">
          {copy.backToNews}
        </Link>
      </Container>
    </>
  );
}
