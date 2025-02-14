import { expect, test } from "@playwright/test"

test("Navbar", async ({ page }) => {
  await test.step("go to homepage", async () => {
    await page.goto("/")
  })

  await test.step("close cookies banner", async () => {
    const cookieBanner = page.getByRole("dialog", {
      name: "Cookie Consent Banner",
    })
    await cookieBanner.waitFor({state: 'visible', timeout: 2000});
    await cookieBanner
      .getByRole("button", { name: "Close this dialog" })
      .click()
    await expect(cookieBanner).toBeHidden()
  })

  await test.step("navbar screenshot", async () => {
    const navbar = page.getByTestId("navbar")
    expect(await navbar.screenshot()).toMatchSnapshot("navbar.png")
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
