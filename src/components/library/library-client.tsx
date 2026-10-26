"use client";

import { GitHubIcon } from "@/components/ui/brand-icons";
import { Search, X, SlidersHorizontal, ExternalLink, ArrowUpRight, BookOpen, LayoutGrid, Rows3 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects, categoryOf, allTechnologies, libraryCategories, moreWebsitesNote } from "@/data/projects";
import { articles, GITHUB_PROFILE_URL } from "@/data/articles";
import {
  defaultQuery,
  filterProjects,
  isDefaultQuery,
  type LibraryQuery,
  type SortKey,
} from "@/lib/search";
import { cn } from "@/lib/utils";

/**
 * The project library.
 *
 * Reads and writes the URL as the source of truth, so a filtered view is
 * shareable and survives a refresh. The world and the library consume the
 * same project records.
 */
export function LibraryClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [view, setView] = useState<"projects" | "articles">(
    params.get("view") === "articles" ? "articles" : "projects",
  );
  const [query, setQuery] = useState<LibraryQuery>(() => ({
    ...defaultQuery,
    search: params.get("q") ?? "",
    categories: params.get("cat")?.split(",").filter(Boolean) ?? [],
    technologies: params.get("tech")?.split(",").filter(Boolean) ?? [],
    status: params.get("status"),
    sort: (params.get("sort") as SortKey) ?? "featured",
  }));
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* Keep the URL in sync with the filter state. */  useEffect(() => {
    const sp = new URLSearchParams();
    if (query.search.trim()) sp.set("q", query.search.trim());
    if (query.categories.length) sp.set("cat", query.categories.join(","));
    if (query.technologies.length) sp.set("tech", query.technologies.join(","));
    if (query.status) sp.set("status", query.status);
    if (query.sort !== "featured") sp.set("sort", query.sort);
    if (view === "articles") sp.set("view", "articles");

    const next = sp.toString();
    const current = params.toString();
    if (next !== current) {
      router.replace(next ? `/library?${next}` : "/library", { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, view]);

  const toggleIn = useCallback(
    (list: string[], value: string) =>
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value],
    [],
  );

  const results = useMemo(() => filterProjects(projects, query), [query]);

  const activeFilterCount =
    query.categories.length +
    query.technologies.length +
    (query.status ? 1 : 0);

  const reset = () => {
    setQuery(defaultQuery);
  };

  const statuses = useMemo(
    () => Array.from(new Set(projects.map((p) => p.status))).sort(),
    [],
  );

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 sm:py-28">
      {/* ------------------------------------------------------ */}
      {/* Header                                                   */}
      {/* ------------------------------------------------------ */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="label-technical">Selected work</p>
          <h1 className="mt-3 text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-[3rem]">
            Websites, in one place
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            The live builds behind the portfolio. Browse the websites, search
            by category or technology, or open a project to read how it was
            made.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex rounded-md border border-black/10 p-0.5"
            role="tablist"
            aria-label="Library view"
          >
            {(
              [
                { id: "projects", label: "Projects", Icon: LayoutGrid },
                { id: "articles", label: "Articles", Icon: BookOpen },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={cn(
                  "flex items-center gap-1.5 rounded px-3 py-1.5 text-xs transition-colors",
                  view === id
                    ? "bg-black/[0.07] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                {label}
              </button>
            ))}
          </div>

          {view === "projects" && (
            <div className="hidden rounded-md border border-black/10 p-0.5 sm:flex">
              {(
                [
                  { id: "grid", Icon: LayoutGrid },
                  { id: "list", Icon: Rows3 },
                ] as const
              ).map(({ id, Icon }) => (
                <button
                  key={id}
                  onClick={() => setLayout(id)}
                  aria-label={id === "grid" ? "Grid view" : "List view"}
                  aria-pressed={layout === id}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded transition-colors",
                    layout === id
                      ? "bg-black/[0.07] text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* Search + filters                                          */}
      {/* ------------------------------------------------------ */}
      {view === "projects" && (
        <div className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
                strokeWidth={1.7}
              />
              <Input
                value={query.search}
                onChange={(e) =>
                  setQuery((q) => ({ ...q, search: e.target.value }))
                }
                placeholder="Search titles, descriptions, tags, technologies…"
                aria-label="Search projects"
                className="h-11 rounded-md border-black/10 bg-surface pl-10 pr-10 text-sm placeholder:text-subtle"
              />
              {query.search && (
                <button
                  onClick={() => setQuery((q) => ({ ...q, search: "" }))}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" strokeWidth={1.7} />
                </button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              className="h-11 rounded-md border-black/10 px-4 text-sm text-muted-foreground hover:border-black/25 hover:text-foreground"
            >
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" strokeWidth={1.7} />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 rounded bg-amber/20 px-1.5 font-mono text-[0.65rem] text-amber">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            <Select
              value={query.sort}
              onValueChange={(v) =>
                setQuery((q) => ({ ...q, sort: v as SortKey }))
              }
            >
              <SelectTrigger className="h-11 w-full rounded-md border-black/10 bg-surface text-sm sm:w-44">
                <SelectValue placeholder="Sort">
                  {query.sort === "featured"
                    ? "Featured first"
                    : query.sort === "title"
                      ? "Title A–Z"
                      : "Status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured first</SelectItem>
                <SelectItem value="title">Title A–Z</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter panel */}
          {filtersOpen && (
            <div className="mt-4 grid gap-6 rounded-lg border border-black/[0.08] bg-surface p-5 sm:grid-cols-2 lg:grid-cols-3">
              <FilterGroup label="Category">
                {libraryCategories
                  .filter((c) => c !== "All Projects")
                  .map((c) => (
                  <FilterChip
                    key={c}
                    active={query.categories.includes(c)}
                    onClick={() =>
                      setQuery((q) => ({
                        ...q,
                        categories: toggleIn(q.categories, c),
                      }))
                    }
                  >
                    {c}
                  </FilterChip>
                ))}
              </FilterGroup>

              <FilterGroup label="Technology">
                {allTechnologies.map((t) => (
                  <FilterChip
                    key={t}
                    active={query.technologies.includes(t)}
                    onClick={() =>
                      setQuery((q) => ({
                        ...q,
                        technologies: toggleIn(q.technologies, t),
                      }))
                    }
                  >
                    {t}
                  </FilterChip>
                ))}
              </FilterGroup>

              <FilterGroup label="Status">
                {statuses.map((s) => (
                  <FilterChip
                    key={s}
                    active={query.status === s}
                    onClick={() =>
                      setQuery((q) => ({
                        ...q,
                        status: q.status === s ? null : s,
                      }))
                    }
                  >
                    {s}
                  </FilterChip>
                ))}
              </FilterGroup>
            </div>
          )}

          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="label-technical">Active</span>
              {query.categories.map((c) => (
                <ActivePill key={c} label={c} onRemove={() =>
                  setQuery((q) => ({ ...q, categories: toggleIn(q.categories, c) }))
                } />
              ))}
              {query.technologies.map((t) => (
                <ActivePill key={t} label={t} onRemove={() =>
                  setQuery((q) => ({
                    ...q,
                    technologies: toggleIn(q.technologies, t),
                  }))
                } />
              ))}
              {query.status && (
                <ActivePill
                  label={query.status}
                  onRemove={() => setQuery((q) => ({ ...q, status: null }))}
                />
              )}
              <button
                onClick={reset}
                className="font-mono text-[0.68rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
              >
                Reset all
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------ */}
      {/* Results                                                  */}
      {/* ------------------------------------------------------ */}
      {view === "projects" ? (
        results.length > 0 ? (
          <>
            <p className="mt-10 font-mono text-[0.68rem] tracking-[0.14em] text-subtle">
              {results.length} {results.length === 1 ? "WEBSITE" : "WEBSITES"}
              {isDefaultQuery(query) ? " · FEATURED FIRST" : ""}
            </p>

            <ul
              className={cn(
                "mt-6",
                layout === "grid"
                  ? "grid gap-6 sm:grid-cols-2"
                  : "flex flex-col gap-3",
              )}
            >
              {results.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} layout={layout} />
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {moreWebsitesNote}
            </p>
          </>
        ) : (
          <EmptyState
            onReset={reset}
            message={
              query.search
                ? `Nothing matches “${query.search}” with the current filters.`
                : "No projects match the current filters."
            }
          />
        )
      ) : (
        <ArticlesView />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-technical">{label}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded border px-2.5 py-1 text-xs transition-colors",
        active
          ? "border-amber/50 bg-amber/10 text-amber"
          : "border-black/10 text-muted-foreground hover:border-black/25 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ActivePill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-black/12 bg-black/[0.04] px-2 py-0.5 font-mono text-[0.65rem] text-foreground">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="text-subtle transition-colors hover:text-foreground"
      >
        <X className="h-3 w-3" strokeWidth={2} />
      </button>
    </span>
  );
}

function ProjectCard({
  project,
  layout,
}: {
  project: (typeof projects)[number];
  layout: "grid" | "list";
}) {
  const cats = categoryOf(project);

  if (layout === "list") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col gap-3 rounded-lg border border-black/[0.07] bg-surface p-4 transition-colors hover:border-amber/30 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-medium tracking-tight text-foreground">
              {project.title}
            </h3>
            <Badge
              variant="outline"
              className="rounded border-black/12 font-mono text-[0.6rem] font-normal text-subtle"
            >
              {project.status}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="font-mono text-[0.65rem] text-subtle">
            {project.technologies.slice(0, 3).join(" · ")}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-subtle transition-colors group-hover:text-amber"
            strokeWidth={1.7}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-lg border border-black/[0.07] bg-surface p-5 transition-colors hover:border-amber/30"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[0.62rem] tracking-[0.18em] text-cyan uppercase">
          {project.category}
        </span>
        <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.12em] text-subtle uppercase">
          {project.status}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight text-foreground">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((t) => (
          <li
            key={t}
            className="rounded border border-black/10 bg-black/[0.03] px-1.5 py-0.5 font-mono text-[0.62rem] text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-3.5">
        <span className="font-mono text-[0.62rem] text-subtle">
          {cats.slice(0, 2).join(" · ")}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">
          Open
          <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
        </span>
      </div>

      {cats.length > 0 && <span className="sr-only">{cats.join(", ")}</span>}
    </Link>
  );
}

function EmptyState({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-16 flex flex-col items-center rounded-lg border border-dashed border-black/12 px-6 py-20 text-center">
      <Search className="h-6 w-6 text-subtle" strokeWidth={1.4} />
      <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>
      <Button
        onClick={onReset}
        variant="outline"
        className="mt-6 h-9 rounded-full border-black/14 px-5 text-xs text-foreground hover:border-black/30"
      >
        Reset filters
      </Button>
    </div>
  );
}

function ArticlesView() {
  return (
    <>
      <p className="mt-8 font-mono text-[0.68rem] tracking-[0.14em] text-subtle">
        {articles.length} PUBLISHED ARTICLES
      </p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-black/[0.07] bg-surface p-5 transition-colors hover:border-cyan/35"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-cyan" strokeWidth={1.6} />
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-subtle uppercase">
                  {a.category}
                </span>
              </div>
              <h3 className="mt-3 text-pretty text-base font-medium leading-snug tracking-tight text-foreground">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {a.description}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3.5">
                <span className="font-mono text-[0.62rem] text-subtle">
                  {a.publishedAt}
                </span>
                <ExternalLink
                  className="h-3.5 w-3.5 text-subtle transition-colors group-hover:text-cyan"
                  strokeWidth={1.7}
                />
              </div>
            </a>
          </li>
        ))}
      </ul>

      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-cyan transition-colors hover:text-foreground"
      >
        <GitHubIcon className="h-3.5 w-3.5" strokeWidth={1.7} />
        Discover repositories on GitHub
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
      </a>
    </>
  );
}
