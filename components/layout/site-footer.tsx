import Link from "next/link";
import { SubscribeForm } from "@/components/forms/subscribe-form";
import { Mark } from "@/components/brand/mark";
import { Container } from "@/components/layout/container";
import { t } from "@/content/messages";
import { site } from "@/content/site";
import { href, l, type Locale } from "@/lib/i18n";
import { mainNav } from "@/lib/navigation";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-header text-header-foreground">
      <Container className="grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <Mark className="h-10 w-10" />
            <p className="font-serif text-xl leading-tight">{l(locale, site.shortName)}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-header-muted">{l(locale, site.institute)}</p>
          <p className="mt-3 text-sm leading-relaxed text-header-muted">{l(locale, site.address)}</p>
        </div>
        <nav aria-label={copy.footerNav} className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-on-dark">{copy.footerNav}</p>
          <ul className="mt-3 grid gap-2">
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link href={href(locale, item.href)} className="text-sm text-header-muted underline-offset-4 hover:underline">
                  {copy.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-on-dark">{copy.subscribe}</p>
          <p className="mt-3 text-sm leading-relaxed text-header-muted">{copy.subscribeLead}</p>
          <div className="mt-4">
            <SubscribeForm locale={locale} tone="inverse" />
          </div>
        </div>
      </Container>
      <div className="border-t border-header-foreground/20">
        <Container className="grid gap-2 py-4 text-xs leading-relaxed text-header-muted md:grid-cols-[auto_1fr]">
          <p>
            © {year} {copy.rights}
          </p>
          <p>{copy.demoNote}</p>
        </Container>
      </div>
    </footer>
  );
}
