import type { Metadata } from "next";
import Link from "next/link";
import { SectionNote } from "@/components/content/section-note";
import { Container } from "@/components/layout/container";
import { InPageNav, PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { programs } from "@/content/education";
import documents from "@/content/documents.json";
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
  const text = sectionText("education", locale, { title: copy.pages.education, lead: copy.educationLead });
  return pageMetadata(locale, { title: text.title, description: text.lead || copy.educationLead, path: "/education" });
}

export default async function EducationPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("education", locale, { title: copy.pages.education, lead: copy.educationLead });
  const levelLabel = { bachelor: copy.levelBachelor, master: copy.levelMaster, phd: copy.levelPhd };

  return (
    <>
      <PageHeader locale={locale} path="/education" title={text.title} lead={text.lead} />
      <InPageNav
        locale={locale}
        items={[
          { href: "#programs", label: copy.programs },
          { href: href(locale, "/education/courses"), label: copy.pages.courses },
          { href: href(locale, "/education/schedule"), label: copy.pages.schedule },
          { href: href(locale, "/education/materials"), label: copy.pages.materials },
          { href: href(locale, "/education/internships"), label: copy.pages.internships },
        ]}
      />
      <SectionNote body={text.body} />
      <Container className="py-12">
        <div id="programs" className="scroll-mt-36 grid gap-5">
          {programs.map((program) => {
            const document = documents.find((item) => item.slug === program.document);
            return (
              <article key={program.id} className="border border-line bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bronze">{levelLabel[program.level]}</p>
                <h2 className="mt-2 font-serif text-3xl">{l(locale, program.title)}</h2>
                <p className="mt-2 text-sm text-muted">{l(locale, program.meta)}</p>
                <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, program.text)}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5">
                  {program.points.map((point) => (
                    <li key={l(locale, point)}>{l(locale, point)}</li>
                  ))}
                </ul>
                {document ? (
                  <a className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4" href={`/documents/${document.slug}.${locale}.pdf`}>
                    {copy.downloadPdf}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            ["/education/courses", copy.pages.courses],
            ["/education/schedule", copy.pages.schedule],
            ["/education/materials", copy.pages.materials],
            ["/education/internships", copy.pages.internships],
          ].map(([path, label]) => (
            <li key={path}>
              <Link href={href(locale, path)} className="flex min-h-16 items-center border border-line px-4 font-semibold hover:border-pine">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
