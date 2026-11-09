import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Mark } from "@/components/brand/mark";
import { LoginForm } from "@/components/admin/login-form";
import { isAdmin, showsDevPassword } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Вход",
};

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-16">
      <div className="mb-8 flex items-center gap-3">
        <Mark className="h-11 w-11" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Кафедра</p>
          <h1 className="font-serif text-3xl">Вход в админку</h1>
        </div>
      </div>
      <LoginForm showDevPassword={showsDevPassword()} />
    </main>
  );
}
