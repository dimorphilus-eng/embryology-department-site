import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { courses } from "@/content/education";
import documents from "@/content/documents.json";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.courses, description: copy.coursesLead, path: "/education/courses" });
}

export default async function CoursesPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  const groups = [
    { id: "bachelor" as const, label: copy.levelBachelor },
    { id: "master" as const, label: copy.levelMaster },
    { id: "phd" as const, label: copy.levelPhd },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        path="/education/courses"
        title={copy.pages.courses}
        lead={copy.coursesLead}
        crumbs={[{ label: copy.pages.education, path: "/education" }]}
      />
      <Container className="grid gap-10 py-12">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <h2 id={group.id} className="font-serif text-3xl">
              {group.label}
            </h2>
            <ul className="mt-4 grid gap-4">
              {courses
                .filter((course) => course.level === group.id)
                .map((course) => {
                  const syllabus = documents.find((item) => item.slug === course.syllabus);
                  return (
                    <li key={course.slug} id={course.slug} className="scroll-mt-36 border border-line bg-card p-5">
                      <h3 className="font-serif text-2xl">{l(locale, course.title)}</h3>
                      <p className="mt-2 text-sm text-muted">
                        {course.hours} {copy.hours.toLowerCase()} · {l(locale, course.semester)}
                      </p>
                      <p className="mt-3 max-w-3xl leading-relaxed">{l(locale, course.summary)}</p>
                      {syllabus ? (
                        <a className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-pine underline underline-offset-4" href={`/documents/${syllabus.slug}.${locale}.pdf`}>
                          {copy.downloadPdf}
                        </a>
                      ) : null}
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
