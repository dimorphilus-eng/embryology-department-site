"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminError } from "@/components/admin/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm({ showDevPassword }: { showDevPassword: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (response.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    setError(data.error === "invalid" ? "Пароль не подошёл." : adminError(data.error));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-semibold" htmlFor="admin-password">
        Пароль
        <Input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {showDevPassword ? (
        <p className="text-sm text-muted">
          Локальная разработка: пароль <code>embryology</code>, пока не задан ADMIN_PASSWORD.
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-pine">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Вход…" : "Войти"}
      </Button>
    </form>
  );
}
