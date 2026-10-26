import type { Metadata } from "next";
import { SkillsSection } from "@/components/home/skills-section";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Web design, front-end development, e-commerce UX, content, branding and SEO — grouped as a working system, with each capability linked to real website work.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Skills — Aditya Madhok",
    description:
      "A capability map rather than a badge wall. Every skill links to real website work.",
    url: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-black/[0.06]">
        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="label-technical">Skills</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Skills as a building system
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Grouped by what they are used for, not by how impressive they
            sound. Each one links to the projects that actually rely on it —
            and where a level is not verifiable, it is not claimed.
          </p>
        </div>
      </header>

      <div className="[&_#skills]:border-t-0">
        <SkillsSection showHeader={false} />
      </div>
    </>
  );
}
