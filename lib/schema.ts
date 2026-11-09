import { getPerson } from "@/content/people";
import { site } from "@/content/site";
import { href, l, orcidUrl, scopusUrl, type Locale } from "@/lib/i18n";

export function departmentJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: l(locale, site.name),
    url: new URL(href(locale), site.url).toString(),
    email: site.email,
    telephone: site.phone,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: l(locale, site.university),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: l(locale, site.address),
      addressCountry: "RU",
    },
    foundingDate: String(site.founded),
  };
}

export function personJsonLd(locale: Locale, slug: string) {
  const person = getPerson(slug);
  if (!person) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: l(locale, person.name),
    jobTitle: l(locale, person.position),
    email: person.email,
    telephone: person.phone,
    affiliation: {
      "@type": "EducationalOrganization",
      name: l(locale, site.name),
    },
    knowsAbout: l(locale, person.interests),
    sameAs: [orcidUrl(person.orcid), scopusUrl(person.scopus)],
    url: new URL(href(locale, `/people/${person.slug}`), site.url).toString(),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(href(locale, item.path), site.url).toString(),
    })),
  };
}

export function faqJsonLd(locale: Locale, items: { q: { ru: string; en: string }; a: { ru: string; en: string } }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: l(locale, item.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: l(locale, item.a),
      },
    })),
  };
}
