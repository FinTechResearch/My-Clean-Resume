import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Award, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import {
  certifications,
  education,
  experience,
  languages,
  LOCATION,
} from "@/data/experience";
import { TOPMATE_PROFILE_URL } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aditya Madhok is a web designer and developer from Jhansi, India, building modern business websites, storefronts and interactive commerce experiences.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Aditya Madhok",
    description:
      "Web designer and developer, with a decade of design and content work behind the builds.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <header className="border-b border-black/[0.07]">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="label-technical">About</p>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-medium leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[4rem]">
            Web designer and developer, based in Jhansi.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I build clear, modern websites for businesses — with a decade of
            graphic design, content and branding work behind the decisions.
            Based in {LOCATION}.
          </p>
        </div>
      </header>

      <Section aria-labelledby="bio-title">
        <SectionInner>
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
            <div>
              <SectionLabel index="01">Profile</SectionLabel>
              <h2 id="bio-title" className="sr-only">
                Biography
              </h2>
              <div className="mt-6 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  I&apos;m Aditya Madhok. I design and build websites for
                  businesses that have more to say than their current site can
                  carry.
                </p>
                <p>
                  The work usually starts with structure: what the business
                  actually sells, who it serves, and what a visitor needs to
                  understand before they trust it. From there it becomes
                  layout, type, colour, content and a responsive front-end
                  that holds together on a phone.
                </p>
                <p>
                  Alongside development, I bring a decade of graphic design,
                  digital content creation, branding and SEO. That combination
                  helps me think about a website as a product rather than a
                  poster — the story, the catalogue and the path to an enquiry
                  all have to agree.
                </p>
                <p className="text-foreground">
                  I believe in noticing what is unclear, designing with
                  restraint, shipping early, and improving from evidence.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                <Button
                  asChild
                  className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
                >
                  <a
                    href={TOPMATE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Work with me
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-full border-black/15 px-6 text-sm text-foreground hover:border-black/35 hover:bg-black/[0.03]"
                >
                  <Link href="/library">See the work</Link>
                </Button>
              </div>
            </div>

            {/* Experience timeline */}
            <div>
              <p className="label-technical">Professional experience</p>
              <ol className="mt-6 space-y-10">
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
                    <ul className="mt-4 space-y-2">
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
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
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
        </SectionInner>
      </Section>

      <Section aria-labelledby="creds-title">
        <SectionInner>
          <SectionLabel index="02">Credentials</SectionLabel>
          <SectionTitle className="mt-6" id="creds-title">
            Education, certifications and languages
          </SectionTitle>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className="panel-elevated rounded-xl p-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5 text-amber" strokeWidth={1.6} />
                <p className="label-technical">Education</p>
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                {education.degree}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {education.institution}
              </p>
              <p className="mt-3 font-mono text-[0.7rem] text-subtle">
                Completed {education.completion}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] text-subtle">
                GPA {education.gpa}
              </p>
            </div>

            <div className="panel-elevated rounded-xl p-6">
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

            <div className="panel-elevated rounded-xl p-6">
              <div className="flex items-center gap-2">
                <Languages className="h-3.5 w-3.5 text-violet" strokeWidth={1.6} />
                <p className="label-technical">Languages & location</p>
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
              <p className="mt-4 flex items-center gap-1.5 font-mono text-[0.7rem] text-subtle">
                <MapPin className="h-3 w-3" strokeWidth={1.7} />
                {LOCATION}
              </p>
            </div>
          </div>
        </SectionInner>
      </Section>
    </>
  );
}
