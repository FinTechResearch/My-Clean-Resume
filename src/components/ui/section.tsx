import { cn } from "@/lib/utils";

/** Consistent editorial section frame. */
export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("relative border-t border-black/[0.06]", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionInner({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1180px] px-6 py-24 sm:px-10 sm:py-32 lg:py-40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Small numbered section label used across the editorial sections. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {index && (
        <span className="font-mono text-[0.65rem] tracking-[0.24em] text-amber">
          {index}
        </span>
      )}
      <span className="h-px w-6 bg-black/15" />
      <span className="label-technical">{children}</span>
    </div>
  );
}

/** Large editorial heading. */
export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
  ...props
}: React.ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag
      className={cn(
        "text-balance text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[3.1rem]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
