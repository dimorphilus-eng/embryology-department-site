import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { ExternalLink } from "@/components/layout/external-link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { site } from "@/content/site";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.contacts, description: copy.contactsLead, path: "/contacts" });
}

export default async function ContactsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(site.map.bbox)}&layer=mapnik&marker=${site.map.lat}%2C${site.map.lng}`;
  const yandex = `https://yandex.ru/maps/?pt=${site.map.lng},${site.map.lat}&z=16&l=map`;
  const google = `https://www.google.com/maps/search/?api=1&query=${site.map.lat},${site.map.lng}`;

  return (
    <>
      <PageHeader locale={locale} path="/contacts" title={copy.pages.contacts} lead={copy.contactsLead} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_1.1fr]">
        <section className="grid gap-4">
          <h2 className="font-serif text-3xl">{l(locale, site.shortName)}</h2>
          <p>{l(locale, site.institute)}</p>
          <p>{l(locale, site.university)}</p>
          <address className="not-italic leading-relaxed">
            {l(locale, site.address)}
            <br />
            {l(locale, site.hours)}
          </address>
          <p>
            <a className="text-pine underline underline-offset-4" href={site.phoneHref}>
              {site.phone}
            </a>
          </p>
          <p>
            <a className="text-pine underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            <a className="text-pine underline underline-offset-4" href={`mailto:${site.admissionsEmail}`}>
              {site.admissionsEmail}
            </a>
          </p>
          <p>
            <ExternalLink href={site.telegram} newTabLabel={copy.newTab} className="text-pine underline underline-offset-4">
              Telegram {site.telegramLabel}
            </ExternalLink>
          </p>
          <div>
            <h2 className="font-serif text-2xl">{copy.mapTitle}</h2>
            <iframe title={copy.mapTitle} src={mapSrc} className="mt-3 h-72 w-full border border-line" loading="lazy" />
            <p className="mt-2 text-sm text-muted">{copy.mapCaption}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <ExternalLink href={yandex} newTabLabel={copy.newTab} className="text-pine underline underline-offset-4">
                {copy.openYandex}
              </ExternalLink>
              <ExternalLink href={google} newTabLabel={copy.newTab} className="text-pine underline underline-offset-4">
                {copy.openGoogle}
              </ExternalLink>
            </div>
          </div>
        </section>
        <section className="border border-line bg-card p-5 md:p-6">
          <h2 className="font-serif text-3xl">{copy.formTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{copy.formLead}</p>
          <div className="mt-5">
            <ContactForm locale={locale} />
          </div>
        </section>
      </Container>
    </>
  );
}
