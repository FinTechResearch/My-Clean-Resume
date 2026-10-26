import { test, expect } from "@playwright/test";
import { PROJECT_SLUGS, REQUIRED_PROJECTS } from "./helpers";

test.describe("Library", () => {
  test("renders project cards", async ({ page }) => {
    await page.goto("/library");
    await expect(
      page.getByRole("heading", { name: /Websites, in one place/i }),
    ).toBeVisible();

    const cards = page.locator("main ul > li a[href^='/projects/']");
    expect(await cards.count()).toBeGreaterThanOrEqual(2);
  });

  test("search filters the catalogue", async ({ page }) => {
    await page.goto("/library");
    const search = page.getByRole("textbox", { name: /Search projects/i });
    await search.fill("nykaa");

    const titles = await page
      .locator("main ul > li a[href^='/projects/'] h3")
      .allInnerTexts();

    expect(titles.length).toBeGreaterThan(0);
    expect(titles.join(" ")).toContain("Nykaa Fashion");
    expect(titles.join(" ")).not.toContain("Well Value");
  });

  test("search is case-insensitive and matches tags and technologies", async ({
    page,
  }) => {
    await page.goto("/library");
    const search = page.getByRole("textbox", { name: /Search projects/i });

    await search.fill("WEBGL");
    const upper = await page
      .locator("main ul > li a[href^='/projects/'] h3")
      .allInnerTexts();
    expect(upper.length).toBeGreaterThan(0);

    await search.fill("webgl");
    const lower = await page
      .locator("main ul > li a[href^='/projects/'] h3")
      .allInnerTexts();
    expect(lower).toEqual(upper);
  });

  test("an empty state is shown and can be reset", async ({ page }) => {
    await page.goto("/library");
    await page.getByRole("textbox", { name: /Search projects/i }).fill("zzzzqqq");

    await expect(page.getByText(/Nothing matches/i)).toBeVisible();
    await page.getByRole("button", { name: /Reset filters/i }).click();
    await expect(
      page.getByRole("textbox", { name: /Search projects/i }),
    ).toHaveValue("");
  });

  test("filters combine with the search term", async ({ page }) => {
    await page.goto("/library");
    await page.getByRole("button", { name: /^Filters/i }).click();

    await page.getByRole("button", { name: "E-commerce", exact: true }).click();
    const afterFilter = await page
      .locator("main ul > li a[href^='/projects/']")
      .count();
    expect(afterFilter).toBeGreaterThan(0);

    await page
      .getByRole("textbox", { name: /Search projects/i })
      .fill("well value");
    const afterSearch = await page
      .locator("main ul > li a[href^='/projects/']")
      .count();
    expect(afterSearch).toBeLessThanOrEqual(afterFilter);

    await expect(page.getByText("Reset all")).toBeVisible();
  });

  test("project routes open correctly", async ({ page }) => {
    await page.goto("/library");
    await page
      .locator("main ul > li a[href^='/projects/well-value-india']")
      .first()
      .click();
    await expect(page).toHaveURL(/\/projects\/well-value-india/);
    await expect(
      page.getByRole("heading", { name: /Well Value India/, level: 1 }),
    ).toBeVisible();
  });
});

test.describe("Project pages", () => {
  for (const slug of PROJECT_SLUGS) {
    test(`/${slug} loads directly and on refresh`, async ({ page }) => {
      const response = await page.goto(`/projects/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.reload();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("both live websites have their own entry", async ({ page }) => {
    await page.goto("/library");
    const body = await page.locator("main").innerText();
    for (const title of REQUIRED_PROJECTS) {
      expect(body).toContain(title);
    }
  });

  test("a project page shows problem, build and implementation", async ({
    page,
  }) => {
    await page.goto("/projects/well-value-india");
    await expect(
      page.getByRole("heading", { name: "The problem" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The build", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Implementation", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "The build path", exact: true }),
    ).toBeVisible();
  });

  test("a project page links to the live website", async ({ page }) => {
    await page.goto("/projects/nykaa-fashion-3d");
    const link = page.getByRole("link", { name: /Visit the live site/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      "https://nykaa-3d-website.vercel.app/",
    );
  });

  test("an unknown project returns 404", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
