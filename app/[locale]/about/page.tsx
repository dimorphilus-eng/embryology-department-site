import type { Metadata } from "next";
import Link from "next/link";
import { SectionNote } from "@/components/content/section-note";
import { Container } from "@/components/layout/container";
import { InPageNav, PageHeader } from "@/components/layout/page-header";
import { Monogram } from "@/components/people/monogram";
import { t } from "@/content/messages";
import { getPerson } from "@/content/people";
import { history, mission, orgUnits, site } from "@/content/site";
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
  const text = sectionText("about", locale, { title: copy.pages.about, lead: l(locale, mission.text) });
  return pageMetadata(locale, { title: text.title, description: text.lead || l(locale, mission.text), path: "/about" });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("about", locale, { title: copy.pages.about, lead: l(locale, mission.text) });
  const head = getPerson("elena-sokolova");
  if (!head) return null;

  return (
    <>
      <PageHeader locale={locale} path="/about" title={text.title} lead={text.lead} eyebrow={l(locale, site.institute)} />
      <InPageNav
        locale={locale}
        items={[
          { href: "#history", label: copy.aboutHistory },
          { href: "#mission", label: copy.aboutMission },
          { href: "#head", label: copy.aboutHead },
          { href: "#structure", label: copy.aboutStructure },
        ]}
      />
      <SectionNote body={text.body} />
      <Container className="grid gap-16 py-14">
        <section id="history" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.aboutHistory}</h2>
          <ol className="mt-6 border-l border-line">
            {history.map((item) => (
              <li key={item.year} className="grid gap-2 py-4 pl-6 md:grid-cols-[6rem_1fr]">
                <p className="font-serif text-2xl text-bronze">{item.year}</p>
                <p className="leading-relaxed">{l(locale, item.text)}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="mission" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.aboutMission}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {mission.goals.map((goal) => (
              <li key={l(locale, goal)} className="border border-line bg-card p-5 leading-relaxed">
                {l(locale, goal)}
              </li>
            ))}
          </ul>
        </section>
        <section id="head" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.aboutHead}</h2>
          <article className="mt-6 flex flex-col gap-5 border border-line bg-card p-6 sm:flex-row">
            <Monogram name={l(locale, head.name)} className="h-20 w-20 text-2xl" />
            <div>
              <h3 className="font-serif text-2xl">
                <Link href={href(locale, `/people/${head.slug}`)} className="underline-offset-4 hover:underline">
                  {l(locale, head.name)}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted">{l(locale, head.degree)}</p>
              <p className="mt-1 font-semibold">{l(locale, head.position)}</p>
              <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, head.bio)}</p>
            </div>
          </article>
        </section>
        <section id="structure" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.aboutStructure}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {orgUnits.map((unit) => (
              <li key={l(locale, unit.title)} className="border-t border-line pt-4">
                <h3 className="font-serif text-xl">{l(locale, unit.title)}</h3>
                <p className="mt-2 leading-relaxed text-muted">{l(locale, unit.text)}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
