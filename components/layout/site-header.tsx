"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Mark } from "@/components/brand/mark";
import { A11yPanel } from "@/components/layout/a11y-panel";
import { t } from "@/content/messages";
import { site } from "@/content/site";
import { href, l, locales, type Locale } from "@/lib/i18n";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const params = useSearchParams();
  const copy = t(locale);
  const rest = pathname.replace(/^\/(ru|en)/, "") || "";
  const query = params.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <div role="group" aria-label={copy.language} className="flex items-center gap-1">
      {locales.map((item) => {
        const active = item === locale;
        return (
          <Link
            key={item}
            href={`/${item}${rest}${suffix}`}
            hrefLang={item}
            lang={item}
            aria-current={active ? "true" : undefined}
            className={cn("inline-flex min-h-11 min-w-11 items-center justify-center text-sm", active && "font-bold underline")}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

function DesktopNav({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  const copy = t(locale);
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <nav aria-label={copy.mainNav} className="hidden items-center gap-1 xl:flex">
      {mainNav.map((item) => {
        const itemHref = href(locale, item.href);
        const active = pathname === itemHref || pathname.startsWith(`${itemHref}/`);
        return (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => item.children && setOpenKey(item.key)}
            onMouseLeave={() => setOpenKey(null)}
          >
            <div className="flex items-center">
              <Link
                href={itemHref}
                aria-current={active ? "page" : undefined}
                className={cn("inline-flex min-h-11 items-center px-2 text-sm", active && "font-semibold")}
                onClick={() => setOpenKey(null)}
              >
                {copy.nav[item.key]}
              </Link>
              {item.children ? (
                <button
                  type="button"
                  className="inline-flex h-11 w-8 items-center justify-center"
                  aria-expanded={openKey === item.key}
                  aria-label={`${copy.openSection}: ${copy.nav[item.key]}`}
                  onClick={() => setOpenKey((current) => (current === item.key ? null : item.key))}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
              ) : null}
            </div>
            {item.children && openKey === item.key ? (
              <div className="absolute left-0 top-full z-40 min-w-56 border border-line bg-card py-2 text-foreground">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={href(locale, child.href)}
                    className="block px-4 py-2.5 text-sm hover:bg-pine-soft"
                    onClick={() => setOpenKey(null)}
                  >
                    {copy.children[child.key]}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

function MobileNav({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex h-11 w-11 items-center justify-center xl:hidden" aria-label={copy.openMenu}>
        <Menu className="h-5 w-5" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,24rem)] flex-col overflow-y-auto bg-card p-6 text-foreground">
          <div className="flex items-center justify-between gap-4">
            <Dialog.Title className="font-serif text-2xl">{copy.mainNav}</Dialog.Title>
            <Dialog.Close className="inline-flex h-11 w-11 items-center justify-center" aria-label={copy.closeMenu}>
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </div>
          <nav aria-label={copy.mainNav} className="mt-6 grid">
            {mainNav.map((item) => (
              <div key={item.key} className="border-t border-line py-2">
                <Link href={href(locale, item.href)} className="inline-flex min-h-11 items-center font-semibold" onClick={() => setOpen(false)}>
                  {copy.nav[item.key]}
                </Link>
                {item.children ? (
                  <div className="grid pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={href(locale, child.href)}
                        className="inline-flex min-h-10 items-center pl-3 text-sm text-muted"
                        onClick={() => setOpen(false)}
                      >
                        {copy.children[child.key]}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur">
      <div className="bg-header text-header-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-1 text-sm">
          <p className="text-header-muted">{l(locale, site.university)}</p>
          <div className="flex items-center gap-2">
            <A11yPanel locale={locale} />
            <Link href={href(locale, "/search")} className="inline-flex min-h-11 items-center gap-2 px-2">
              <Search className="h-4 w-4" aria-hidden />
              <span>{copy.search}</span>
            </Link>
            <Suspense
              fallback={
                <div className="flex">
                  <span className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm font-bold">
                    {locale.toUpperCase()}
                  </span>
                </div>
              }
            >
              <LanguageSwitcher locale={locale} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href={href(locale)} className="flex min-w-0 items-center gap-3">
          <Mark className="h-11 w-11 shrink-0" />
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{l(locale, site.institute)}</span>
            <span className="block font-serif text-lg leading-tight">{l(locale, site.shortName)}</span>
          </span>
        </Link>
        <DesktopNav locale={locale} />
        <MobileNav locale={locale} />
      </div>
    </header>
  );
}
