import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/layout/json-ld";
import { t } from "@/content/messages";
import { hero, site } from "@/content/site";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { departmentJsonLd } from "@/lib/schema";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return {
    title: {
      default: l(locale, site.name),
      template: `%s — ${l(locale, site.shortName)}`,
    },
    description: l(locale, hero.lead),
  };
}

export default async function LocaleLayout({ children, params }: LocaleParams & { children: React.ReactNode }) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const extraNav = getStore()
    .pages.filter((page) => page.showInNav)
    .map((page) => ({
      href: `/p/${page.slug}`,
      label: l(locale, page.navLabel.ru ? page.navLabel : page.title),
    }));

  return (
    <>
      <JsonLd data={departmentJsonLd(locale)} />
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <SiteHeader locale={locale} extraNav={extraNav} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
