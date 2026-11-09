import type { Metadata } from "next";
import { ContentForm } from "@/components/admin/content-form";
import { AdminShell } from "@/components/admin/shell";

export const metadata: Metadata = {
  title: "Новая страница",
};

export default function NewPage() {
  return (
    <AdminShell title="Новая страница">
      <ContentForm
        kind="page"
        mode="create"
        initial={{
          slug: "",
          title: { ru: "", en: "" },
          navLabel: { ru: "", en: "" },
          lead: { ru: "", en: "" },
          body: { ru: "", en: "" },
          showInNav: false,
        }}
      />
    </AdminShell>
  );
}
