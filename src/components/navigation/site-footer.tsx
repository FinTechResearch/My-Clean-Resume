import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { links, EMAIL } from "@/data/experience";
import { CopyrightYear } from "@/components/navigation/copyright-year";
import { TOPMATE_PROFILE_URL } from "@/data/services";

const linkIcons: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon className="h-3.5 w-3.5" strokeWidth={1.6} />,
  LinkedIn: <LinkedInIcon className="h-3.5 w-3.5" strokeWidth={1.6} />,
  Email: <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />,
};

export function SiteFooter() {
  return (
    <footer className="relative border-t border-black/[0.07]">
      <div className="mx-auto max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[0.85rem] font-medium tracking-[0.18em] text-foreground">
              ADITYA MADHOK
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A web designer and developer building clear, modern websites for
              businesses. Storefronts, property brands and interactive
              commerce — with more in progress.
            </p>
            <p className="mt-5 font-mono text-[0.7rem] text-subtle">
              NOTICE → BUILD → SHIP
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label-technical">Navigate</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/library", label: "Selected websites" },
                { href: "/about", label: "About" },
                { href: "/skills", label: "Skills" },
                { href: "/journey", label: "Journey" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-technical">Elsewhere</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links
                .filter((l) => l.category !== "Contact")
                .map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {linkIcons[l.label]}
                      {l.label}
                      <ExternalLink
                        className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {linkIcons.Email}
                  Email
                </a>
              </li>
              <li>
                <a
                  href={TOPMATE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Topmate
                  <ExternalLink
                    className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-black/[0.06] pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© <CopyrightYear /> Aditya Madhok. All rights reserved.</p>
          <p className="font-mono">
            Built with Next.js · React · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
