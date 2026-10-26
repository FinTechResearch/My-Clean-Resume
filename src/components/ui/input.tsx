import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md border border-black/12 bg-background/60 px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-subtle focus-visible:border-cyan/50 focus-visible:ring-2 focus-visible:ring-cyan/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive/60 aria-invalid:ring-destructive/25",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
