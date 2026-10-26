import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Mail, ExternalLink } from "lucide-react";
import { Section, SectionInner } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { EMAIL } from "@/data/experience";
import { TOPMATE_PROFILE_URL } from "@/data/services";

export function ContactCta() {
  return (
    <Section id="contact-cta" aria-labelledby="contact-cta-title">
      <SectionInner>
        <div className="relative overflow-hidden rounded-lg border border-black/[0.08] bg-surface p-8 sm:p-12 lg:p-16">
          <div className="relative">
            <p className="label-technical">Start a project</p>
            <h2
              id="contact-cta-title"
              className="mt-4 max-w-3xl text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-[3.2rem]"
            >
              Let&apos;s build a website worth visiting.
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              Have a business that deserves a clearer website, a storefront
              that needs rebuilding, or a design idea you cannot quite
              describe? Start with a message — and we can work out the right
              scope from there.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Button
                asChild
                className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
              >
                <a href={TOPMATE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
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

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/[0.07] pt-6">
              {[
                { href: "https://github.com/FinTechResearch", label: "Explore GitHub", Icon: GitHubIcon },
                { href: "https://www.linkedin.com/in/aditya-madhok-035359l44a", label: "View LinkedIn", Icon: LinkedInIcon },
                { href: TOPMATE_PROFILE_URL, label: "All Topmate services", Icon: ExternalLink },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon
                      className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.6}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
