import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import documents from "@/content/documents.json";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.materials, description: copy.materialsLead, path: "/education/materials" });
}

export default async function MaterialsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/education/materials"
        title={copy.pages.materials}
        lead={copy.materialsLead}
        crumbs={[{ label: copy.pages.education, path: "/education" }]}
      />
      <Container className="py-12">
        <ul className="grid gap-4">
          {documents.map((document) => (
            <li key={document.slug} className="grid gap-3 border border-line bg-card p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-serif text-2xl">{l(locale, document.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l(locale, document.summary)}</p>
              </div>
              <a className="inline-flex min-h-11 items-center justify-center bg-button px-4 text-sm font-semibold text-button-foreground" href={`/documents/${document.slug}.${locale}.pdf`}>
                {copy.downloadPdf}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
