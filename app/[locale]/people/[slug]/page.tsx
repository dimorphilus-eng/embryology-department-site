import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/layout/external-link";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/layout/json-ld";
import { PageHeader } from "@/components/layout/page-header";
import { Monogram } from "@/components/people/monogram";
import { Badge } from "@/components/ui/badge";
import { t } from "@/content/messages";
import { getPerson, people } from "@/content/people";
import { courses } from "@/content/education";
import { directions, publications } from "@/content/research";
import { href, l, localeParams, orcidUrl, scopusUrl } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { personJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return localeParams().flatMap(({ locale }) => people.map((person) => ({ locale, slug: person.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleParams & { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const person = getPerson(slug);
  if (!person) return {};
  return pageMetadata(locale, {
    title: l(locale, person.name),
    description: l(locale, person.interests),
    path: `/people/${person.slug}`,
  });
}

export default async function PersonPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const person = getPerson(slug);
  if (!person) notFound();
  const copy = t(locale);
  const works = publications.filter((item) => item.authorSlugs.includes(person.slug));
  const taught = courses.filter((course) => person.courses.includes(course.slug));

  return (
    <>
      <JsonLd data={personJsonLd(locale, person.slug)} />
      <PageHeader
        locale={locale}
        path={`/people/${person.slug}`}
        title={l(locale, person.name)}
        lead={l(locale, person.position)}
        crumbs={[{ label: copy.pages.people, path: "/people" }]}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[16rem_1fr]">
        <aside className="border border-line bg-card p-5">
          <Monogram name={l(locale, person.name)} className="h-24 w-24 text-3xl" />
          <p className="mt-4 text-sm text-muted">{l(locale, person.degree)}</p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="font-semibold">{copy.email}</dt>
              <dd>
                <a className="text-pine underline underline-offset-4" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{copy.phone}</dt>
              <dd>
                <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">{copy.office}</dt>
              <dd>{l(locale, person.office)}</dd>
            </div>
          </dl>
          <div className="mt-4 grid gap-2 text-sm">
            <ExternalLink href={orcidUrl(person.orcid)} newTabLabel={copy.newTab} className="text-pine underline underline-offset-4">
              {copy.orcid} {person.orcid}
            </ExternalLink>
            <ExternalLink href={scopusUrl(person.scopus)} newTabLabel={copy.newTab} className="text-pine underline underline-offset-4">
              {copy.scopus} {person.scopus}
            </ExternalLink>
          </div>
        </aside>
        <div className="grid gap-10">
          <section>
            <h2 className="font-serif text-3xl">{copy.biography}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, person.bio)}</p>
          </section>
          <section>
            <h2 className="font-serif text-3xl">{copy.interests}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, person.interests)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {person.tags.map((tag) => (
                <li key={l(locale, tag)}>
                  <Badge>{l(locale, tag)}</Badge>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {person.directions.map((id) => {
                const direction = directions.find((item) => item.id === id);
                if (!direction) return null;
                return (
                  <li key={id}>
                    <Link href={`${href(locale, "/research")}#${id}`} className="text-pine underline underline-offset-4">
                      {l(locale, direction.title)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl">{copy.coursesTaught}</h2>
            <ul className="mt-4 grid gap-2">
              {taught.map((course) => (
                <li key={course.slug}>
                  <Link href={href(locale, "/education/courses")} className="underline-offset-4 hover:underline">
                    {l(locale, course.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-3xl">{copy.selectedPublications}</h2>
            <ol className="mt-4 border-t border-line">
              {works.map((item) => (
                <li key={item.id} className="border-b border-line py-4">
                  <p className="text-sm text-bronze">{item.year}</p>
                  <p className="mt-1 font-serif text-xl">{l(locale, item.title)}</p>
                  <p className="mt-1 text-sm text-muted">{l(locale, item.authors)}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Container>
    </>
  );
}
