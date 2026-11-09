import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { searchSite, type SearchKind } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.search, description: copy.searchLead, path: "/search" });
}

export default async function SearchPage({
  params,
  searchParams,
}: LocaleParams & { searchParams: Promise<{ q?: string | string[] }> }) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const queryParam = (await searchParams).q;
  const query = Array.isArray(queryParam) ? queryParam[0] ?? "" : queryParam ?? "";
  const trimmed = query.trim();
  const results = trimmed.length > 1 ? searchSite(locale, trimmed) : [];
  const kindLabel: Record<SearchKind, string> = {
    person: copy.kindPerson,
    publication: copy.kindPublication,
    course: copy.kindCourse,
    news: copy.kindNews,
    page: copy.kindPage,
  };

  return (
    <>
      <PageHeader locale={locale} path="/search" title={copy.pages.search} lead={copy.searchLead} />
      <Container className="py-12">
        <form action={`/${locale}/search`} method="get" className="flex flex-col gap-3 sm:flex-row" role="search">
          <label className="sr-only" htmlFor="q">
            {copy.search}
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder={copy.searchPlaceholder}
            className="min-h-12 w-full border border-line bg-card px-3 text-base"
          />
          <button type="submit" className="min-h-12 bg-button px-5 font-semibold text-button-foreground">
            {copy.searchButton}
          </button>
        </form>
        <div className="mt-8" aria-live="polite">
          {trimmed.length === 0 ? <p className="text-muted">{copy.searchPrompt}</p> : null}
          {trimmed.length === 1 ? <p>{copy.searchPrompt}</p> : null}
          {trimmed.length > 1 && results.length === 0 ? <p>{copy.searchEmpty}</p> : null}
          {results.length > 0 ? (
            <>
              <p className="text-sm text-muted">
                {copy.results}: {results.length}
              </p>
              <ul className="mt-4 grid gap-3">
                {results.map((result) => (
                  <li key={`${result.kind}-${result.href}-${result.title}`}>
                    <article className="border border-line bg-card p-4">
                      <Badge>{kindLabel[result.kind]}</Badge>
                      <h2 className="mt-2 font-serif text-2xl">
                        <Link href={result.href} className="underline-offset-4 hover:underline">
                          {result.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{result.text}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </Container>
    </>
  );
}
