"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { TOPMATE_PROFILE_URL } from "@/data/services";

const nav = [
  { href: "/library", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/journey", label: "Journey" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-black/[0.07] bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between gap-6 px-6 sm:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Aditya Madhok — home"
        >
          <span className="text-[0.85rem] font-medium tracking-[0.18em] text-foreground">
            ADITYA MADHOK
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((item) => {
            const active =
              item.href === "/library"
                ? pathname.startsWith("/library") ||
                  pathname.startsWith("/projects")
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-[1px] h-px bg-foreground" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden h-9 rounded-full bg-foreground px-5 text-[0.78rem] font-medium tracking-wide text-background hover:bg-foreground/85 sm:inline-flex"
          >
            <a href={TOPMATE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              Work with me
              <ExternalLink className="ml-1.5 h-3 w-3" strokeWidth={1.75} />
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? (
                  <X className="h-4.5 w-4.5" />
                ) : (
                  <Menu className="h-4.5 w-4.5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[86vw] max-w-sm border-l border-black/[0.07] bg-surface p-0"
            >
              <nav aria-label="Mobile" className="flex flex-col p-6">
                {nav.map((item) => {
                  const active =
                    item.href === "/library"
                      ? pathname.startsWith("/library") ||
                        pathname.startsWith("/projects")
                      : pathname.startsWith(item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "border-b border-black/[0.06] py-3.5 text-lg tracking-tight transition-colors",
                          active ? "text-foreground font-medium" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
                <Button
                  asChild
                  className="mt-8 h-11 w-full rounded-full bg-foreground text-background hover:bg-foreground/85"
                >
                  <a
                    href={TOPMATE_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Work with me
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
