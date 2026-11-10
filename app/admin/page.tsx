import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";
import { getStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Админка",
};

export default async function AdminHomePage() {
  const store = getStore();

  return (
    <AdminShell title="Обзор">
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/sections" className="border border-line bg-card p-5 hover:bg-pine-soft">
          <p className="text-sm text-muted">Страницы с кнопок</p>
          <p className="font-serif text-4xl">{store.sections.length}</p>
          <p className="mt-2 text-sm">О кафедре, абитуриентам, образование, сотрудники и новости. Сохраняется сразу.</p>
        </Link>
        <Link href="/admin/pages" className="border border-line bg-card p-5 hover:bg-pine-soft">
          <p className="text-sm text-muted">Новые страницы</p>
          <p className="font-serif text-4xl">{store.pages.length}</p>
          <p className="mt-2 text-sm">Свой адрес /p/… и, если нужно, ссылка в меню.</p>
        </Link>
        <Link href="/admin/news" className="border border-line bg-card p-5 hover:bg-pine-soft">
          <p className="text-sm text-muted">Новости и события</p>
          <p className="font-serif text-4xl">{store.articles.length}</p>
          <p className="mt-2 text-sm">Попадают в ленту новостей и в поиск сразу после сохранения.</p>
        </Link>
      </div>
      <div className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
        <p>Текст разделов с кнопок, новые страницы и новости сохраняются на диск сервера и открываются без новой выкладки. Карточки сотрудников, список курсов и публикации по-прежнему лежат в файлах content/.</p>
        <p>
          Записи и загруженные файлы хранятся на диске сервера. Это работает, когда сайт запущен командой next start на своей машине или на Node-хостинге с постоянным диском. На площадке, где файлы стираются после перезапуска, правки не сохранятся.
        </p>
        <p>Пароль задаётся переменной ADMIN_PASSWORD. В режиме разработки, если её нет, пароль embryology.</p>
      </div>
    </AdminShell>
  );
}
