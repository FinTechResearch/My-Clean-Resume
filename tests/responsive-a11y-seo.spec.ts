import { test, expect } from "@playwright/test";

test.describe("Responsive & accessibility", () => {
  test("mobile navigation opens and works", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile project only");

    await page.goto("/");
    const trigger = page.getByRole("button", { name: /Open menu/i });
    await expect(trigger).toBeVisible();

    await trigger.click();
    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(
      sheet.getByRole("link", { name: "Work", exact: true }),
    ).toBeVisible();

    await sheet.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services/);
  });

  test("text remains readable and does not overflow horizontally", async ({
    page,
  }) => {
    await page.goto("/library");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(2);
  });

  test("the library is fully usable without WebGL", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: true,
    });
    // Simulate a browser with no WebGL by blocking the context creation.
    await context.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...rest: unknown[]
      ) {
        if (typeof type === "string" && type.includes("webgl")) return null;
        return original.call(this, type, ...rest);
      } as typeof HTMLCanvasElement.prototype.getContext;
    });
    const page = await context.newPage();
    await page.goto("/library");

    await expect(
      page.getByRole("heading", { name: /Websites, in one place/i }),
    ).toBeVisible();
    const cards = page.locator("main ul > li a[href^='/projects/']");
    expect(await cards.count()).toBeGreaterThanOrEqual(2);

    await context.close();
  });

  test("skip link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText(/Skip to content/i);
  });

  test("icon-only controls have accessible names", async ({ page }) => {
    await page.goto("/");
    const unnamed = await page.evaluate(() => {
      const buttons = Array.from(
        document.querySelectorAll("button, a[href]"),
      ) as HTMLElement[];
      return buttons
        .filter((el) => {
          if (el.offsetParent === null && el.getAttribute("aria-hidden") !== "true")
            return false;
          const text = (el.textContent ?? "").trim();
          const label =
            el.getAttribute("aria-label") ??
            el.getAttribute("title") ??
            el.getAttribute("aria-labelledby");
          return text.length === 0 && !label;
        })
        .map((el) => el.outerHTML.slice(0, 120));
    });
    expect(unnamed).toEqual([]);
  });

  test("reduced motion is respected", async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const duration = await page.evaluate(() => {
      const el = document.querySelector("main");
      if (!el) return null;
      return getComputedStyle(el).animationDuration;
    });
    // Motion is either absent or effectively instant.
    expect(duration === null || parseFloat(duration) < 0.01).toBeTruthy();
    await context.close();
  });

  test("headings form a sane hierarchy", async ({ page }) => {
    await page.goto("/");
    const levels = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("main h1, main h2, main h3"),
      ).map((h) => Number(h.tagName[1])),
    );
    expect(levels.length).toBeGreaterThan(3);
    expect(levels[0]).toBe(1);
    // No level is skipped by more than one.
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("SEO", () => {
  test("each page has a unique title and description", async ({ page }) => {
    const routes = ["/", "/library", "/about", "/skills", "/journey", "/services", "/contact"];
    const titles = new Set<string>();

    for (const route of routes) {
      await page.goto(route);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);
      titles.add(title);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(30);
    }

    expect(titles.size).toBe(routes.length);
  });

  test("open graph metadata is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test("sitemap and robots are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const body = await sitemap.text();
    expect(body).toContain("/library");
    expect(body).toContain("/projects/well-value-india");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("sitemap");
  });

  test("a project page is meaningful without client JavaScript", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/projects/well-value-india");
    const body = await page.locator("body").innerText();
    expect(body).toContain("Well Value India");
    expect(body).toContain("The problem");
    await context.close();
  });
});
