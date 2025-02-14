import { expect, test } from "@playwright/test"

test("Homepage", async ({ page }) => {
  const ecosystemIds = [
    "3b6847866f76",
    "878be89f9898d0ab5e266e4fc49614c2",
    "b006a029787b991dcdea6a3338249e84",
    "1041062bfe436968c080cdeee5496b1b",
    "3479ce3e3534297a92fd5f2a5ec98880",
    "ed5a6361d98e64e2029dae1052a67228",
  ]

  await test.step("go to homepage", async () => {
    await page.goto("/")
  })

  await test.step("assert title and header are properly displayed", async () => {
    await expect(page).toHaveTitle("Polkadot")
    const heading = page.locator("h1")
    await expect(heading).toHaveText("Defy what's possible")
  })

  await test.step("assert cookie banner is properly displayed", async () => {
    const cookieBanner = page.getByRole("dialog", {
      name: "Cookie Consent Banner",
    })

    expect(cookieBanner.getByText("This website utilizes")).toHaveText(
      "This website utilizes technologies such as cookies to enable essential site functionality, as well as for analytics, personalization, and targeted advertising. You may change your settings at any time or accept the default settings. You may close this banner to continue with only essential cookies."
    )

    await expect(
      cookieBanner.getByRole("link", { name: "Privacy Policy" })
    ).toBeVisible()
    await expect(
      cookieBanner.getByRole("link", { name: "Storage Preferences" })
    ).toBeVisible()
    await expect(
      cookieBanner.getByText("Storage Preferences", { exact: true })
    ).toBeVisible()
    await expect(
      cookieBanner.getByText("Storage Preferences", { exact: true })
    ).toBeVisible()
    await expect(
      cookieBanner.getByText("Storage Preferences", { exact: true })
    ).toBeVisible()
    expect(cookieBanner.getByRole("button", { name: "Save" })).toBeVisible()
    expect(
      cookieBanner.getByRole("button", { name: "Accept All" })
    ).toBeVisible()
    expect(
      cookieBanner.getByRole("button", { name: "Reject All" })
    ).toBeVisible()
  })

  await test.step("cookies banner screenshot", async () => {
    // @Note: wait to avoid blur effect
    await page.waitForTimeout(6000)
    const cookieBanner = page.getByRole("dialog", {
      name: "Cookie Consent Banner",
    })
    expect(await cookieBanner.screenshot()).toMatchSnapshot("cookies.png")

    await cookieBanner
      .getByRole("button", { name: "Close this dialog" })
      .click()

    await expect(cookieBanner).toBeHidden()
  })

  await test.step("assert 'hero' section is displayed properly", async () => {
    const heroSection = page.getByTestId("hero-pile")

    await expect(
      heroSection.getByRole("heading", { name: "Defy what's possible" })
    ).toBeVisible()
    await expect(
      heroSection.getByText("Polkadot unites the world's")
    ).toHaveText(
      "Polkadot unites the world's innovators and changemakers, building and using the most transformative apps and blockchains."
    )
    await expect(
      heroSection.getByRole("link", { name: "Join the community", exact: true })
    ).toBeVisible()
    await expect(
      heroSection.getByRole("link", { name: "Start Building", exact: true })
    ).toBeVisible()
  })

  await test.step("hero section screenshot", async () => {
    // @Note: only landing frame because of animation
    const heroLandingFrame = page.getByTestId("hero-landing-frame")
    expect(await heroLandingFrame.screenshot()).toMatchSnapshot("hero.png")
  })

  await test.step("assert 'video' section is displayed properly", async () => {
    const videoSection = page.getByTestId("video-pile-content")

    await expect(
      videoSection.getByRole("heading", { name: "A future led by you" })
    ).toBeVisible()
    await expect(videoSection.getByTestId("video-block")).toBeVisible()
  })

  await test.step("video section screenshot", async () => {
    const videoSection = page.getByTestId("video-pile-content")
    expect(await videoSection.screenshot()).toMatchSnapshot("video.png")
  })

  await test.step("assert 'network' section displayed properly", async () => {
    const networkSection = page.getByTestId("network-pile")

    await expect(
      networkSection.getByRole("heading", { name: "A network governed by a" })
    ).toHaveText("A network governed by a rebelliously innovative community")
    await expect(
      networkSection.getByText("Polkadot is a blockchain")
    ).toHaveText(
      "Polkadot is a blockchain network of networks designed to challenge our assumptions, directed and governed by those who hold the DOT token. By holding DOT, you are part of the largest and most decentralized decision-making group in the world."
    )
    await expect(
      networkSection.getByRole("link", { name: "DOT token basics What’s in a" })
    ).toHaveText(
      "DOT token basicsWhat’s in a DOT? Dive into the utility token that powers the Polkadot ecosystem."
    )
    await expect(
      networkSection.getByRole("link", { name: "Build on Polkadot Spin up a" })
    ).toHaveText(
      "Build on PolkadotSpin up a custom blockchain in minutes, or build the app of your dreams."
    )
    await expect(
      networkSection.getByRole("link", { name: "Join the community Join a" })
    ).toHaveText(
      "Join the communityJoin a chat, create content, or help champion Polkadot."
    )
  })

  await test.step("network section screenshot", async () => {
    const networkSection = page.getByTestId("network-pile-content")
    expect(await networkSection.screenshot()).toMatchSnapshot("network.png")
  })

  await test.step("assert 'stats' section is displayed properly", async () => {
    const statsSection = page.getByTestId("stats-pile")

    await expect(
      statsSection.getByRole("heading", { name: "Polkadot’s unstoppable" })
    ).toHaveText("Polkadot’s unstoppable momentum")
    await expect(statsSection.getByText("1.3 millionDAO members")).toHaveText(
      "1.3 millionDAO members represented by total onchain wallets"
    )
    await expect(
      statsSection.getByText("$5 billionstaked economic")
    ).toHaveText("$5 billionstaked economic security")
    await expect(
      statsSection.getByText("448,293average MAA across")
    ).toHaveText("448,293average MAA across Polkadot ecosystem in 2024 to date")
    await expect(
      statsSection.getByText("1000+ referendacreated by the")
    ).toHaveText("1000+ referendacreated by the DAO since 2023")
    await expect(
      statsSection.getByText("+ projectsin the Polkadot ecosystem")
    ).toHaveText("600+ projectsin the Polkadot ecosystem")
  })

  await test.step("stats section screenshot", async () => {
    const statsSection = page.getByTestId("stats-pile")
    expect(await statsSection.screenshot()).toMatchSnapshot("stats.png")
  })

  await test.step("assert 'building' section is displayed properly", async () => {
    const ecosystemSection = page.getByTestId("building-pile")

    await expect(
      ecosystemSection.getByRole("heading", {
        name: "What are you waiting for?",
      })
    ).toBeVisible()
    await expect(ecosystemSection.getByText("We’re the most open,")).toHaveText(
      "We’re the most open, collaborative, passionate group of free thinkers, boundary pushers, creators, builders, innovators, and misfits. Share your ideas, projects, and vision for an open web. We can’t wait to meet you."
    )
    await expect(
      ecosystemSection
        .locator('[id="build\\.content"]')
        .getByRole("link", { name: "Get started" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByText("Start building", { exact: true })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByText("Explore funding", { exact: true })
    ).toBeVisible()
  })

  await test.step("building section screenshot", async () => {
    const ecosystemSection = page.getByTestId("building-pile")
    expect(await ecosystemSection.screenshot()).toMatchSnapshot("building.png")
  })

  await test.step("assert 'connected' section is displayed properly", async () => {
    const connectedSection = page.getByTestId("connected-pile")

    await expect(
      connectedSection.getByRole("heading", { name: "Stay connected" })
    ).toBeVisible()
    await expect(page.getByText("The latest news, notes, and")).toHaveText(
      "The latest news, notes, and notions from across the Polkadot ecosystem"
    )
    await expect(
      connectedSection.getByRole("link", {
        name: "technology Polkadot celebrates launch of Agile Coretime The Polkadot community",
      })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", { name: "Programs What is a crypto" })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", { name: "Polkadot's 50+ parachains" })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", { name: "Ecosystem The Tie launches" })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", {
        name: "GRANTS & FUNDING The ultimate",
      })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", {
        name: "AI Unleashing the Potential",
      })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", {
        name: "Defi Polkadot DAO allocates",
      })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", {
        name: "technology Polkadot introduces Asynchronous Backing, paving the way for",
      })
    ).toBeVisible()
    await connectedSection.getByRole("button", { name: "Next slide" }).click()
    await expect(
      connectedSection.getByRole("link", {
        name: "Technology Empowering Next-",
      })
    ).toBeVisible()
  })

  await test.step("connected section screenshot", async () => {
    const connectedSection = page.getByTestId("connected-pile")
    expect(await connectedSection.screenshot()).toMatchSnapshot("connected.png")
  })

  await test.step("assert 'newsletter' block is displayed properly", async () => {
    const newsletterWrapper = page.getByTestId("newsletter")

    await expect(
      newsletterWrapper.getByRole("heading", {
        name: "Polkadot’s latest news,",
      })
    ).toBeVisible()
    await expect(
      newsletterWrapper.getByText("Get your monthly fix of")
    ).toBeVisible()
    await expect(
      newsletterWrapper.getByRole("button", { name: "Subscribe" })
    ).toBeVisible()
  })

  await test.step("newsletter section screenshot", async () => {
    const newsletterWrapper = page.getByTestId("newsletter")
    expect(await newsletterWrapper.screenshot()).toMatchSnapshot(
      "newsletter.png"
    )
  })

  await test.step("assert 'ecosystem' section is displayed properly", async () => {
    const ecosystemSection = page.getByTestId("ecosystem-pile")

    await expect(
      ecosystemSection.getByRole("heading", {
        name: "Home to the bold and visionary",
      })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByText("Polkadot combines unbeatable")
    ).toHaveText(
      "Polkadot combines unbeatable technology and a strong community to bring inspiring projects to life."
    )
    await expect(
      ecosystemSection.getByRole("link", { name: "NFL Rivals Digital" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", { name: "Hydration Omnipool DEX for" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", { name: "Acurast Provide compute &" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", {
        name: "ChatDKG Launchpad for trusted",
      })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", { name: "Exiled Racers Racing and" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", { name: "Energy Web X Enterprise" })
    ).toBeVisible()
    await expect(
      ecosystemSection.getByRole("link", { name: "Explore Dapps" })
    ).toBeVisible()
  })

  await test.step("ecosystem section screenshot", async () => {
    for (const id of ecosystemIds) {
      const ecosystemImage = page.getByTestId(`ecosystem-content-${id}`)
      expect(await ecosystemImage.screenshot()).toMatchSnapshot(
        `ecosystem-${id}.png`
      )
    }
  })
})
