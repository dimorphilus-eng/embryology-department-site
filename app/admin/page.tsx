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
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/pages" className="border border-line bg-card p-5 hover:bg-pine-soft">
          <p className="text-sm text-muted">Страницы</p>
          <p className="font-serif text-4xl">{store.pages.length}</p>
          <p className="mt-2 text-sm">Свой текст на двух языках. Можно вывести ссылку в меню.</p>
        </Link>
        <Link href="/admin/news" className="border border-line bg-card p-5 hover:bg-pine-soft">
          <p className="text-sm text-muted">Новости и события</p>
          <p className="font-serif text-4xl">{store.articles.length}</p>
          <p className="mt-2 text-sm">Попадают в ленту новостей и в поиск сразу после сохранения.</p>
        </Link>
      </div>
      <div className="mt-8 max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
        <p>Здесь правятся страницы и новости. Сотрудники, публикации, курсы и учебные PDF по-прежнему лежат в файлах content/.</p>
        <p>
          Записи и загруженные файлы хранятся на диске сервера. Это работает, когда сайт запущен командой next start на своей машине или на Node-хостинге с постоянным диском. На площадке, где файлы стираются после перезапуска, правки не сохранятся.
        </p>
        <p>Пароль задаётся переменной ADMIN_PASSWORD. В режиме разработки, если её нет, пароль embryology.</p>
      </div>
    </AdminShell>
  );
}
