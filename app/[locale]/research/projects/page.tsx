import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { t } from "@/content/messages";
import { getPerson } from "@/content/people";
import { projects } from "@/content/research";
import { href, l, localeParams } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = t(locale);
  return pageMetadata(locale, { title: copy.pages.projects, description: copy.projectsLead, path: "/research/projects" });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const copy = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        path="/research/projects"
        title={copy.pages.projects}
        lead={copy.projectsLead}
        crumbs={[{ label: copy.pages.research, path: "/research" }]}
      />
      <Container className="grid gap-4 py-12">
        {projects.map((project) => {
          const pi = getPerson(project.pi);
          return (
            <article key={project.slug} className="border border-line bg-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{project.status === "active" ? copy.statusActive : copy.statusCompleted}</Badge>
                <span className="text-sm text-muted">{project.years}</span>
                <span className="text-sm text-muted">
                  {copy.grant}: {project.code}
                </span>
              </div>
              <h2 className="mt-3 font-serif text-2xl">{l(locale, project.title)}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{l(locale, project.summary)}</p>
              {pi ? (
                <p className="mt-3 text-sm">
                  {copy.lead}:{" "}
                  <Link href={href(locale, `/people/${pi.slug}`)} className="text-pine underline underline-offset-4">
                    {l(locale, pi.name)}
                  </Link>
                </p>
              ) : null}
            </article>
          );
        })}
      </Container>
    </>
  );
}
