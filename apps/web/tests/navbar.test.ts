import { expect, test } from "@playwright/test"

test("Navbar", async ({ page }) => {
  await test.step("go to homepage", async () => {
    await page.goto("/")
  })

  await test.step("assert navbar is properly displayed", async () => {
    const navbar = page.getByTestId("navbar")
    await expect(
      navbar.getByRole("link", { name: "Navigate to the home page" })
    ).toBeVisible()
    await expect(
      navbar.getByRole("link", { name: "Get started" })
    ).toBeVisible()
    await expect(navbar.getByRole("link", { name: "Platform" })).toBeVisible()
    await expect(navbar.getByRole("link", { name: "Developers" })).toBeVisible()
    await expect(navbar.getByRole("link", { name: "Community" })).toBeVisible()
  })
})
