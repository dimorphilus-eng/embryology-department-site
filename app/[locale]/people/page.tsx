import type { Metadata } from "next";
import { SectionNote } from "@/components/content/section-note";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { PeopleBrowser, type PersonCardModel } from "@/components/people/people-browser";
import { t } from "@/content/messages";
import { people } from "@/content/people";
import { directions } from "@/content/research";
import { href, l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { sectionText } from "@/lib/sections";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("people", locale, { title: copy.pages.people, lead: copy.peopleLead });
  return pageMetadata(locale, { title: text.title, description: text.lead || copy.peopleLead, path: "/people" });
}

export default async function PeoplePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("people", locale, { title: copy.pages.people, lead: copy.peopleLead });
  const cards: PersonCardModel[] = people.map((person) => ({
    href: href(locale, `/people/${person.slug}`),
    name: l(locale, person.name),
    degree: l(locale, person.degree),
    position: l(locale, person.position),
    positionGroup: person.positionGroup,
    directionIds: person.directions,
    directions: person.directions.map((id) => l(locale, directions.find((item) => item.id === id)?.title ?? { ru: id, en: id })),
    interests: l(locale, person.interests),
    orcid: person.orcid,
  }));

  return (
    <>
      <PageHeader locale={locale} path="/people" title={text.title} lead={text.lead} />
      <SectionNote body={text.body} />
      <Container className="py-12">
        <PeopleBrowser
          locale={locale}
          people={cards}
          directions={directions.map((direction) => ({ id: direction.id, label: l(locale, direction.title) }))}
        />
      </Container>
    </>
  );
}
