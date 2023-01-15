import { test, expect } from "@playwright/test";

test("Test search field", async ({ page }) => {
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Hae pysäkkiä numerolla tai osoitteella").click();
  await page
    .getByPlaceholder("Hae pysäkkiä numerolla tai osoitteella")
    .fill("Inspe");
  await page.getByRole("button", { name: "445 Inspehtoorinkatu" }).click();
  await expect(page.getByText("445 - Inspehtoorinkatu")).toBeVisible();
});

test("Test exact search", async ({ page }) => {
  await page.locator("html").click();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Hae pysäkkiä numerolla tai osoitteella").click();
  await page
    .getByPlaceholder("Hae pysäkkiä numerolla tai osoitteella")
    .fill("1");
  await expect(page.getByText("1 - Turun satama (Silja)")).toBeVisible();
});

test("Test by using only url", async ({ page }) => {
  await page.goto("http://localhost:3000/?stop=2", {
    waitUntil: "networkidle",
  });
  await expect(page.getByText("2 - Turun satama (Viking)")).toBeVisible();
});
