import type { Metadata } from "next";
import { ContentForm } from "@/components/admin/content-form";
import { AdminShell } from "@/components/admin/shell";

export const metadata: Metadata = {
  title: "Новая новость",
};

export default function NewArticlePage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <AdminShell title="Новая запись">
      <ContentForm
        kind="article"
        mode="create"
        initial={{
          slug: "",
          date: today,
          kind: "news",
          title: { ru: "", en: "" },
          excerpt: { ru: "", en: "" },
          place: { ru: "", en: "" },
          body: { ru: "", en: "" },
        }}
      />
    </AdminShell>
  );
}
