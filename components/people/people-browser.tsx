"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Monogram } from "@/components/people/monogram";
import { t } from "@/content/messages";
import type { PositionGroup } from "@/content/people";
import { orcidUrl, type Locale } from "@/lib/i18n";
import { ExternalLink } from "@/components/layout/external-link";

export type PersonCardModel = {
  href: string;
  name: string;
  degree: string;
  position: string;
  positionGroup: PositionGroup;
  directionIds: string[];
  directions: string[];
  interests: string;
  orcid: string;
};

const groups: PositionGroup[] = ["head", "professor", "associate", "assistant", "researcher"];

export function PeopleBrowser({
  locale,
  people,
  directions,
}: {
  locale: Locale;
  people: PersonCardModel[];
  directions: { id: string; label: string }[];
}) {
  const copy = t(locale);
  const [position, setPosition] = useState<PositionGroup | "all">("all");
  const [direction, setDirection] = useState("all");
  const groupLabel: Record<PositionGroup, string> = {
    head: copy.positionHead,
    professor: copy.positionProfessor,
    associate: copy.positionAssociate,
    assistant: copy.positionAssistant,
    researcher: copy.positionResearcher,
  };
  const visible = useMemo(
    () =>
      people.filter((person) => {
        const positionOk = position === "all" || person.positionGroup === position;
        const directionOk = direction === "all" || person.directionIds.includes(direction);
        return positionOk && directionOk;
      }),
    [people, position, direction],
  );

  return (
    <div className="grid gap-8">
      <div className="grid gap-5 border border-line bg-card p-4">
        <fieldset>
          <legend className="text-sm font-semibold">{copy.filterPosition}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton pressed={position === "all"} onClick={() => setPosition("all")}>
              {copy.all}
            </FilterButton>
            {groups.map((group) => (
              <FilterButton key={group} pressed={position === group} onClick={() => setPosition(group)}>
                {groupLabel[group]}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold">{copy.filterDirection}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterButton pressed={direction === "all"} onClick={() => setDirection("all")}>
              {copy.all}
            </FilterButton>
            {directions.map((item) => (
              <FilterButton key={item.id} pressed={direction === item.id} onClick={() => setDirection(item.id)}>
                {item.label}
              </FilterButton>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-muted">
          {copy.results}: {visible.length}
        </p>
      </div>
      {visible.length === 0 ? <p>{copy.empty}</p> : null}
      <ul className="grid gap-4 md:grid-cols-2">
        {visible.map((person) => (
          <li key={person.href}>
            <article className="flex h-full gap-4 border border-line bg-card p-5 transition hover:border-pine">
              <Monogram name={person.name} />
              <div className="min-w-0">
                <h2 className="font-serif text-2xl leading-tight">
                  <Link href={person.href} className="underline-offset-4 hover:underline">
                    {person.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted">{person.degree}</p>
                <p className="mt-1 text-sm font-semibold">{person.position}</p>
                <p className="mt-3 text-sm leading-relaxed">{person.interests}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-bronze">{person.directions.join(" · ")}</p>
                <ExternalLink href={orcidUrl(person.orcid)} newTabLabel={copy.newTab} className="mt-3 inline-block text-sm text-pine underline underline-offset-4">
                  {copy.orcid} {person.orcid}
                </ExternalLink>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterButton({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`min-h-11 border px-3 text-sm ${pressed ? "border-button bg-button text-button-foreground" : "border-line bg-elevated"}`}
    >
      {children}
    </button>
  );
}
