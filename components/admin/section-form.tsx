"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { adminError } from "@/components/admin/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Pair = { ru: string; en: string };

export type SectionDraft = {
  title: Pair;
  lead: Pair;
  body: Pair;
};

export function SectionForm({ sectionKey, path, initial }: { sectionKey: string; path: string; initial: SectionDraft }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const lang = useRef<"ru" | "en">("ru");

  function patch(partial: Partial<SectionDraft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setStatus("");
    const response = await fetch(`/api/admin/sections/${sectionKey}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(draft),
    });
    setPending(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (data.error === "auth") {
        router.push("/admin/login");
        router.refresh();
        return;
      }
      setError(adminError(data.error));
      return;
    }
    setStatus("Сохранено. Страница на сайте уже обновлена, выкладывать её заново не нужно.");
    router.refresh();
  }

  async function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError("");
    setStatus("Загрузка файла…");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const data = (await response.json().catch(() => ({}))) as { error?: string; url?: string };
    if (!response.ok || !data.url) {
      setStatus("");
      setError(adminError(data.error));
      return;
    }
    const name = file.name.replace(/[[\]]/g, "");
    const snippet = file.type === "application/pdf" ? `\n\n[${name}](${data.url})\n` : `\n\n![${name}](${data.url})\n`;
    const current = lang.current;
    setDraft((previous) => ({
      ...previous,
      body: { ...previous.body, [current]: `${previous.body[current]}${snippet}` },
    }));
    setStatus(current === "ru" ? "Файл вставлен в русский текст." : "Файл вставлен в английский текст.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <p className="text-sm leading-relaxed text-muted">
        Пустые поля оставляют текст, который уже стоит на сайте. Заполненные заголовок и вступление его заменяют, а текст ниже добавляется на страницу. Сохранение пишет файл на сервере и сразу открывается по адресам /ru{path} и /en{path}.
      </p>
      {(
        [
          ["title", "Заголовок", false],
          ["lead", "Вступление", false],
          ["body", "Текст страницы", true],
        ] as const
      ).map(([field, label, multiline]) => {
        const Control = multiline ? Textarea : Input;
        return (
          <fieldset key={field} className="grid gap-3 border border-line p-4">
            <legend className="px-1 text-sm font-semibold">{label}</legend>
            <div className="grid gap-3 md:grid-cols-2">
              {(["ru", "en"] as const).map((language) => (
                <label key={language} className="grid gap-2 text-sm" htmlFor={`${field}-${language}`}>
                  <span className="font-semibold uppercase tracking-wide text-muted">{language}</span>
                  <Control
                    id={`${field}-${language}`}
                    value={draft[field][language]}
                    onFocus={() => {
                      lang.current = language;
                    }}
                    onChange={(event) => patch({ [field]: { ...draft[field], [language]: event.target.value } })}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}
      <label className="grid max-w-md gap-2 text-sm font-semibold">
        Картинка или PDF
        <input className="text-sm font-normal" type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" onChange={onUpload} />
        <span className="font-normal text-muted">Файл вставится в текст того языка, в поле которого вы последний раз нажимали.</span>
      </label>
      {error ? (
        <p className="text-sm font-semibold text-pine" role="alert">
          {error}
        </p>
      ) : null}
      {status ? (
        <p className="text-sm font-semibold" role="status">
          {status}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          Сохранить
        </Button>
        <Button variant="secondary" asChild>
          <a href={`/ru${path}`}>Открыть страницу</a>
        </Button>
      </div>
    </form>
  );
}
