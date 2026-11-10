import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/content/markdown";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { l } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const page = getStore().pages.find((item) => item.slug === slug);
  if (!page) return {};
  return pageMetadata(locale, {
    title: l(locale, page.title),
    description: l(locale, page.lead) || l(locale, page.title),
    path: `/p/${page.slug}`,
  });
}

export default async function CustomPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const page = getStore().pages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader
        locale={locale}
        path={`/p/${page.slug}`}
        title={l(locale, page.title)}
        lead={l(locale, page.lead) || undefined}
      />
      <Container className="py-12">
        <article className="prose-academic max-w-3xl text-lg leading-relaxed">
          <MarkdownView source={l(locale, page.body)} />
        </article>
      </Container>
    </>
  );
}
