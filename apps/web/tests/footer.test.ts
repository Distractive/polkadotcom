import { expect, test } from "@playwright/test"

test("Footer", async ({ page }) => {
  await test.step("go to homepage", async () => {
    await page.goto("/")
  })

  await test.step("assert footer is properly displayed", async () => {
    const footerContainer = page.getByTestId("footer")

    await test.step("Get started", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Get Started" })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "DOT Token", exact: true })
    ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Polkadot Wallets",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Staking", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Dapps", exact: true })
      ).toBeVisible()
    })

    await test.step("Platform", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Platform" })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Polkadot SDK", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Polkadot Chain",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Polkadot DAO", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Case Studies", exact: true })
      ).toBeVisible()
    })

    await test.step("Developers", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Developers" })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Grants & Funding",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Courses", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Documentation",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Alpha Program",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Blockchain Academy",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Parity Bug Bounty",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Bridges Bug Bounty",
          exact: true,
        })
      ).toBeVisible()
    })

    await test.step("Community", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Community" })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "About", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Blog", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Newsroom", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Decentralized Jobs",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Ambassador Program",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Events", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Contact", exact: true })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", { name: "Brand Hub", exact: true })
      ).toBeVisible()
    })

    await test.step("Legal", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Legal" })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Legal Disclosures",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Privacy Policy",
          exact: true,
        })
      ).toBeVisible()
      await expect(
        footerContainer.getByRole("link", {
          name: "Cookie Policy",
          exact: true,
        })
      ).toBeVisible()
    })

    await test.step("Subscribe button", async () => {
      await expect(
        footerContainer.getByRole("button", { name: "Subscribe" })
      ).toBeVisible()
    })

    await test.step("Social media", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Discord" })
      ).toBeVisible()

      await expect(
        footerContainer.getByRole("link", { name: "Reddit" })
      ).toBeVisible()

      await expect(
        footerContainer.getByRole("link", { name: "Github" })
      ).toBeVisible()

      await expect(
        footerContainer.getByRole("link", { name: "YouTube" })
      ).toBeVisible()

      await expect(
        footerContainer.getByRole("link", { name: "Twitter" })
      ).toBeVisible()

      await expect(
        footerContainer.getByRole("link", { name: "Instagram" })
      ).toBeVisible()
    })

    await test.step("Logo", async () => {
      await expect(
        footerContainer.getByRole("link", { name: "Polkadot logo" })
      ).toBeVisible()
    })
  })
})
