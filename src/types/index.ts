/**
 * Shared domain types.
 *
 * Every surface (library, project pages, services, skills) consumes these
 * records. Nothing about a website, service or link is hardcoded inside a
 * component.
 */

export type ProjectCategory =
  | "Business & Commerce Website"
  | "Fashion E-commerce Experience";

export type ProjectStatus =
  | "Live"
  | "Shipped"
  | "Published"
  | "Open Source"
  | "In Development"
  | "Prototype"
  | "Exploration";

export type Project =
  | {
      slug: string;
      title: string;
      /** Short editorial one-liner used on cards and project pages. */
      description: string;
      category: ProjectCategory;
      /** Library filter categories this project belongs to. */
      tags: string[];
      technologies: string[];
      status: ProjectStatus;
      problem: string;
      solution: string;
      implementation: string;
      /** Optional extra facts, e.g. distribution, licensing. */
      details?: { label: string; value: string }[];
      /** Pipeline stages rendered as a horizontal diagram. */
      pipeline?: string[];
      thumbnail?: string;
      gallery?: { src: string; alt: string; caption?: string }[];
      liveUrl?: string;
      /** Additional verified destinations — build articles, documentation. */
      extraLinks?: { label: string; url: string; kind: "article" | "docs" }[];
      repoUrl?: string;
      purchaseUrl?: string;
      featured?: boolean;
      /** Accent used for category labels and small edges. */
      accent?: "amber" | "cyan" | "violet";
    };

export type ServiceCategory =
  | "Consultation"
  | "Digital Product"
  | "Digital Products";

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Longer editorial copy used on the services page. */
  detail?: string;
  category: ServiceCategory;
  bookingUrl: string;
  /** Only present when verified against the live Topmate listing. */
  price?: string;
  /** Only present when verified against the live Topmate listing. */
  duration?: string;
  /** ISO date the price/duration was last confirmed against Topmate. */
  lastVerified?: string;
  availability: "available" | "unverified";
  cta: string;
  /** Digital products link out to a sales page rather than a booking. */
  kind: "booking" | "product";
  relatedProjectSlugs?: string[];
};

export type SkillGroup =
  | "Programming & Technology"
  | "AI & Automation"
  | "Digital Marketing"
  | "Creative & Design"
  | "Application Development";

export type Skill = {
  name: string;
  group: SkillGroup;
  description: string;
  /** Related project slugs for cross-linking. */
  projectSlugs?: string[];
  /** Only set where the source material states a level explicitly. */
  verifiedLevel?: "certified" | "working knowledge" | "exploring";
};

export type ExperienceEntry = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
  links?: { label: string; url: string }[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  tags: string[];
  category: string;
  relatedProjectSlugs?: string[];
  /** Only set when the reading time was calculated from the actual body. */
  readingTimeMinutes?: number;
};

export type ExternalLink = {
  label: string;
  url: string;
  category: "Code" | "Professional" | "Social" | "Contact" | "Monetization";
  description?: string;
  external: boolean;
};

export type JourneyStage = {
  id: string;
  title: string;
  timeframe: string;
  body: string;
  /** Demonstrated work vs. stated future direction. */
  kind: "demonstrated" | "future";
  projectSlugs?: string[];
};
