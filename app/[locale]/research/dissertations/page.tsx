import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { getPerson } from "@/content/people";
import { dissertations } from "@/content/research";
import { href, l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.dissertations, description: copy.dissertationsLead, path: "/research/dissertations" });
}

export default async function DissertationsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/research/dissertations"
        title={copy.pages.dissertations}
        lead={copy.dissertationsLead}
        crumbs={[{ label: copy.pages.research, path: "/research" }]}
      />
      <Container className="py-12">
        <ol className="border-t border-line">
          {dissertations.map((item) => {
            const supervisor = getPerson(item.supervisor);
            return (
              <li key={item.slug} className="grid gap-2 border-b border-line py-6 md:grid-cols-[6rem_1fr]">
                <p className="font-serif text-3xl text-bronze">{item.year}</p>
                <div>
                  <h2 className="font-serif text-2xl leading-snug">{l(locale, item.title)}</h2>
                  <p className="mt-2">
                    {l(locale, item.author)} · {l(locale, item.degree)}
                  </p>
                  <p className="mt-1 text-sm text-muted">{copy.specialty}</p>
                  {supervisor ? (
                    <p className="mt-2 text-sm">
                      {copy.supervisor}:{" "}
                      <Link href={href(locale, `/people/${supervisor.slug}`)} className="text-pine underline underline-offset-4">
                        {l(locale, supervisor.name)}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
