import type { Skill, SkillGroup } from "@/types";

/**
 * ADITYA MADHOK — capability map.
 *
 * Grouped so the section reads as a system rather than a wall of badges.
 * Each capability points at the website work that demonstrates it.
 */

export const skillGroups: SkillGroup[] = [
  "Programming & Technology",
  "AI & Automation",
  "Digital Marketing",
  "Creative & Design",
  "Application Development",
];

export const skills: Skill[] = [
  /* ---------------- Programming & Technology ---------------- */
  {
    name: "HTML & CSS",
    group: "Programming & Technology",
    description:
      "Semantic structure and a disciplined visual layer — layout, responsive behaviour, type scales and spacing systems that hold together on every screen.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "JavaScript",
    group: "Programming & Technology",
    description:
      "Browser-side interaction: navigation, filtering, scroll behaviour, forms and the small moments that make a site feel considered rather than static.",
    projectSlugs: ["nykaa-fashion-3d", "well-value-india"],
  },
  {
    name: "React & Next.js",
    group: "Programming & Technology",
    description:
      "Component-driven websites and storefront interfaces, built as reusable sections rather than one-off pages.",
    projectSlugs: ["nykaa-fashion-3d", "well-value-india"],
  },
  {
    name: "Web Development",
    group: "Programming & Technology",
    description:
      "Taking a design from layout to a live, responsive build — structure, components, content, metadata and deployment.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "Responsive design",
    group: "Programming & Technology",
    description:
      "Designing the small screen first, then letting the layout breathe on larger ones. Commerce and content both have to survive a thumb.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },

  /* ---------------- AI & Automation ---------------- */
  {
    name: "AI-assisted workflows",
    group: "AI & Automation",
    description:
      "Using language and image models as production tools — content drafting, variation, research and fast iteration — while keeping the final judgement human.",
  },
  {
    name: "Prompt engineering",
    group: "AI & Automation",
    description:
      "Turning a model into a dependable part of a workflow by defining the output, the constraints and the review step.",
  },
  {
    name: "Marketing automation",
    group: "AI & Automation",
    description:
      "Removing the repetitive parts of content and campaign work so the creative decisions get the attention instead.",
  },

  /* ---------------- Digital Marketing ---------------- */
  {
    name: "SEO",
    group: "Digital Marketing",
    description:
      "Search-aware structure: page hierarchy, metadata, meaningful headings and content written for intent rather than keyword density.",
    projectSlugs: ["well-value-india"],
  },
  {
    name: "Google Analytics",
    group: "Digital Marketing",
    description:
      "Reading behaviour to decide what to keep, what to change and what to stop making.",
  },
  {
    name: "Content strategy",
    group: "Digital Marketing",
    description:
      "Deciding what a page needs to say, in what order, and what the visitor should be able to do next.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "Social & campaign content",
    group: "Digital Marketing",
    description:
      "Campaign thinking that connects a website to the channels that send people to it.",
  },

  /* ---------------- Creative & Design ---------------- */
  {
    name: "Web design",
    group: "Creative & Design",
    description:
      "Editorial layout, hierarchy and restraint. The goal is a page that feels obvious to use and distinct enough to remember.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "Typography",
    group: "Creative & Design",
    description:
      "Type as a structural decision — scale, rhythm and contrast carrying the tone before a single image loads.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "Branding",
    group: "Creative & Design",
    description:
      "Identity systems that carry across a whole site: palette, type, voice and the rules that keep them consistent.",
    projectSlugs: ["well-value-india"],
  },
  {
    name: "Content & copywriting",
    group: "Creative & Design",
    description:
      "Writing that earns the read — product descriptions, section copy and calls to action that sound like a person.",
    projectSlugs: ["well-value-india"],
  },
  {
    name: "Bilingual interface design",
    group: "Creative & Design",
    description:
      "Designing for English, Hindi and Hinglish without treating translation as an afterthought.",
    projectSlugs: ["well-value-india"],
  },

  /* ---------------- Application Development ---------------- */
  {
    name: "E-commerce UX",
    group: "Application Development",
    description:
      "Product cards, category architecture, pricing signals, trust content and a checkout path that does not lose the shopper.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "3D web interaction",
    group: "Application Development",
    description:
      "React Three Fiber and WebGL used for a reason: a product rail on a real cylinder, driven by scroll rather than autoplay.",
    projectSlugs: ["nykaa-fashion-3d"],
  },
  {
    name: "Design systems",
    group: "Application Development",
    description:
      "Reusable sections, spacing rules and component patterns so a growing site stays coherent instead of drifting.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    name: "Performance & accessibility",
    group: "Application Development",
    description:
      "Fast pages, readable contrast, keyboard-reachable controls and layouts that do not depend on a single input method.",
  },
  {
    name: "Deployment",
    group: "Application Development",
    description:
      "Shipping to a real URL, with the metadata, redirects and checks that make a live site feel finished.",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
];

export const skillsByGroup = skillGroups.map((group) => ({
  group,
  items: skills.filter((s) => s.group === group),
}));

export function getSkill(name: string): Skill | undefined {
  return skills.find((s) => s.name === name);
}
