import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionForm } from "@/components/admin/section-form";
import { AdminShell } from "@/components/admin/shell";
import { getSection, siteSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Раздел",
};

const empty = { ru: "", en: "" };

export default async function EditSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const section = siteSections.find((item) => item.key === key);
  if (!section) notFound();
  const saved = getSection(section.key);

  return (
    <AdminShell title={section.label}>
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">{section.hint}</p>
      <SectionForm
        sectionKey={section.key}
        path={section.path}
        initial={{
          title: saved?.title ?? empty,
          lead: saved?.lead ?? empty,
          body: saved?.body ?? empty,
        }}
      />
    </AdminShell>
  );
}
