import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { directions } from "@/content/research";
import { href, localeParams, l } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.research, description: copy.researchLead, path: "/research" });
}

export default async function ResearchPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const links = [
    { href: "/research/projects", label: copy.pages.projects },
    { href: "/research/labs", label: copy.pages.labs },
    { href: "/research/publications", label: copy.pages.publications },
    { href: "/research/dissertations", label: copy.pages.dissertations },
  ];

  return (
    <>
      <PageHeader locale={locale} path="/research" title={copy.pages.research} lead={copy.researchLead} />
      <Container className="py-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={href(locale, item.href)} className="flex min-h-20 items-center border border-line bg-card px-4 font-semibold hover:border-pine">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-6">
          {directions.map((direction) => (
            <article id={direction.id} key={direction.id} className="scroll-mt-36 grid gap-3 border-t border-line pt-6 md:grid-cols-[6rem_1fr]">
              <p className="font-serif text-3xl text-bronze">{direction.index}</p>
              <div>
                <h2 className="font-serif text-3xl">{l(locale, direction.title)}</h2>
                <p className="mt-3 max-w-3xl leading-relaxed">{l(locale, direction.text)}</p>
                <p className="mt-3 text-sm text-muted">
                  {copy.models}: {l(locale, direction.models)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
