import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { t } from "@/content/messages";
import { courses, schedule } from "@/content/education";
import { l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.schedule, description: copy.scheduleNote, path: "/education/schedule" });
}

export default async function SchedulePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/education/schedule"
        title={copy.pages.schedule}
        lead={copy.scheduleNote}
        crumbs={[{ label: copy.pages.education, path: "/education" }]}
      />
      <Container className="grid gap-8 py-12">
        {schedule.map((day) => (
          <section key={day.id} aria-labelledby={day.id}>
            <h2 id={day.id} className="font-serif text-2xl">
              {l(locale, day.title)}
            </h2>
            <ul className="mt-3 border-t border-line">
              {day.slots.map((slot) => {
                const course = courses.find((item) => item.slug === slot.course);
                return (
                  <li key={`${day.id}-${slot.time}`} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[8rem_1fr]">
                    <p className="font-semibold">{slot.time}</p>
                    <div>
                      <p>{course ? l(locale, course.title) : slot.course}</p>
                      <p className="text-sm text-muted">
                        {copy.room} {slot.room} · {l(locale, slot.group)}
                      </p>
                    </div>
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
