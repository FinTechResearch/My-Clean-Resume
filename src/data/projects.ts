import type { Project } from "@/types";

/**
 * ADITYA MADHOK — selected website work.
 *
 * Single source of truth for the portfolio. The home page, the library and
 * the project detail pages all read from this array.
 *
 * Scope note: the earlier software catalogue was intentionally removed.
 * The site now presents the website work only — the two live builds below,
 * with more websites in progress.
 */

export const projects: Project[] = [
  {
    slug: "well-value-india",
    title: "Well Value India — Redesigned Website",
    description:
      "A redesigned multi-category storefront for Well Value India Pvt. Ltd. — real estate, garments, electronics, FMCG and wellness brought into one bilingual, mobile-first website.",
    category: "Business & Commerce Website",
    tags: ["Web Design", "E-commerce", "Real Estate", "Bilingual", "Responsive"],
    technologies: [
      "Responsive Web Design",
      "Bilingual UX",
      "Storefront Architecture",
      "Real Estate Listings",
      "WhatsApp Checkout",
      "SEO Structure",
    ],
    status: "Live",
    problem:
      "Well Value India is a Jhansi-based company selling across very different worlds: RERA-approved plots and farmhouses, branded garments, electronics, daily essentials, health products and holiday packages. The old site did not carry that breadth with any clarity. Buyers had to guess where to start, trust signals were buried, and the brand's story — a family business built on hard work and honesty — was not doing the work it could.",
    solution:
      "A full redesign that treats the company as one trusted local brand rather than a pile of unrelated categories. The new site opens with a clear promise, gives every department its own path, and keeps a bilingual voice throughout: English, Hindi and Hinglish sit together without feeling bolted on. Buyers can shop featured products, explore real estate, read the company story, check trust credentials and order directly on WhatsApp. Sellers and partners are given their own entry points.",
    implementation:
      "The site is structured as a sequence of calm, full-width sections: a welcome hero, featured products with pricing and discounts, a category grid for the seven departments, a trust strip, the founder's story, customer testimonials, a shopping call to action, latest news and a detailed footer. Product cards carry live-feeling commerce details — ratings, strike-through pricing, discount labels and a WhatsApp order action — while real estate gets its own dedicated storytelling. The layout is mobile-first, with restrained type, a warm neutral palette and generous spacing so the amount of information never becomes noise. Contact details, certifications and company information are kept explicit for trust.",
    details: [
      { label: "Client", value: "Well Value India Pvt. Ltd., Jhansi (UP)" },
      {
        label: "Scope",
        value: "Redesign, art direction, UI/UX, front-end build",
      },
      {
        label: "Departments",
        value:
          "Real estate · Branded garments · Electronics · E-commerce · Holiday packages · Health products · FMCG",
      },
      { label: "Languages", value: "English · Hindi · Hinglish" },
      { label: "Commerce", value: "WhatsApp ordering, COD and free-delivery messaging" },
      {
        label: "Trust content",
        value: "RERA approval, company certificates, bankers, testimonials",
      },
      { label: "Approach", value: "Mobile-first, content-led, bilingual by default" },
    ],
    pipeline: [
      "Brand story",
      "Category architecture",
      "Product merchandising",
      "Trust & testimonials",
      "WhatsApp checkout",
    ],
    liveUrl: "https://wellvalue-india.vercel.app/",
    featured: true,
    accent: "amber",
  },
  {
    slug: "nykaa-fashion-3d",
    title: "Nykaa Fashion — 3D E-commerce Remake",
    description:
      "A fashion e-commerce remake that puts product cards on a real 3D cylinder, scrubbed by scroll — a study in making online shopping feel tactile without losing the familiar storefront.",
    category: "Fashion E-commerce Experience",
    tags: ["Web Design", "E-commerce", "3D", "Fashion", "Interaction"],
    technologies: [
      "React Three Fiber",
      "WebGL",
      "Scroll-driven 3D",
      "Fashion E-commerce UI",
      "Responsive Design",
    ],
    status: "Live",
    problem:
      "Fashion storefronts are visually rich but physically flat. Product rails scroll in one direction, campaign imagery and merchandise live in separate layers, and the experience of browsing a collection feels like reading a spreadsheet with better photography. The question behind this remake was whether a storefront could keep every familiar commerce signal and still feel like a place.",
    solution:
      "A full Nykaa Fashion-inspired storefront where the product rail is an actual object. Cards sit on a cylinder in 3D space, and the page scroll drives the camera around that curve instead of moving a flat list. Around it, the rest of the storefront stays disciplined: festive campaign hero, category counts, curated edits, brand rails, real product cards with ratings, pricing and discounts, and a clear add-to-bag action. The 3D is the signature, not a replacement for shopping.",
    implementation:
      "The 3D rail is built with React Three Fiber: product cards are positioned on a real cylinder, a baked studio environment lights the card faces, and a contact shadow grounds the row so it reads as a physical object. Scroll position is mapped to the group's rotation, producing a scrubbed camera move rather than an autoplay animation. The surrounding storefront is composed as a complete responsive commerce page — announcement bar, navigation, campaign blocks, category grid, editorial edits, product carousel, brand offers, shopping assurances and a full footer — so the experience still works as a storefront when the 3D is ignored.",
    details: [
      { label: "Type", value: "Design and engineering recreation" },
      { label: "Reference", value: "Nykaa Fashion" },
      {
        label: "Signature interaction",
        value: "Scroll-scrubbed 3D product rail on a cylinder",
      },
      {
        label: "Storefront sections",
        value:
          "Campaign hero · Categories · Curated edits · Product rail · Brand offers · Trust strip · Footer",
      },
      {
        label: "Commerce signals",
        value: "Ratings, strike-through pricing, discounts and add-to-bag actions",
      },
      { label: "Note", value: "Independent demo, not affiliated with Nykaa Fashion" },
    ],
    pipeline: [
      "Campaign hero",
      "Category architecture",
      "Curated edits",
      "3D product rail",
      "Add to bag",
    ],
    liveUrl: "https://nykaa-3d-website.vercel.app/",
    featured: true,
    accent: "violet",
  },
];

