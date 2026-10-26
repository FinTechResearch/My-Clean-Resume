import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-[1180px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="font-mono text-[0.68rem] tracking-[0.3em] text-amber">
        404
      </p>
      <h1 className="mt-5 text-balance text-4xl font-medium tracking-tight sm:text-5xl">
        This page isn&apos;t part of the portfolio
      </h1>
      <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
        The page you were looking for has either moved or never existed.
        The selected work has everything that does.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        <Button
          asChild
          className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
        >
          <Link href="/library">Browse the work</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-black/15 px-6 text-sm text-foreground hover:border-black/35 hover:bg-black/[0.03]"
        >
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}
