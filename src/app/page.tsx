import type { Metadata } from "next";
import { HeroEditorial } from "@/components/home/hero-editorial";
import { NoticeBuildShip } from "@/components/home/notice-build-ship";
import { AboutSection } from "@/components/home/about-section";
import { JourneySection } from "@/components/home/journey-section";
import { SkillsSection } from "@/components/home/skills-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { ContactCta } from "@/components/home/contact-cta";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Aditya Madhok — Web Designer & Developer",
  description:
    "Aditya Madhok designs and builds modern websites for businesses — redesigned storefronts, property brands, fashion e-commerce and interactive web experiences.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <HeroEditorial />
      <NoticeBuildShip />
      <AboutSection />
      <JourneySection />
      <SkillsSection />
      <ServicesPreview />
      <KnowledgePreview />
      <ContactCta />
    </>
  );
}

/** A short pointer to the knowledge library and the published articles. */
function KnowledgePreview() {
  return (
    <Section id="knowledge" aria-labelledby="knowledge-title">
      <SectionInner>
        <SectionLabel index="06">Knowledge library</SectionLabel>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionTitle id="knowledge-title">
              Notes from the build
            </SectionTitle>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Published write-ups on the work behind the websites — process,
              decisions and the parts that are usually left out of a
              portfolio.
            </p>
            <Link
              href="/library?view=articles"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
            >
              Open the knowledge library
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
            </Link>
          </div>

          <ul className="grid gap-3">
            {articles.map((a) => (
              <li key={a.slug} className="panel-elevated rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <BookOpen
                    className="mt-0.5 h-4 w-4 shrink-0 text-cyan"
                    strokeWidth={1.6}
                  />
                  <div>
                    <p className="font-mono text-[0.62rem] tracking-[0.2em] text-subtle uppercase">
                      {a.category} · {a.publishedAt}
                    </p>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block text-pretty text-base font-medium leading-snug tracking-tight text-foreground transition-colors hover:text-amber"
                    >
                      {a.title}
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {a.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 font-mono text-[0.65rem] tracking-[0.18em] text-subtle">
          {projects.length} WEBSITES · {articles.length} PUBLISHED ARTICLES · MORE
          IN PROGRESS
        </p>
      </SectionInner>
    </Section>
  );
}
