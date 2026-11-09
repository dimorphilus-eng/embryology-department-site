import { z } from "zod";
import type { Localized } from "@/lib/i18n";

export const slugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .min(2)
  .max(48);

function pair(max: number, required: boolean) {
  return z
    .object({
      ru: required ? z.string().trim().min(1).max(max) : z.string().trim().max(max),
      en: z.string().trim().max(max),
    })
    .transform((value): Localized => ({
      ru: value.ru,
      en: value.en || value.ru,
    }));
}

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  });

export const pageInput = z.object({
  slug: slugSchema,
  title: pair(180, true),
  navLabel: pair(40, false),
  lead: pair(400, false),
  body: pair(20_000, true),
  showInNav: z.boolean(),
});

export const articleInput = z.object({
  slug: slugSchema,
  date: dateSchema,
  kind: z.enum(["news", "conference", "seminar", "defense"]),
  title: pair(180, true),
  excerpt: pair(400, true),
  place: pair(160, false),
  body: pair(20_000, true),
});

export function navLabelOrTitle(title: Localized, navLabel: Localized): Localized {
  if (navLabel.ru) return navLabel;
  return {
    ru: title.ru.slice(0, 40),
    en: title.en.slice(0, 40),
  };
}
