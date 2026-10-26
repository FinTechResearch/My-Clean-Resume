import Link from "next/link";
import { ArrowUpRight, GraduationCap, Award, Languages } from "lucide-react";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  certifications,
  education,
  experience,
  languages,
} from "@/data/experience";

export function AboutSection() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <SectionInner>
        <SectionLabel index="02">About</SectionLabel>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <SectionTitle id="about-title">
              A designer who builds the thing,
              <br className="hidden sm:block" /> not just the picture of it.
            </SectionTitle>

            <div className="mt-7 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground">
              <p>
                I&apos;m Aditya Madhok, a web designer and developer building
                clear, modern websites for businesses.
              </p>
              <p>
                My work spans business storefronts, real-estate brands,
                e-commerce and interactive web experiences. I like taking a
                complicated offer and turning it into a page that feels simple
                to understand — and then building the responsive front-end
                that makes it real.
              </p>
              <p>
                Alongside development, I bring a decade of graphic design,
                digital content creation, branding and SEO. That combination
                helps me think about a website as a product, not a poster:
                structure, voice, visual rhythm and the path a visitor takes
                all have to agree.
              </p>
              <p className="text-foreground">
                I believe in noticing what is unclear, designing with restraint,
                shipping early, and improving from evidence.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Button
                asChild
                className="h-10 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/85"
              >
                <Link href="/journey">
                  See the journey
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 rounded-full border-black/14 px-5 text-sm text-foreground hover:border-black/30 hover:bg-black/[0.04]"
              >
                <Link href="/contact">Work with me</Link>
              </Button>
            </div>
          </div>

          {/* Experience timeline */}
          <div>
            <p className="label-technical">Professional experience</p>
            <ol className="mt-5 space-y-8">
              {experience.map((entry) => (
                <li key={entry.role} className="relative pl-6">
                  <span
                    className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-amber"
                    aria-hidden
                  />
                  <span
                    className="absolute left-[3.5px] top-4 h-full w-px bg-black/10"
                    aria-hidden
                  />
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] text-cyan">
                    {entry.period}
                  </p>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
                    {entry.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-subtle">
                    {entry.organization}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {entry.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-black/25"
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {entry.links && (
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {entry.links.map((l) => (
                        <li key={l.url}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-cyan transition-colors hover:text-foreground"
                          >
                            {l.label}
                            <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Education · Certifications · Languages */}
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <div className="panel-elevated rounded-lg p-6">
            <div className="flex items-center gap-2">
              <GraduationCap
                className="h-3.5 w-3.5 text-amber"
                strokeWidth={1.6}
              />
              <p className="label-technical">Education</p>
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">
              {education.degree}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {education.institution}
            </p>
            <p className="mt-3 font-mono text-[0.7rem] text-subtle">
              Completed {education.completion} · GPA {education.gpa}
            </p>
          </div>

          <div className="panel-elevated rounded-lg p-6">
            <div className="flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-cyan" strokeWidth={1.6} />
              <p className="label-technical">Certifications</p>
            </div>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="text-sm">
                  <p className="text-foreground">{c.name}</p>
                  <p className="mt-0.5 font-mono text-[0.7rem] text-subtle">
                    {c.issuer} · {c.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-elevated rounded-lg p-6">
            <div className="flex items-center gap-2">
              <Languages className="h-3.5 w-3.5 text-violet" strokeWidth={1.6} />
              <p className="label-technical">Languages</p>
            </div>
            <ul className="mt-4 space-y-3">
              {languages.map((l) => (
                <li
                  key={l.name}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="text-foreground">{l.name}</span>
                  <span className="font-mono text-[0.7rem] text-subtle">
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
