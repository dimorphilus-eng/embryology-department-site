import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { AdminShell } from "@/components/admin/shell";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Новость",
};

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getStore().articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <AdminShell title={article.title.ru}>
      <ContentForm
        kind="article"
        mode="edit"
        initial={{
          slug: article.slug,
          date: article.date,
          kind: article.kind,
          title: article.title,
          excerpt: article.excerpt,
          place: article.place,
          body: article.body,
        }}
      />
    </AdminShell>
  );
}
