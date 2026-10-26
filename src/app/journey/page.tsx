import type { Metadata } from "next";
import { JourneySection } from "@/components/home/journey-section";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Learning, building, connecting, shipping, selling and collaborating — and the websites still in progress. A working path through Aditya Madhok's design and development journey.",
  alternates: { canonical: "/journey" },
  openGraph: {
    title: "Journey — Aditya Madhok",
    description:
      "How the work actually happens: noticing, building, connecting, shipping and collaborating.",
    url: "/journey",
  },
};

export default function JourneyPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-black/[0.06]">
        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
          <p className="label-technical">Journey</p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            How the work actually happens
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A working path rather than a résumé. Stages marked
            <span className="text-foreground"> demonstrated</span> describe
            shipped work; the one marked
            <span className="text-violet"> in progress</span> is where the next
            websites are heading.
          </p>
        </div>
      </header>

      <div className="[&_#journey]:border-t-0">
        <JourneySection showHeader={false} />
      </div>
    </>
  );
}
