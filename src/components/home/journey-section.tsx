import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { journey } from "@/data/experience";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The Journey — learning, building, connecting, shipping, selling,
 * collaborating, and what comes next.
 *
 * Stages are explicitly marked as demonstrated work or as stated future
 * direction, so the two are never confused.
 */
export function JourneySection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <Section id="journey" aria-label="The journey">
      <SectionInner>
        {showHeader && (
          <>
            <SectionLabel index="03">Journey</SectionLabel>
            <SectionTitle className="mt-6" id="journey-title">
              How the work actually happens
            </SectionTitle>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              A working path rather than a résumé. The stages marked{" "}
              <span className="text-foreground">demonstrated</span> describe
              shipped work; the one marked{" "}
              <span className="text-violet">in progress</span> is what is being
              built next.
            </p>
          </>
        )}

        <ol className="mt-14">
          {journey.map((stage, i) => {
            const projects = (stage.projectSlugs ?? [])
              .map((s) => getProject(s))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));
            const isFuture = stage.kind === "future";

            return (
              <li key={stage.id} className="relative">
                <div className="grid gap-6 border-t border-black/[0.07] py-9 md:grid-cols-[auto_1fr_1fr] md:gap-10">
                  <div className="flex items-center gap-4 md:w-40 md:flex-col md:items-start md:gap-2">
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-[0.7rem]",
                        isFuture
                          ? "border-violet/40 text-violet"
                          : "border-amber/40 text-amber",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.62rem] tracking-[0.18em] uppercase",
                        isFuture ? "text-violet" : "text-cyan",
                      )}
                    >
                      {isFuture ? "In progress" : "Demonstrated"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium tracking-tight text-foreground">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-[0.7rem] text-subtle">
                      {stage.timeframe}
                    </p>
                    <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {stage.body}
                    </p>
                  </div>

                  <div>
                    {projects.length > 0 && (
                      <>
                        <p className="label-technical">Work behind it</p>
                        <ul className="mt-3 space-y-1.5">
                          {projects.map((p) => (
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
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </SectionInner>
    </Section>
  );
}
