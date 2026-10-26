import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, ExternalLink, Info, ShoppingBag, Tag, Video, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import {
  consultationServices,
  topmateProducts,
  digitalProducts,
  TOPMATE_PROFILE_URL,
  SERVICES_LAST_VERIFIED,
} from "@/data/services";
import { EMAIL } from "@/data/experience";

export const metadata: Metadata = {
  title: "Services & Bookings",
  description:
    "Book a website discovery call, discuss a redesign or an e-commerce build, or review an existing site. Consultations and digital products are handled on Topmate.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Bookings — Aditya Madhok",
    description:
      "Consultations and digital products, booked on Topmate. Website reviews, e-commerce discussions and small downloadable tools.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Masthead */}
      <header className="relative overflow-hidden border-b border-black/[0.06]">
        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="label-technical">Services</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            A direct line to the work
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Website reviews, redesign conversations and e-commerce builds.
            Consultations and digital products are listed here, but every
            booking, payment and schedule happens on Topmate. Nothing is
            reserved or completed on this site.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Button
              asChild
              className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
            >
              <a
                href={TOPMATE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the Topmate profile
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
                Email instead
              </a>
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] text-subtle">
            <Info className="h-3 w-3" strokeWidth={1.7} />
            PRICES AND DURATIONS LAST VERIFIED {SERVICES_LAST_VERIFIED} · TOPMATE
            REMAINS THE SOURCE OF TRUTH
          </p>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Consultations                                                */}
      {/* ---------------------------------------------------------- */}
      <Section aria-labelledby="consultations-title">
        <SectionInner>
          <SectionLabel>Consultations</SectionLabel>
          <SectionTitle className="mt-6" id="consultations-title">
            Book a conversation about the work
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Three ways to talk through what you are building. Each one opens
            the matching Topmate booking page, where availability and final
            terms are confirmed.
          </p>

          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {consultationServices.map((s) => (
              <li
                key={s.id}
                className="panel-elevated flex flex-col rounded-lg p-6 transition-colors hover:border-amber/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-black/12 bg-black/[0.03]">
                    <Video className="h-4 w-4 text-cyan" strokeWidth={1.6} />
                  </span>
                  <Badge
                    variant="outline"
                    className="rounded border-black/12 font-mono text-[0.6rem] font-normal text-muted-foreground"
                  >
                    {s.category}
                  </Badge>
                </div>

                <h3 className="mt-5 text-xl font-medium leading-snug tracking-tight text-foreground">
                  {s.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {s.detail && (
                  <p className="mt-3 text-sm leading-relaxed text-subtle">
                    {s.detail}
                  </p>
                )}

                <dl className="mt-6 space-y-2 border-t border-black/[0.07] pt-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-subtle" strokeWidth={1.7} />
                      Duration
                    </dt>
                    <dd className="font-mono text-[0.78rem] text-foreground">
                      {s.duration ?? "See listing"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="h-3.5 w-3.5 text-subtle" strokeWidth={1.7} />
                      Price
                    </dt>
                    <dd className="font-mono text-[0.78rem] text-amber">
                      {s.price ?? "See listing"}
                    </dd>
                  </div>
                </dl>

                <a
                  href={s.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
                >
                  {s.price ? s.cta : "View details & book"}
                  <ExternalLink className="ml-2 h-3.5 w-3.5" strokeWidth={1.75} />
                </a>

                <p className="mt-3 text-center font-mono text-[0.6rem] tracking-[0.1em] text-subtle">
                  OPENS TOPMATE IN A NEW TAB
                </p>
              </li>
            ))}
          </ul>
        </SectionInner>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/* What I can help you explore                                   */}
      {/* ---------------------------------------------------------- */}
      <Section aria-labelledby="explore-title">
        <SectionInner>
          <SectionLabel>Beyond the fixed packages</SectionLabel>
          <SectionTitle className="mt-6" id="explore-title">
            What I can help you explore
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            These are the kinds of work we can discuss — areas for
            conversation and potential collaboration, not promises that every
            request already exists as a standardised paid service.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Business website design",
              "Website redesign",
              "E-commerce storefronts",
              "Responsive front-end builds",
              "3D and interactive web",
              "Content structure and copy",
              "Brand and visual direction",
              "Product merchandising",
              "SEO foundations",
              "Bilingual interfaces",
              "Website reviews",
              "Landing pages",
            ].map((area) => (
              <li
                key={area}
                className="flex items-start gap-2.5 border-b border-black/[0.06] pb-3 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan/70"
                  strokeWidth={1.7}
                />
                {area}
              </li>
            ))}
          </ul>

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
                Discuss your idea on Topmate
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
        </SectionInner>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/* Digital products                                             */}
      {/* ---------------------------------------------------------- */}
      <Section aria-labelledby="products-title">
        <SectionInner>
          <SectionLabel>Digital products</SectionLabel>
          <SectionTitle className="mt-6" id="products-title">
            Small tools you can download
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            Downloadable software, sold directly. Availability and price are
            shown as currently listed — the sales page is always the
            authoritative version.
          </p>

          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {[...topmateProducts, ...digitalProducts].map((s) => (
              <li
                key={s.id}
                className="panel-elevated flex flex-col rounded-lg p-6 transition-colors hover:border-violet/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-black/12 bg-black/[0.03]">
                    <ShoppingBag className="h-4 w-4 text-violet" strokeWidth={1.6} />
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded border-black/12 font-mono text-[0.6rem] font-normal text-muted-foreground"
                    >
                      {s.category}
                    </Badge>
                    {s.price && (
                      <span className="rounded border border-violet/30 bg-violet/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-violet">
                        {s.price}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-medium leading-snug tracking-tight text-foreground">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {s.detail && (
                  <p className="mt-3 text-sm leading-relaxed text-subtle">
                    {s.detail}
                  </p>
                )}

                {s.relatedProjectSlugs && s.relatedProjectSlugs.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.relatedProjectSlugs.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/projects/${slug}`}
                          className="rounded border border-black/10 px-2 py-0.5 font-mono text-[0.62rem] text-muted-foreground transition-colors hover:border-amber/40 hover:text-foreground"
                        >
                          {slug.replace(/-/g, " ")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={s.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-black/16 px-5 text-sm font-medium text-foreground transition-colors hover:border-violet/50 hover:bg-black/[0.04]"
                >
                  {s.cta}
                  <ExternalLink className="ml-2 h-3.5 w-3.5" strokeWidth={1.75} />
                </a>

                {s.lastVerified && (
                  <p className="mt-3 text-center font-mono text-[0.6rem] tracking-[0.1em] text-subtle">
                    LISTING VERIFIED {s.lastVerified}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </SectionInner>
      </Section>

      {/* ---------------------------------------------------------- */}
      {/* Profile identity                                             */}
      {/* ---------------------------------------------------------- */}
      <Section aria-labelledby="profile-title">
        <SectionInner>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionLabel>On Topmate</SectionLabel>
              <SectionTitle className="mt-6" id="profile-title">
                Web Designer &amp; Developer | E-commerce | Interactive Web
              </SectionTitle>
            </div>
            <div>
              <div className="space-y-4 text-pretty text-base leading-relaxed text-muted-foreground">
                <p>
                  Hi! I&apos;m a web designer and developer who enjoys building
                  clear, useful websites and the interfaces inside them. I
                  like taking a complicated offer and turning it into
                  something a visitor can understand quickly.
                </p>
                <p>
                  My recent work includes a multi-category business storefront
                  and a 3D fashion e-commerce remake. Alongside the web work I
                  bring a decade of design, branding, content and SEO
                  experience.
                </p>
                <p>
                  I&apos;m interested in projects where the website has to do
                  real work — sell something, explain something, or make a
                  business feel as credible online as it is in person.
                </p>
                <p>
                  Through Topmate, I want to connect with business owners and
                  fellow developers, share the work, and help others think
                  clearly about their own website.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-7 h-10 rounded-full border-black/14 px-5 text-sm text-foreground hover:border-black/30 hover:bg-black/[0.04]"
              >
                <a
                  href={TOPMATE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the profile
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
              </Button>
            </div>
          </div>
        </SectionInner>
      </Section>
    </>
  );
}
