import type { Metadata } from "next";
import { ExternalLink } from "@/components/layout/external-link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import documents from "@/content/documents.json";
import { resourceGroups } from "@/content/resources";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.resources, description: copy.resourcesLead, path: "/resources" });
}

export default async function ResourcesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader locale={locale} path="/resources" title={copy.pages.resources} lead={copy.resourcesLead} />
      <Container className="grid gap-12 py-12">
        {resourceGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <h2 id={group.id} className="font-serif text-3xl">
              {l(locale, group.title)}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{l(locale, group.note)}</p>
            {group.id === "library" ? (
              <ul className="mt-5 grid gap-3">
                {documents.map((document) => (
                  <li key={document.slug}>
                    <a className="text-pine underline underline-offset-4" href={`/documents/${document.slug}.${locale}.pdf`}>
                      {l(locale, document.title)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {group.links.map((link) => (
                  <li key={link.href} className="border border-line bg-card p-4">
                    <ExternalLink href={link.href} newTabLabel={copy.newTab} className="font-semibold text-pine underline underline-offset-4">
                      {link.title}
                    </ExternalLink>
                    <p className="mt-2 text-sm leading-relaxed">{l(locale, link.text)}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Container>
    </>
  );
}
