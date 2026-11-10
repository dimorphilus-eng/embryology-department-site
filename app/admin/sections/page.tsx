import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";
import { getSection, sectionHasText, siteSections } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Разделы",
};

export default function AdminSectionsPage() {
  return (
    <AdminShell title="Страницы с кнопок">
      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
        Эти адреса открывают кнопки на главной. Текст сохраняется на сервере и появляется на сайте сразу, без новой выкладки.
      </p>
      <ul className="divide-y divide-line border border-line">
        {siteSections.map((section) => {
          const saved = sectionHasText(getSection(section.key));
          return (
            <li key={section.key} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-semibold">{section.label}</p>
                <p className="text-sm text-muted">
                  {section.path}
                  {saved ? " · текст сохранён" : " · пока текст сайта"}
                </p>
              </div>
              <Link href={`/admin/sections/${section.key}`} className="text-sm font-semibold underline underline-offset-4">
                Изменить
              </Link>
            </li>
          );
        })}
      </ul>
    </AdminShell>
  );
}
