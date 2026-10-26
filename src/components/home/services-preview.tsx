import Link from "next/link";
import { ExternalLink, ArrowUpRight, Clock, Tag } from "lucide-react";
import {
  Section,
  SectionInner,
  SectionLabel,
  SectionTitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { consultationServices, topmateProducts } from "@/data/services";

/**
 * A compact preview of the Topmate services. The full cards, the
 * additional collaboration areas and the digital product area live on
 * /services — this is the homepage teaser.
 */
export function ServicesPreview() {
  return (
    <Section id="services" aria-labelledby="services-title">
      <SectionInner>
        <SectionLabel index="05">Services</SectionLabel>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionTitle id="services-title">
              A direct line to the work
            </SectionTitle>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Website reviews, redesign conversations and digital products are
              handled on Topmate. The portfolio shows what exists; the booking
              happens where the details are confirmed.
            </p>
            <Button
              asChild
              className="mt-7 h-10 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/85"
            >
              <Link href="/services">
                Explore all services
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {consultationServices.map((s) => (
              <li
                key={s.id}
                className="panel-elevated flex flex-col rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium leading-snug tracking-tight text-foreground">
                    {s.name}
                  </h3>
                  {s.price && (
                    <span className="shrink-0 rounded border border-amber/30 bg-amber/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-amber">
                      {s.price}
                    </span>
                  )}
                </div>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.65rem] text-subtle">
                  {s.duration && (
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Duration</dt>
                      <Clock className="h-3 w-3" strokeWidth={1.7} />
                      <dd>{s.duration}</dd>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Category</dt>
                    <Tag className="h-3 w-3" strokeWidth={1.7} />
                    <dd>{s.category}</dd>
                  </div>
                </dl>

                <a
                  href={s.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
                >
                  {s.cta}
                  <ExternalLink className="h-3 w-3" strokeWidth={1.7} />
                </a>
              </li>
            ))}

            {topmateProducts.map((s) => (
              <li
                key={s.id}
                className="panel-elevated flex flex-col rounded-lg p-5 sm:col-span-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-medium leading-snug tracking-tight text-foreground">
                    {s.name}
                  </h3>
                  {s.price && (
                    <span className="shrink-0 rounded border border-violet/30 bg-violet/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-violet">
                      {s.price}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <a
                  href={s.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 self-start font-mono text-[0.7rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
                >
                  {s.cta}
                  <ExternalLink className="h-3 w-3" strokeWidth={1.7} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </SectionInner>
    </Section>
  );
}
