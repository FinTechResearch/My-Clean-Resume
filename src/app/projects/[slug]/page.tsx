import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Layers,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, getProject, moreWebsitesNote } from "@/data/projects";

const accentMap = {
  amber: "#a15c1a",
  cyan: "#0f766e",
  violet: "#5b4bdb",
} as const;

export const instant = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Aditya Madhok`,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Aditya Madhok`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const accent = accentMap[project.accent ?? "amber"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Aditya Madhok",
      url: "https://topmate.io/adityamadhok",
    },
    keywords: project.technologies.join(", "),
  };

  return (
    <article className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Masthead */}
      <header className="border-b border-black/[0.07]">
        <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-14 sm:px-10 sm:pb-24 sm:pt-20">
          <nav aria-label="Breadcrumb" className="mb-12">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-subtle">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  HOME
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/library" className="transition-colors hover:text-foreground">
                  WORK
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">{project.title.toUpperCase()}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]"
              style={{
                color: accent,
                borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
              }}
            >
              {project.category}
            </span>
            <Badge
              variant="outline"
              className="rounded-full border-black/12 font-mono text-[0.6rem] font-normal text-muted-foreground"
            >
              {project.status}
            </Badge>
          </div>

          <h1 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[4.2rem]">
            {project.title}
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {project.liveUrl && (
              <Button
                asChild
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Sparkles className="mr-2 h-3.5 w-3.5" strokeWidth={1.75} />
                  Visit the live site
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-black/15 px-6 text-sm text-foreground hover:border-black/35 hover:bg-black/[0.03]"
            >
              <Link href="/contact">
                Ask about this project
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </Button>
          </div>

          <ul className="mt-14 flex flex-wrap gap-1.5 border-t border-black/[0.07] pt-6">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="rounded-full border border-black/10 px-3 py-1 font-mono text-[0.68rem] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div className="min-w-0">
            <Prose
              title="The problem"
              icon={<KeyRound className="h-4 w-4" strokeWidth={1.6} />}
            >
              <p>{project.problem}</p>
            </Prose>

            <Prose
              title="The build"
              icon={<Wrench className="h-4 w-4" strokeWidth={1.6} />}
            >
              <p>{project.solution}</p>
            </Prose>

            <Prose
              title="Implementation"
              icon={<Layers className="h-4 w-4" strokeWidth={1.6} />}
            >
              <p>{project.implementation}</p>
            </Prose>

            {project.pipeline && (
              <section className="mt-16">
                <h2 className="flex items-center gap-2.5 text-xl font-medium tracking-tight">
                  <CheckCircle2
                    className="h-4 w-4"
                    style={{ color: accent }}
                    strokeWidth={1.6}
                  />
                  The build path
                </h2>
                <ol className="mt-6 flex flex-wrap items-center gap-2">
                  {project.pipeline.map((stage, i) => (
                    <li key={stage} className="flex items-center gap-2">
                      <span
                        className="whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[0.68rem]"
                        style={{
                          color: accent,
                          borderColor: `color-mix(in oklab, ${accent} 28%, transparent)`,
                        }}
                      >
                        {stage}
                      </span>
                      {i < project.pipeline!.length - 1 && (
                        <span className="text-subtle" aria-hidden>
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {project.details && (
              <section className="mt-16">
                <h2 className="text-xl font-medium tracking-tight">Details</h2>
                <dl className="mt-6 divide-y divide-black/[0.07] border-y border-black/[0.07]">
                  {project.details.map((d) => (
                    <div
                      key={d.label}
                      className="grid gap-1 py-4 sm:grid-cols-[190px_1fr] sm:gap-8"
                    >
                      <dt className="label-technical pt-0.5">{d.label}</dt>
                      <dd className="text-sm leading-relaxed text-foreground">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="panel-elevated rounded-xl p-6">
              <p className="label-technical">Links</p>
              <ul className="mt-5 space-y-3">
                {project.liveUrl && (
                  <SidebarLink href={project.liveUrl} label="Live website" />
                )}
                {project.extraLinks?.map((l) => (
                  <SidebarLink key={l.url} href={l.url} label={l.label} />
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
                  >
                    Ask about this project
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-black/[0.08] p-6">
              <p className="label-technical">More work</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {moreWebsitesNote}
              </p>
              <Link
                href="/library"
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
              >
                Browse all websites
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-black/[0.07] pt-14">
            <h2 className="text-2xl font-medium tracking-tight">Other work</h2>
            <ul
              className={`mt-8 grid gap-6 ${
                related.length > 1 ? "sm:grid-cols-2" : "max-w-xl"
              }`}
            >
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-black/[0.07] bg-surface p-6 transition-colors hover:border-black/20"
                  >
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-cyan">
                      {p.category}
                    </span>
                    <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">
                      Open project
                      <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Navigation */}
        <nav
          aria-label="Project navigation"
          className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] pt-8"
        >
          <Link
            href="/library"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.7} />
            BACK TO ALL WORK
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.7} />
            BACK HOME
          </Link>
        </nav>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function Prose({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="flex items-center gap-2.5 text-xl font-medium tracking-tight">
        <span className="text-subtle">{icon}</span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-pretty text-[1.02rem] leading-[1.8] text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-amber"
      >
        {label}
        <ExternalLink
          className="h-3 w-3 text-subtle transition-colors group-hover:text-amber"
          strokeWidth={1.7}
        />
      </a>
    </li>
  );
}
