"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { skills, skillsByGroup } from "@/data/skills";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types";

/**
 * The skill constellation.
 *
 * Grouped so the section reads as a system rather than a wall of badges.
 * Selecting a skill explains it and links to the work that uses it.
 */
export function SkillsSection({ showHeader = true }: { showHeader?: boolean }) {
  const [group, setGroup] = useState<SkillGroup>(skillsByGroup[0].group);
  const [active, setActive] = useState<string>(skillsByGroup[0].items[0].name);

  const current = skills.find((s) => s.name === active) ?? skills[0];
  const related = (current.projectSlugs ?? [])
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const groupItems = skillsByGroup.find((g) => g.group === group)?.items ?? [];

  return (
    <Section id="skills" aria-label="Skills as a building system">
      <SectionInner>
        {showHeader && (
          <SectionLabel index="04">Skills</SectionLabel>
        )}
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            {showHeader && (
              <>
                <SectionTitle id="skills-title">
                  Skills as a building system
                </SectionTitle>
                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  A capability only matters when it connects to something
                  real. Every skill below links to the website work that
                  actually uses it — pick one to see the build behind it.
                </p>
              </>
            )}

            <div
              className="mt-8 flex flex-wrap gap-1.5"
              role="tablist"
              aria-label="Skill groups"
            >
              {skillsByGroup.map((g) => (
                <button
                  key={g.group}
                  role="tab"
                  aria-selected={group === g.group}
                  onClick={() => {
                    setGroup(g.group);
                    setActive(g.items[0].name);
                  }}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs transition-colors",
                    group === g.group
                      ? "border-cyan/45 bg-cyan/10 text-foreground"
                      : "border-black/10 text-muted-foreground hover:border-black/25 hover:text-foreground",
                  )}
                >
                  {g.group}
                </button>
              ))}
            </div>

            <ul
              className="mt-5 flex flex-wrap gap-1.5"
              aria-label={`${group} skills`}
            >
              {groupItems.map((s) => (
                <li key={s.name}>
                  <button
                    onClick={() => setActive(s.name)}
                    aria-pressed={active === s.name}
                    className={cn(
                      "rounded border px-2.5 py-1 font-mono text-[0.72rem] transition-colors",
                      active === s.name
                        ? "border-amber/50 bg-amber/10 text-amber"
                        : "border-black/10 text-muted-foreground hover:border-black/25 hover:text-foreground",
                    )}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-elevated rounded-lg p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {current.name}
              </h3>
              {current.verifiedLevel && (
                <span className="inline-flex items-center gap-1 rounded border border-black/12 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-subtle">
                  <Check className="h-2.5 w-2.5" strokeWidth={2.2} />
                  {current.verifiedLevel}
                </span>
              )}
            </div>

            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
              {current.description}
            </p>

            {related.length > 0 && (
              <div className="mt-6 border-t border-black/8 pt-5">
                <p className="label-technical">Used in</p>
                <ul className="mt-3 space-y-1.5">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {p.title}
                        <ArrowUpRight
                          className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70"
                          strokeWidth={1.7}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 border-t border-black/8 pt-5">
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-cyan transition-colors hover:text-foreground"
              >
                Explore the full skill map
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
