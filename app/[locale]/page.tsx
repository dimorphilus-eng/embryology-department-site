import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";
import { hero, site } from "@/content/site";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return {
    ...pageMetadata(locale, {
      title: l(locale, site.name),
      description: l(locale, hero.lead),
      path: "/",
    }),
    title: { absolute: l(locale, site.name) },
  };
}

export default async function LocalizedHome({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  return <HomePage locale={locale} />;
}
