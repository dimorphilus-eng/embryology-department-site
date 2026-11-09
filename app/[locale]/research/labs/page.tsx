import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { getPerson } from "@/content/people";
import { labs } from "@/content/research";
import { href, l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.labs, description: copy.labsLead, path: "/research/labs" });
}

export default async function LabsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/research/labs"
        title={copy.pages.labs}
        lead={copy.labsLead}
        crumbs={[{ label: copy.pages.research, path: "/research" }]}
      />
      <Container className="grid gap-6 py-12">
        {labs.map((lab) => {
          const lead = getPerson(lab.lead);
          return (
            <article key={lab.slug} className="border border-line bg-card p-6">
              <h2 className="font-serif text-3xl">{l(locale, lab.title)}</h2>
              {lead ? (
                <p className="mt-2">
                  {copy.lead}:{" "}
                  <Link href={href(locale, `/people/${lead.slug}`)} className="text-pine underline underline-offset-4">
                    {l(locale, lead.name)}
                  </Link>
                </p>
              ) : null}
              <p className="mt-4 max-w-3xl leading-relaxed">{l(locale, lab.text)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {lab.focus.map((item) => (
                  <li key={l(locale, item)} className="border border-line bg-pine-soft px-3 py-1 text-sm">
                    {l(locale, item)}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </Container>
    </>
  );
}
