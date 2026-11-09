import Link from "next/link";
import { t } from "@/content/messages";
import { JsonLd } from "@/components/layout/json-ld";
import { Container } from "@/components/layout/container";
import { href, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/schema";

export function PageHeader({
  locale,
  path,
  title,
  lead,
  eyebrow,
  crumbs = [],
}: {
  locale: Locale;
  path: string;
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs?: { label: string; path: string }[];
}) {
  const copy = t(locale);
  const trail = [{ name: copy.home, path: "/" }, ...crumbs.map((crumb) => ({ name: crumb.label, path: crumb.path })), { name: title, path }];

  return (
    <header className="border-b border-line bg-header text-header-foreground">
      <JsonLd data={breadcrumbJsonLd(locale, trail)} />
      <Container className="py-12 md:py-16">
        <nav aria-label={copy.home}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-header-muted">
            <li>
              <Link href={href(locale)} className="underline-offset-4 hover:underline">
                {copy.home}
              </Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.path} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                <Link href={href(locale, crumb.path)} className="underline-offset-4 hover:underline">
                  {crumb.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </li>
          </ol>
        </nav>
        {eyebrow ? <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-on-dark">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-[1.15] text-balance md:text-5xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-3xl text-lg leading-relaxed text-header-muted">{lead}</p> : null}
      </Container>
    </header>
  );
}

export function InPageNav({ locale, items }: { locale: Locale; items: { href: string; label: string }[] }) {
  const copy = t(locale);
  return (
    <nav aria-label={copy.onThisPage} className="border-b border-line bg-elevated">
      <Container className="flex gap-2 overflow-x-auto py-3">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="shrink-0 border border-line bg-card px-3 py-2 text-sm hover:border-pine">
            {item.label}
          </a>
        ))}
      </Container>
    </nav>
  );
}
