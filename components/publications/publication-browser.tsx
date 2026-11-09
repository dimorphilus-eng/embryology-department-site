"use client";

import { useMemo, useState } from "react";
import { t } from "@/content/messages";
import type { Locale } from "@/lib/i18n";

export type PublicationModel = {
  id: string;
  title: string;
  authors: string;
  authorSlugs: string[];
  year: number;
  venue: string;
  doi: string;
};

export function PublicationBrowser({
  locale,
  items,
  authors,
}: {
  locale: Locale;
  items: PublicationModel[];
  authors: { slug: string; name: string }[];
}) {
  const copy = t(locale);
  const years = useMemo(() => [...new Set(items.map((item) => item.year))].sort((a, b) => b - a), [items]);
  const [year, setYear] = useState<number | "all">("all");
  const [author, setAuthor] = useState("all");
  const visible = items.filter((item) => {
    const yearOk = year === "all" || item.year === year;
    const authorOk = author === "all" || item.authorSlugs.includes(author);
    return yearOk && authorOk;
  });

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 border border-line bg-card p-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          {copy.filterYear}
          <select
            className="min-h-11 border border-line bg-elevated px-3 font-normal"
            value={String(year)}
            onChange={(event) => setYear(event.target.value === "all" ? "all" : Number(event.target.value))}
          >
            <option value="all">{copy.all}</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          {copy.filterAuthor}
          <select className="min-h-11 border border-line bg-elevated px-3 font-normal" value={author} onChange={(event) => setAuthor(event.target.value)}>
            <option value="all">{copy.all}</option>
            {authors.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm text-muted md:col-span-2">
          {copy.results}: {visible.length}
        </p>
      </div>
      {visible.length === 0 ? <p>{copy.empty}</p> : null}
      <ol className="border-t border-line">
        {visible.map((item) => (
          <li key={item.id} className="grid gap-2 border-b border-line py-5 md:grid-cols-[5rem_1fr]">
            <p className="font-serif text-2xl text-bronze">{item.year}</p>
            <div>
              <h2 className="font-serif text-xl leading-snug">{item.title}</h2>
              <p className="mt-2 text-sm">{item.authors}</p>
              <p className="mt-1 text-sm text-muted">
                {copy.venue}: {item.venue}
              </p>
              <p className="mt-1 text-sm text-muted">
                {copy.doiSample}: {item.doi}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
