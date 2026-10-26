import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Mail, ExternalLink, Link2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { ContactForm } from "@/components/forms/contact-form";
import { EMAIL, links } from "@/data/experience";
import { TOPMATE_PROFILE_URL } from "@/data/services";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description:
    "Book a conversation on Topmate, send a message, or reach out by email. Website design, redesigns, e-commerce builds and interactive web experiences.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Aditya Madhok",
    description:
      "A direct line for website ideas, redesigns and collaboration.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-black/[0.06]">
        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="label-technical">Start a project</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Let&apos;s build a website worth visiting.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Have a website idea, a redesign that keeps getting delayed, or a
            storefront that should be doing more? Let&apos;s talk about what it
            needs to say and how it should work.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Button
              asChild
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
            >
              <a
                href={TOPMATE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a conversation
                <ExternalLink className="ml-2 h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-black/14 px-6 text-sm text-foreground hover:border-black/30 hover:bg-black/[0.04]"
            >
              <a href={`mailto:${EMAIL}`}>
                <Mail className="mr-2 h-3.5 w-3.5" strokeWidth={1.75} />
                Email Aditya
              </a>
            </Button>
          </div>
        </div>
      </header>

      <Section aria-labelledby="form-title">
        <SectionInner>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <SectionLabel index="01">Send a message</SectionLabel>
              <SectionTitle className="mt-6" id="form-title">
                Describe the idea
              </SectionTitle>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                The more concrete the problem, the more useful the reply.
                A short description of what you are trying to do and where
                you are stuck is enough to start.
              </p>

              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <aside className="space-y-4">
              <div className="panel-elevated rounded-lg p-6">
                <p className="label-technical">Other ways to reach me</p>
                <ul className="mt-4 space-y-3">
                  {links.map((l) => {
                    const Icon =
                      l.label === "GitHub"
                        ? GitHubIcon
                        : l.label === "LinkedIn"
                          ? LinkedInIcon
                          : l.label === "Email"
                            ? Mail
                            : Link2;
                    return (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target={l.external ? "_blank" : undefined}
                          rel={
                            l.external ? "noopener noreferrer" : undefined
                          }
                          className="group flex items-start gap-3 text-sm"
                        >
                          <Icon
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-subtle transition-colors group-hover:text-cyan"
                            strokeWidth={1.6}
                          />
                          <span>
                            <span className="block text-foreground transition-colors group-hover:text-cyan">
                              {l.label}
                            </span>
                            {l.description && (
                              <span className="mt-0.5 block text-xs text-subtle">
                                {l.description}
                              </span>
                            )}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="panel-elevated rounded-lg p-6">
                <p className="label-technical">What happens next</p>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-mono text-[0.68rem] text-amber">01</span>
                    <span>
                      Your message lands in the inbox and gets read.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[0.68rem] text-amber">02</span>
                    <span>
                      If a short call would help, a booking link is sent
                      through Topmate.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[0.68rem] text-amber">03</span>
                    <span>
                      You get a straight answer — including &ldquo;this is
                      probably not the right tool for that&rdquo;.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="panel-elevated rounded-lg p-6">
                <p className="label-technical">Before you write</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  If you are just looking for what exists, the{" "}
                  <Link
                    href="/library"
                    className="text-cyan underline underline-offset-4"
                  >
                    project library
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/services"
                    className="text-cyan underline underline-offset-4"
                  >
                    services page
                  </Link>{" "}
                  will answer most questions faster.
                </p>
              </div>
            </aside>
          </div>
        </SectionInner>
      </Section>
    </>
  );
}
