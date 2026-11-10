import type { Metadata } from "next";
import Link from "next/link";
import { getFileArticles } from "@/lib/articles";
import { AdminShell } from "@/components/admin/shell";
import { Button } from "@/components/ui/button";
import { getStore } from "@/lib/store";
import { channelUsername } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Новости",
};

const kindLabel = {
  news: "Новость",
  seminar: "Семинар",
  conference: "Конференция",
  defense: "Защита",
};

export default async function AdminNewsPage() {
  const store = getStore();
  const channel = channelUsername();
  const managed = [...store.articles].sort((a, b) => b.date.localeCompare(a.date));
  const taken = new Set(managed.map((article) => article.slug));
  const files = getFileArticles()
    .filter((article) => !taken.has(article.slug))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <AdminShell title="Новости и события">
      <div className="mb-6">
        <Button asChild>
          <Link href="/admin/news/new">Новая запись</Link>
        </Button>
      </div>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
        {channel
          ? `Сообщения публичного канала @${channel} попадают в ленту сами, примерно за полминуты, и здесь не редактируются. Канал должен открываться по адресу t.me/s/${channel}.`
          : "Адрес канала не задан. Укажите его в content/site.ts или в переменной TELEGRAM_CHANNEL."}
      </p>
      {managed.length === 0 ? <p className="mb-8 text-muted">Своих записей пока нет.</p> : null}
      {managed.length > 0 ? (
        <ul className="mb-10 divide-y divide-line border border-line">
          {managed.map((article) => (
            <li key={article.slug} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-semibold">{article.title.ru}</p>
                <p className="text-sm text-muted">
                  {article.date} · {kindLabel[article.kind]} · /news/{article.slug}
                </p>
              </div>
              <Link href={`/admin/news/${article.slug}`} className="text-sm font-semibold underline underline-offset-4">
                Изменить
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <h2 className="font-serif text-2xl">Образцы из файлов</h2>
      <p className="mt-2 mb-4 max-w-2xl text-sm text-muted">
        Эти новости лежат в content/articles и здесь только для сверки. Чтобы заменить такую запись, создайте новую с другим адресом или поправьте файл.
      </p>
      <ul className="divide-y divide-line border border-line">
        {files.map((article) => (
          <li key={article.slug} className="px-4 py-3">
            <p className="font-semibold">{article.title.ru}</p>
            <p className="text-sm text-muted">
              {article.date} · {kindLabel[article.kind]} · файл
            </p>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
