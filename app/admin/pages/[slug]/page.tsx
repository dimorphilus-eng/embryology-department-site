import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentForm } from "@/components/admin/content-form";
import { AdminShell } from "@/components/admin/shell";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Страница",
};

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getStore().pages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <AdminShell title={page.title.ru}>
      <ContentForm
        kind="page"
        mode="edit"
        initial={{
          slug: page.slug,
          title: page.title,
          navLabel: page.navLabel,
          lead: page.lead,
          body: page.body,
          showInNav: page.showInNav,
        }}
      />
    </AdminShell>
  );
}
