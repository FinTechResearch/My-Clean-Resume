import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { projects, moreWebsitesNote } from "@/data/projects";

/**
 * The opening screen.
 *
 * A clean editorial statement rather than a 3D scene: a lot of white,
 * one clear sentence, and the live work immediately visible below it.
 */
export function HeroEditorial() {
  return (
    <section
      id="work"
      aria-label="Aditya Madhok — selected website work"
      className="border-b border-black/[0.07]"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-32 lg:pt-40">
        <p className="label-technical">Independent web designer &amp; developer</p>

        <h1 className="mt-8 max-w-[18ch] text-balance text-[2.75rem] font-medium leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[5.2rem]">
          Websites with clarity, character, and room to breathe.
        </h1>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m Aditya Madhok. I design and build websites for businesses —
            storefronts, property brands and interactive commerce — with a
            focus on clear structure, honest content and interfaces that feel
            calm to use.
          </p>

          <div className="flex flex-wrap items-start gap-3 lg:justify-end">
            <Link
              href="/library"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Explore the work
              <ArrowDownRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/15 px-6 text-sm text-foreground transition-colors hover:border-black/40"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mt-24 sm:mt-36">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="label-technical">Selected websites</p>
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle">
              {String(projects.length).padStart(2, "0")} LIVE BUILDS
            </p>
          </div>

          <ul className="mt-6 border-t border-black/10">
            {projects.map((project, index) => (
              <li key={project.slug} className="border-b border-black/10">
                <div className="group grid gap-4 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:py-10">
                  <span className="font-mono text-[0.68rem] tracking-[0.18em] text-subtle">
                    0{index + 1}
                  </span>

                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-pretty text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground transition-opacity hover:opacity-60 sm:text-3xl"
                    >
                      {project.title}
                    </Link>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-subtle uppercase">
                      {project.category}
                    </span>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title} live`}
                        className="inline-flex items-center gap-1 font-mono text-[0.66rem] tracking-[0.12em] text-foreground transition-opacity hover:opacity-60"
                      >
                        Visit live
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {moreWebsitesNote}
          </p>
        </div>
      </div>
    </section>
  );
}
