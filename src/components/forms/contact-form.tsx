"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Send, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EMAIL } from "@/data/experience";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("That email address does not look right."),
  category: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please describe your idea in a little more detail (at least 20 characters).")
    .max(5000, "Please keep the description under 5000 characters."),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const categories = [
  "Business website",
  "Website redesign",
  "E-commerce storefront",
  "Interactive / 3D website",
  "Landing page",
  "Website review",
  "Something else",
];

const budgets = [
  "Not sure yet",
  "Under ₹2,000",
  "₹2,000 – ₹10,000",
  "₹10,000 – ₹50,000",
  "₹50,000+",
  "I'd like to discuss",
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "mailto" | "error"
  >("idle");
  const [mailLink, setMailLink] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      budget: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await res.json()) as {
        ok: boolean;
        mode?: "sent" | "mailto" | "accepted";
        mailto?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setFormError(
          data.error ?? "Something went wrong. Please email directly instead.",
        );
        return;
      }

      if (data.mode === "mailto" && data.mailto) {
        setStatus("mailto");
        setMailLink(data.mailto);
        return;
      }

      setStatus("sent");
      reset();
      toast.success("Message sent. Aditya will get back to you.");
    } catch {
      setStatus("error");
      setFormError(
        "The message could not be sent. Please email directly instead.",
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="panel-elevated rounded-lg p-8 text-center">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-amber/40 bg-amber/10">
          <Send className="h-4.5 w-4.5 text-amber" strokeWidth={1.7} />
        </div>
        <h3 className="mt-5 text-xl font-medium tracking-tight">
          Message sent
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. Aditya reads every enquiry and will reply
          from{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-cyan underline underline-offset-4"
          >
            {EMAIL}
          </a>
          .
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="mt-6 h-9 rounded-full border-black/14 px-5 text-xs text-foreground hover:border-black/30"
        >
          Send another message
        </Button>
      </div>
    );
  }

  if (status === "mailto" && mailLink) {
    return (
      <div className="panel-elevated rounded-lg p-8">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan" strokeWidth={1.7} />
          <div>
            <h3 className="text-xl font-medium tracking-tight">
              One more step — this opens your mail app
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              No email provider is connected to this site, so the message has
              <span className="text-foreground"> not been sent yet</span>. It
              has been formatted for you — click below to open it in your own
              mail client and press send there.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button
                asChild
                className="h-10 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/85"
              >
                <a href={mailLink}>
                  <Mail className="mr-2 h-3.5 w-3.5" strokeWidth={1.75} />
                  Open in my mail app
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => setStatus("idle")}
                className="h-10 rounded-full border-black/14 px-5 text-sm text-foreground hover:border-black/30"
              >
                Edit the message
              </Button>
            </div>
            <p className="mt-4 font-mono text-[0.66rem] text-subtle">
              Or email {EMAIL} directly
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="panel-elevated rounded-lg p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          error={errors.name?.message}
          htmlFor="contact-name"
        >
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className="h-11 rounded-md border-black/10 bg-background/60"
            {...register("name")}
          />
        </Field>

        <Field
          label="Email"
          error={errors.email?.message}
          htmlFor="contact-email"
        >
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className="h-11 rounded-md border-black/10 bg-background/60"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="What is it about?" htmlFor="contact-category">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contact-category"
                  className="h-11 rounded-md border-black/10 bg-background/60"
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Budget range (optional)" htmlFor="contact-budget">
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contact-budget"
                  className="h-11 rounded-md border-black/10 bg-background/60"
                >
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="Project description"
          error={errors.message?.message}
          htmlFor="contact-message"
        >
          <Textarea
            id="contact-message"
            rows={6}
            placeholder="What are you trying to build, and what is in the way?"
            aria-invalid={!!errors.message}
            className="rounded-md border-black/10 bg-background/60"
            {...register("message")}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from humans, catches naive bots. */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-5 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        >
          {formError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-11 rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/85"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-3.5 w-3.5" strokeWidth={1.75} />
              Send message
            </>
          )}
        </Button>
        <p className="text-xs text-subtle">
          Or email{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="text-cyan underline underline-offset-4"
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className={cn("mt-1.5 text-xs text-destructive")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
