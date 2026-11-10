import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PublicationBrowser } from "@/components/publications/publication-browser";
import { t } from "@/content/messages";
import { people } from "@/content/people";
import { publications } from "@/content/research";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.publications, description: copy.publicationsLead, path: "/research/publications" });
}

export default async function PublicationsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const authorSlugs = new Set(publications.flatMap((item) => item.authorSlugs));

  return (
    <>
      <PageHeader
        locale={locale}
        path="/research/publications"
        title={copy.pages.publications}
        lead={copy.publicationsLead}
        crumbs={[{ label: copy.pages.research, path: "/research" }]}
      />
      <Container className="py-12">
        <PublicationBrowser
          locale={locale}
          items={publications.map((item) => ({
            id: item.id,
            title: l(locale, item.title),
            authors: l(locale, item.authors),
            authorSlugs: item.authorSlugs,
            year: item.year,
            venue: l(locale, item.venue),
            doi: item.doi,
          }))}
          authors={people
            .filter((person) => authorSlugs.has(person.slug))
            .map((person) => ({ slug: person.slug, name: l(locale, person.name) }))}
        />
      </Container>
    </>
  );
}
