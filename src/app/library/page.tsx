import type { Metadata } from "next";
import { Suspense } from "react";
import { LibraryClient } from "@/components/library/library-client";

export const metadata: Metadata = {
  title: "Selected Websites",
  description:
    "The live website work of Aditya Madhok — a redesigned Well Value India storefront and a Nykaa Fashion-inspired 3D e-commerce remake. More websites in progress.",
  alternates: { canonical: "/library" },
  openGraph: {
    title: "Selected Websites — Aditya Madhok",
    description:
      "Two live builds, with more websites in progress. Explore the work and how it was made.",
    url: "/library",
  },
};

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:px-10">
          <p className="label-technical">Selected work</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Loading the catalogue…
          </p>
        </div>
      }
    >
      <LibraryClient />
    </Suspense>
  );
}
