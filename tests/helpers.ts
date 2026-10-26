import type { Page } from "@playwright/test";

/**
 * Shared helpers for the portfolio test suite.
 */

/** Collects console errors and page errors for assertions. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

export const REQUIRED_PROJECTS = [
  "Well Value India",
  "Nykaa Fashion",
];

export const PROJECT_SLUGS = ["well-value-india", "nykaa-fashion-3d"];
