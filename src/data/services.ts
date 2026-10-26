import type { Service } from "@/types";

/**
 * THE BLOCKVERSE — Topmate services and digital products.
 *
 * Topmate is the source of truth for booking, payment, scheduling and the
 * final terms of every service. This file is a mirror, not a booking system.
 *
 * Prices and durations are only shown when they have been confirmed against
 * the live listing. `lastVerified` records when that check happened — update
 * it whenever Topmate changes a service. If a price cannot be confirmed,
 * remove the `price` field and the UI falls back to a "View details & book"
 * call to action automatically.
 *
 * Last verified: 2026-10-20 against https://topmate.io/adityamadhok
 */

export const TOPMATE_PROFILE_URL = "https://topmate.io/adityamadhok";
export const SERVICES_LAST_VERIFIED = "2026-10-20";

export const services: Service[] = [
  {
    id: "discovery-call",
    name: "Free Developer Discovery Call",
    description:
      "Have an idea but aren't sure where to begin? Use this short introductory conversation to explain the problem, discuss your goals, and determine a useful next step.",
    detail:
      "A brief 15-minute video conversation to understand what you are trying to build, what is getting in the way, and whether a focused next step makes sense. Good for first contact, rough ideas, and 'is this worth building' questions.",
    category: "Consultation",
    bookingUrl: "https://topmate.io/adityamadhok/2344355",
    price: "Free",
    duration: "15 min",
    lastVerified: SERVICES_LAST_VERIFIED,
    availability: "available",
    cta: "Book free discovery call",
    kind: "booking",
  },
  {
    id: "python-gui-discussion",
    name: "Website Design & Build Discussion",
    description:
      "Discuss a business website, a redesign, or a storefront you want to build. Bring the idea and use the conversation to explore structure, content and practical next steps.",
    detail:
      "A focused discussion about website structure, page hierarchy, responsive design, content and implementation choices — including how to present a complex offer clearly and what the build should prioritise first.",
    category: "Consultation",
    bookingUrl: "https://topmate.io/adityamadhok/2344353",
    price: "₹400",
    duration: "45 min",
    lastVerified: SERVICES_LAST_VERIFIED,
    availability: "available",
    cta: "Discuss a website project",
    kind: "booking",
    relatedProjectSlugs: ["well-value-india"],
  },
  {
    id: "web-app-review",
    name: "Web App Ideas & Project Review",
    description:
      "Have an idea for a web app or an existing project you want to improve? Discuss the concept, user experience, implementation approach, and possible next steps.",
    detail:
      "A review of a web application idea or an existing project direction. Covers the concept, the user experience, the implementation approach and the technical options worth considering, ending with concrete next steps you can act on.",
    category: "Consultation",
    bookingUrl: "https://topmate.io/adityamadhok/2344352",
    price: "₹1,000",
    duration: "60 min",
    lastVerified: SERVICES_LAST_VERIFIED,
    availability: "available",
    cta: "Review my web app idea",
    kind: "booking",
    relatedProjectSlugs: ["nykaa-fashion-3d", "well-value-india"],
  },
  {
    id: "snoopy-hydration-buddy",
    name: "Snoopy Dog Hydration Buddy for Linux",
    description:
      "A small Linux utility designed around reminders and more intentional computer use. Explore the product and check the current listing for its available features and delivery details.",
    detail:
      "A downloadable Linux utility centred on hydration reminders and a gentler relationship with screen time. The current listing on Topmate carries the full feature breakdown and delivery details — check it there before purchasing.",
    category: "Digital Product",
    bookingUrl: "https://topmate.io/adityamadhok/2346755",
    price: "₹30",
    lastVerified: SERVICES_LAST_VERIFIED,
    availability: "available",
    cta: "Explore the Linux utility",
    kind: "product",
  },
];

/** Topmate-listed digital products sold directly, not as consultations. */
export const digitalProducts: Service[] = [
  {
    id: "career-command-center-product",
    name: "Career Command Center",
    description:
      "The AI-powered career toolkit as a download — seven integrated modules, a Textual terminal interface, SQLite storage and Groq-powered document generation.",
    detail:
      "The commercial build of CareerCommandCenter. Requires a free Groq API key for the AI features. Cross-platform Windows EXE and Linux binaries were produced with PyInstaller. The product is also open source, so the source and prebuilt releases are both reachable from the project page.",
    category: "Digital Products",
    bookingUrl: "https://adityamadhok.gumroad.com/l/Career-Command-Center",
    price: "USD 10",
    lastVerified: SERVICES_LAST_VERIFIED,
    availability: "available",
    cta: "View on Gumroad",
    kind: "product",
  },
];

export const consultationServices = services.filter((s) => s.kind === "booking");
export const topmateProducts = services.filter((s) => s.kind === "product");

export function getService(id: string): Service | undefined {
  return [...services, ...digitalProducts].find((s) => s.id === id);
}
