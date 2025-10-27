import { expect, test } from '@playwright/test';
import { screenshotConfig, snapshotConfig } from './constants';
import { acceptOrCloseCookieBanner } from './utils/cookies';

test('SDK', async ({ page }) => {
  await test.step('go to "SDK" page', async () => {
    await page.goto('/platform/sdk');
    await acceptOrCloseCookieBanner(page);
  });

  await test.step('assert title and header are properly displayed', async () => {
    await expect(page).toHaveTitle(
      'Polkadot SDK | The Ultimate Blockchain Toolkit for Web3 Developers',
    );
    const heading = page.locator('h1');
    await expect(heading).toHaveText(
      'The modular toolkit for building fast, scalable blockchains',
    );
  });

  await test.step('assert "header" section is displayed properly', async () => {
    const section = page.getByTestId('side-by-side-header');

    await expect(
      section.getByRole('heading', {
        name: 'The modular toolkit for building fast, scalable blockchains',
      }),
    ).toBeVisible();
    await expect(section.getByTestId('breadcrumb')).toBeVisible();
    await expect(
      section.getByRole('link', { name: 'Start building' }),
    ).toBeVisible();
    await expect(
      section.getByRole('img', { name: 'Pink dots representing the' }),
    ).toBeVisible();
  });

  await test.step('"header" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-header');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'header.png',
      snapshotConfig,
    );
  });

  await test.step('"build with the polkadot sdk" section screenshot', async () => {
    const section = page.getByTestId('cards-sticky-block');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'build.png',
      snapshotConfig,
    );
  });

  await test.step('"why builders choose the polkadot sdk" section screenshot', async () => {
    const section = page.getByTestId('cards-small-block').nth(0);
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'why-builders.png',
      snapshotConfig,
    );
  });

  await test.step('"the engine driving real-world web3" section screenshot', async () => {
    const section = page.getByTestId('cards-block-841c1b7c6953');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'engine.png',
      snapshotConfig,
    );
  });

  await test.step('"your custom chain starts here" section screenshot', async () => {
    const section = page.getByTestId('side-by-side-b3cad6a31130');
    await page.waitForTimeout(2000);
    expect(await section.screenshot(screenshotConfig)).toMatchSnapshot(
      'custom-chain.png',
      snapshotConfig,
    );
  });
});
