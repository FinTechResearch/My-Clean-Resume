import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProject } from "@/data/projects";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";

/**
 * NOTICE → BUILD → SHIP
 *
 * The working method behind the website builds, with each stage pointing
 * at the live work rather than standing alone as copy.
 */

const stages = [
  {
    id: "notice",
    index: "01",
    title: "Notice",
    quote:
      "Every good website starts with something that is not working — a shop that looks smaller than it is, a product that is hard to find, a story nobody hears.",
    body: "Before the design, the job is to understand the business: what it sells, who it serves, what makes people trust it, and what the current site is failing to say.",
    projectSlugs: ["well-value-india"],
  },
  {
    id: "build",
    index: "02",
    title: "Build",
    quote:
      "Structure, type, colour, content and interaction — built together, not layered on at the end.",
    body: "The work is in the hierarchy: a clear opening, categories that make sense, product information where it is needed, and spacing that gives the page room to be read.",
    projectSlugs: ["nykaa-fashion-3d", "well-value-india"],
  },
  {
    id: "ship",
    index: "03",
    title: "Ship",
    quote:
      "A website is finished when someone can open it, understand it, and act on it — on the screen they actually use.",
    body: "That means responsive checks, real content, clear calls to action and a live URL. Then the next improvement begins from evidence rather than taste.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
];

export function NoticeBuildShip() {
  return (
    <Section id="notice-build-ship" aria-labelledby="nbs-title">
      <SectionInner>
        <SectionLabel index="01">Approach</SectionLabel>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <SectionTitle id="nbs-title">Notice. Build. Ship.</SectionTitle>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The method behind every build. It is a loop, not a slogan — each
            stage feeds the next one, and shipping is what turns a private
            draft into something other people can use.
          </p>
        </div>

        <ol className="mt-16 grid gap-5 lg:grid-cols-3">
          {stages.map((stage) => (
            <li key={stage.id} className="group relative">
              <article className="flex h-full flex-col border-t border-black/10 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.65rem] tracking-[0.28em] text-amber">
                      {stage.index}
                    </p>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                <blockquote className="mt-5 border-l border-black/10 pl-4 text-pretty text-[0.95rem] leading-relaxed text-foreground/90">
                  {stage.quote}
                </blockquote>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {stage.body}
                </p>

                <ProjectLinks slugs={stage.projectSlugs} />
              </article>
            </li>
          ))}
        </ol>
      </SectionInner>
    </Section>
  );
}

function ProjectLinks({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (!items.length) return null;

  return (
    <div className="mt-auto pt-8">
      <p className="label-technical">In practice</p>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((p) => (
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
  );
}
