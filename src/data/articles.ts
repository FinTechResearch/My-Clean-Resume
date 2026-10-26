import type { Article } from "@/types";

/**
 * THE BLOCKVERSE — knowledge library.
 *
 * Every entry points at something that actually exists and was published
 * by Aditya Madhok. New articles are added here; reading time is only
 * shown when it was calculated from the actual body of the article.
 *
 * Retrieved from https://dev.to/api/articles?username=adityamadhok
 * on 2026-10-20.
 */

export const articles: Article[] = [
  {
    slug: "i-built-career-command-center",
    title:
      "I Built Career Command Center: An AI-Powered Job Search Dashboard with Python & Textual.",
    description:
      "The development write-up behind CareerCommandCenter — why a terminal was the right interface for a job-search dashboard, how the Groq LLM API was wired in, and what it took to package it for Windows and Linux.",
    url: "https://dev.to/adityamadhok/i-built-career-command-center-an-ai-powered-job-search-dashboard-with-python-textual-496d",
    publishedAt: "2026-06-13",
    tags: ["python", "ai", "textual", "productivity"],
    category: "Build Logs",
  },
  {
    slug: "from-python-projects-to-real-world-solutions",
    title: "From Python Projects to Real-World Solutions: My Developer Journey on Topmate",
    description:
      "A walk through the path from learning Python to publishing products and offering real development conversations — and an explanation of why the work moved from one person with a problem to other people with the same one.",
    url: "https://dev.to/adityamadhok/from-python-projects-to-real-world-solutions-my-developer-journey-on-topmate-37mj",
    publishedAt: "2026-10-10",
    tags: ["python", "webdev", "beginners", "buildinpublic"],
    category: "Developer Resources",
  },
  {
    slug: "living-terminal-animation-with-hermes-agent",
    title:
      "🦋 I Built a Living Terminal Animation with Hermes Agent — Here's How It Went.",
    description:
      "The story of building the Butterfly Garden terminal animation as an agent-driven experiment, including what worked, what did not, and what the approach is good for.",
    url: "https://dev.to/adityamadhok/i-built-a-living-terminal-animation-with-hermes-agent-heres-how-it-went-5dke",
    publishedAt: "2026-05-26",
    tags: ["hermesagentchallenge", "devchallenge", "agents", "python"],
    category: "Creative Computing",
  },
];

export const articleCategories = [
  "Build Logs",
  "Technical Notes",
  "AI Workflows",
  "Python Projects",
  "Web Development",
  "Creative Computing",
  "Digital Products",
  "Developer Resources",
] as const;

export const GITHUB_PROFILE_URL = "https://github.com/FinTechResearch";
