import { expect, test } from "@playwright/test";

test("Homepage loads and has correct title", async ({ page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Polkadot");
  const heading = page.locator('h1');
  await expect(heading).toHaveText("Defy what's possible");
})
