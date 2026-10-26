import type { ExperienceEntry, JourneyStage, ExternalLink } from "@/types";

/**
 * THE BLOCKVERSE — professional timeline, journey and verified links.
 *
 * Sourced from Aditya_Madhok_CV.pdf (2026-10-15) and the public Topmate
 * profile. No named clients, metrics or testimonials are included because
 * none are available in the source material.
 */

export const experience: ExperienceEntry[] = [
  {
    role: "Web Designer & Developer",
    organization: "Independent",
    period: "2025 – Present",
    summary:
      "Designing and building modern websites end to end — from structure, brand voice and content to responsive front-end and launch.",
    highlights: [
      "Redesigned the Well Value India website, bringing real estate, garments, electronics, FMCG and wellness into one bilingual, mobile-first storefront.",
      "Built a Nykaa Fashion-inspired e-commerce remake with a scroll-driven 3D product rail, complete category architecture and a responsive shopping interface.",
      "Designed for English, Hindi and Hinglish audiences, with clear trust signals, product merchandising and WhatsApp-led ordering paths.",
      "Shipped both builds to live URLs, with responsive checks, structured content and search-aware page hierarchy.",
    ],
    links: [
      {
        label: "Well Value India",
        url: "https://wellvalue-india.vercel.app/",
      },
      {
        label: "Nykaa Fashion 3D",
        url: "https://nykaa-3d-website.vercel.app/",
      },
    ],
  },
  {
    role: "Freelance Graphic Designer & Digital Content Creator",
    organization: "Freelance (10+ years)",
    period: "Apr 2015 – Present",
    summary:
      "A decade of design and content work that runs alongside development, and shapes how the software is presented and found.",
    highlights: [
      "Delivered custom branding, thumbnails, and social-media creatives for wellness, spiritual, and lifestyle clients using Canva and the Adobe suite.",
      "Created data-driven content blending storytelling and design for Instagram and YouTube, applying SEO, Google Analytics, and YouTube SEO to grow reach and engagement.",
    ],
  },
];

/**
 * The Journey — learning, building, connecting, shipping, selling,
 * collaborating, and what comes next.
 *
 * `kind` marks which stages describe demonstrated work and which describe
 * stated future direction.
 */
export const journey: JourneyStage[] = [
  {
    id: "learning",
    title: "Learning",
    timeframe: "Self-directed, ongoing",
    body: "Self-directed learning, technical experimentation and practical development. Most of it came from free tutorials, one tab ahead — with the finished project as the reason to keep going.",
    kind: "demonstrated",
  },
  {
    id: "building",
    title: "Building",
    timeframe: "Demonstrated",
    body: "Turning ideas into interfaces that people can actually use. Every project starts with a real business problem, a real audience, and a blank page — then becomes structure, type, colour, content and interaction.",
    kind: "demonstrated",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    id: "connecting",
    title: "Connecting",
    timeframe: "Demonstrated",
    body: "Bringing brand, content, commerce and engineering into one system. A storefront only works when the story, the product data and the checkout path agree with each other.",
    kind: "demonstrated",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    id: "shipping",
    title: "Shipping",
    timeframe: "Demonstrated",
    body: "Designing responsively, checking the small screens, tightening the copy, and shipping something that can be opened by anyone with a link — not a mockup in a folder.",
    kind: "demonstrated",
    projectSlugs: ["well-value-india", "nykaa-fashion-3d"],
  },
  {
    id: "selling",
    title: "Selling",
    timeframe: "Demonstrated",
    body: "Building the paths that turn attention into an enquiry or an order — WhatsApp checkout, clear product cards, trust signals and calls to action that belong to the page rather than interrupting it.",
    kind: "demonstrated",
  },
  {
    id: "collaborating",
    title: "Collaborating",
    timeframe: "Demonstrated",
    body: "Working with businesses to understand what they actually sell, who they sell it to, and what the website needs to prove before someone will trust it.",
    kind: "demonstrated",
  },
  {
    id: "next",
    title: "What Comes Next",
    timeframe: "In progress",
    body: "More websites are already in progress. New builds — storefronts, business sites and interactive commerce experiences — will be added to this portfolio as they go live.",
    kind: "future",
  },
];

/**
 * Verified professional destinations.
 * Every URL here was checked against the CV and the public Topmate profile.
 */
export const links: ExternalLink[] = [
  {
    label: "Topmate",
    url: "https://topmate.io/adityamadhok",
    category: "Monetization",
    description: "Bookings, consultations and digital products.",
    external: true,
  },
  {
    label: "GitHub",
    url: "https://github.com/FinTechResearch",
    category: "Code",
    description: "Source code and published repositories.",
    external: true,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/aditya-madhok-035359l44a",
    category: "Professional",
    description: "Professional record and experience.",
    external: true,
  },
  {
    label: "Linktree",
    url: "https://linktr.ee/adityamadhok",
    category: "Social",
    description: "All links in one place.",
    external: true,
  },
  {
    label: "Email",
    url: "mailto:adityamadhok2026@gmail.com",
    category: "Contact",
    description: "adityamadhok2026@gmail.com",
    external: false,
  },
];

export const EMAIL = "adityamadhok2026@gmail.com";
export const PHONE = "+91 84292 54399";
export const LOCATION = "Jhansi, Uttar Pradesh 284003";

export const education = {
  degree: "B.Tech, Electronics & Communication Engineering",
  institution: "Maulana Azad National Institute of Technology (MANIT), Bhopal",
  completion: "February 2025",
  gpa: "6.29/10",
};

export const certifications = [
  { name: "Fundamentals of Digital Marketing", issuer: "Google", year: "2023" },
  { name: "AI-Powered Digital Marketing", issuer: "IIDE", year: "2024" },
  { name: "Instagram Reels & YouTube SEO", issuer: "IIDE", year: "2024" },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Native" },
];
