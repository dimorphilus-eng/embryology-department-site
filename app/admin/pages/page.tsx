import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Страницы",
};

export default async function AdminPagesPage() {
  const pages = [...getStore().pages].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <AdminShell title="Страницы">
      <div className="mb-6">
        <Button asChild>
          <Link href="/admin/pages/new">Новая страница</Link>
        </Button>
      </div>
      {pages.length === 0 ? (
        <p className="text-muted">Пока нет своих страниц.</p>
      ) : (
        <ul className="divide-y divide-line border border-line">
          {pages.map((page) => (
            <li key={page.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-semibold">{page.title.ru}</p>
                <p className="text-sm text-muted">/p/{page.slug}</p>
              </div>
              <Link href={`/admin/pages/${page.slug}`} className="text-sm font-semibold underline underline-offset-4">
                Изменить
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
