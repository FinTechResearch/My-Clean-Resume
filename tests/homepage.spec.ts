import { test, expect } from "@playwright/test";
import { trackErrors } from "./helpers";

test.describe("Homepage", () => {
  test("loads and shows the professional identity", async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Websites with clarity",
    );
    await expect(page.getByText("ADITYA MADHOK").first()).toBeVisible();
    await expect(page.getByText(/more websites/i).first()).toBeVisible();

    expect(errors.filter((e) => !/favicon|404/i.test(e))).toEqual([]);
  });

  test("primary and secondary actions are reachable", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: /Explore the work/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Start a project/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Visit .* live/i }).first(),
    ).toBeVisible();
  });

  test("renders the editorial sections", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Notice\. Build\. Ship\./ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /A designer who builds/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How the work actually happens/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Skills as a building system/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /worth visiting/i }),
    ).toBeVisible();
  });

  test("navigation header is present and keyboard reachable", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) {
      await expect(
        page.getByRole("button", { name: /Open menu/i }),
      ).toBeVisible();
      return;
    }
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
  });
});
