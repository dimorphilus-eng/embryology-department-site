import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { Localized } from "@/lib/i18n";

type ManagedKind = "news" | "conference" | "seminar" | "defense";

export type ManagedPage = {
  slug: string;
  title: Localized;
  navLabel: Localized;
  lead: Localized;
  body: Localized;
  showInNav: boolean;
  updatedAt: string;
};

export type ManagedArticle = {
  slug: string;
  date: string;
  kind: ManagedKind;
  title: Localized;
  excerpt: Localized;
  place: Localized;
  body: Localized;
  updatedAt: string;
};

export type SectionKey = "about" | "students" | "education" | "people" | "news";

export type ManagedSection = {
  key: SectionKey;
  title: Localized;
  lead: Localized;
  body: Localized;
  updatedAt: string;
};

export type Store = {
  pages: ManagedPage[];
  articles: ManagedArticle[];
  sections: ManagedSection[];
};

const empty: Store = { pages: [], articles: [], sections: [] };

function storeFile() {
  return path.join(process.cwd(), "data", "store.json");
}

export function getStore(): Store {
  try {
    const parsed = JSON.parse(fs.readFileSync(storeFile(), "utf8")) as Partial<Store>;
    return {
      pages: Array.isArray(parsed.pages) ? parsed.pages : [],
      articles: Array.isArray(parsed.articles) ? parsed.articles : [],
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
    };
  } catch {
    return empty;
  }
}

export function commitStore(next: Store) {
  const file = storeFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(next, null, 2)}\n`);
  fs.renameSync(tmp, file);
  revalidatePath("/ru", "layout");
  revalidatePath("/en", "layout");
  revalidatePath("/sitemap.xml");
}
