import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { internships } from "@/content/education";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.internships, description: l(locale, internships.lead), path: "/education/internships" });
}

export default async function InternshipsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/education/internships"
        title={copy.pages.internships}
        lead={l(locale, internships.lead)}
        crumbs={[{ label: copy.pages.education, path: "/education" }]}
      />
      <Container className="grid gap-10 py-12">
        <ul className="grid gap-4 md:grid-cols-3">
          {internships.items.map((item) => (
            <li key={l(locale, item.title)} className="border border-line bg-card p-5">
              <h2 className="font-serif text-2xl">{l(locale, item.title)}</h2>
              <p className="mt-2 text-sm text-bronze">{l(locale, item.length)}</p>
              <p className="mt-3 leading-relaxed">{l(locale, item.text)}</p>
            </li>
          ))}
        </ul>
        <section>
          <h2 className="font-serif text-3xl">{copy.steps}</h2>
          <ol className="mt-4 grid gap-3">
            {internships.steps.map((step, index) => (
              <li key={l(locale, step)} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line py-3">
                <span className="font-serif text-2xl text-bronze">{index + 1}</span>
                <p className="leading-relaxed">{l(locale, step)}</p>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </>
  );
}
