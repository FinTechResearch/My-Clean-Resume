import type { Project } from "@/types";
import { categoryOf } from "@/data/projects";

export type SortKey = "featured" | "title" | "status";

export type LibraryQuery = {
  search: string;
  categories: string[];
  technologies: string[];
  status: string | null;
  sort: SortKey;
};

export const defaultQuery: LibraryQuery = {
  search: "",
  categories: [],
  technologies: [],
  status: null,
  sort: "featured",
};

/** Lowercased haystack of everything the search should match against. */
function haystack(project: Project): string {
  return [
    project.title,
    project.description,
    project.category,
    project.tags.join(" "),
    project.technologies.join(" "),
    project.status,
    project.problem,
    project.solution,
  ]
    .join(" ")
    .toLowerCase();
}

/**
 * Filters the catalogue by search term, categories, technologies and
 * status. Search is case-insensitive and combines with the active
 * filters — changing the search term never clears them.
 */
export function filterProjects(
  all: Project[],
  query: LibraryQuery,
): Project[] {
  const term = query.search.trim().toLowerCase();
  const terms = term ? term.split(/\s+/) : [];

  const filtered = all.filter((project) => {
    // Every whitespace-separated term must appear somewhere in the record.
    if (terms.length) {
      const hay = haystack(project);
      if (!terms.every((t) => hay.includes(t))) return false;
    }

    if (query.categories.length) {
      const cats = categoryOf(project);
      if (!query.categories.some((c) => cats.includes(c))) return false;
    }

    if (query.technologies.length) {
      if (
        !query.technologies.every((t) =>
          project.technologies.some((pt) => pt.toLowerCase() === t.toLowerCase()),
        )
      )
        return false;
    }

    if (query.status && project.status !== query.status) return false;

    return true;
  });

  return sortProjects(filtered, query.sort);
}

export function sortProjects(list: Project[], sort: SortKey): Project[] {
  const copy = [...list];
  switch (sort) {
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "status":
      return copy.sort(
        (a, b) => a.status.localeCompare(b.status) || a.title.localeCompare(b.title),
      );
    case "featured":
    default:
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.title.localeCompare(b.title);
      });
  }
}

export function isDefaultQuery(query: LibraryQuery): boolean {
  return (
    query.search.trim() === "" &&
    query.categories.length === 0 &&
    query.technologies.length === 0 &&
    query.status === null &&
    query.sort === "featured"
  );
}
