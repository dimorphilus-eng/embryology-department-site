import Link from "next/link";
import { DevelopmentalSeries } from "@/components/brand/series";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getArticles, isUpcoming } from "@/lib/articles";
import { t } from "@/content/messages";
import { people } from "@/content/people";
import { directions, projects, publications } from "@/content/research";
import { audiences, hero, partners, site, stages } from "@/content/site";
import { formatDate, href, l, type Locale } from "@/lib/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const news = getArticles().slice(0, 3);
  const latestPublications = [...publications].sort((a, b) => b.year - a.year).slice(0, 4);
  const activeProjects = projects.filter((project) => project.status === "active").length;
  const facts = [
    { value: String(site.founded), label: copy.factsFounded },
    { value: "3", label: copy.factsLabs },
    { value: String(people.length), label: copy.factsPeople },
    { value: String(activeProjects), label: copy.factsProjects },
  ];

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-stretch gap-8 py-14 lg:grid-cols-12 lg:py-20">
          <div className="rise lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{l(locale, hero.eyebrow)}</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl">{l(locale, hero.title)}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{l(locale, hero.lead)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href(locale, "/research")} className="inline-flex min-h-11 items-center bg-button px-4 font-semibold text-button-foreground">
                {copy.ctaResearch}
              </Link>
              <Link href={href(locale, "/students")} className="inline-flex min-h-11 items-center border border-current px-4 font-semibold">
                {copy.ctaStudy}
              </Link>
            </div>
          </div>
          <aside className="border border-line bg-pine-deep p-6 text-header-foreground lg:col-span-5" aria-label={l(locale, site.shortName)}>
            <dl className="grid grid-cols-2 gap-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-header-muted">{fact.label}</dt>
                  <dd className="mt-1 font-serif text-4xl text-bronze-on-dark">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <section className="border-b border-line bg-elevated" aria-labelledby="series-title">
        <Container className="py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{copy.seriesEyebrow}</p>
          <h2 id="series-title" className="mt-2 max-w-2xl font-serif text-3xl">
            {l(locale, stages[0].title)} — {l(locale, stages[stages.length - 1].title)}
          </h2>
          <div className="mt-8">
            <DevelopmentalSeries items={stages.map((stage) => ({ title: l(locale, stage.title), text: l(locale, stage.text) }))} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="directions-title">
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{copy.directionsEyebrow}</p>
          <h2 id="directions-title" className="mt-2 max-w-3xl font-serif text-3xl md:text-4xl">
            {copy.directionsTitle}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {directions.map((direction) => (
              <li key={direction.id}>
                <Link href={`${href(locale, "/research")}#${direction.id}`} className="flex h-full flex-col border border-line bg-card p-5 hover:border-pine">
                  <span className="font-serif text-sm text-bronze">{direction.index}</span>
                  <span className="mt-3 font-serif text-2xl leading-tight">{l(locale, direction.title)}</span>
                  <span className="mt-3 text-sm leading-relaxed text-muted">{l(locale, direction.text)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line" aria-labelledby="latest-title">
        <Container className="grid gap-12 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{copy.latestEyebrow}</p>
            <h2 id="latest-title" className="mt-2 font-serif text-3xl">
              {copy.newsTitle}
            </h2>
            <ul className="mt-6 grid gap-4">
              {news.map((article) => (
                <li key={article.slug} className="border-t border-line pt-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                    <time dateTime={article.date}>{formatDate(locale, article.date)}</time>
                    {isUpcoming(article.date) ? <Badge>{copy.upcoming}</Badge> : null}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">
                    <Link href={href(locale, `/news/${article.slug}`)} className="underline-offset-4 hover:underline">
                      {l(locale, article.title)}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{l(locale, article.excerpt)}</p>
                </li>
              ))}
            </ul>
            <Link href={href(locale, "/news")} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4">
              {copy.allNews}
            </Link>
          </div>
          <div>
            <h2 className="font-serif text-3xl">{copy.publicationsTitle}</h2>
            <ol className="mt-6 border-t border-line">
              {latestPublications.map((item) => (
                <li key={item.id} className="border-b border-line py-4">
                  <p className="text-sm text-bronze">{item.year}</p>
                  <h3 className="mt-1 font-serif text-xl leading-snug">{l(locale, item.title)}</h3>
                  <p className="mt-1 text-sm text-muted">{l(locale, item.authors)}</p>
                </li>
              ))}
            </ol>
            <Link href={href(locale, "/research/publications")} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4">
              {copy.allPublications}
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-ink text-header-foreground" aria-labelledby="audiences-title">
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-on-dark">{copy.audiencesEyebrow}</p>
          <h2 id="audiences-title" className="sr-only">
            {copy.audiencesEyebrow}
          </h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {audiences.map((item) => (
              <li key={item.href} className="border border-header-foreground/25 p-5">
                <h3 className="font-serif text-2xl">{l(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-header-muted">{l(locale, item.text)}</p>
                <Link href={href(locale, item.href)} className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-bronze-on-dark underline underline-offset-4">
                  {l(locale, item.link)}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="partners-title">
        <Container className="py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze">{copy.partnersEyebrow}</p>
          <h2 id="partners-title" className="mt-2 font-serif text-3xl">
            {copy.partnersTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{copy.partnersLead}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <li key={l(locale, partner.name)} className="border-t border-line pt-4">
                <h3 className="font-serif text-xl leading-tight">{l(locale, partner.name)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l(locale, partner.text)}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
