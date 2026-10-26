import { test, expect } from "@playwright/test";

test.describe("Services & Topmate", () => {
  test("the Topmate profile link is correct", async ({ page }) => {
    await page.goto("/services");
    const profileLinks = page.getByRole("link", { name: /Topmate profile/i });
    await expect(profileLinks.first()).toHaveAttribute(
      "href",
      "https://topmate.io/adityamadhok",
    );
  });

  test("each consultation CTA points at its matching booking page", async ({
    page,
  }) => {
    await page.goto("/services");

    const expectations: [RegExp, string][] = [
      [/Book free discovery call/i, "https://topmate.io/adityamadhok/2344355"],
      [/Discuss a website project/i, "https://topmate.io/adityamadhok/2344353"],
      [/Review my web app idea/i, "https://topmate.io/adityamadhok/2344352"],
    ];

    for (const [name, href] of expectations) {
      const link = page.getByRole("link", { name }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("the Linux digital product links to its Topmate listing", async ({
    page,
  }) => {
    await page.goto("/services");
    const link = page
      .getByRole("link", { name: /Explore the Linux utility/i })
      .first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      "https://topmate.io/adityamadhok/2346755",
    );
  });

  test("the Career Command Center product links to Gumroad", async ({
    page,
  }) => {
    await page.goto("/services");
    const link = page.getByRole("link", { name: /View on Gumroad/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      "href",
      "https://adityamadhok.gumroad.com/l/Career-Command-Center",
    );
  });

  test("no Fiverr or Calendly links exist anywhere on the site", async ({
    page,
  }) => {
    const routes = [
      "/",
      "/library",
      "/about",
      "/skills",
      "/journey",
      "/services",
      "/contact",
      "/projects/well-value-india",
    ];

    for (const route of routes) {
      await page.goto(route);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
      for (const href of hrefs) {
        expect(href).not.toMatch(/fiverr/i);
        expect(href).not.toMatch(/calendly/i);
      }
      const html = await page.content();
      expect(html).not.toMatch(/fiverr/i);
      expect(html).not.toMatch(/calendly/i);
    }
  });

  test("prices shown are the verified Topmate prices", async ({ page }) => {
    await page.goto("/services");
    const body = await page.locator("main").innerText();
    expect(body).toContain("Free");
    expect(body).toContain("₹400");
    expect(body).toContain("₹1,000");
    expect(body).toContain("₹30");
    // A verification date is disclosed so stale prices are visible as such.
    expect(body).toMatch(/LAST VERIFIED|VERIFIED/);
  });

  test("the exploration areas section is present and separate", async ({
    page,
  }) => {
    await page.goto("/services");
    await expect(
      page.getByRole("heading", { name: /What I can help you explore/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Small tools you can download/i }),
    ).toBeVisible();
  });
});

test.describe("Contact", () => {
  test("shows the verified contact destinations", async ({ page }) => {
    await page.goto("/contact");
    const body = await page.locator("main").innerText();
    expect(body).toContain("adityamadhok2026@gmail.com");

    await expect(
      page.getByRole("link", { name: /Book a conversation/i }).first(),
    ).toHaveAttribute("href", "https://topmate.io/adityamadhok");
  });

  test("the form validates and does not pretend to send without a backend", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Submitting an empty form surfaces validation, not a fake success.
    await page.getByRole("button", { name: /Send message/i }).click();
    await expect(page.getByText(/Please enter your name/i)).toBeVisible();
    await expect(page.getByText(/Please enter your email/i)).toBeVisible();

    // A malformed email is caught too.
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByRole("button", { name: /Send message/i }).click();
    await expect(page.getByText(/does not look right/i)).toBeVisible();

    // A valid submission either sends or hands off to the mail client.
    await page.getByLabel("Name").fill("Test Visitor");
    await page.getByLabel("Email").fill("visitor@example.com");
    await page
      .getByLabel("Project description")
      .fill(
        "I would like to discuss a Python desktop utility for tracking my own notes.",
      );
    await page.getByRole("button", { name: /Send message/i }).click();

    await expect(
      page
        .getByText(/Message sent|opens your mail app|not been sent yet/i)
        .first(),
    ).toBeVisible({ timeout: 20_000 });
  });

  test("the contact API rejects an invalid payload", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "x" },
    });
    expect(res.status()).toBe(422);
  });
});
