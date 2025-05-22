import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Platform', async ({ page }) => {
  await test.step('go to platform page', async () => {
    await page.goto('/platform');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle('Platform');
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Unleash the power of Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('header');

    await expect(section.getByText('Innovate without constraints')).toHaveText(
      'Innovate without constraints using Polkadot’s powerful, secure, and flexible multi-chain platform',
    );

    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('assert "boundaries" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-be959eb895a6');

    await expect(
      section.getByRole('heading', {
        name: "Push the boundaries of what's",
      }),
    ).toBeVisible();
    await expect(section.getByText('Explore the three core')).toHaveText(
      'Explore the three core components that make Polkadot the powerful, secure core of Web3: the versatile Polkadot SDK, the interoperable Polkadot Chain, and the unstoppable Polkadot DAO.',
    );
    await expect(
      section.getByRole('link', { name: 'Polkadot SDK A modular' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot Chain A rapidly' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Polkadot DAO The world’s' }),
    ).toBeVisible();
  });

  await test.step('"boundaries" section screenshot', async () => {
    const section = page.getByTestId('cards-block-be959eb895a6');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'boundaries.png',
      snapshotConfig,
    );
  });

  await test.step('assert "ecosystem" section is displayed properly', async () => {
    const section = page.getByTestId('cards-block-955ddc9252ac');

    await expect(
      section.getByRole('heading', {
        name: 'The ecosystem with limitless',
      }),
    ).toBeVisible();
    await expect(section.getByText('From decentralized finance (')).toHaveText(
      'From decentralized finance (DeFi) to immersive gaming experiences, explore the decentralized applications (dapps) flourishing on Polkadot.',
    );
    await expect(
      section.getByRole('link', { name: 'NFL Rivals' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Exiled Racers' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Hydration' }),
    ).toBeVisible();
    await section.getByRole('button', { name: 'Next slide' }).click();
    await section.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(2000);
    await expect(
      section.getByRole('link', { name: 'StellaSwap' }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Centrifuge' }),
    ).toBeVisible();
  });

  await test.step('"ecosystem" section screenshot', async () => {
    const section = page.getByTestId('cards-block-955ddc9252ac');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'ecosystem.png',
      snapshotConfig,
    );
  });

  await test.step('assert "see more dapps" section is displayed properly', async () => {
    const section = page.getByTestId('button-block');

    await expect(
      section.getByRole('link', { name: 'See more dApps' }),
    ).toBeVisible();
  });

  await test.step('see more dapps section screenshot', async () => {
    const section = page.getByTestId('button-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'more-dapps.png',
      snapshotConfig,
    );
  });

  await test.step('assert "what\'s next" section is displayed properly', async () => {
    const section = page.getByTestId('content-block');

    await expect(
      section.getByRole('heading', {
        name: 'What’s next for Polkadot?',
      }),
    ).toBeVisible();
    await expect(section.getByText('Since Polkadot burst onto the')).toHaveText(
      'Since Polkadot burst onto the scene with the Relay Chain genesis block in May 2020, culminating in December 2021 with the launch of parachains, it has consistently pushed the boundaries of blockchain technology.',
    );
  });

  await test.step("what's next section screenshot", async () => {
    const section = page.getByTestId('content-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'whats-next.png',
      snapshotConfig,
    );
  });

  await test.step('assert "timeline" section is displayed properly', async () => {
    const section = page.getByTestId('timeline');

    await expect(
      section.getByRole('heading', {
        name: 'Technical direction & key',
      }),
    ).toBeVisible();

    await expect(
      section.getByRole('heading', { name: 'Polkadot Chain live' }),
    ).toBeVisible();
    await expect(section.getByText('May 2020The Polkadot')).toHaveText(
      'May 2020The Polkadot Chain (aka Relay Chain) launched, coordinating the entire system, including parachains, after six months of in-the-wild testing on Kusama, Polkadot’s canary network.',
    );

    await expect(
      section.getByRole('heading', { name: 'Parachains launch, Polkadot 1' }),
    ).toBeVisible();
    await expect(
      section
        .getByRole('group')
        .filter({ hasText: 'Parachains launch, Polkadot 1' })
        .getByRole('link'),
    ).toBeVisible();
    await expect(section.getByText('December 2021 The milestone')).toHaveText(
      'December 2021 The milestone launch of parachains (now rollups) and parachain slot auctions on Polkadot marked Polkadot 1.0’s completion.',
    );

    await expect(
      section.getByRole('heading', {
        name: 'OpenGov launches',
      }),
    ).toBeVisible();
    await expect(
      section
        .getByRole('group')
        .filter({ hasText: 'OpenGov launchesJune' })
        .getByRole('link'),
    ).toBeVisible();
    await expect(section.getByText('June 2023Polkadot shook up')).toHaveText(
      'June 2023Polkadot shook up governance with onchain governance, transforming how network decisions are made and forming the Polkadot DAO we know today.',
    );

    await section.getByRole('button', { name: 'Next slide' }).click();
    await section.getByRole('button', { name: 'Next slide' }).click();
    await page.waitForTimeout(2000);

    await expect(
      section.getByRole('heading', {
        name: 'Polkadot 2.0 arrives',
      }),
    ).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'More' }).nth(3),
    ).toBeVisible();
    await expect(section.getByText('Q2 2025 Major upgrades')).toHaveText(
      'Q2 2025 Major upgrades lead the way to Polkadot 2.0. Agile Coretime, Asynchronous Backing and elastic scaling provide unmatched scalability, cost, speed, and flexibility.',
    );

    await expect(
      section.getByRole('heading', {
        name: 'JAM, A new era for Polkadot',
      }),
    ).toBeVisible();
    await expect(
      section
        .getByRole('group')
        .filter({ hasText: 'JAM, A new era for' })
        .getByRole('link'),
    ).toBeVisible();
    await expect(section.getByText("FutureGavin Wood's Gray Paper")).toHaveText(
      "FutureGavin Wood's Gray Paper introduces Join-Accumulate Machine, a codename for a rearchitecture of Polkadot that will not only allow it to be able to secure other blockchains, but any kind of Web3 application or rollup.",
    );
  });

  await test.step('"timeline" section screenshot', async () => {
    const section = page.getByTestId('timeline');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'timeline.png',
      snapshotConfig,
    );
  });
});