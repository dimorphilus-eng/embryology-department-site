"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { adminError } from "@/components/admin/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Pair = { ru: string; en: string };

export type PageDraft = {
  slug: string;
  title: Pair;
  navLabel: Pair;
  lead: Pair;
  body: Pair;
  showInNav: boolean;
};

export type ArticleDraft = {
  slug: string;
  date: string;
  kind: "news" | "conference" | "seminar" | "defense";
  title: Pair;
  excerpt: Pair;
  place: Pair;
  body: Pair;
};

type ContentFormProps =
  | { kind: "page"; mode: "create" | "edit"; initial: PageDraft }
  | { kind: "article"; mode: "create" | "edit"; initial: ArticleDraft };

const kinds = [
  { value: "news", label: "Новость" },
  { value: "seminar", label: "Семинар" },
  { value: "conference", label: "Конференция" },
  { value: "defense", label: "Защита" },
] as const;

function PairField({
  label,
  hint,
  value,
  required,
  multiline,
  onChange,
  onFocusLang,
}: {
  label: string;
  hint?: string;
  value: Pair;
  required?: boolean;
  multiline?: boolean;
  onChange: (value: Pair) => void;
  onFocusLang: (lang: "ru" | "en") => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  const Control = multiline ? Textarea : Input;
  return (
    <fieldset className="grid gap-3 border border-line p-4">
      <legend className="px-1 text-sm font-semibold">
        {label}
        {required ? " *" : ""}
      </legend>
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {(["ru", "en"] as const).map((lang) => (
          <label key={lang} className="grid gap-2 text-sm" htmlFor={`${id}-${lang}`}>
            <span className="font-semibold uppercase tracking-wide text-muted">{lang}</span>
            <Control
              id={`${id}-${lang}`}
              required={required && lang === "ru"}
              value={value[lang]}
              onFocus={() => onFocusLang(lang)}
              onChange={(event) => onChange({ ...value, [lang]: event.target.value })}
            />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ContentForm(props: ContentFormProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(props.initial);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const lang = useRef<"ru" | "en">("ru");

  const listPath = props.kind === "page" ? "/admin/pages" : "/admin/news";
  const endpoint =
    props.mode === "create"
      ? props.kind === "page"
        ? "/api/admin/pages"
        : "/api/admin/articles"
      : props.kind === "page"
        ? `/api/admin/pages/${props.initial.slug}`
        : `/api/admin/articles/${props.initial.slug}`;

  function patch(partial: Partial<PageDraft & ArticleDraft>) {
    setDraft((current) => ({ ...current, ...partial }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setStatus("");
    const response = await fetch(endpoint, {
      method: props.mode === "create" ? "POST" : "PUT",
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
    if (props.mode === "create") {
      router.push(props.kind === "page" ? `/admin/pages/${draft.slug}` : `/admin/news/${draft.slug}`);
      router.refresh();
      return;
    }
    setStatus("Сохранено.");
  }

  async function onDelete() {
    if (!window.confirm("Удалить эту запись с сайта?")) return;
    setPending(true);
    const response = await fetch(endpoint, { method: "DELETE" });
    setPending(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setError(adminError(data.error));
      return;
    }
    router.push(listPath);
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

  const publicPath = props.kind === "page" ? `/p/${draft.slug}` : `/news/${draft.slug}`;
  const page = props.kind === "page" ? (draft as PageDraft) : null;
  const article = props.kind === "article" ? (draft as ArticleDraft) : null;

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <label className="grid max-w-md gap-2 text-sm font-semibold" htmlFor="slug">
        Адрес латиницей
        <Input
          id="slug"
          required
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          minLength={2}
          maxLength={48}
          disabled={props.mode === "edit"}
          value={draft.slug}
          onChange={(event) => patch({ slug: event.target.value.trim().toLowerCase() })}
        />
        <span className="font-normal text-muted">
          Будет открываться как /ru{publicPath} и /en{publicPath}
        </span>
      </label>

      {article ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="article-date">
            Дата
            <Input
              id="article-date"
              type="date"
              required
              value={article.date}
              onChange={(event) => patch({ date: event.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold" htmlFor="article-kind">
            Тип
            <select
              id="article-kind"
              className="min-h-11 w-full border border-line bg-card px-3 text-base"
              value={article.kind}
              onChange={(event) => patch({ kind: event.target.value as ArticleDraft["kind"] })}
            >
              {kinds.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <PairField
        label="Заголовок"
        required
        value={draft.title}
        onChange={(title) => patch({ title })}
        onFocusLang={(value) => {
          lang.current = value;
        }}
      />

      {page ? (
        <>
          <label className="flex min-h-11 items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={page.showInNav}
              onChange={(event) => patch({ showInNav: event.target.checked })}
            />
            Показывать в меню сайта
          </label>
          {page.showInNav ? (
            <PairField
              label="Подпись в меню"
              hint="Короткая. Если оставить пустой, возьмём начало заголовка."
              value={page.navLabel}
              onChange={(navLabel) => patch({ navLabel })}
              onFocusLang={(value) => {
                lang.current = value;
              }}
            />
          ) : null}
          <PairField
            label="Лид"
            value={page.lead}
            onChange={(lead) => patch({ lead })}
            onFocusLang={(value) => {
              lang.current = value;
            }}
          />
        </>
      ) : article ? (
        <>
          <PairField
            label="Кратко для карточки"
            required
            value={article.excerpt}
            onChange={(excerpt) => patch({ excerpt })}
            onFocusLang={(value) => {
              lang.current = value;
            }}
          />
          <PairField
            label="Место"
            hint="Аудитория, город или ссылка на площадку. Можно оставить пустым."
            value={article.place}
            onChange={(place) => patch({ place })}
            onFocusLang={(value) => {
              lang.current = value;
            }}
          />
        </>
      ) : null}

      <PairField
        label="Текст"
        required
        multiline
        hint="Обычный текст. Абзац — пустая строка. **жирный**, списки через «- », ссылка [текст](https://…). HTML не вставляется. Английский можно не заполнять: подставится русский."
        value={draft.body}
        onChange={(body) => patch({ body })}
        onFocusLang={(value) => {
          lang.current = value;
        }}
      />

      <label className="grid max-w-lg gap-2 text-sm font-semibold" htmlFor="upload">
        Картинка или PDF
        <input
          id="upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          className="text-sm font-normal"
          onChange={onUpload}
        />
        <span className="font-normal text-muted">Файл встанет в текст того языка, в поле которого вы последний раз щёлкнули.</span>
      </label>

      {error ? (
        <p role="alert" className="text-sm font-semibold text-pine">
          {error}
        </p>
      ) : null}
      {status ? (
        <p role="status" className="text-sm text-muted">
          {status}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Сохранение…" : "Сохранить"}
        </Button>
        {props.mode === "edit" ? (
          <Button type="button" variant="secondary" disabled={pending} onClick={onDelete}>
            Удалить
          </Button>
        ) : null}
        {props.mode === "edit" && draft.slug ? (
          <>
            <a className="text-sm font-semibold underline underline-offset-4" href={`/ru${publicPath}`} target="_blank" rel="noreferrer">
              Открыть по-русски
            </a>
            <a className="text-sm font-semibold underline underline-offset-4" href={`/en${publicPath}`} target="_blank" rel="noreferrer">
              Open in English
            </a>
          </>
        ) : null}
      </div>
    </form>
  );
}
