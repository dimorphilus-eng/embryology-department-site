"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { t } from "@/content/messages";
import type { ArticleKind } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";

export type NewsCardModel = {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  place: string;
  kind: ArticleKind;
  kindLabel: string;
  upcoming: boolean;
};

const kinds: Array<ArticleKind | "all"> = ["all", "news", "seminar", "conference", "defense"];

export function NewsBrowser({ locale, items }: { locale: Locale; items: NewsCardModel[] }) {
  const copy = t(locale);
  const [kind, setKind] = useState<ArticleKind | "all">("all");
  const labels: Record<ArticleKind | "all", string> = {
    all: copy.all,
    news: copy.kindNewsItem,
    seminar: copy.kindSeminar,
    conference: copy.kindConference,
    defense: copy.kindDefense,
  };
  const visible = items.filter((item) => kind === "all" || item.kind === kind);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filterKind}>
        {kinds.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={kind === item}
            onClick={() => setKind(item)}
            className={`min-h-11 border px-3 text-sm ${kind === item ? "bg-button text-button-foreground" : "border-line bg-card"}`}
          >
            {labels[item]}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">
        {copy.results}: {visible.length}
      </p>
      {visible.length === 0 ? <p>{copy.empty}</p> : null}
      <ul className="grid gap-4">
        {visible.map((item) => (
          <li key={item.href}>
            <article className="border border-line bg-card p-5">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <time dateTime={item.date}>{item.date}</time>
                <Badge>{item.kindLabel}</Badge>
                {item.upcoming ? <Badge>{copy.upcoming}</Badge> : null}
              </div>
              <h2 className="mt-3 font-serif text-2xl leading-tight">
                <Link href={item.href} className="underline-offset-4 hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{item.excerpt}</p>
              <p className="mt-3 text-sm text-muted">{item.place}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
