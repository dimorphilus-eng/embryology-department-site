import type { Metadata } from "next";
import { SectionNote } from "@/components/content/section-note";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/layout/container";
import { InPageNav, PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/layout/json-ld";
import { t } from "@/content/messages";
import { faq, studentsPage } from "@/content/site";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { sectionText } from "@/lib/sections";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("students", locale, { title: copy.pages.students, lead: copy.studentsLead });
  return pageMetadata(locale, { title: text.title, description: text.lead || copy.studentsLead, path: "/students" });
}

export default async function StudentsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const text = sectionText("students", locale, { title: copy.pages.students, lead: copy.studentsLead });

  return (
    <>
      <JsonLd data={faqJsonLd(locale, faq)} />
      <PageHeader locale={locale} path="/students" title={text.title} lead={text.lead} />
      <InPageNav
        locale={locale}
        items={[
          { href: "#admissions", label: copy.admissions },
          { href: "#society", label: copy.society },
          { href: "#opportunities", label: copy.opportunities },
          { href: "#faq", label: copy.faq },
        ]}
      />
      <SectionNote body={text.body} />
      <Container className="grid gap-14 py-12">
        <section id="admissions" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.admissions}</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {studentsPage.admissions.map((item) => (
              <article key={l(locale, item.title)} className="border border-line bg-card p-5">
                <h3 className="font-serif text-2xl">{l(locale, item.title)}</h3>
                <p className="mt-3 leading-relaxed">{l(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="society" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{l(locale, studentsPage.society.title)}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, studentsPage.society.text)}</p>
        </section>
        <section id="opportunities" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.opportunities}</h2>
          <ul className="mt-4 grid gap-3">
            {studentsPage.opportunities.map((item) => (
              <li key={l(locale, item)} className="border-t border-line py-3 leading-relaxed">
                {l(locale, item)}
              </li>
            ))}
          </ul>
        </section>
        <section id="faq" className="scroll-mt-36">
          <h2 className="font-serif text-3xl">{copy.faq}</h2>
          <Accordion type="single" collapsible className="mt-4">
            {faq.map((item, index) => (
              <AccordionItem key={l(locale, item.q)} value={`faq-${index}`}>
                <AccordionTrigger>{l(locale, item.q)}</AccordionTrigger>
                <AccordionContent>{l(locale, item.a)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </Container>
    </>
  );
}