/** Shown wherever the catalogue is introduced, so the direction is explicit. */
export const moreWebsitesNote =
  "I'm working on more websites right now — new builds will be added here as they go live.";

export const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return projectBySlug.get(slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Every distinct technology mentioned across the catalogue. */
export const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort((a, b) => a.localeCompare(b));

/**
 * Library filter categories. Only categories that actually contain a
 * project are rendered by the library UI.
 */
export const libraryCategories = [
  "All Projects",
  "Web Design",
  "Development",
  "E-commerce",
  "Real Estate",
  "Fashion",
  "Experiments",
] as const;

export type LibraryCategory = (typeof libraryCategories)[number];

/** Maps a project onto the library's flat filter taxonomy. */
export function categoryOf(project: Project): string[] {
  const out = new Set<string>();
  const tech = project.technologies.join(" ").toLowerCase();
  const tags = project.tags.join(" ").toLowerCase();
  const cat = project.category.toLowerCase();
  const all = `${tech} ${tags} ${cat}`;

  if (
    all.includes("web design") ||
    all.includes("website") ||
    tags.includes("responsive")
  )
    out.add("Web Design");

  if (
    tech.includes("react") ||
    tech.includes("webgl") ||
    all.includes("front-end") ||
    all.includes("development")
  )
    out.add("Development");

  if (
    all.includes("commerce") ||
    all.includes("e-commerce") ||
    all.includes("ecommerce") ||
    all.includes("storefront")
  )
    out.add("E-commerce");

  if (all.includes("real estate") || all.includes("property")) out.add("Real Estate");

  if (all.includes("fashion") || all.includes("garment")) out.add("Fashion");

  if (project.status === "Exploration" || project.status === "Prototype")
    out.add("Experiments");

  return Array.from(out);
}
