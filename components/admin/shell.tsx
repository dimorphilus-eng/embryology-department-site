import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin-auth";

export async function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Админка</p>
          <h1 className="font-serif text-3xl">{title}</h1>
        </div>
        <nav aria-label="Разделы админки" className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" asChild>
            <Link href="/admin">Обзор</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/admin/sections">Разделы</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/admin/pages">Страницы</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/admin/news">Новости</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/ru">На сайт</Link>
          </Button>
          <LogoutButton />
        </nav>
      </header>
      <div className="py-8">{children}</div>
    </div>
  );
}
