import { expect, test } from '@playwright/test';
// import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('Chain', async ({ page }) => {
  await test.step('go to "Chain" page', async () => {
    await page.goto('/platform/chain');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      "Polkadot Chain | Discover Polkadot's Relay Chain and Rollups",
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText('The secure backbone of Polkadot');
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'The secure backbone of Polkadot',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(section.getByText('The Polkadot Chain')).toHaveText(
      'The Polkadot Chain (aka Relay Chain) is Polkadot’s core protocol layer—a high-performance foundation that secures, connects, and coordinates every chain in the network.',
    );
  });

  // await test.step('"header" section screenshot', async () => {
  //   const section = page.getByTestId('side-by-side-header');
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'header.png',
  //     snapshotConfig,
  //   );
  // });

  // await test.step('"one network" section screenshot', async () => {
  //   const section = page.getByTestId('cards-small-block').nth(0);
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'one-network.png',
  //     snapshotConfig,
  //   );
  // });

  // await test.step('"the architecture behind the polkadot chain" section screenshot', async () => {
  //   const section = page.getByTestId('cards-sticky-block');
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'architecture.png',
  //     snapshotConfig,
  //   );
  // });

  // await test.step('"what the polkadot chain unlocks for builders" section screenshot', async () => {
  //   const section = page.getByTestId('cards-block-378b171df89a');
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'unlocks-for-builders.png',
  //     snapshotConfig,
  //   );
  // });

  // await test.step('"build on polkadot" section screenshot', async () => {
  //   const section = page.getByTestId('cards-small-block').nth(1);
  //   await page.waitForTimeout(2000);
  //   expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
  //     'core-foundation.png',
  //     snapshotConfig,
  //   );
  // });
});
